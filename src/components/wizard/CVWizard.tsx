import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ChevronLeft, 
  FileText, 
  Loader2, 
  Camera, 
  Upload, 
  AlertCircle,
  BriefcaseBusiness,
  X
} from "lucide-react";
import { useCV } from "../../context/CVContext";
import { cn } from "../../lib/utils";
import { Logo } from "../ui/Logo";
import { TemplateVisual } from "../TemplateVisual";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { slideUp, fadeIn } from "../../lib/motion";

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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center h-14">
                <Logo size={48} />
              </div>
              <h2 className="text-[32px] sm:text-[56px] font-black leading-[1.1] sm:leading-[0.9] tracking-[-0.05em] text-slate-900 dark:text-white">
                Onde te podem <br /> encontrar?
              </h2>
              <p className="text-lg sm:text-xl text-slate-500 font-bold tracking-tight">Preenche apenas o essencial para as empresas falarem contigo.</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">Teu Nome Completo</label>
                <Input
                  autoFocus
                  placeholder="Ex: João Manuel dos Santos"
                  className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-lg sm:text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
                  value={answers.name}
                  onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">E-mail Profissional</label>
                <Input
                  type="email"
                  placeholder="Ex: joao.santos@email.com"
                  className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
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
                    className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
                    value={answers.location || ''}
                    onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-[32px] sm:text-[48px] font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-white">
                Tens alguma rede social <br /> que queiras mostrar aos recrutadores?
              </h2>
              <p className="text-xl text-slate-500 font-bold tracking-tight leading-relaxed">Isto ajuda a mostrar o teu valor logo de cara.</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">LinkedIn (Recomendado)</label>
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/perfil"
                  className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
                  value={answers.linkedin || ''}
                  onChange={(e) => setAnswers({ ...answers, linkedin: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">GitHub</label>
                  <Input
                    type="url"
                    placeholder="Link GitHub"
                    className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
                    value={answers.github || ''}
                    onChange={(e) => setAnswers({ ...answers, github: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 px-6">Website / Portfolio</label>
                  <Input
                    type="url"
                    placeholder="Teu Site"
                    className="h-20 sm:h-24 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[32px] px-8 text-xl font-black text-slate-900 dark:text-white outline-none transition-all shadow-sm focus:shadow-2xl"
                    value={answers.website || ''}
                    onChange={(e) => setAnswers({ ...answers, website: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 12:
        return (
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
        );

      case 14:
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-[32px] sm:text-[48px] font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-white">
                Personaliza o teu design
              </h2>
              <p className="text-xl text-slate-500 font-bold tracking-tight">Estamos quase lá. Escolhe o estilo que melhor reflete a tua personalidade profissional.</p>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] px-6">Modelo de Currículo</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
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
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] px-6">Cor Principal</p>
                <div className="flex flex-wrap gap-6 px-4">
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
                        "w-14 h-14 rounded-[20px] transition-all border-4 shadow-lg",
                        answers.color === c.hex ? "border-slate-900 dark:border-white scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="relative mb-20 w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-600/10 rounded-[64px] animate-[ping_3s_infinite]"></div>
              <div className="w-32 h-32 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[40px] flex items-center justify-center shadow-2xl z-10">
                <FileText size={48} className="animate-bounce" />
              </div>
            </div>
            <h2 className="text-[44px] sm:text-[64px] font-black mb-8 text-slate-900 dark:text-white tracking-[-0.05em] leading-[0.9]">Estamos a preparar <br /> <span className="text-blue-600">o teu novo currículo.</span></h2>
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-bold tracking-tight max-w-lg leading-relaxed">O teu pedido é uma ordem! O Kamba está a organizar a tua informação e a montar o currículo perfeito.</p>
          </div>
        );

      default:
        // Passos de Texto Livre (3-11, 13)
        const stepTitles: Record<number, string> = {
          3: "O que tens andado a fazer? Conta-nos a tua experiência.",
          4: "Como é trabalhar contigo em equipa?",
          5: "Qual foi o teu maior desafio resolvido até hoje?",
          6: "Como organizas as tuas tarefas no dia a dia?",
          7: "Já lideraste algum projeto ou equipa?",
          8: "Qual é a tua formação académica?",
          9: "Que línguas falas além do Português?",
          10: "Quais ferramentas dominas? (Excel, Word, etc.)",
          11: "Programas em alguma linguagem? (Opcional)",
          13: "Qual é a vaga dos teus sonhos?",
        };

        const fieldMap: Record<number, keyof typeof answers> = {
          3: 'activity',
          4: 'teamwork',
          5: 'problemSolving',
          6: 'timeManagement',
          7: 'leadership',
          8: 'education',
          9: 'languages',
          10: 'hardSkills',
          11: 'programmingLanguages',
          13: 'jobDescription'
        };

        return (
          <div className="space-y-12">
            <h2 className="text-[32px] sm:text-[48px] font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-white">
              {stepTitles[step]}
            </h2>
            <Textarea
              autoFocus
              placeholder="Escreve aqui de forma natural, como se estivesses numa conversa com um amigo..."
              className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 rounded-[40px] p-10 text-xl font-black text-slate-900 dark:text-white outline-none transition-all resize-none shadow-sm min-h-[350px] focus:shadow-2xl"
              value={(answers[fieldMap[step]] as string) || ""}
              onChange={(e) => setAnswers({ ...answers, [fieldMap[step]]: e.target.value })}
            />
          </div>
        );
    }
  };

  const isStepValid = () => {
    if (step === 1) return answers.name.trim() && answers.email.trim() && /^\+244\s9\d{8}$/.test(answers.phone || '');
    return true;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative overflow-x-hidden">
      {/* Botão de Fecho */}
      <button
        onClick={handleClose}
        className="fixed top-5 right-5 z-[110] w-12 h-12 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all shadow-xl active:scale-90"
      >
        <X size={24} />
      </button>

      <div className="flex-1 flex flex-col px-6 sm:px-12 py-10 sm:py-20 max-w-4xl mx-auto w-full">
        {/* Progress Bar Única */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 mb-16 overflow-hidden relative shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 15) * 100}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="bg-blue-600 h-full rounded-full relative shadow-[0_0_20px_rgba(37,99,235,0.6)]"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${step}`}
              variants={slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col"
            >
              {renderStepContent()}

              {error && (
                <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/10 border-2 border-red-100 rounded-[24px] flex items-start gap-4 text-red-600 font-bold">
                  <AlertCircle className="shrink-0 mt-0.5" size={20} />
                  <p>{error}</p>
                </div>
              )}

              {/* Botões de Navegação Unificados */}
              {step !== 15 && (
                <div className="mt-12 flex gap-6 pb-20">
                  <Button 
                    variant="outline"
                    size="2xl"
                    onClick={handleBack} 
                    className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-10 py-8 rounded-[32px] font-black text-slate-600 dark:text-slate-400 shadow-lg active:scale-90"
                  >
                    <ChevronLeft size={32} />
                  </Button>
                  <Button 
                    size="2xl"
                    onClick={handleNext}
                    disabled={!isStepValid() || isGenerating}
                    className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] py-8 font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 border-none disabled:opacity-30"
                  >
                    {isGenerating ? (
                      <Loader2 className="animate-spin" size={32} />
                    ) : (
                      <>
                        {step === 14 ? "Finalizar e Analisar" : "Continuar"}
                        <ArrowRight size={32} />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
