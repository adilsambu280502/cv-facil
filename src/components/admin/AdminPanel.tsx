import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Key, Plus, Copy, Check, Trash2, TrendingUp,
  Users, FileText, DollarSign, RefreshCw, X,
  ShieldCheck, LogOut, ArrowLeft, CheckCircle2,
  Clock, AlertCircle, Loader2, MessageCircle,
  Eye, EyeOff, User, Phone
} from "lucide-react";
import {
  createVoucher, listVouchers, listTransactions,
  registerTransaction, fetchAdminStats, deleteVoucher,
  verifyAdminPassword, type Voucher, type Transaction, type AdminStats
} from "../../services/admin";

const PLANS = [
  { value: "pro", label: "Pro (Modelos ATS + Carta)", price: 700 },
  { value: "elite", label: "Elite (Plano Completo + Consultor)", price: 1500 },
];

// ─── Login do Admin ────────────────────────────────────────────────────────────
const AdminLogin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim();
    if (verifyAdminPassword(cleanPass)) {
      sessionStorage.setItem("admin_auth", "true");
      sessionStorage.setItem("admin_password", cleanPass);
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center justify-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30">
            <ShieldCheck size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-white text-center tracking-tighter mb-2">Admin CV Fácil</h1>
        <p className="text-slate-500 text-center text-sm font-bold mb-10">Acesso restrito</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password de Admin"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full bg-slate-900 border-2 rounded-2xl pl-5 pr-14 py-4 text-white font-bold outline-none transition-all ${
                error ? "border-red-500" : "border-slate-800 focus:border-blue-600"
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-2"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm font-bold text-center">Password incorreta</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black transition-all"
          >
            Entrar no Painel
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ─── Card de Estatística ───────────────────────────────────────────────────────
const StatCard: React.FC<{
  icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string;
}> = ({ icon, label, value, sub, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
    <p className="text-white text-3xl font-black tracking-tighter">{value}</p>
    {sub && <p className="text-slate-500 text-xs font-bold mt-1">{sub}</p>}
  </div>
);

// ─── Modal de Registo de Transação ────────────────────────────────────────────
// ─── Modal de Registo de Transação ────────────────────────────────────────────
const TransactionModal: React.FC<{
  voucherCode: string;
  plan: string;
  onClose: () => void;
  onSaved: () => void;
}> = ({ voucherCode, plan, onClose, onSaved }) => {
  const planInfo = PLANS.find(p => p.value === plan) || PLANS[0];
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_whatsapp: "",
    amount: planInfo.price,
    payment_method: "Multicaixa",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await registerTransaction({
      voucher_code: voucherCode,
      ...form,
      currency: "AOA",
      status: "completed",
    });
    setSaving(false);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-slate-900/95 border border-slate-800/80 rounded-[24px] p-6 w-full max-w-lg shadow-2xl relative overflow-hidden backdrop-blur-xl max-h-[90vh] flex flex-col"
      >
        {/* Glow de Background decorativo de luxo */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Header - Compacto e Z-10 */}
        <div className="flex items-center justify-between mb-4 z-10">
          <div>
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest block mb-0.5">Registo Financeiro</span>
            <h3 className="text-white font-black text-xl tracking-tight">Registar Pagamento</h3>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto pr-1 space-y-4 flex-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {/* Bilhete do Voucher Visualmente Impressionante */}
          <div className="relative bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-3 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                <Key size={18} />
              </div>
              <div>
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Código do Voucher</p>
                <p className="text-white font-black tracking-wider text-sm">{voucherCode}</p>
              </div>
            </div>
            <div className="bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
              Plano {planInfo.value === "pro" ? "Pro" : "Elite"}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 block">Nome do Cliente</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <User size={14} />
                </div>
                <input
                  type="text"
                  placeholder="Ex: João Silva"
                  value={form.customer_name}
                  onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                  className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs font-bold outline-none focus:border-blue-600 focus:bg-slate-950/60 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 block">Telemóvel</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    <Phone size={14} />
                  </div>
                  <input
                    type="text"
                    placeholder="+244 9xx xxx xxx"
                    value={form.customer_phone}
                    onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))}
                    className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs font-bold outline-none focus:border-blue-600 focus:bg-slate-950/60 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 block">WhatsApp</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    <MessageCircle size={14} />
                  </div>
                  <input
                    type="text"
                    placeholder="+244 9xx xxx xxx"
                    value={form.customer_whatsapp}
                    onChange={e => setForm(f => ({ ...f, customer_whatsapp: e.target.value }))}
                    className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs font-bold outline-none focus:border-blue-600 focus:bg-slate-950/60 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 block">Valor (AOA)</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none font-bold text-xs">
                    Kz
                  </div>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))}
                    className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs font-bold outline-none focus:border-blue-600 focus:bg-slate-950/60 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 block">Método</label>
                <select
                  value={form.payment_method}
                  onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))}
                  className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl px-4 py-2.5 text-white text-xs font-bold outline-none focus:border-blue-600 focus:bg-slate-950/60 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    backgroundSize: '14px'
                  }}
                >
                  <option className="bg-slate-900 text-white">Multicaixa</option>
                  <option className="bg-slate-900 text-white">Transferência</option>
                  <option className="bg-slate-900 text-white">BAI Directo</option>
                  <option className="bg-slate-900 text-white">Atlantico</option>
                  <option className="bg-slate-900 text-white">Ekwanza</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 block">Notas</label>
              <div className="relative">
                <div className="absolute left-3.5 top-[12px] text-slate-500 pointer-events-none">
                  <FileText size={14} />
                </div>
                <textarea
                  placeholder="Observações opcionais..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2}
                  className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs font-bold outline-none focus:border-blue-600 focus:bg-slate-950/60 transition-all resize-none placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions - 2 Colunas com Voltar/Cancelar e Confirmar */}
        <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-slate-800/60 shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700/80 text-slate-300 py-3 rounded-xl font-bold transition-all text-xs active:scale-[0.98]"
          >
            Voltar / Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-black transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 active:scale-[0.98] disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
            {saving ? "A processar..." : "Confirmar Venda"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Painel Principal ──────────────────────────────────────────────────────────
export const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [tab, setTab] = useState<"dashboard" | "vouchers" | "transactions">("dashboard");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingPlan, setGeneratingPlan] = useState<string | null>(null);
  const [newVoucher, setNewVoucher] = useState<{ code: string; plan: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [txModal, setTxModal] = useState<{ code: string; plan: string } | null>(null);

  const isExpired = (createdAt: string) => {
    const created = new Date(createdAt).getTime();
    const now = new Date().getTime();
    return (now - created) > 60 * 60 * 1000; // 1 hour in ms
  };

  const getStatusLabel = (v: Voucher) => {
    if (v.is_used) return `Utilizado em: ${formatDate(v.used_at)}`;
    if (isExpired(v.created_at)) return "Expirado";
    return "Disponível";
  };

  const getStatusColor = (v: Voucher) => {
    if (v.is_used) return "text-slate-500";
    if (isExpired(v.created_at)) return "text-rose-400 font-black";
    return "text-emerald-400";
  };

  const refresh = useCallback(async () => {
    setLoading(true);
    const [s, v, t] = await Promise.all([fetchAdminStats(), listVouchers(), listTransactions()]);
    setStats(s);
    setVouchers(v);
    setTransactions(t);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleGenerate = async (plan: string) => {
    setGeneratingPlan(plan);
    const res = await createVoucher(plan);
    if (res.success && res.code) {
      setNewVoucher({ code: res.code, plan });
      setTxModal({ code: res.code, plan });
      await refresh();
    }
    setGeneratingPlan(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleWhatsApp = (code: string, plan: string) => {
    const planName = plan === "elite" ? "Elite" : "Pro";
    const msg = `Olá! O teu pagamento foi confirmado ✅\n\nO teu Código de Acesso CV Fácil (${planName}) é:\n\n*${code}*\n\nInsere este código no CV Fácil para desbloquear o teu currículo. Qualquer dúvida estamos aqui! 🚀`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleDelete = async (code: string) => {
    if (!confirm(`Eliminar voucher ${code}?`)) return;
    await deleteVoucher(code);
    await refresh();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    onBack();
  };

  const formatAOA = (val: number) =>
    new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(val);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-slate-950/90 backdrop-blur-xl z-40">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShieldCheck size={16} className="text-white" />
            </div>
            <div>
              <h1 className="font-black text-white text-sm leading-none">Admin Panel</h1>
              <p className="text-slate-500 text-xs font-bold">CV Fácil</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="text-slate-400 hover:text-white transition-colors p-2">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors p-2">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 px-6">
        {[
          { id: "dashboard", label: "Dashboard", icon: TrendingUp },
          { id: "vouchers", label: "Vouchers", icon: Key },
          { id: "transactions", label: "Transações", icon: DollarSign },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
              tab === t.id
                ? "border-blue-600 text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      <main className="p-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">

          {/* ── DASHBOARD ── */}
          {tab === "dashboard" && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<FileText size={18} className="text-blue-400" />} label="CVs Criados" value={stats?.total_cvs ?? "—"} color="bg-blue-600/20" />
                <StatCard icon={<Key size={18} className="text-emerald-400" />} label="Vouchers Ativos" value={stats?.vouchers_available ?? "—"} sub={`${stats?.vouchers_used ?? 0} usados`} color="bg-emerald-600/20" />
                <StatCard icon={<DollarSign size={18} className="text-amber-400" />} label="Receita Total" value={stats ? formatAOA(stats.total_revenue) : "—"} sub={`${stats?.total_transactions ?? 0} vendas`} color="bg-amber-600/20" />
                <StatCard icon={<TrendingUp size={18} className="text-purple-400" />} label="Taxa de Conversão" value={stats ? `${stats.total_cvs > 0 ? Math.round((stats.vouchers_used / stats.total_cvs) * 100) : 0}%` : "—"} sub="CVs → Pagamentos" color="bg-purple-600/20" />
              </div>

              {/* Gerar Voucher Rápido */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-white font-black text-lg mb-2">⚡ Gerar Voucher Rápido</h2>
                <p className="text-slate-400 text-sm font-bold mb-6">Cliente pagou via WhatsApp? Gera o código e envia de imediato.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PLANS.map(plan => (
                    <button
                      key={plan.value}
                      onClick={() => handleGenerate(plan.value)}
                      disabled={!!generatingPlan}
                      className="flex items-center justify-between p-5 bg-slate-800 hover:bg-slate-700 border-2 border-transparent hover:border-blue-600/40 rounded-2xl transition-all group disabled:opacity-60"
                    >
                      <div className="text-left">
                        <p className="text-white font-black text-sm">{plan.label}</p>
                        <p className="text-blue-400 font-black">{formatAOA(plan.price)}</p>
                      </div>
                      {generatingPlan === plan.value
                        ? <Loader2 size={20} className="text-blue-400 animate-spin" />
                        : <Plus size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                      }
                    </button>
                  ))}
                </div>
              </div>

              {/* Últimas transações */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-white font-black text-lg mb-4">Últimas Vendas</h2>
                {transactions.length === 0
                  ? <p className="text-slate-500 text-sm font-bold text-center py-6">Sem transações ainda.</p>
                  : (
                    <div className="space-y-3">
                      {transactions.slice(0, 5).map(tx => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
                          <div>
                            <p className="text-white font-black text-sm">{tx.customer_name || "Cliente"}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-slate-400 text-xs font-bold">{formatDate(tx.created_at)} · {tx.payment_method}</span>
                              <span className="text-slate-600 text-xs">·</span>
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                tx.status === 'confirmada' ? "bg-emerald-500/10 text-emerald-400" :
                                tx.status === 'expirada' ? "bg-rose-500/10 text-rose-400" :
                                "bg-amber-500/10 text-amber-400"
                              }`}>
                                {tx.status === 'confirmada' ? 'Confirmada' : tx.status === 'expirada' ? 'Expirada' : 'Disponível'}
                              </span>
                            </div>
                          </div>
                          <span className={`font-black text-sm ${tx.status === 'confirmada' ? 'text-emerald-400' : 'text-slate-500 line-through opacity-60'}`}>
                            {formatAOA(tx.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                }
              </div>
            </motion.div>
          )}

          {/* ── VOUCHERS ── */}
          {tab === "vouchers" && (
            <motion.div key="vouchers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-white font-black text-xl">Gestão de Vouchers</h2>
                <div className="flex gap-2">
                  {PLANS.map(p => (
                    <button
                      key={p.value}
                      onClick={() => handleGenerate(p.value)}
                      disabled={!!generatingPlan}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all disabled:opacity-60"
                    >
                      {generatingPlan === p.value ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                      {p.value === "pro" ? "Pro" : "Elite"}
                    </button>
                  ))}
                </div>
              </div>

              {vouchers.length === 0
                ? <div className="text-center py-20 text-slate-500"><Key size={40} className="mx-auto mb-4 opacity-30" /><p className="font-bold">Nenhum voucher gerado ainda.</p></div>
                : (
                  <div className="space-y-3">
                    {vouchers.map(v => (
                      <div key={v.code} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-all ${
                        v.is_used
                          ? "bg-slate-900/50 border-slate-800 opacity-60"
                          : isExpired(v.created_at)
                            ? "bg-slate-900/30 border-rose-950/40 opacity-70"
                            : "bg-slate-900 border-slate-700"
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            v.is_used 
                              ? "bg-slate-700" 
                              : isExpired(v.created_at)
                                ? "bg-rose-950/20"
                                : "bg-blue-600/20"
                          }`}>
                            {v.is_used
                              ? <CheckCircle2 size={16} className="text-slate-400" />
                              : isExpired(v.created_at)
                                ? <AlertCircle size={16} className="text-rose-400" />
                                : <Key size={16} className="text-blue-400" />
                            }
                          </div>
                          <div>
                            <p className="text-white font-black tracking-wider text-sm">{v.code}</p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className={`text-xs font-black uppercase tracking-widest ${getStatusColor(v)}`}>
                                {getStatusLabel(v)}
                              </span>
                              <span className="text-slate-600 text-xs">·</span>
                              <span className="text-slate-500 text-xs font-bold">{v.plan}</span>
                              <span className="text-slate-600 text-xs">·</span>
                              <span className="text-slate-500 text-xs font-bold flex items-center gap-1">
                                <Clock size={10} />{formatDate(v.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {!v.is_used && !isExpired(v.created_at) && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleCopy(v.code)}
                              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl text-xs font-black text-slate-300 transition-all"
                            >
                              {copied === v.code ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                              Copiar
                            </button>
                            <button
                              onClick={() => handleWhatsApp(v.code, v.plan)}
                              className="flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 px-3 py-2 rounded-xl text-xs font-black text-[#25D366] transition-all"
                            >
                              <MessageCircle size={14} />
                              WhatsApp
                            </button>
                            <button
                              onClick={() => handleDelete(v.code)}
                              className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-xl hover:bg-red-400/10"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}

                        {!v.is_used && isExpired(v.created_at) && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleDelete(v.code)}
                              className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-xl hover:bg-red-400/10"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              }
            </motion.div>
          )}

          {/* ── TRANSAÇÕES ── */}
          {tab === "transactions" && (
            <motion.div key="transactions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-black text-xl">Histórico de Vendas</h2>
                <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-xl px-4 py-2">
                  <span className="text-emerald-400 font-black text-sm">
                    Total: {stats ? formatAOA(stats.total_revenue) : "—"}
                  </span>
                </div>
              </div>

              {transactions.length === 0
                ? (
                  <div className="text-center py-20 text-slate-500">
                    <DollarSign size={40} className="mx-auto mb-4 opacity-30" />
                    <p className="font-bold">Nenhuma venda registada ainda.</p>
                    <p className="text-xs mt-2">Gera um voucher e confirma o pagamento para aparecer aqui.</p>
                  </div>
                )
                : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-800">
                          {["Cliente", "Voucher", "Valor", "Método", "Status", "Data"].map(h => (
                            <th key={h} className="text-left text-xs font-black uppercase tracking-widest text-slate-500 py-3 px-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {transactions.map(tx => (
                          <tr key={tx.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-4 px-4">
                              <p className="text-white font-bold text-sm">{tx.customer_name || "—"}</p>
                              <p className="text-slate-500 text-xs">{tx.customer_phone || ""}</p>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-blue-400 font-black text-xs tracking-wider bg-blue-600/10 px-2 py-1 rounded-lg">
                                {tx.voucher_code || "—"}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`font-black ${tx.status === 'confirmada' ? 'text-emerald-400' : 'text-slate-500 line-through opacity-60'}`}>{formatAOA(tx.amount)}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-slate-400 font-bold text-sm">{tx.payment_method}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                tx.status === 'confirmada' ? "bg-emerald-500/10 text-emerald-400" :
                                tx.status === 'expirada' ? "bg-rose-500/10 text-rose-400" :
                                "bg-amber-500/10 text-amber-400"
                              }`}>
                                {tx.status === 'confirmada' ? 'Confirmada' : tx.status === 'expirada' ? 'Expirada' : 'Disponível'}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-slate-500 text-xs font-bold">{formatDate(tx.created_at)}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Modal de Transação após gerar voucher */}
      <AnimatePresence>
        {txModal && (
          <TransactionModal
            voucherCode={txModal.code}
            plan={txModal.plan}
            onClose={() => setTxModal(null)}
            onSaved={refresh}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Wrapper com autenticação ──────────────────────────────────────────────────
export const AdminPanelGuard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("admin_auth") === "true"
  );

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return <AdminPanel onBack={onBack} />;
};
