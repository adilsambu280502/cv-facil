import React from "react";
import { motion, AnimatePresence } from "motion/react";
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
  UserCheck,
} from "lucide-react";
import { useCV } from "../../context/CVContext";
import { cn } from "../../lib/utils";
import { TemplateVisual } from "../TemplateVisual";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { slideUp, staggerContainer, transitionSm } from "../../lib/motion";

/* ── FAQ Item ── */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <motion.div 
      initial={false}
      className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm overflow-hidden transition-all duration-300 hover:border-blue-600/20"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 lg:p-10 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors gap-6 group"
      >
        <h4 className="font-black text-slate-900 dark:text-white text-lg lg:text-2xl tracking-tighter leading-tight">
          {question}
        </h4>
        <div
          className={cn(
            "w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 transition-all duration-500 shrink-0 group-hover:scale-110",
            isOpen ? "rotate-180 bg-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]" : ""
          )}
        >
          <ChevronDown size={24} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-6 lg:px-10 pb-8 lg:pb-12">
              <p className="text-slate-500 dark:text-slate-400 text-base lg:text-lg leading-relaxed font-bold">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
  <Card
    className={cn(
      "relative flex flex-col p-2 lg:p-4 rounded-[40px] border-2 transition-all duration-500 group overflow-visible",
      recommended
        ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-500 shadow-[0_48px_96px_-24px_rgba(37,99,235,0.4)] scale-[1.05] z-10"
        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-600/20"
    )}
  >
    {recommended && (
      <Badge className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-xl border-none">
        Mais Popular
      </Badge>
    )}
    
    <CardHeader className="pb-4">
      <CardTitle className={cn(
        "text-2xl font-black tracking-tighter",
        recommended ? "text-white" : "text-slate-900 dark:text-white"
      )}>
        {title}
      </CardTitle>
      <CardDescription className={cn(
        "text-[10px] font-black uppercase tracking-[0.3em]",
        recommended ? "text-white/60" : "text-slate-400"
      )}>
        {subtitle}
      </CardDescription>
    </CardHeader>

    <CardContent className="flex-1">
      <div className={cn(
        "text-5xl font-black mb-10 flex items-baseline gap-2 tracking-tighter",
        recommended ? "text-white" : "text-slate-900 dark:text-white"
      )}>
        {price}
        {price !== "Grátis" && (
          <span className={cn(
            "text-lg font-black uppercase tracking-widest",
            recommended ? "text-white/40" : "text-slate-400 dark:text-slate-500"
          )}>
            Kzs
          </span>
        )}
      </div>
      
      <ul className="space-y-4">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className={cn("mt-0.5 shrink-0", recommended ? "text-white" : "text-blue-600")}>
              <CheckCircle2 size={20} />
            </div>
            <span className={cn(
              "text-base font-bold tracking-tight leading-snug",
              recommended ? "text-white/90" : "text-slate-600 dark:text-slate-300"
            )}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </CardContent>

    <CardFooter>
      <Button
        onClick={onSelect}
        size="lg"
        className={cn(
          "w-full py-8 rounded-3xl font-black text-lg transition-all active:scale-[0.97] shadow-xl",
          recommended
            ? "bg-white text-slate-900 hover:bg-slate-50 border-none"
            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
        )}
      >
        Escolher Este
      </Button>
    </CardFooter>
  </Card>
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
        "Sim! Podes criar e descarregar o teu currículo no modelo Essencial sem qualquer custo. Os nossos Planos Premium desbloqueiam funcionalidades avançadas, como a exportação em Word e uma análise profunda realizada pelo nosso sistema inteligente.",
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
      desc: "Os teus dados são organizados para que qualquer sistema de recrutamento consiga ler o teu perfil de forma instantânea.",
      icon: ShieldCheck,
    },
    {
      title: "Design Inteligente",
      desc: "Modelos que equilibram modernidade e sobriedade, desenhados especificamente para o mercado corporativo angolano.",
      icon: LayoutTemplate,
    },
    {
      title: "Foco no Recrutador",
      desc: "A nossa inteligência destaca exatamente os pontos que as empresas mais valorizam num candidato.",
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

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 pt-40 pb-16 lg:py-24 xl:py-32"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 xl:gap-32">

            {/* ── Texto Hero ── */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

              {/* Headline — responsiva */}
              <motion.h1
                variants={slideUp}
                className="text-[32px] sm:text-[56px] lg:text-[72px] xl:text-[88px] font-black leading-[0.95] tracking-[-0.04em] mb-4 lg:mb-8 text-slate-900 dark:text-white"
              >
                <span className="hidden lg:inline">A primeira plataforma em Angola que transforma a tua história num <span className="text-blue-600">currículo impossível de ignorar.</span></span>
                <span className="lg:hidden">
                  Gera o <span className="text-blue-600">CV de Elite</span> que te coloca no <span className="text-blue-600">topo.</span>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={slideUp}
                className="text-sm sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-12 lg:mb-10 max-w-2xl mx-auto lg:mx-0 font-semibold leading-relaxed"
              >
                <span className="hidden lg:inline">Cria o teu perfil profissional em menos de 5 minutos e destaca-te nos processos de recrutamento das melhores empresas.</span>
                <span className="lg:hidden text-center block font-black">Para de ser ignorado. Cria um perfil de elite em minutos e garante a tua próxima entrevista hoje.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={slideUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16 lg:mb-14"
              >
                <Button
                  size="xl"
                  onClick={() => setView("wizard")}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 lg:px-10 py-6 lg:py-8 rounded-[28px] font-black text-lg lg:text-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-slate-900/20 group border-none"
                >
                  Gerar o Meu CV
                  <ArrowRight
                    size={22}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  onClick={() => setView("about")}
                  className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-8 lg:px-10 py-6 lg:py-8 rounded-[28px] font-black text-lg lg:text-xl hover:border-blue-600/40 dark:hover:border-blue-600/40 transition-all"
                >
                  Ver Modelos
                </Button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                variants={slideUp}
                className="flex items-center justify-center lg:justify-start gap-8 lg:gap-12 mb-20 lg:mb-0"
              >
                <StatItem value="5min" label="Tempo Médio" />
              </motion.div>
            </div>

            {/* ── Visual Preview — Responsive ── */}
            <div className="flex-1 flex items-center justify-center relative mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
                className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[420px] xl:max-w-[500px]"
                style={{ perspective: "1200px" }}
              >
                <div className="lg:rotate-y-[-8deg]">
                  <TemplateVisual
                  type="creative"
                  active
                  className="w-full shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)]"
                />
                </div>
                {/* Floating accent cards — Hidden on small mobile */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-8 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-2 sm:p-4 shadow-2xl border border-slate-100 dark:border-slate-700 z-20"
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
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          CAREER CONSULTANCY — Epicentro de Sucesso
          ══════════════════════════════════════ */}
      <section className="py-24 lg:py-40 bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Badge className="bg-blue-600 text-white font-black uppercase tracking-[0.3em] py-2 px-6 rounded-full mb-8 border-none">
                Consultoria de Carreira
              </Badge>
              <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
                Muito mais que um CV. <br />
                <span className="text-blue-600">A tua Mentoria Estratégica.</span>
              </h2>
              <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-bold mb-10 leading-relaxed">
                No CV Fácil, não te limitas a preencher campos. Recebes orientações de especialistas para garantir que cada detalhe do teu perfil conte uma história de sucesso avassaladora.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Otimização para Recrutadores", desc: "Aprende a escolher as palavras-chave certas que os sistemas de seleção adoram." },
                  { title: "Arquitetura de Impacto", desc: "Como estruturar as tuas conquistas para que o recrutador as perceba em menos de 6 segundos." },
                  { title: "Consultoria de Perfil", desc: "Dicas para elevar a tua imagem profissional e destacar a tua experiência." }
                ].map((tip, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{tip.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-bold text-sm lg:text-base">{tip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative z-10 bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-[48px] shadow-2xl border-2 border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <UserCheck size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Dica do Especialista</h3>
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Exclusivo CV Fácil</p>
                  </div>
                </div>
                <blockquote className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter mb-8 italic">
                  "O teu CV não deve ser uma lista de tarefas, mas sim uma lista de <span className="text-blue-600 underline decoration-4 underline-offset-4">conquistas mensuráveis</span>."
                </blockquote>
                <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                    Em vez de dizer "Fui responsável por vendas", diz "Aumentei o volume de vendas em 25% através de uma nova estratégia de retenção". Isto muda tudo.
                  </p>
                </div>
              </div>
              {/* Background accent */}
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-blue-600 rounded-[48px] -z-10 blur-3xl opacity-10" />
            </motion.div>
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
              Ferramentas Poderosas <br className="hidden lg:block" />
              para Profissionais de Elite.
            </h2>
            <p className="text-base lg:text-xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl">
              Somos muito mais que um gerador de documentos. Atuamos como o teu parceiro estratégico na conquista da tua próxima grande oportunidade.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                variants={slideUp}
                className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-[32px] border-2 border-slate-100 dark:border-slate-800 hover:border-blue-600/30 dark:hover:border-blue-600/30 transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-[20px] flex items-center justify-center text-blue-600 mb-6 shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PREÇOS
          ══════════════════════════════════════ */}
      <section id="precos" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-14 lg:mb-20">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[64px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-4">
              O Plano ideal para a{" "}
              <span className="text-blue-600">tua ascensão.</span>
            </h2>
            <p className="text-base lg:text-xl text-slate-500 dark:text-slate-400 font-bold">
              Inviste no teu futuro com ferramentas que os recrutadores exigem.
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
              Tudo o que precisas de saber para começares hoje.
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
          CTA FINAL
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
              Começa Hoje de forma gratuita
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
              Estás pronto para o <br /> <span className="text-blue-400">Próximo Nível?</span>
            </h2>
            <p className="text-xl text-white/60 font-bold mb-12">
              Junta-te aos milhares de profissionais em Angola que já utilizam a nossa tecnologia para impulsionar as suas carreiras.
            </p>
            <Button
              size="2xl"
              onClick={() => setView("wizard")}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-12 py-8 rounded-[28px] font-black text-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-blue-600/40 group border-none"
            >
              Criar o Meu Perfil
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 lg:py-20 px-6 bg-slate-50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">CV Fácil</span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <button onClick={() => setView("about")} className="hover:text-blue-600 transition-colors">Sobre</button>
            <button onClick={() => setView("intro")} className="hover:text-blue-600 transition-colors">Preços</button>
            <button className="hover:text-blue-600 transition-colors">Termos</button>
            <button className="hover:text-blue-600 transition-colors">Privacidade</button>
          </div>

          <p className="text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.4em] text-[10px]">
            © 2026 CV Fácil — Orgulhosamente Criado em Angola
          </p>
        </div>
      </footer>
    </motion.div>
  );
};
