import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, 
  FileText, 
  UserCheck, 
  Share2, 
  ChevronRight, 
  ExternalLink,
  Lock
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { useCV } from "../../context/CVContext";
import { useExport } from "../../hooks/useExport";
import { cn } from "../../lib/utils";

import { ChatAssistant } from "./ChatAssistant";

// Lazy loading templates for performance
const MinimalistTemplate = React.lazy(() => import("../cv/MinimalistTemplate").then(m => ({ default: m.MinimalistTemplate })));
const ModernTemplate = React.lazy(() => import("../cv/ModernTemplate").then(m => ({ default: m.ModernTemplate })));
const ExecutiveTemplate = React.lazy(() => import("../cv/ExecutiveTemplate").then(m => ({ default: m.ExecutiveTemplate })));
const CreativeTemplate = React.lazy(() => import("../cv/CreativeTemplate").then(m => ({ default: m.CreativeTemplate })));
const TechnicalTemplate = React.lazy(() => import("../cv/TechnicalTemplate").then(m => ({ default: m.TechnicalTemplate })));

export const CVDashboard: React.FC = () => {
  const { answers, result, hasPaid, setShowPaymentModal, setView } = useCV();
  const cvRef = useRef<HTMLDivElement>(null);
  const { isExporting, handleExportPDF, handleExportDOCX, handleExportImage } = useExport(cvRef, answers, result);
  const [activeTab, setActiveTab] = useState<"cv" | "letter" | "coach">("cv");

  if (!result) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-950 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="w-24 h-24 bg-blue-600/10 text-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-xl">
            <FileText size={48} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">Pronto para o Próximo Nível?</h2>
          <p className="text-xl text-slate-500 font-bold mb-12 leading-relaxed">Ainda não tens nenhum currículo guardado. Vamos criar um agora mesmo?</p>
          <button 
            onClick={() => setView('wizard')}
            className="w-full bg-blue-600 text-white py-6 rounded-[32px] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_32px_64px_-12px_rgba(37,99,235,0.4)]"
          >
            Criar meu Primeiro CV
          </button>
        </motion.div>
      </div>
    );
  }

  const renderTemplate = () => {
    const props = { answers, result, hasPaid, cvRef };
    return (
      <React.Suspense fallback={
        <div className="flex flex-col items-center justify-center h-[600px] gap-4">
          <Loader2 className="animate-spin text-accent" size={40} />
          <p className="text-gray-500 font-bold animate-pulse">A preparar o teu design...</p>
        </div>
      }>
        {(() => {
          switch (answers.template) {
            case "minimalist": return <MinimalistTemplate {...props} />;
            case "modern": return <ModernTemplate {...props} />;
            case "executive": return <ExecutiveTemplate {...props} />;
            case "creative": return <CreativeTemplate {...props} />;
            case "technical": return <TechnicalTemplate {...props} />;
            default: return <MinimalistTemplate {...props} />;
          }
        })()}
      </React.Suspense>
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:gap-10 w-full p-4 sm:p-6 lg:p-10">
      {/* Sidebar de Controle / Análise */}
      <div className="w-full xl:w-[420px] 2xl:w-[480px] flex flex-col gap-6">
        {/* Score Card Premium */}
        <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border-2 border-slate-100 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors" />
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-xl tracking-tight">Força do Perfil</h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Análise em Tempo Real</p>
            </div>
            <span className="text-4xl font-black text-blue-600 tracking-tighter">{result.score}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-1 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-blue-600 h-full rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            />
          </div>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-8 font-bold leading-relaxed">
            O teu perfil está {result.score > 70 ? "extremamente forte" : "equilibrado"}. <br />
            <span className="text-blue-600 cursor-pointer hover:underline">Vê como chegar aos 100%</span>
          </p>
        </div>

        {/* Tabs Selector App-Style */}
        <div className="flex bg-white dark:bg-slate-900 p-2 rounded-[32px] border-2 border-slate-100 dark:border-slate-800 shadow-xl">
          {[
            { id: "cv", label: "Currículo", icon: FileText },
            { id: "letter", label: "Carta", icon: Share2 },
            { id: "coach", label: "Assistente", icon: UserCheck }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 py-4 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
                activeTab === tab.id 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl scale-[1.02]" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              )}
            >
              <tab.icon size={20} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Actions Group */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="w-full bg-blue-600 text-white py-6 rounded-[32px] font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_24px_48px_-12px_rgba(37,99,235,0.4)] group"
          >
            {isExporting ? <Loader2 className="animate-spin" size={28} /> : <Download size={28} className="group-hover:-translate-y-1 transition-transform" />}
            {isExporting ? "A Gerar PDF..." : "Descarregar PDF"}
          </button>

          <div className="grid grid-cols-2 gap-4">
            {hasPaid ? (
               <button 
                 onClick={handleExportDOCX}
                 disabled={isExporting}
                 className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white py-5 rounded-[28px] font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-50"
               >
                 {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                 DOCX
               </button>
            ) : (
               <button 
                 onClick={() => setShowPaymentModal(true)} 
                 className="bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 text-slate-400 py-5 rounded-[28px] font-black text-sm flex items-center justify-center gap-3 cursor-pointer hover:bg-slate-100 transition-all"
               >
                 <Lock size={16} /> DOCX
               </button>
            )}
            <button 
              onClick={handleExportImage}
              disabled={isExporting}
              className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white py-5 rounded-[28px] font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
              PNG
            </button>
          </div>

          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Meu Currículo Profissional - CV Fácil',
                  text: `Acabei de criar o meu currículo no CV Fácil. Vê o meu perfil como ${result.title}!`,
                  url: window.location.href,
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copiado para a área de transferência!");
              }
            }}
            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-blue-600 py-5 rounded-[28px] font-black text-sm hover:bg-blue-600/5 transition-all flex items-center justify-center gap-3 shadow-md"
          >
            <Share2 size={20} /> Partilhar Perfil
          </button>
        </div>

        {/* Dicas do Recrutador Premium */}
        <div className="bg-blue-600/5 dark:bg-blue-600/10 rounded-[48px] p-10 border-2 border-blue-600/10 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-blue-600/20">
             <Target size={48} />
          </div>
          <h4 className="font-black text-blue-900 dark:text-blue-400 mb-6 flex items-center gap-3 text-lg tracking-tight">
            Análise do Recrutador
          </h4>
          
          <div className={cn("space-y-4 transition-all duration-700", !hasPaid && "blur-[8px] opacity-30 select-none scale-95")}>
            <div className="mb-6 p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-blue-600/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Impressão em 6 Segundos</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 italic">"{result.recruiterSimulation.sixSecondImpression}"</p>
            </div>
            
            {result.recruiterSimulation.highlights.map((tip, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                <p className="text-sm text-blue-800 dark:text-blue-300 font-bold leading-relaxed tracking-tight">{tip}</p>
              </div>
            ))}
          </div>
          
          {!hasPaid && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
               <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-[20px] flex items-center justify-center shadow-xl mb-6 text-blue-600">
                  <Lock size={32} />
               </div>
               <p className="font-black text-slate-900 dark:text-white mb-6 text-lg tracking-tight leading-tight">Desbloqueia as dicas <br /> personalizadas</p>
               <button onClick={() => setShowPaymentModal(true)} className="bg-blue-600 text-white px-10 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-600/30">Ver Planos</button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area - O Canvas */}
      <div className="flex-1 flex flex-col min-h-[900px] bg-white dark:bg-slate-900 rounded-[64px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.2)] border-2 border-slate-100 dark:border-slate-800 overflow-hidden relative">
        {/* Barra de Status Premium */}
        <div className="h-20 border-b-2 border-slate-50 dark:border-slate-800/50 px-10 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30 backdrop-blur-xl relative z-20">
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-full bg-red-400" />
            <div className="w-4 h-4 rounded-full bg-amber-400" />
            <div className="w-4 h-4 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-3">
             <div className={cn("w-2 h-2 rounded-full animate-pulse", activeTab === "cv" ? "bg-blue-600" : "bg-slate-400")} />
             <span className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
               {activeTab === "cv" && "Modo Visualização Final"}
               {activeTab === "letter" && "Gerador de Cartas"}
               {activeTab === "coach" && "Consultoria de Carreira"}
             </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <ExternalLink size={18} />
             </div>
          </div>
        </div>

        <div className="flex-1 p-6 sm:p-16 bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto relative custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === "cv" && (
              <motion.div 
                key="cv-tab"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                ref={cvRef} 
                className="mx-auto bg-white shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)] w-full max-w-[850px] min-h-[1150px] transform origin-top p-10 sm:p-20 relative"
                style={{ 
                  "--cv-primary": answers.color || "#2563eb",
                  fontFamily: answers.font || "Inter"
                } as React.CSSProperties}
              >
                {/* Overlay de Qualidade */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-20" />
                {renderTemplate()}
              </motion.div>
            )}

            {activeTab === "letter" && (
              <motion.div
                key="letter-tab"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="mx-auto bg-white dark:bg-slate-900 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)] w-full max-w-[850px] p-20 min-h-[800px] rounded-[48px] border-2 border-slate-100 dark:border-slate-800"
              >
                <div className="flex justify-between items-start mb-20 border-b-2 border-slate-50 dark:border-slate-800 pb-12">
                  <div>
                    <h2 className="text-[32px] font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{answers.name}</h2>
                    <p className="text-xl text-blue-600 font-bold tracking-tight">{result.title}</p>
                  </div>
                  <div className="text-right text-sm text-slate-400 font-black uppercase tracking-widest">
                    <p>{new Date().toLocaleDateString('pt-AO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-bold tracking-tight">
                    {result.coverLetter || "A preparar a tua carta de apresentação personalizada..."}
                  </p>
                </div>
                
                {!hasPaid && (
                  <div className="mt-20 p-12 bg-slate-50 dark:bg-slate-800/50 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[40px] text-center">
                    <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl text-slate-300">
                       <Lock size={32} />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Carta de Apresentação de Elite</h4>
                    <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto font-bold tracking-tight leading-relaxed">Deixa que o nosso sistema escreva a carta perfeita para convencer os recrutadores.</p>
                    <button onClick={() => setShowPaymentModal(true)} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-5 rounded-[24px] font-black text-lg hover:scale-110 transition-all shadow-2xl">Upgrade Premium</button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "coach" && (
              <motion.div
                key="coach-tab"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl mx-auto h-full min-h-[700px] flex flex-col"
              >
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-[48px] border-2 border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
                   <ChatAssistant />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
