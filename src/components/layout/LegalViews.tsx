import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldAlert, Cookie } from 'lucide-react';
import { useCV } from "../../context/CVContext";
import { Button } from "../ui/button";
import { slideUp, pageTransition } from "../../lib/motion";

export const TermsView = () => {
  const { setView } = useCV();

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 w-full bg-slate-50 dark:bg-slate-950 py-12 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24">
        <Button
          variant="ghost"
          onClick={() => setView("intro")}
          className="mb-8 lg:mb-12 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Voltar ao Início
        </Button>
        
        <motion.div variants={slideUp} initial="initial" animate="animate">
          <h1 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Termos de Serviço</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-12 font-medium">Última atualização: Maio de 2026</p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Aceitação dos Termos</h3>
            <p className="mb-6">Ao aceder e utilizar o CV Fácil, concordas em cumprir estes termos e condições na íntegra. A nossa plataforma foi desenvolvida para simplificar a criação do teu perfil profissional.</p>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Utilização da Plataforma</h3>
            <p className="mb-6">O CV Fácil concede-te uma licença limitada, não exclusiva e não transferível para utilizares os nossos serviços. Os modelos de CV e Cartas de Apresentação são propriedade intelectual da plataforma e é expressamente proibida a revenda ou comercialização de designs extraídos daqui.</p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Planos e Acesso</h3>
            <p className="mb-6">O plano gratuito oferece acesso limitado a modelos básicos e um número restrito de gerações diárias. A subscrição de planos pagos (Pro e Elite) desbloqueia modelos otimizados para ATS, a geração automática de Cartas de Apresentação com design alinhado e acesso vitalício a esse conteúdo.</p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Política de Pagamentos e Reembolsos</h3>
            <p className="mb-6">Os planos pagos concedem acesso imediato a ficheiros digitais finais (PDFs de Alta Fidelidade). Pela natureza instantânea e digital da entrega do produto finalizado, não emitimos reembolsos após a geração e download bem-sucedidos dos teus documentos.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const PrivacyView = () => {
  const { setView } = useCV();

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 w-full bg-slate-50 dark:bg-slate-950 py-12 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24">
        <Button
          variant="ghost"
          onClick={() => setView("intro")}
          className="mb-8 lg:mb-12 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Voltar ao Início
        </Button>
        
        <motion.div variants={slideUp} initial="initial" animate="animate">
          <div className="flex items-center gap-4 mb-4">
            <ShieldAlert className="text-blue-600 w-8 h-8 lg:w-10 lg:h-10 shrink-0" />
            <h1 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Privacidade e Cookies</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-12 font-medium">O nosso compromisso inegociável com a tua segurança de dados.</p>
          
          <div className="space-y-10 text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            <section>
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-4">
                <ShieldAlert size={20} className="text-blue-600"/> Gestão de Dados Pessoais
              </h3>
              <p>O teu currículo é a tua vida. Os dados que inseres no CV Fácil (contactos, experiência profissional, histórico de educação) são processados exclusivamente para renderizar o teu currículo no formato escolhido e para a análise de melhoria de texto. Nós <strong>não vendemos, alugamos ou transacionamos</strong> as tuas informações pessoais com empresas de marketing ou terceiros.</p>
            </section>
            
            <section>
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-4">
                <Cookie size={20} className="text-amber-600"/> Política de Cookies
              </h3>
              <p className="mb-4">Para te oferecermos uma experiência rápida e "na palma da mão", utilizamos dois tipos de cookies:</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li><strong>Essenciais:</strong> Permitem guardar o teu progresso enquanto constróis o CV, autenticam a tua sessão para não perderes dados e garantem a segurança do portal. Sem estes, a app não funciona.</li>
                <li><strong>Analíticos (Opcionais):</strong> Dados anonimizados que nos ajudam a entender como os utilizadores navegam pela aplicação (ex: quais os modelos mais escolhidos), permitindo-nos focar esforços onde importa.</li>
              </ul>
              
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <p className="text-sm m-0 text-slate-600 dark:text-slate-400 font-bold">
                  Ao continuares a utilizar a nossa plataforma para criar o teu CV de Elite, aceitas a utilização dos cookies essenciais.
                </p>
                <Button size="sm" onClick={() => setView("intro")} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full px-6 font-black shrink-0 hover:scale-105 transition-transform">
                  Compreendido
                </Button>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
