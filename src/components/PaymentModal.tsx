import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, CheckCircle2, Loader2, Star, Phone } from "lucide-react";
import { useCV } from "../context/CVContext";
import { verifyPaymentToken } from "../services/payment";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { slideUp, scaleIn, fadeIn } from "../lib/motion";

export const PaymentModal: React.FC = () => {
  const { showPaymentModal, setShowPaymentModal, setHasPaid } = useCV();
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerify = async () => {
    if (token.length !== 8) {
      setErrorMsg("O código deve ter exatamente 8 caracteres.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const response = await verifyPaymentToken(token);
    
    if (response.success) {
      setStatus("success");
      setTimeout(() => {
        setHasPaid(true);
        setShowPaymentModal(false);
      }, 2000);
    } else {
      setStatus("error");
      setErrorMsg(response.message || "Erro na validação.");
    }
  };

  if (!showPaymentModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPaymentModal(false)}
        />
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 dark:border-slate-800"
        >
          <div className="bg-slate-950 px-8 py-10 text-white relative">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </Button>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center border border-accent/30 shadow-[0_0_20px_rgba(var(--accent),0.3)]">
                <Star size={32} className="text-accent fill-accent" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-center text-balance mb-2">
              Desbloquear Premium
            </h2>
            <p className="text-gray-400 text-center text-sm font-medium">
              Modelos Executivos, Carta de Apresentação personalizada e análise completa de recrutador.
            </p>
          </div>

          <div className="p-8 overflow-y-auto">
            {status === "success" ? (
              <motion.div 
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, 0] }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle2 size={48} className="text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter">
                  Pagamento Confirmado!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                  Todos os recursos premium foram desbloqueados com sucesso no teu perfil.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 mb-8 text-center">
                  <p className="text-sm font-black text-slate-900 dark:text-white mb-3 uppercase tracking-widest">Paga por Multicaixa Express</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Phone size={20} className="text-blue-600" />
                    <span className="font-mono text-2xl tracking-tighter text-blue-600 font-black">9XX XXX XXX</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
                    Envia o comprovativo para o nosso WhatsApp e recebe o teu <strong className="text-slate-900 dark:text-white">Código Premium de 8 dígitos</strong> em instantes.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 block">
                      Código Premium
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Lock size={18} className="text-slate-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Ex: A1B2C3D4"
                        maxLength={8}
                        className="h-16 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl pl-14 pr-6 font-mono text-xl uppercase font-black focus:border-blue-600 transition-all shadow-sm"
                        value={token}
                        onChange={(e) => setToken(e.target.value.toUpperCase())}
                      />
                    </div>
                    {errorMsg && (
                      <p className="text-red-500 text-xs font-black mt-2 ml-4 animate-pulse uppercase tracking-widest">{errorMsg}</p>
                    )}
                  </div>
 
                  <Button
                    onClick={handleVerify}
                    disabled={status === "loading" || token.length < 8}
                    size="2xl"
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl py-8 font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-none shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={24} className="animate-spin text-white" />
                        <span>Validando...</span>
                      </>
                    ) : (
                      <>
                        Confirmar e Desbloquear
                        <CheckCircle2 size={24} />
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
