import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Layout, CheckCircle2, ArrowRight, Zap, Shield, FileText } from "lucide-react";
import { useCV } from "../../context/CVContext";
import { TemplateVisual } from "../TemplateVisual";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { slideUp, staggerContainer, pageTransition } from "../../lib/motion";

const templates = [
  {
    id: "minimalist",
    name: "Minimalista",
    tag: "Plano Gratuito",
    desc: "Perfeito para quem valoriza a clareza. Layout simples e direto ao ponto.",
    type: "minimalist" as const,
    isPremium: false,
  },
  {
    id: "technical",
    name: "O Técnico",
    tag: "Plano Gratuito",
    desc: "Estrutura focada em competências técnicas. Ideal para IT e Engenharia.",
    type: "technical" as const,
    isPremium: false,
  },
  {
    id: "modern",
    name: "O Moderno",
    tag: "ATS Premium",
    desc: "Equilíbrio perfeito entre estética e otimização de leitura automática.",
    type: "modern" as const,
    isPremium: true,
  },
  {
    id: "executive",
    name: "O Executivo",
    tag: "ATS Premium",
    desc: "Design sóbrio focado em liderança. Transmite confiança e alta senioridade.",
    type: "executive" as const,
    isPremium: true,
  },
  {
    id: "creative",
    name: "O Criativo",
    tag: "ATS Premium",
    desc: "Layout inovador com tipografia arrojada. Otimizado para não passar despercebido.",
    type: "creative" as const,
    isPremium: true,
  },
];

const guarantees = [
  {
    icon: CheckCircle2,
    title: "Triagem Garantida",
    desc: "Modelos Premium totalmente calibrados para os sistemas ATS empresariais.",
  },
  {
    icon: Zap,
    title: "Download Instantâneo",
    desc: "Exporta para PDF de alta resolução em segundos, pronto para enviar.",
  },
  {
    icon: Shield,
    title: "Dados Protegidos",
    desc: "Os teus dados ficam guardados de forma segura na tua conta.",
  },
];

export const TemplatesView: React.FC = () => {
  const { setView } = useCV();

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
              Galeria de Designs
            </p>
            <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-slate-900 dark:text-white tracking-[-0.05em] leading-[0.9] mb-6">
              Modelos de Excelência{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">ATS-Ready.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-3xl mx-auto lg:mx-0">
              Escolhe entre os nossos layouts de elite, criados especificamente para cumprir as regras dos sistemas automáticos de triagem corporativos em Angola.
            </p>
          </motion.div>

          {/* CTA - desktop only */}
          <Button
            size="xl"
            onClick={() => setView("wizard")}
            className="hidden lg:flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/30 shrink-0 group border-none"
          >
            Criar o Meu CV
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* -- TEMPLATE GRID -- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group relative"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-blue-600/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-all" />

              <div className="relative bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[40px] p-6 lg:p-8 h-full flex flex-col shadow-sm group-hover:shadow-2xl group-hover:border-blue-600/20 dark:group-hover:border-blue-600/20 transition-all duration-300">
                {/* Template Preview */}
                <div className="mb-6 transition-transform duration-300 group-hover:scale-[1.02]">
                  <TemplateVisual type={t.type} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className={cn(
                    "text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest w-fit",
                    t.isPremium 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20" 
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  )}>
                    {t.tag}
                  </div>
                  {t.isPremium && (
                    <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black px-2 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/20">
                      <FileText size={10} />
                      + Carta
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                  {t.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm lg:text-base leading-relaxed mb-6 flex-1">
                  {t.desc}
                </p>

                {/* CTA */}
                <button
                  onClick={() => setView("wizard")}
                  className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-base transition-all active:scale-95 hover:opacity-90 flex items-center justify-center gap-2 group/btn"
                >
                  Usar Este Modelo
                  <Layout
                    size={18}
                    className="group-hover/btn:rotate-12 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* -- GUARANTEES STRIP -- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {guarantees.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-800"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                <g.icon size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white tracking-tight mb-1">
                  {g.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-snug">
                  {g.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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
            <CheckCircle2 size={48} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-[28px] sm:text-[40px] lg:text-[52px] font-black leading-[0.9] tracking-tighter mb-4">
              Todos os modelos são <br className="hidden sm:block" />
              ATS-Friendly.
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-semibold opacity-80 leading-relaxed mb-10 max-w-xl mx-auto">
              Os sistemas automáticos das grandes empresas conseguem ler o teu
              CV sem erros - garantindo que chegas às mãos do recrutador.
            </p>
            <button
              onClick={() => setView("wizard")}
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-[28px] font-black text-lg hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl group"
            >
              Começar Agora - Experimentar Grátis
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
