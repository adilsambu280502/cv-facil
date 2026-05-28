import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ShieldCheck, Target, Users, BookOpen, Star } from "lucide-react";
import { useCV } from "../../context/CVContext";
import { Button } from "../ui/button";
import { slideUp, staggerContainer, pageTransition } from "../../lib/motion";

export const AboutView: React.FC = () => {
  const { setView } = useCV();

  const values = [
    {
      icon: ShieldCheck,
      title: "Rigor Técnico",
      desc: "Todas as nossas estruturas de dados e layouts de currículo são desenvolvidos seguindo padrões estritos de leitura automática (ATS-Friendly).",
    },
    {
      icon: Users,
      title: "Identidade Humana",
      desc: "Acreditamos que o teu currículo deve refletir a tua verdadeira essência. A nossa tecnologia atua sob o teu controlo, sem automatismos robóticos.",
    },
    {
      icon: Target,
      title: "Impacto Social",
      desc: "Nascemos com o firme compromisso de reduzir a taxa de desemprego e a fricção no mercado de trabalho em Angola, democratizando o acesso a currículos de excelência.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-white dark:bg-slate-950"
    >
      {/* -- PAGE HEADER -- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 pt-10 lg:pt-16 pb-12 lg:pb-20">
        {/* Back button - mobile only */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setView("intro")}
          className="lg:hidden flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-black uppercase tracking-widest text-[10px] mb-8 p-0 h-auto hover:bg-transparent"
        >
          <ArrowLeft size={16} />
          Início
        </Button>

        {/* Title Row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12 mb-16">
          <motion.div variants={slideUp} initial="initial" animate="animate" className="flex-1 text-center lg:text-left">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-4 opacity-80">
              Sobre Nós & Manifesto
            </p>
            <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-slate-900 dark:text-white tracking-[-0.05em] leading-[0.9] mb-6">
              A ponte definitiva para o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">teu próximo passo.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-4xl mx-auto lg:mx-0">
              O CV Fácil não é apenas uma ferramenta digital. Somos um ecossistema de aceleração de carreira criado orgulhosamente para impulsionar a empregabilidade dos profissionais em Angola.
            </p>
          </motion.div>
        </div>
      </div>

      {/* -- O QUE É E CONCEITO -- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 mb-16 lg:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              <BookOpen size={14} />
              O Conceito
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              O que é o CV Fácil?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
              Criado com o objetivo de aproximar candidatos e recrutadores, o CV Fácil estruturou uma arquitetura visual e técnica de excelência. Nós eliminamos a fricção gráfica: tu concentras-te na tua história profissional, e o nosso sistema garante o layout e os dados que o mercado de trabalho moderno exige.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
              Em vez de usares modelos genéricos ou mal desenhados que os sistemas automáticos (ATS) das grandes empresas descartam de imediato, a nossa plataforma gera documentos limpos, estruturados e com tipografia refinada.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[40px] p-8 lg:p-12 space-y-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">A Nossa Missão</h3>
              <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                Dar a cada cidadão angolano as ferramentas e o conhecimento necessários para apresentar as suas qualificações profissionais com a máxima dignidade, elegância e impacto competitivo.
              </p>
            </div>

            <div className="border-t-2 border-slate-100 dark:border-slate-800/80 my-6" />

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <Star size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">A Nossa Visão</h3>
              <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                Ser a plataforma líder de aceleração profissional e geração de valor de carreira em Angola, reconhecida pela excelência em design e impacto real na vida dos utilizadores.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* -- NOSSOS VALORES -- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 pb-16 lg:pb-24">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Os Nossos Valores
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
            Os pilares éticos e técnicos sob os quais erguemos a nossa tecnologia.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col items-start gap-4 shadow-sm hover:shadow-xl hover:border-blue-600/15 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <v.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {v.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* -- CTA FINAL BANNER -- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 pb-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-600 rounded-[40px] lg:rounded-[56px] p-10 lg:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-[28px] sm:text-[40px] lg:text-[52px] font-black leading-[0.9] tracking-tighter mb-4">
              Dá o salto na tua <br className="hidden sm:block" />
              carreira hoje.
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-semibold opacity-80 leading-relaxed mb-10 max-w-xl mx-auto">
              Junta-te a milhares de angolanos que já deram o passo correto em direção à estabilidade profissional.
            </p>
            <button
              onClick={() => setView("wizard")}
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-[28px] font-black text-lg hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl group"
            >
              Começar Grátis agora
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
