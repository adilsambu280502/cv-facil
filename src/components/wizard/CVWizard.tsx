import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ChevronLeft, 
  FileText, 
  Loader2, 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  Sparkles,
  X
} from "lucide-react";
import { useCV } from "../../context/CVContext";
import { cn } from "../../lib/utils";
import { TemplateVisual } from "../TemplateVisual";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { slideUp, slideInRight, fadeIn, staggerContainer, transitionSm } from "../../lib/motion";

export const CVWizard: React.FC = () => {
  const { 
    view,
    setView,
    step, 
    setStep, 
    answers, 
    setAnswers, 
    isGenerating, 
    generateCV,
    error 
  } = useCV();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleNext = () => {
    if (step === 14) {
      generateCV();
    } else {
      setStep(step + 1);
    }
  };
  const handleBack = () => {
    if (step === 1) {
      setView('intro');
    } else {
      setStep(Math.max(1, step - 1));
    }
  };

  const handleClose = () => setView('intro');

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="q1"
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col h-full w-full pt-8 sm:pt-16 pb-32"
          >
            <div className="mb-16">
               <div className="w-20 h-20 bg-blue-600/10 text-blue-600 rounded-[32px] flex items-center justify-center mb-10 shadow-xl shadow-blue-600/5">
                 <Sparkles size={36} />
               </div>
               <h2 className="text-[32px] sm:text-[60px] font-black leading-[1.1] sm:leading-[0.9] tracking-[-0.05em] text-slate-900 dark:text-white mb-6">
                 Como é que as empresas <br /> podem entrar em contacto?
               </h2>
               <p className="text-lg sm:text-xl text-slate-500 font-bold tracking-tight">Vamos começar pelos teus dados básicos para garantir que o teu perfil seja facilmente encontrado.</p>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8 mb-16 w-full">
              <div className="space-y-3">
                <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">Teu Nome Completo</label>
                <Input
                  autoFocus
                  placeholder="Ex: João Manuel dos Santos"
                  className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-lg sm:text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl focus:scale-[1.01]"
                  value={answers.name}
                  onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">E-mail Profissional</label>
                <Input
                  type="email"
                  placeholder="Ex: joao.santos@email.com"
                  className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl focus:scale-[1.01]"
                  value={answers.email || ''}
                  onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3 relative">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">Teu Telefone</label>
                  <Input
                    type="tel"
                    placeholder="+244 9..."
                    className={cn(
                      "h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 focus:border-blue-600 rounded-[32px] px-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm",
                      answers.phone && !/^\+244\s9\d{8}$/.test(answers.phone) ? "border-red-300 dark:border-red-900" : "border-slate-100 dark:border-slate-800"
                    )}
                    value={answers.phone || ''}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (!val.startsWith('+244 ')) val = '+244 ' + val.replace('+244 ', '');
                      setAnswers({ ...answers, phone: val });
                    }}
                  />
                  {answers.phone && !/^\+244\s9\d{8}$/.test(answers.phone) && (
                    <span className="text-[10px] text-red-500 font-black absolute -bottom-6 left-6 uppercase tracking-widest">Usa o formato: +244 9XXXXXXXX</span>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">Onde Moras?</label>
                  <Input
                    type="text"
                    placeholder="Ex: Luanda, Talatona"
                    className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl focus:scale-[1.01]"
                    value={answers.location || ''}
                    onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-6">
               <Button
                size="2xl"
                onClick={handleNext}
                disabled={!answers.name.trim() || !answers.email.trim() || !/^\+244\s9\d{8}$/.test(answers.phone || '')}
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] py-8 font-black text-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.05] active:scale-[0.95] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] disabled:opacity-30 disabled:hover:scale-100 group border-none"
              >
                Próximo Passo
                <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="q2"
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col h-full max-w-2xl mx-auto w-full pt-8 sm:pt-20 pb-32"
          >
            <div className="mb-12">
               <h2 className="text-[32px] sm:text-[44px] font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-white">
                 Tens perfis profissionais <br /> nas redes sociais?
               </h2>
               <p className="text-slate-500 font-bold mt-4">Isto ajuda as empresas a conhecerem melhor o teu trabalho.</p>
            </div>

            <div className="flex flex-col gap-5 mb-12 w-full">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">LinkedIn</label>
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/perfil"
                  className={cn(
                    "h-16 bg-white dark:bg-slate-900 border-2 focus:border-blue-600 rounded-3xl px-6 text-lg font-bold text-slate-900 dark:text-white outline-none transition-all shadow-sm",
                    answers.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(answers.linkedin) ? "border-red-300 dark:border-red-900" : "border-slate-100 dark:border-slate-800"
                  )}
                  value={answers.linkedin || ''}
                  onChange={(e) => setAnswers({ ...answers, linkedin: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">GitHub (Opcional)</label>
                <Input
                  type="url"
                  placeholder="https://github.com/usuario"
                  className={cn(
                    "h-16 bg-white dark:bg-slate-900 border-2 focus:border-blue-600 rounded-3xl px-6 text-lg font-bold text-slate-900 dark:text-white outline-none transition-all shadow-sm",
                    answers.github && !/^https?:\/\/(www\.)?github\.com\/.*$/.test(answers.github) ? "border-red-300 dark:border-red-900" : "border-slate-100 dark:border-slate-800"
                  )}
                  value={answers.github || ''}
                  onChange={(e) => setAnswers({ ...answers, github: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Facebook</label>
                  <Input
                    type="url"
                    placeholder="Link (Opcional)"
                    className="h-16 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-3xl px-6 text-lg font-bold text-slate-900 dark:text-white outline-none transition-all shadow-sm"
                    value={answers.facebook || ''}
                    onChange={(e) => setAnswers({ ...answers, facebook: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Instagram</label>
                  <Input
                    type="url"
                    placeholder="Link (Opcional)"
                    className="h-16 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-3xl px-6 text-lg font-bold text-slate-900 dark:text-white outline-none transition-all shadow-sm"
                    value={answers.instagram || ''}
                    onChange={(e) => setAnswers({ ...answers, instagram: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-4">
               <Button 
                variant="outline"
                size="xl"
                onClick={handleBack} 
                className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-8 py-6 rounded-3xl font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all"
               >
                 <ChevronLeft size={24} />
               </Button>
               <Button 
                size="xl"
                onClick={handleNext} 
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl py-6 font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl border-none"
               >
                 Continuar
               </Button>
            </div>
          </motion.div>
        );

      case 12:
        return (
          <motion.div
            key="q12"
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col h-full max-w-2xl mx-auto w-full pt-8 sm:pt-20 pb-32"
          >
            <div className="text-center mb-12">
               <h2 className="text-[32px] sm:text-[44px] font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                 Queres incluir uma <br /> fotografia profissional?
               </h2>
            </div>

            <div className="flex flex-col items-center gap-10 mb-auto">
               <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-[48px] border-4 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden">
                    {answers.photo ? (
                      <img src={answers.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Camera className="text-slate-300 dark:text-slate-600 mb-4" size={64} />
                        <span className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Nenhuma Foto</span>
                      </>
                    )}
                  </div>
                  <label className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600 text-white rounded-[24px] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-2xl">
                    <Upload size={28} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setAnswers({ ...answers, photo: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
               </div>
               <p className="text-lg text-slate-500 font-bold max-w-xs text-center">Uma foto profissional aumenta em 70% as chances de seres chamado.</p>
            </div>

            <div className="mt-auto flex gap-4">
               <Button 
                variant="outline"
                size="xl"
                onClick={handleBack} 
                className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-8 py-6 rounded-3xl font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all shadow-lg active:scale-90"
               >
                 <ChevronLeft size={24} />
               </Button>
               <Button 
                size="xl"
                onClick={handleNext} 
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl py-6 font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl border-none"
               >
                 {answers.photo ? "Continuar" : "Vou saltar este passo"}
               </Button>
            </div>
          </motion.div>
        );

      case 14:
        return (
          <motion.div
            key="q14"
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col h-full max-w-2xl mx-auto w-full pt-8 sm:pt-20 pb-32"
          >
            <h2 className="text-[32px] sm:text-[44px] font-black mb-12 tracking-tighter text-slate-900 dark:text-white">
              Personaliza o teu design
            </h2>
            
            <div className="space-y-10 mb-12">
              <div className="space-y-4">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Modelo de Currículo</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                   {["minimalist", "modern", "executive", "creative", "technical"].map(t => (
                     <button 
                      key={t}
                      onClick={() => setAnswers({...answers, template: t as any})}
                      className={cn(
                        "group relative flex flex-col items-center gap-4 transition-all",
                        answers.template === t ? "scale-105" : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                      )}
                     >
                       <TemplateVisual type={t as any} active={answers.template === t} className="w-full" />
                       <span className={cn(
                         "text-[10px] font-black uppercase tracking-widest",
                         answers.template === t ? "text-blue-600" : "text-slate-400"
                       )}>
                         {t}
                       </span>
                     </button>
                   ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Cor Principal</p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: 'Azul', hex: '#2563eb' },
                    { name: 'Verde', hex: '#059669' },
                    { name: 'Roxo', hex: '#7c3aed' },
                    { name: 'Preto', hex: '#111827' },
                    { name: 'Laranja', hex: '#ea580c' }
                  ].map(c => (
                    <button
                      key={c.hex}
                      onClick={() => setAnswers({...answers, color: c.hex})}
                      className={cn(
                        "w-12 h-12 rounded-[18px] transition-all border-4 shadow-lg",
                        answers.color === c.hex ? "border-slate-900 dark:border-white scale-110 shadow-blue-500/20" : "border-transparent"
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Tipo de Letra</p>
                <div className="grid grid-cols-2 gap-4">
                   {["Inter", "Roboto", "Outfit", "Playfair Display"].map(f => (
                     <button 
                      key={f}
                      onClick={() => setAnswers({...answers, font: f})}
                      className={cn(
                        "p-5 border-2 rounded-2xl font-bold transition-all text-lg",
                        answers.font === f ? "border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" : "border-slate-100 dark:border-slate-800 text-slate-400"
                      )}
                      style={{ fontFamily: f }}
                     >
                       {f}
                     </button>
                   ))}
                </div>
              </div>
            </div>
            
            {error && (
              <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/10 border-2 border-red-100 dark:border-red-900/20 rounded-[24px] flex items-start gap-4 text-red-600 dark:text-red-400 text-base font-bold">
                <AlertCircle className="shrink-0 mt-0.5" size={20} />
                <p>{error}</p>
              </div>
            )}

            <div className="mt-auto flex gap-4">
              <Button 
                variant="outline"
                size="xl"
                onClick={handleBack} 
                className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-8 py-6 rounded-3xl font-black text-slate-600 dark:text-slate-400"
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                size="xl"
                onClick={generateCV}
                disabled={isGenerating}
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl py-6 font-black text-xl flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50 border-none"
              >
                {isGenerating ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                Finalizar e Analisar
              </Button>
            </div>
          </motion.div>
        );

      case 15:
        return (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto h-full py-32"
          >
            <div className="relative mb-20 w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-600/10 rounded-[64px] animate-[ping_3s_infinite]"></div>
              <div className="absolute inset-0 bg-blue-600/5 rounded-[64px] animate-[pulse_2s_infinite] scale-125"></div>
              <div className="w-32 h-32 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[40px] flex items-center justify-center shadow-[0_48px_96px_-12px_rgba(0,0,0,0.4)] z-10">
                <FileText size={48} className="animate-bounce" />
              </div>
            </div>
            <h2 className="text-[44px] sm:text-[64px] font-black mb-8 text-slate-900 dark:text-white tracking-[-0.05em] leading-[0.9]">Estamos a preparar <br /> <span className="text-blue-600">o teu novo futuro.</span></h2>
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-bold tracking-tight max-w-lg leading-relaxed">A nossa inteligência está a organizar as tuas experiências para criar um impacto imediato perante qualquer recrutador.</p>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex-1 flex flex-col h-full w-full pt-8 sm:pt-16 pb-32"
          >
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 mb-16 overflow-hidden p-0.5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-blue-600 h-full rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              />
            </div>

            <div className="mb-12">
               <h2 className="text-[36px] sm:text-[48px] font-black leading-[1] tracking-[-0.05em] text-slate-900 dark:text-white">
                {step === 2 && "Tens perfis profissionais nas redes sociais?"}
                {step === 3 && "O que tens andado a fazer ultimamente? Partilha a tua história connosco."}
                {step === 4 && "Como costumas colaborar em equipa? Conta-nos a tua experiência."}
                {step === 5 && "Lembras-te de algum desafio importante que tenhas resolvido?"}
                {step === 6 && "Como organizas as tuas tarefas para manter a produtividade?"}
                {step === 7 && "Já tiveste a oportunidade de liderar algum projeto ou grupo?"}
                {step === 8 && "Qual é o teu percurso académico e o que decidiste estudar?"}
                {step === 9 && "Dominas outras línguas além do Português?"}
                {step === 10 && "Quais são as ferramentas ou programas que dominas com confiança? (Ex: Excel, Word...)"}
                {step === 11 && "Conheces alguma linguagem de programação? (Passo opcional)"}
                {step === 12 && "Gostarias de incluir uma fotografia profissional no teu perfil?"}
                {step === 13 && "Tens alguma vaga específica em mente para este currículo?"}
                {step === 14 && "Personaliza agora o aspeto final do teu currículo profissional"}
              </h2>
            </div>

            <div className="flex-1 min-h-[400px] flex flex-col">
              {step === 2 && (
                <div className="grid gap-6">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">LinkedIn (Recomendado)</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/perfil"
                      className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] p-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
                      value={answers.linkedin || ''}
                      onChange={(e) => setAnswers({ ...answers, linkedin: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">GitHub</label>
                      <input
                        type="url"
                        placeholder="Link GitHub"
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] p-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
                        value={answers.github || ''}
                        onChange={(e) => setAnswers({ ...answers, github: e.target.value })}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">Website / Portfolio</label>
                      <input
                        type="url"
                        placeholder="Teu Site"
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] p-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
                        value={answers.website || ''}
                        onChange={(e) => setAnswers({ ...answers, website: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 12 && (
                <div className="flex flex-col items-center justify-center gap-12 py-10">
                   <div className="relative group">
                      <div className="absolute inset-0 bg-blue-600/10 rounded-[64px] blur-2xl group-hover:bg-blue-600/20 transition-all"></div>
                      <div className="relative w-64 h-64 bg-slate-100 dark:bg-slate-800 rounded-[64px] border-4 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
                        {answers.photo ? (
                          <img src={answers.photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center p-8">
                            <Camera className="text-slate-300 dark:text-slate-600 mb-6 mx-auto" size={80} />
                            <span className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Sorri para a Foto</span>
                          </div>
                        )}
                      </div>
                      <label className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-600 text-white rounded-[32px] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-blue-600/40">
                        <Upload size={36} />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setAnswers({ ...answers, photo: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                   </div>
                   <p className="text-xl text-slate-500 dark:text-slate-400 font-bold max-w-sm text-center leading-relaxed">Uma foto profissional aumenta as tuas chances de seres chamado para entrevista em <span className="text-blue-600">70%</span>.</p>
                </div>
              )}

              {step === 14 && (
                <div className="space-y-12">
                  <div className="space-y-6">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-6">Escolhe o teu Estilo</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4">
                      {['minimalist', 'modern', 'executive', 'creative', 'technical'].map(t => (
                        <button
                          key={t}
                          onClick={() => setAnswers({...answers, template: t as any})}
                          className="flex flex-col gap-3 group"
                        >
                          <TemplateVisual 
                            type={t as any} 
                            active={answers.template === t}
                            className="cursor-pointer"
                          />
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest transition-colors",
                            answers.template === t ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                          )}>
                            {t === 'modern' ? 'O Moderno' : 
                             t === 'executive' ? 'O Executivo' : 
                             t === 'creative' ? 'O Criativo' : 
                             t === 'minimal' ? 'Minimalista' : 'Técnico'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-6">Cores de Impacto</p>
                    <div className="flex flex-wrap gap-6 px-4">
                      {[
                        { name: 'Corporativo', hex: '#2563eb' },
                        { name: 'Moderno', hex: '#059669' },
                        { name: 'Criativo', hex: '#7c3aed' },
                        { name: 'Sóbrio', hex: '#111827' },
                        { name: 'Energético', hex: '#ea580c' }
                      ].map(c => (
                        <button
                          key={c.hex}
                          onClick={() => setAnswers({...answers, color: c.hex})}
                          className={cn(
                            "w-16 h-16 rounded-[24px] transition-all border-4 shadow-xl flex items-center justify-center group",
                            answers.color === c.hex ? "border-slate-900 dark:border-white scale-125 z-10" : "border-transparent"
                          )}
                          style={{ backgroundColor: c.hex }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 w-full h-full rounded-[20px]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step < 12 && step !== 1 && step !== 2 && (
                <Textarea
                  autoFocus
                  placeholder="Escreve aqui de forma natural, como se estivesses numa conversa com um amigo..."
                  className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[40px] p-10 text-xl font-black text-slate-900 dark:text-white outline-none transition-all resize-none shadow-sm flex-1 focus:shadow-2xl focus:scale-[1.01] min-h-[300px]"
                  value={
                    step === 3 ? answers.activity :
                    step === 4 ? answers.teamwork :
                    step === 5 ? answers.problemSolving :
                    step === 6 ? answers.timeManagement :
                    step === 7 ? answers.leadership :
                    step === 8 ? answers.education :
                    step === 9 ? answers.languages :
                    step === 10 ? answers.hardSkills :
                    answers.programmingLanguages || ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (step === 3) setAnswers({ ...answers, activity: val });
                    if (step === 4) setAnswers({ ...answers, teamwork: val });
                    if (step === 5) setAnswers({ ...answers, problemSolving: val });
                    if (step === 6) setAnswers({ ...answers, timeManagement: val });
                    if (step === 7) setAnswers({ ...answers, leadership: val });
                    if (step === 8) setAnswers({ ...answers, education: val });
                    if (step === 9) setAnswers({ ...answers, languages: val });
                    if (step === 10) setAnswers({ ...answers, hardSkills: val });
                    if (step === 11) setAnswers({ ...answers, programmingLanguages: val });
                  }}
                />
              )}
              {step === 13 && (
                <textarea
                  autoFocus
                  placeholder="Se tiveres o link ou o texto da vaga, cola aqui. Se não, descreve o tipo de empresa que procuras..."
                  className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[40px] p-10 text-xl font-black text-slate-900 dark:text-white outline-none transition-all resize-none shadow-sm flex-1 focus:shadow-2xl focus:scale-[1.01]"
                  value={answers.jobDescription || ""}
                  onChange={(e) => setAnswers({ ...answers, jobDescription: e.target.value })}
                />
              )}
            </div>

            <div className="mt-12 flex gap-6">
              <Button 
                variant="outline"
                size="2xl"
                onClick={handleBack} 
                className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-10 py-8 rounded-[32px] font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all shadow-lg active:scale-90"
              >
                <ChevronLeft size={32} />
              </Button>
              <Button 
                size="2xl"
                onClick={handleNext} 
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] py-8 font-black text-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] hover:scale-[1.05] active:scale-[0.95] transition-all group flex items-center justify-center gap-4 border-none"
              >
                Continuar
                <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative">
      {/* Botão de Fecho — fixed, z-index abaixo do menu 'MAIS' */}
      <button
        onClick={handleClose}
        className="fixed top-5 right-5 lg:top-6 lg:right-8 z-[110] w-12 h-12 lg:w-14 lg:h-14 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 transition-all shadow-xl active:scale-90"
        title="Fechar"
      >
        <X size={24} />
      </button>

      {/* Conteúdo do Wizard — desktop wide, mobile compact */}
      <div className="flex-1 flex flex-col px-6 sm:px-8 lg:px-12 py-10 sm:py-16 lg:py-20">
        <div className="max-w-2xl lg:max-w-3xl mx-auto w-full flex-1 flex flex-col">
          {/* Unified Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 mb-16 overflow-hidden relative shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 15) * 100}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="bg-blue-600 h-full rounded-full relative shadow-[0_0_20px_rgba(37,99,235,0.6)]"
            >
              <div className="absolute top-0 right-0 w-8 h-full bg-white/20 skew-x-[30deg] translate-x-1" />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
