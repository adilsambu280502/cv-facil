import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  LayoutTemplate,
  CheckCircle2,
  Sparkles,
  Target,
  ShieldCheck,
  ChevronDown,
  FileText,
  Zap,
} from "lucide-react";
import { useCV } from "../../context/CVContext";
import { cn } from "../../lib/utils";
import { TemplateVisual } from "../TemplateVisual";

/* ── FAQ Item ── */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 lg:p-8 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors gap-4"
      >
        <h4 className="font-black text-slate-900 dark:text-white text-base lg:text-xl tracking-tight leading-snug">
          {question}
        </h4>
        <div
          className={cn(
            "w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 transition-all duration-500 shrink-0",
            isOpen ? "rotate-180 bg-blue-600 text-white" : ""
          )}
        >
          <ChevronDown size={20} />
        </div>
      </button>
      <div
        className={cn(
          "px-6 lg:px-8 transition-all duration-500 ease-in-out origin-top",
          isOpen ? "max-h-96 pb-8 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-semibold">
          {answer}
        </p>
      </div>
    </div>
  );
};

/* ── Pricing Card ── */
const PlanCard = ({
  title,
  price,
  subtitle,
  features,
  recommended,
  onSelect,
}: {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  recommended?: boolean;
  onSelect: () => void;
}) => (
  <div
    className={cn(
      "relative flex flex-col p-8 lg:p-12 rounded-[40px] border-2 transition-all duration-500 group",
      recommended
        ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-500 shadow-[0_48px_96px_-24px_rgba(37,99,235,0.4)] scale-[1.02] z-10"
        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-600/20"
    )}
  >
    {recommended && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-white text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] py-2 px-8 rounded-full shadow-xl">
        Mais Popular
      </div>
    )}
    <h3
      className={cn(
        "text-2xl font-black mb-1 tracking-tighter",
        recommended ? "text-white" : "text-slate-900 dark:text-white"
      )}
    >
      {title}
    </h3>
    <p
      className={cn(
        "text-[11px] mb-8 font-black uppercase tracking-[0.3em]",
        recommended ? "text-white/60" : "text-slate-400"
      )}
    >
      {subtitle}
    </p>
    <div
      className={cn(
        "text-5xl font-black mb-10 flex items-baseline gap-2 tracking-tighter",
        recommended ? "text-white" : "text-slate-900 dark:text-white"
      )}
    >
      {price}
      {price !== "Grátis" && (
        <span
          className={cn(
            "text-lg font-black uppercase tracking-widest",
            recommended ? "text-white/40" : "text-slate-400 dark:text-slate-500"
          )}
        >
          Kzs
        </span>
      )}
    </div>
    <ul className="space-y-4 mb-12 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className={cn("mt-0.5 shrink-0", recommended ? "text-white" : "text-blue-600")}>
            <CheckCircle2 size={20} />
          </div>
          <span
            className={cn(
              "text-base font-bold tracking-tight leading-snug",
              recommended ? "text-white/90" : "text-slate-600 dark:text-slate-300"
            )}
          >
            {f}
          </span>
        </li>
      ))}
    </ul>
    <button
      onClick={onSelect}
      className={cn(
        "w-full py-5 rounded-3xl font-black text-lg transition-all active:scale-[0.97] shadow-xl",
        recommended
          ? "bg-white text-slate-900 hover:shadow-white/20"
          : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
      )}
    >
      Escolher Este
    </button>
  </div>
);

/* ── Stats Item ── */
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center lg:items-start">
    <span className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
      {value}
    </span>
    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">
      {label}
    </span>
  </div>
);

/* ════════════════════════════════════════
   INTRO — Componente Principal
   ════════════════════════════════════════ */
export const Intro: React.FC = () => {
  const { setView } = useCV();

  const plans = [
    {
      title: "Essencial",
      price: "Grátis",
      subtitle: "Para Início de Carreira",
      features: [
        "1 Modelo Profissional",
        "Exportação em PDF",
        "Dicas de Especialistas",
        "Acesso Vitalício",
      ],
    },
    {
      title: "Pro",
      price: "700",
      subtitle: "Mais Escolhido em Angola",
      recommended: true,
      features: [
        "Todos os Modelos Premium",
        "Exportação em Word (DOCX)",
        "Análise de Score do Recrutador",
        "Carta de Apresentação Automática",
        "Suporte Prioritário",
      ],
    },
    {
      title: "Elite",
      price: "1.500",
      subtitle: "Para Cargos Executivos",
      features: [
        "Tudo do Plano Pro",
        "Consultor Digital 24/7",
        "Revisão de Perfil LinkedIn",
        "Preparação para Entrevistas",
        "Destaque na Base de Dados",
      ],
    },
  ];

  const faqs = [
    {
      question: "O CV Fácil é realmente gratuito?",
      answer:
        "Sim! Podes criar e descarregar o teu currículo no modelo Essencial sem pagar nada. Planos Premium desbloqueiam funcionalidades avançadas como exportação em Word e análise profunda pelo nosso sistema.",
    },
    {
      question: "Como funciona a análise do sistema?",
      answer:
        "A nossa tecnologia analisa o teu histórico e o cargo pretendido, sugerindo melhorias para que o teu perfil se destaque nos sistemas de recrutamento modernos usados em Angola e no exterior.",
    },
    {
      question: "Posso editar o meu CV depois de pronto?",
      answer:
        "Sempre! O teu currículo fica guardado na tua conta e podes fazer alterações a qualquer momento, adaptando-o para diferentes vagas.",
    },
    {
      question: "Quais são as formas de pagamento?",
      answer:
        "Aceitamos transferências bancárias, referências Multicaixa e pagamentos via aplicativos bancários angolanos. O processo é rápido e seguro.",
    },
  ];

  const benefits = [
    {
      title: "Otimização Técnica",
      desc: "Currículos estruturados para serem lidos instantaneamente por qualquer sistema de recrutamento.",
      icon: ShieldCheck,
    },
    {
      title: "Design Inteligente",
      desc: "Modelos que equilibram modernidade e sobriedade, ideais para o mercado corporativo angolano.",
      icon: LayoutTemplate,
    },
    {
      title: "Foco no Recrutador",
      desc: "Análise de dados que destaca exatamente o que as empresas procuram num candidato.",
      icon: Target,
    },
  ];

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full bg-white dark:bg-slate-950"
    >

      {/* ══════════════════════════════════════
          HERO SECTION
          Desktop: split layout (texto esq. | visual dir.)
          Mobile: stacked, text-center
          ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/8 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/8 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 py-16 lg:py-24 xl:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 xl:gap-32">

            {/* ── Texto Hero ── */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

              {/* Badge — desktop only */}
              {/* Badge Removido */}

              {/* Headline — responsiva */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[88px] font-black leading-[0.88] tracking-[-0.04em] mb-6 lg:mb-8 text-slate-900 dark:text-white"
              >
                A primeira plataforma em Angola que transforma a tua história num <span className="text-blue-600">currículo impossível de ignorar.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 font-semibold leading-relaxed"
              >
                Em menos de 2 minutos.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 lg:mb-14"
              >
                  <button
                  onClick={() => setView("wizard")}
                  className="flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 lg:px-10 py-5 rounded-[28px] font-black text-lg lg:text-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-slate-900/20 group"
                >
                  Gerar o Meu CV
                  <ArrowRight
                    size={22}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  onClick={() => setView("about")}
                  className="flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-8 lg:px-10 py-5 rounded-[28px] font-black text-lg lg:text-xl hover:border-blue-600/40 dark:hover:border-blue-600/40 transition-all"
                >
                  Ver Modelos
                </button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex items-center justify-center lg:justify-start gap-8 lg:gap-12"
              >
                <StatItem value="98%" label="Sucesso na Vaga" />
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                <StatItem value="5min" label="Tempo Médio" />
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                <StatItem value="5k+" label="Utilizadores" />
              </motion.div>
            </div>

            {/* ── Visual Preview — desktop only ── */}
            <div className="flex-1 hidden lg:flex items-center justify-center relative">
              <motion.div
                initial={{ opacity: 0, x: 60, rotateY: -8 }}
                animate={{ opacity: 1, x: 0, rotateY: -8 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
                className="relative w-full max-w-[420px] xl:max-w-[500px]"
                style={{ perspective: "1200px" }}
              >
                <TemplateVisual
                  type="modern"
                  active
                  className="w-full shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)]"
                />
                {/* Floating accent cards */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-6 -right-8 bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-2xl border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900 dark:text-white">CV Aprovado</p>
                      <p className="text-[10px] text-slate-400 font-bold">Score 98/100</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-8 bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-2xl border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Zap size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900 dark:text-white">Gerado em</p>
                      <p className="text-[10px] text-slate-400 font-bold">4 minutos</p>
                    </div>
                  </div>
                </motion.div>

                {/* Glow */}
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl -z-10 animate-pulse" />
                <div
                  className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl -z-10 animate-pulse"
                  style={{ animationDelay: "2s" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BENEFITS — Ferramentas Reais
          ══════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center lg:text-left mb-14 lg:mb-20">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[64px] font-black text-slate-900 dark:text-white mb-4 tracking-tighter leading-[0.9]">
              Ferramentas Reais <br className="hidden lg:block" />
              para Pessoas Reais.
            </h2>
            <p className="text-base lg:text-xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl">
              Não somos apenas um gerador de PDF. Somos o teu parceiro na busca
              pela próxima oportunidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-[32px] border-2 border-slate-100 dark:border-slate-800 hover:border-blue-600/30 dark:hover:border-blue-600/30 transition-all group"
              >
                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-[20px] flex items-center justify-center text-blue-600 mb-6 shadow-lg">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-base text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PREÇOS
          ══════════════════════════════════════ */}
      <section id="precos" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-14 lg:mb-20">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[64px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-4">
              O Plano certo para a{" "}
              <span className="text-blue-600">tua próxima etapa.</span>
            </h2>
            <p className="text-base lg:text-xl text-slate-500 dark:text-slate-400 font-bold">
              Inviste no teu futuro com ferramentas que os recrutadores respeitam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {plans.map((plan, i) => (
              <PlanCard key={i} {...plan} onSelect={() => setView("wizard")} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
          ══════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 lg:px-0">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-black text-slate-900 dark:text-white tracking-tighter mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-base lg:text-lg text-slate-500 dark:text-slate-400 font-bold">
              Tudo o que precisas de saber sobre o CV Fácil.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA FINAL — desktop only (no mobile é redundante com bottom nav)
          ══════════════════════════════════════ */}
      <section className="hidden lg:block py-24 bg-slate-900 dark:bg-slate-800">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8">
              <FileText size={14} />
              Começa Hoje. É Grátis.
            </div>
            <h2 className="text-[52px] font-black text-white tracking-tighter leading-[0.9] mb-6">
              O teu próximo emprego <br />
              começa aqui.
            </h2>
            <p className="text-xl text-white/60 font-bold mb-12">
              Junta-te a mais de 5.000 profissionais angolanos que já usam o CV Fácil.
            </p>
            <button
              onClick={() => setView("wizard")}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-[28px] font-black text-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-blue-600/40 group"
            >
              Gerar o Meu CV
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
          ══════════════════════════════════════ */}
      <footer className="py-10 lg:py-12 px-6 text-center border-t border-slate-100 dark:border-slate-900">
        <p className="text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.4em] text-[10px]">
          © 2026 CV Fácil — Tecnologia Angolana
        </p>
      </footer>
    </motion.div>
  );
};
