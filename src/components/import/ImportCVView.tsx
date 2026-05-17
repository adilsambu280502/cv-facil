import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText, ChevronRight, Loader2, CheckCircle2,
  ArrowLeft, ClipboardPaste, LayoutTemplate
} from "lucide-react";
import { useCV } from "../../context/CVContext";

const TEMPLATES: { id: string; name: string; description: string; preview: string; badge?: string }[] = [
  {
    id: "modern",
    name: "Moderno Editorial",
    description: "Layout 2 colunas editorial. Ideal para todas as áreas.",
    preview: "2 colunas · Serif · Minimalista",
  },
  {
    id: "executive",
    name: "Executivo Elite",
    description: "Estrutura formal e impactante para cargos de liderança.",
    preview: "Centrado · Bold · Corporativo",
  },
  {
    id: "technical",
    name: "Técnico & Dev",
    description: "Destaque para projetos, tecnologias e código.",
    preview: "Moderno · Sem Serifa · Tech",
  },
];

export const ImportCVView: React.FC = () => {
  const { setView, setResult, setAnswers, answers } = useCV();
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [step, setStep] = useState<"paste" | "template" | "loading" | "done">("paste");
  const [error, setError] = useState<string | null>(null);
  const charCount = cvText.length;

  const handleParse = async () => {
    if (cvText.trim().length < 50) {
      setError("Por favor, cola o conteúdo completo do teu CV (mínimo 50 caracteres).");
      return;
    }
    setError(null);
    setStep("loading");

    try {
      const response = await fetch("/api/parse-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobDescription: jobDescription || undefined }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erro ao processar o CV.");
      }

      const data = await response.json();

      // Preencher os answers com os contactos extraídos
      const extracted = data.extractedContact || {};
      setAnswers({
        ...answers,
        name: extracted.name || answers.name || "",
        email: extracted.email || answers.email || "",
        phone: extracted.phone || answers.phone || "",
        location: extracted.location || answers.location || "",
        linkedin: extracted.linkedin || answers.linkedin || "",
        website: extracted.website || answers.website || "",
        template: selectedTemplate as any,
      });

      // Remover extractedContact do result antes de guardar
      const { extractedContact: _, ...cleanResult } = data;
      setResult(cleanResult);

      setStep("done");
      setTimeout(() => setView("dashboard"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado. Tenta novamente.");
      setStep("paste");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex flex-col">
      {/* ── HEADER ── */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-xl px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => setView("intro")}
          className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all text-slate-600"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
            <ClipboardPaste size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-black text-slate-900 text-sm tracking-tight">Importar CV Existente</h1>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">CV Fácil · Modo Import</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ── STEP: LOADING ── */}
        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center gap-8 p-8"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-[28px] bg-blue-600/10 flex items-center justify-center">
                <FileText size={40} className="text-blue-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Loader2 size={16} className="text-white animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-3">A Processar o Teu CV</h2>
              <p className="text-slate-500 font-medium max-w-sm">
                O nosso Kamba de Carreira está a extrair, estruturar e melhorar o teu conteúdo...
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              {["Analisar conteúdo...", "Estruturar experiência...", "Aplicar template..."].map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.8 }}
                  className="flex items-center gap-3 text-sm text-slate-500"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  {msg}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP: DONE ── */}
        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-6 p-8"
          >
            <div className="w-24 h-24 rounded-[28px] bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">CV Gerado!</h2>
              <p className="text-slate-500 font-medium">A abrir o teu currículo profissional...</p>
            </div>
          </motion.div>
        )}

        {/* ── STEP: PASTE ── */}
        {step === "paste" && (
          <motion.div
            key="paste"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col lg:flex-row gap-0 max-w-7xl mx-auto w-full p-6 lg:p-10 gap-8"
          >
            {/* ── LEFT: TEXTAREA ── */}
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ClipboardPaste size={18} className="text-blue-600" />
                  <h2 className="font-black text-slate-900 text-xl tracking-tight">Cola o teu CV aqui</h2>
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  Copia o conteúdo do teu CV existente (Word, PDF, Notion, Google Docs...) e cola aqui em texto simples.
                </p>
              </div>

              <div className="relative flex-1">
                <textarea
                  value={cvText}
                  onChange={(e) => { setCvText(e.target.value); setError(null); }}
                  placeholder={`Exemplo:\n\n# José Filipe da Conceição Figueredo\n\nContacto: +244 926 165 097\nE-mail: josefilipe@gmail.com\n\n## Perfil Profissional\nSou um profissional responsável...\n\n## Formação Académica\n...\n\n## Experiência Profissional\n...`}
                  className="w-full h-full min-h-[420px] resize-none bg-white border-2 border-slate-100 rounded-[24px] p-6 text-sm text-slate-700 font-mono leading-relaxed placeholder:text-slate-300 focus:outline-none focus:border-blue-600/50 focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm"
                />
                <div className="absolute bottom-4 right-5 text-[10px] text-slate-300 font-bold">
                  {charCount} caracteres
                </div>
              </div>

              {/* Opção: Vaga */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  Descrição da Vaga (Opcional — para otimização ATS)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Cola aqui a descrição da vaga a que te candidatas para o sistema optimizar o teu CV automaticamente..."
                  className="w-full h-24 resize-none bg-white border-2 border-slate-100 rounded-[16px] p-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-blue-600/50 focus:ring-4 focus:ring-blue-600/5 transition-all"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 text-red-600 text-sm font-bold"
                >
                  <span>⚠</span> {error}
                </motion.div>
              )}
            </div>

            {/* ── RIGHT: TEMPLATE SELECTOR + CTA ── */}
            <div className="w-full lg:w-[340px] flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <LayoutTemplate size={18} className="text-blue-600" />
                  <h2 className="font-black text-slate-900 text-xl tracking-tight">Escolhe o Template</h2>
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  O teu conteúdo será aplicado ao design escolhido.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {TEMPLATES.map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => !tpl.badge && setSelectedTemplate(tpl.id)}
                    disabled={!!tpl.badge}
                    className={`w-full text-left p-5 rounded-[20px] border-2 transition-all relative overflow-hidden ${
                      selectedTemplate === tpl.id && !tpl.badge
                        ? "border-blue-600 bg-blue-600/5 shadow-lg shadow-blue-600/10"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    } ${tpl.badge ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {tpl.badge && (
                      <span className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2 py-1 rounded-full">
                        {tpl.badge}
                      </span>
                    )}
                    <div className="font-black text-slate-900 text-sm mb-1">{tpl.name}</div>
                    <div className="text-xs text-slate-500 font-medium mb-2">{tpl.description}</div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{tpl.preview}</div>
                    {selectedTemplate === tpl.id && !tpl.badge && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                onClick={handleParse}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={cvText.trim().length < 50}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white py-6 rounded-[20px] font-black text-base flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] disabled:shadow-none mt-2"
              >
                <FileText size={20} />
                Gerar CV Profissional
                <ChevronRight size={20} />
              </motion.button>

              <p className="text-[10px] text-slate-400 text-center font-bold tracking-wide">
                O nosso sistema estrutura, organiza e melhora o teu conteúdo automaticamente.
              </p>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-[11px] text-slate-400 font-medium text-center">
                  Preferes criar do zero?{" "}
                  <button onClick={() => setView("wizard")} className="text-blue-600 font-black hover:underline">
                    Usar o Assistente
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
