import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, 
  FileText, 
  Share2, 
  ChevronRight, 
  ExternalLink,
  Lock,
  Target,
  Loader2,
  Trophy,
  X,
  CheckCircle2,
  Mail,
  MessageSquare,
  Edit3
} from "lucide-react";
import { useCV } from "../../context/CVContext";
import { useExport } from "../../hooks/useExport";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../ui/card";
import { slideUp, scaleIn, fadeIn, staggerContainer } from "../../lib/motion";

import { ChatAssistant } from "./ChatAssistant";

// Templates profissionais
const ProfessionalCVWeb = React.lazy(() => import("../cv/ProfessionalCVWeb").then(m => ({ default: m.ProfessionalCVWeb })));
const CoverLetterWeb = React.lazy(() => import("../cv/CoverLetterWeb").then(m => ({ default: m.CoverLetterWeb })));

export const CVDashboard: React.FC = () => {
  const { 
    answers, 
    setAnswers, 
    result, 
    setResult, 
    hasPaid, 
    setShowPaymentModal, 
    setView, 
    savedCVs, 
    user,
    isGenerating,
    generateCV
  } = useCV();
  const cvRef = useRef<HTMLDivElement>(null);
  const { isExporting, handleExportPDF } = useExport(cvRef, answers, result);
  const [activeTab, setActiveTab] = useState<"cv" | "letter" | "coach" | "edit">("cv");
  const [showTips, setShowTips] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDownload = async () => {
    if (canDownload) {
      const success = await handleExportPDF();
      if (success) {
        setShowSuccessModal(true);
      }
    } else {
      setShowPaymentModal(true);
    }
  };

  // Lógica de bloqueio: templates premium exigem pagamento
  const isPremiumTemplate = ["executive", "creative", "technical"].includes(answers.template);
  const canDownload = !isPremiumTemplate || hasPaid;

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
          <Button 
            onClick={() => setView('wizard')}
            size="2xl"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-8 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-none shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]"
          >
            Criar meu Primeiro CV
          </Button>
        </motion.div>
      </div>
    );
  }

  const renderTemplate = () => {
    const props = { answers, result, hasPaid };
    return (
      <React.Suspense fallback={
        <div className="flex flex-col items-center justify-center h-[600px] gap-4">
          <Loader2 className="animate-spin text-accent" size={40} />
          <p className="text-gray-500 font-bold animate-pulse">A preparar o teu currículo...</p>
        </div>
      }>
        <ProfessionalCVWeb {...props} />
      </React.Suspense>
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:gap-10 w-full p-4 sm:p-6 lg:p-10">
      {/* Sidebar de Controle / Análise */}
      <div className="w-full xl:w-[420px] 2xl:w-[480px] flex flex-col gap-6">
        {/* Score Card Premium */}
        <Card className="bg-white dark:bg-slate-900 rounded-[48px] p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border-2 border-slate-100 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <CardTitle className="font-black text-slate-900 dark:text-white text-2xl tracking-tighter uppercase">Força do Perfil</CardTitle>
              <CardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">O que os recrutadores vão achar</CardDescription>
            </div>
            <span className="text-4xl font-black text-blue-600 tracking-tighter">{result.score}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden relative shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
              className="bg-blue-600 h-full rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            />
          </div>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-8 font-bold leading-relaxed relative z-10">
            O teu perfil está {result.score > 70 ? "extremamente forte" : "equilibrado"}. <br />
            <button 
              onClick={() => setShowTips(true)}
              className="text-blue-600 font-black uppercase tracking-widest text-[10px] mt-4 hover:underline flex items-center gap-2"
            >
              Vê como chegar aos 100%
            </button>
          </p>
        </Card>

        {/* Tabs Selector App-Style */}
        <div className="flex bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-[32px] border border-slate-200/50 dark:border-slate-800 shadow-lg relative overflow-hidden">
          {[
            { id: "cv", label: "Currículo", icon: FileText },
            { id: "letter", label: "Carta", icon: Mail },
            { id: "coach", label: "Kamba", icon: MessageSquare },
            { id: "edit", label: "Editar", icon: Edit3 }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex-1 py-4 rounded-[26px] text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] transition-colors duration-300 flex items-center justify-center gap-2.5 relative z-10 select-none"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-slate-950 dark:bg-white rounded-[26px] shadow-lg shadow-slate-950/20 dark:shadow-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={cn(
                  "relative z-20 flex items-center gap-2 transition-colors duration-300",
                  isActive 
                    ? "text-white dark:text-slate-950 font-black" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
                )}>
                  <tab.icon size={18} className={cn("transition-transform duration-300", isActive && "scale-110")} />
                  <span className="hidden md:inline">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Actions Group */}
        <div className="flex flex-col gap-4">
          <Button 
            onClick={handleDownload}
            disabled={isExporting}
            size="2xl"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-8 rounded-[32px] font-black text-xl flex items-center justify-center gap-4 transition-all active:scale-[0.98] border-none shadow-[0_24px_48px_-12px_rgba(37,99,235,0.4)] group"
          >
            {isExporting ? <Loader2 className="animate-spin" size={28} /> : (canDownload ? <Download size={28} className="group-hover:-translate-y-1 transition-transform" /> : <Lock size={28} className="group-hover:scale-110 transition-transform" />)}
            {isExporting ? "A Gerar PDF..." : (canDownload ? "Descarregar PDF" : "Desbloquear PDF Premium")}
          </Button>

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
        <Card className="bg-blue-600/5 dark:bg-blue-600/10 rounded-[48px] p-10 border-2 border-blue-600/10 relative overflow-hidden shadow-none">
          <div className="absolute top-6 right-8 text-blue-600/20">
             <Target size={48} />
          </div>
          <h4 className="font-black text-blue-900 dark:text-blue-400 mb-8 flex items-center gap-3 text-lg tracking-tighter uppercase">
            O que o recrutador vai ver
          </h4>
          
          <div className={cn("space-y-6 transition-all duration-700", !hasPaid && "blur-[12px] opacity-20 select-none scale-95")}>
            <div className="p-6 bg-white dark:bg-slate-900/50 rounded-3xl border border-blue-600/10 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3">Impressão em 6 Segundos</p>
              <p className="text-base font-bold text-slate-700 dark:text-slate-300 italic leading-relaxed">"{result.recruiterSimulation.sixSecondImpression}"</p>
            </div>
            
            <div className="space-y-4">
              {result.recruiterSimulation.highlights.map((tip, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                  <p className="text-sm text-blue-800 dark:text-blue-300 font-bold leading-relaxed tracking-tight">{tip}</p>
                </div>
              ))}
            </div>
          </div>
          
          {!hasPaid && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center backdrop-blur-[1px]">
               <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center shadow-2xl mb-8 text-blue-600">
                  <Lock size={36} />
               </div>
                <h4 className="font-black text-slate-900 dark:text-white mb-4 text-xl tracking-tighter uppercase leading-tight">Dicas VIP <br /> Bloqueadas</h4>
                <p className="text-xs font-bold text-slate-500 mb-8 max-w-[200px]">Descobre exatamente o que precisas de mudar para seres chamado para a entrevista.</p>
               <Button onClick={() => setShowPaymentModal(true)} size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/30">Desbloquear Premium</Button>
            </div>
          )}
        </Card>

        {/* Histórico de CVs (Só para Logged In) */}
        {user && savedCVs.length > 1 && (
          <Card className="bg-white dark:bg-slate-900 rounded-[40px] p-8 border-2 border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
            <h4 className="font-black text-slate-900 dark:text-white mb-6 text-sm tracking-widest uppercase">Teus Currículos</h4>
            <div className="space-y-3">
              {savedCVs.map((cv) => (
                <button
                  key={cv.id}
                  onClick={() => {
                    setAnswers(cv.answers);
                    setResult(cv.result);
                  }}
                  className={cn(
                    "w-full p-4 rounded-2xl flex items-center justify-between transition-all group",
                    // Comparação simples para destacar o ativo
                    result?.title === cv.result.title
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} />
                    <span className="text-xs font-bold truncate max-w-[180px]">{cv.title}</span>
                  </div>
                  <ChevronRight size={16} className="opacity-40 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </Card>
        )}
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
             {user && (
               <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 mr-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Sincronizado</span>
               </div>
             )}
             <div className={cn("w-2 h-2 rounded-full animate-pulse", activeTab === "cv" ? "bg-blue-600" : "bg-slate-400")} />
             <span className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
               {activeTab === "cv" && "Modo Visualização Final"}
               {activeTab === "letter" && "Branding Pessoal · Carta"}
               {activeTab === "coach" && "Kamba de Carreira"}
               {activeTab === "edit" && "Editar Informação"}
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
                className="mx-auto bg-white shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)] w-full max-w-[850px] min-h-[800px] p-10 sm:p-16 relative"
              >
                {result.coverLetter ? (
                  <React.Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" size={32} /></div>}>
                    <CoverLetterWeb answers={answers} result={result} />
                  </React.Suspense>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[500px] gap-6 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
                      <Lock size={32} />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight">Carta de Apresentação</h4>
                    <p className="text-slate-500 max-w-xs font-medium leading-relaxed">Para gerar a carta, preenche a descrição da vaga no assistente ou volta ao wizard e adiciona uma vaga.</p>
                    <button onClick={() => setShowPaymentModal(true)} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black tracking-wide hover:bg-slate-700 transition-all shadow-xl">Desbloquear Premium</button>
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

            {activeTab === "edit" && (
              <motion.div
                key="edit-tab"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-3xl mx-auto"
              >
                <Card className="bg-white dark:bg-slate-900 rounded-[48px] p-8 sm:p-12 border-2 border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col gap-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Editar Dados do CV</h3>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Atualiza a informação e deixa o Kamba polir o teu CV</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome Completo */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                      <input 
                        type="text" 
                        value={answers.name || ""} 
                        onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                        className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                    {/* Vaga Desejada */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Vaga Desejada / Cargo</label>
                      <input 
                        type="text" 
                        value={answers.jobDescription || ""} 
                        onChange={(e) => setAnswers({ ...answers, jobDescription: e.target.value })}
                        className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all"
                        placeholder="Ex: Contabilista Júnior, Assistente de Vendas"
                      />
                    </div>
                    {/* Telemóvel */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Contacto / Telemóvel</label>
                      <input 
                        type="text" 
                        value={answers.phone || ""} 
                        onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
                        className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                    {/* E-mail */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">E-mail</label>
                      <input 
                        type="text" 
                        value={answers.email || ""} 
                        onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                        className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                    {/* Localização */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Localização (ex: Luanda, Talatona)</label>
                      <input 
                        type="text" 
                        value={answers.location || ""} 
                        onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
                        className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                    {/* LinkedIn */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">LinkedIn / Link Profissional</label>
                      <input 
                        type="text" 
                        value={answers.linkedin || ""} 
                        onChange={(e) => setAnswers({ ...answers, linkedin: e.target.value })}
                        className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all"
                        placeholder="link para o teu perfil"
                      />
                    </div>
                  </div>
                  
                  {/* Experiência Principal */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Experiência Principal (Trabalho, Projetos, etc.)</label>
                    <textarea 
                      value={answers.activity || ""} 
                      onChange={(e) => setAnswers({ ...answers, activity: e.target.value })}
                      rows={4}
                      className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all resize-none"
                      placeholder="Descreve o teu trabalho ou responsabilidades principais..."
                    />
                  </div>

                  {/* Formação Académica */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Formação Académica / Cursos</label>
                    <textarea 
                      value={answers.education || ""} 
                      onChange={(e) => setAnswers({ ...answers, education: e.target.value })}
                      rows={3}
                      className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all resize-none"
                      placeholder="Ex: Licenciatura em Contabilidade - UAN (2020 - 2024)..."
                    />
                  </div>

                  {/* Competências Técnicas */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Competências Técnicas / Ferramentas</label>
                    <input 
                      type="text" 
                      value={answers.hardSkills || ""} 
                      onChange={(e) => setAnswers({ ...answers, hardSkills: e.target.value })}
                      className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700/50 focus:border-blue-600 rounded-2xl p-4 text-sm font-bold outline-none transition-all"
                      placeholder="Ex: Excel Avançado, Gestão de Stocks, Vendas Diretas"
                    />
                  </div>

                  <div className="mt-4">
                    <Button 
                      onClick={() => generateCV()}
                      disabled={isGenerating}
                      size="2xl"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-[28px] font-black text-lg flex items-center justify-center gap-4 transition-all active:scale-[0.98] border-none shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] group"
                    >
                      {isGenerating ? <Loader2 className="animate-spin" size={24} /> : null}
                      {isGenerating ? "A Atualizar..." : "Atualizar Currículo"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Modal de Dicas de Perfil */}
      <AnimatePresence>
        {showTips && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTips(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[40px] p-10 relative z-10 shadow-2xl border-2 border-slate-100 dark:border-slate-800"
            >
              <button 
                onClick={() => setShowTips(false)}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white">
                  <Target size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Análise de Otimização</h3>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Recomendações Estratégicas</p>
                </div>
              </div>

              <div className="space-y-6">
                {(result.scoreFeedback?.improvements || []).map((tip: any, i) => {
                  const title = typeof tip === "string" ? tip : (tip?.point || tip?.title || `Melhoria ${i + 1}`);
                  const advice = typeof tip === "string" ? "Segue este conselho prático para subires o teu score." : (tip?.actionableAdvice || tip?.explanation || "");
                  return (
                    <div key={i} className="flex gap-5 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 group hover:border-blue-600/20 transition-all">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-600/20 flex items-center justify-center mt-1 shrink-0 group-hover:border-blue-600/50 transition-colors">
                         <ChevronRight size={14} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">{title}</h4>
                        {advice && <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{advice}</p>}
                      </div>
                    </div>
                  );
                })}
                
                {(!result.scoreFeedback?.improvements || result.scoreFeedback.improvements.length === 0) && (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Perfil de Topo!</h4>
                    <p className="text-slate-500 font-medium">Já tens um currículo de nível mundial.</p>
                  </div>
                )}
              </div>

              <Button 
                onClick={() => setShowTips(false)}
                className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-sm mt-10"
              >
                Continuar a Editar
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Sucesso de Download */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[40px] p-8 sm:p-10 relative z-10 shadow-2xl border-2 border-slate-100 dark:border-slate-800"
            >
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Documento Exportado</h3>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Pronto para Envio</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                    O seu currículo foi estruturado e exportado em formato PDF com sucesso. O documento está otimizado para sistemas de recrutamento (ATS) e pronto a ser enviado aos recrutadores.
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-black mt-4">
                    Votos de um excelente processo de seleção.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Gostaste do resultado? Dá-nos uma força!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        const waNumber = "244929766995";
                        const text = "Olá CV Fácil! Acabei de exportar o meu currículo. Gostei imenso da plataforma! Deixo aqui o meu feedback/sugestão de melhoria: ";
                        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/15"
                    >
                      <MessageSquare size={16} />
                      Deixar Feedback
                    </button>
                    
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'CV Fácil',
                            text: 'Cria o teu currículo profissional de nível mundial em minutos com o CV Fácil! 🚀',
                            url: window.location.origin
                          }).catch(console.error);
                        } else {
                          navigator.clipboard.writeText(window.location.origin);
                          alert("Link do CV Fácil copiado para partilhar com os teus amigos!");
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-wider transition-all hover:bg-slate-50 dark:hover:bg-slate-750"
                    >
                      <Share2 size={16} />
                      Partilhar com Amigos
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-2xl font-black text-xs uppercase tracking-widest mt-8"
              >
                Voltar ao Painel
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
