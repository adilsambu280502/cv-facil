import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, CheckCircle2, Loader2, Star, Phone } from "lucide-react";
import { useCV } from "../context/CVContext";
import { verifyPaymentToken } from "../services/payment";

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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="bg-gray-900 px-6 py-8 text-white relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
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

          <div className="p-6 overflow-y-auto">
            {status === "success" ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 size={40} className="text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Pagamento Confirmado!
                </h3>
                <p className="text-gray-500 font-medium">
                  Todos os recursos premium foram desbloqueados com sucesso no teu perfil.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6 text-center">
                  <p className="text-sm font-bold text-gray-900 mb-2">Faz o pagamento por Multicaixa Express</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Phone size={18} className="text-accent" />
                    <span className="font-mono text-lg tracking-wider text-accent font-bold">9XX XXX XXX</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    Envia o comprovativo para o nosso WhatsApp e recebe o teu <strong className="text-gray-900">Código Premium de 8 dígitos</strong> em instantes.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-gray-900 mb-2 block">
                      Código Premium
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Ex: A1B2C3D4"
                        maxLength={8}
                        className="w-full bg-white border border-gray-200 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 rounded-xl py-3.5 pl-11 pr-4 text-base font-mono uppercase font-bold outline-none transition-all placeholder:font-sans placeholder:font-medium placeholder:normal-case placeholder:text-gray-400"
                        value={token}
                        onChange={(e) => setToken(e.target.value.toUpperCase())}
                      />
                    </div>
                    {errorMsg && (
                      <p className="text-red-500 text-xs font-bold mt-2 animate-pulse">{errorMsg}</p>
                    )}
                  </div>

                  <button
                    onClick={handleVerify}
                    disabled={status === "loading" || token.length < 8}
                    className="w-full bg-gray-900 disabled:opacity-50 hover:bg-black text-white rounded-xl py-4 font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-white" />
                        <span>A validar código...</span>
                      </>
                    ) : (
                      "Confirmar e Desbloquear"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
