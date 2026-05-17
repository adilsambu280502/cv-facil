import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Key, Plus, Copy, Check, Trash2, TrendingUp,
  Users, FileText, DollarSign, RefreshCw, X,
  ShieldCheck, LogOut, ArrowLeft, CheckCircle2,
  Clock, AlertCircle, Loader2, MessageCircle,
  Eye, EyeOff
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-black text-xl">Registar Pagamento</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl p-3 mb-6 flex items-center gap-3">
          <Key size={16} className="text-blue-400 shrink-0" />
          <span className="text-blue-300 font-black tracking-wider text-sm">{voucherCode}</span>
        </div>

        <div className="space-y-3">
          {[
            { label: "Nome do Cliente", key: "customer_name", placeholder: "Ex: João Silva" },
            { label: "Telemóvel", key: "customer_phone", placeholder: "+244 9xx xxx xxx" },
            { label: "WhatsApp", key: "customer_whatsapp", placeholder: "+244 9xx xxx xxx" },
          ].map(field => (
            <div key={field.key}>
              <label className="text-slate-400 text-xs font-black uppercase tracking-widest block mb-1">{field.label}</label>
              <input
                type="text"
                placeholder={field.placeholder}
                value={(form as any)[field.key]}
                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:border-blue-600 transition-all"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs font-black uppercase tracking-widest block mb-1">Valor (AOA)</label>
              <input
                type="number"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:border-blue-600 transition-all"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-black uppercase tracking-widest block mb-1">Método</label>
              <select
                value={form.payment_method}
                onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:border-blue-600 transition-all"
              >
                <option>Multicaixa</option>
                <option>Transferência</option>
                <option>BAI Directo</option>
                <option>Atlantico</option>
                <option>Ekwanza</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-xs font-black uppercase tracking-widest block mb-1">Notas</label>
            <textarea
              placeholder="Observações opcionais..."
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:border-blue-600 transition-all resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
          {saving ? "A guardar..." : "Confirmar Pagamento"}
        </button>
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
                            <p className="text-slate-400 text-xs font-bold">{formatDate(tx.created_at)} · {tx.payment_method}</p>
                          </div>
                          <span className="text-emerald-400 font-black">{formatAOA(tx.amount)}</span>
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
                          : "bg-slate-900 border-slate-700"
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${v.is_used ? "bg-slate-700" : "bg-blue-600/20"}`}>
                            {v.is_used
                              ? <CheckCircle2 size={16} className="text-slate-400" />
                              : <Key size={16} className="text-blue-400" />
                            }
                          </div>
                          <div>
                            <p className="text-white font-black tracking-wider text-sm">{v.code}</p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className={`text-xs font-black uppercase tracking-widest ${v.is_used ? "text-slate-500" : "text-emerald-400"}`}>
                                {v.is_used ? "Utilizado" : "Disponível"}
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

                        {!v.is_used && (
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
                          {["Cliente", "Voucher", "Valor", "Método", "Data"].map(h => (
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
                              <span className="text-emerald-400 font-black">{formatAOA(tx.amount)}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-slate-400 font-bold text-sm">{tx.payment_method}</span>
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
