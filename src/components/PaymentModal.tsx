import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, MessageCircle, Key, ArrowRight, X, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { useCV } from "../context/CVContext";
import { verifyPaymentToken } from "../services/payment";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export const PaymentModal: React.FC = () => {
  const { showPaymentModal, setShowPaymentModal, setHasPaid } = useCV();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleWhatsAppClick = () => {
    const orderId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const waNumber = "244929766995";
    const text = `Olá CV Fácil! O meu ID de pedido é #${orderId}. Gostaria de efetuar o pagamento (Multicaixa) para receber o meu Código de Desbloqueio e exportar o meu currículo.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleVerify = async () => {
    if (code.length < 6) {
      setErrorMsg("O código deve ter pelo menos 6 caracteres.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    const response = await verifyPaymentToken(code);
    if (response.success) {
      setStatus("success");
      if (response.plan) {
        sessionStorage.setItem("active_plan", response.plan);
      }
      setTimeout(() => {
        setHasPaid(true);
        setShowPaymentModal(false);
        setStatus("idle");
        setCode("");
      }, 2500);
    } else {
      setStatus("error");
      setErrorMsg(response.message || "Código inválido ou já utilizado.");
    }
  };

  const handleClose = () => {
    setShowPaymentModal(false);
    setStatus("idle");
    setCode("");
    setErrorMsg("");
  };

  return (
    <AnimatePresence>
      {showPaymentModal && (
        <>
          {/* Overlay com backdrop blur */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (status !== "loading" && status !== "success") {
                handleClose();
              }
            }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[200]"
          />

          {/* Modal Principal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[201] px-4 sm:px-0"
          >
            <div className="bg-white dark:bg-slate-900 rounded-[36px] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 max-h-[90vh] sm:max-h-[94vh] flex flex-col">

              {/* Estado: Sucesso */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 sm:p-16 text-center flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20"
                  >
                    <CheckCircle2 size={48} className="text-emerald-500" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                    Acesso Desbloqueado!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    O teu currículo Premium foi desbloqueado com sucesso. Podes agora exportar o PDF de Alta Fidelidade.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header Gradiente */}
                  <div className="relative h-36 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 flex items-center justify-center overflow-hidden">
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors z-10"
                    >
                      <X size={18} />
                    </button>
                    <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/25 shadow-xl relative z-10">
                      <Lock size={30} className="text-white drop-shadow" />
                    </div>
                    {/* Glows decorativos */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-black/20 rounded-full blur-3xl" />
                  </div>

                  {/* Corpo */}
                  <div className="p-5 sm:p-10 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                        Desbloqueio Premium
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm leading-relaxed">
                        Para exportar o teu CV em PDF de alta fidelidade e desbloquear a <span className="text-blue-600 font-black">Importação por Texto Instantânea</span> nos planos <span className="text-blue-600 font-black">Pro</span> ou <span className="text-blue-600 font-black">Carreira</span>, precisas de um <span className="text-blue-600 font-black">Código de Acesso</span>.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Opção 1: Multicaixa Express */}
                      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-[24px] p-4 sm:p-5 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/25 transition-all group">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                          <div className="w-11 h-11 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                            <MessageCircle size={22} className="text-emerald-500" />
                          </div>
                          <div className="flex-1 w-full text-center sm:text-left">
                            <h4 className="font-black text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
                              Pagamento Rápido via Multicaixa Express ⚡
                            </h4>
                            <div className="space-y-3 mb-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                              <p className="flex items-start gap-2.5 text-left">
                                <span className="w-5 h-5 bg-blue-600/10 text-blue-500 flex items-center justify-center rounded-full font-black shrink-0 mt-0.5">1</span>
                                <span className="flex-1">Envia o valor para o telemóvel: <strong className="text-blue-500 dark:text-blue-400 select-all font-black">929 766 995</strong></span>
                              </p>
                              <p className="flex items-start gap-2.5 text-left">
                                <span className="w-5 h-5 bg-blue-600/10 text-blue-500 flex items-center justify-center rounded-full font-black shrink-0 mt-0.5">2</span>
                                <span className="flex-1">Clica abaixo para enviar o comprovativo no WhatsApp.</span>
                              </p>
                              <p className="flex items-start gap-2.5 text-left">
                                <span className="w-5 h-5 bg-blue-600/10 text-blue-500 flex items-center justify-center rounded-full font-black shrink-0 mt-0.5">3</span>
                                <span className="flex-1">Recebe o teu código de validação (voucher) de imediato.</span>
                              </p>
                            </div>
                            <Button
                              onClick={handleWhatsAppClick}
                              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl py-5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all border-none text-xs uppercase tracking-wider flex items-center justify-center"
                            >
                              <MessageCircle size={18} className="mr-2" />
                              Deixar Comprovativo no WhatsApp
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Separador */}
                      <div className="relative py-1">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white dark:bg-slate-900 px-4 font-black text-slate-400 tracking-widest">
                            Ou inserir código
                          </span>
                        </div>
                      </div>

                      {/* Opção 2: Inserir código */}
                      <div>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Key
                              size={18}
                              className={cn(
                                "transition-colors",
                                status === "error" ? "text-rose-500" : "text-slate-400 group-focus-within:text-blue-600"
                              )}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="XXXX-XXXX"
                            value={code}
                            onChange={(e) => {
                              setCode(e.target.value.toUpperCase());
                              setStatus("idle");
                              setErrorMsg("");
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                            className={cn(
                              "w-full pl-11 pr-4 py-4 rounded-xl border-2 font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm outline-none transition-all shadow-inner",
                              "bg-slate-50 dark:bg-slate-800",
                              status === "error"
                                ? "border-rose-400 bg-rose-50 dark:bg-rose-500/10 focus:border-rose-400"
                                : "border-slate-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500"
                            )}
                          />
                        </div>
                        {errorMsg && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-rose-500 font-bold text-xs mt-2 ml-1"
                          >
                            {errorMsg}
                          </motion.p>
                        )}
                        <Button
                          onClick={handleVerify}
                          disabled={status === "loading" || !code}
                          className="w-full mt-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-xl font-black text-base hover:scale-[1.02] active:scale-95 transition-transform border-none shadow-xl shadow-slate-900/10 disabled:opacity-50 disabled:hover:scale-100"
                        >
                          {status === "loading" ? (
                            <span className="flex items-center gap-2">
                              <Loader2 size={18} className="animate-spin" />
                              A validar código...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Desbloquear Download
                              <ArrowRight size={18} />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Footer de Confiança */}
                  <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    <ShieldCheck size={15} className="text-blue-600 shrink-0" />
                    Transação Segura · Pagamentos 100% Angolanos
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
