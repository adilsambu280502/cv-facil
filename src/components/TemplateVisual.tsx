import React from 'react';
import { cn } from '../lib/utils';

interface TemplateVisualProps {
  type: 'minimalist' | 'modern' | 'executive' | 'creative' | 'technical';
  className?: string;
  active?: boolean;
}

export const TemplateVisual: React.FC<TemplateVisualProps> = ({ type, className, active }) => {
  const getStyles = () => {
    switch (type) {
      case 'minimalist':
        return {
          header: "border-b-2 border-slate-900 pb-3 mb-4",
          name: "text-slate-900 font-black text-[10px]",
          title: "text-slate-500 font-bold text-[6px] uppercase tracking-widest",
          section: "text-slate-900 font-black text-[7px] mb-2 uppercase border-b border-slate-100 pb-1",
          text: "text-slate-400 font-medium text-[5px] leading-relaxed",
          bullet: "w-1 h-1 bg-slate-300 rounded-full shrink-0 mt-1",
        };
      case 'modern':
        return {
          header: "border-b-4 border-blue-600 pb-5 mb-5",
          name: "text-slate-900 font-black text-[12px] tracking-tight uppercase",
          title: "text-blue-600 font-black text-[7px] uppercase tracking-[0.2em] mt-1",
          section: "text-slate-400 font-black text-[6px] mb-3 uppercase tracking-[0.3em] flex items-center gap-2 after:h-[1px] after:flex-1 after:bg-slate-100",
          text: "text-slate-700 font-bold text-[6px] leading-relaxed",
          bullet: "w-1 h-1 bg-blue-600 rounded-full shrink-0 mt-1.5",
        };
      case 'executive':
        return {
          header: "text-center border-y border-slate-200 py-3 mb-4",
          name: "text-slate-900 font-black text-[12px] tracking-tight",
          title: "text-slate-600 font-serif italic text-[7px]",
          section: "text-slate-900 font-black text-[8px] mb-2 uppercase text-center bg-slate-50 py-1",
          text: "text-slate-600 font-medium text-[5px] leading-relaxed",
          bullet: "w-1 h-1 bg-slate-900 rounded-full shrink-0 mt-1",
        };
      case 'creative':
        return {
          header: "bg-slate-900 p-6 -mx-4 -mt-4 mb-6",
          name: "text-white font-black text-[14px] leading-none tracking-tight uppercase",
          title: "text-blue-400 font-black text-[7px] uppercase tracking-[0.3em] mt-2",
          section: "text-slate-900 font-black text-[8px] mb-3 border-l-4 border-blue-600 pl-2 uppercase tracking-widest",
          text: "text-slate-600 font-bold text-[6px] leading-relaxed",
          bullet: "w-1 h-1 bg-blue-500 rounded-full shrink-0 mt-1.5",
          sidebar: "w-1/3 bg-slate-50 p-4 -ml-4 -mb-4 mr-4",
        };
      case 'technical':
        return {
          header: "text-center mb-8 border-b-2 border-black pb-4",
          name: "text-black font-black text-[12px] uppercase",
          title: "text-slate-500 font-bold text-[6px] uppercase tracking-widest mt-1",
          section: "text-black font-black text-[8px] mb-3 uppercase border-b border-slate-200 pb-1 tracking-widest",
          text: "text-slate-800 font-medium text-[6px] leading-relaxed",
          bullet: "text-black font-black mr-1",
          skill: "bg-slate-100 px-1.5 py-0.5 rounded text-black font-bold",
        };
      default:
        return getStyles();
    }
  };

  const s = getStyles();

  return (
    <div className={cn(
      "aspect-[3/4] w-full bg-white dark:bg-slate-900 border-2 rounded-2xl overflow-hidden shadow-sm transition-all duration-700 relative p-4 flex flex-col group/visual",
      active ? "border-blue-600 scale-[1.03] shadow-2xl z-10" : "border-slate-100 dark:border-slate-800",
      className
    )}>
      {/* Glossy Sheen Effect */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover/visual:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none z-20" />
      
      {/* Subtle Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-10 bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />

      {/* Header Realista */}
      <div className={s.header}>
        <div className={cn(s.name, "dark:text-white")}>ADILSON SAMBUMBA</div>
        <div className={cn(s.title, "dark:text-slate-400")}>Gestor de Projetos Digitais</div>
      </div>

      {/* Conteúdo Realista */}
      <div className="flex flex-1 gap-0">
        {s.sidebar && (
          <div className={cn(s.sidebar, "dark:border-slate-800")}>
            <div className={cn(s.section, "dark:text-blue-400")}>Contacto</div>
            <div className="space-y-1 mb-4">
              <div className={cn(s.text, "dark:text-slate-400")}>Luanda, Angola</div>
              <div className={cn(s.text, "dark:text-slate-400")}>adilson@email.ao</div>
            </div>
            <div className={cn(s.section, "dark:text-blue-400")}>Skills</div>
            <div className="flex flex-wrap gap-1">
               <div className={cn(s.text, "dark:text-slate-400")}>Leadership</div>
               <div className={cn(s.text, "dark:text-slate-400")}>Strategy</div>
            </div>
          </div>
        )}

        <div className="flex-1">
          <div className={cn(s.section, "dark:text-blue-400")}>Experiência Profissional</div>
          <div className="space-y-3 mb-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="text-[6px] font-black text-slate-800 dark:text-slate-200">Senior Manager</div>
                <div className="text-[5px] font-bold text-slate-400">2020 - Presente</div>
              </div>
              <div className={cn(s.text, "dark:text-slate-400")}>Liderança de equipas multidisciplinares para entrega de produtos escaláveis no mercado nacional.</div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="text-[6px] font-black text-slate-800 dark:text-slate-200">Consultor Digital</div>
                <div className="text-[5px] font-bold text-slate-400">2018 - 2020</div>
              </div>
              <div className={cn(s.text, "dark:text-slate-400")}>Implementação de estratégias digitais de alto impacto para retenção de utilizadores.</div>
            </div>
          </div>

          <div className={cn(s.section, "dark:text-blue-400")}>Educação</div>
          <div className={cn(s.text, "dark:text-slate-400")}>Licenciatura em Engenharia Informática - ITEL/UAN</div>
        </div>
      </div>

      {/* Overlay de Qualidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 dark:from-black/10 to-transparent pointer-events-none z-10" />
      
      {/* Badge de Seleção ou Premium */}
      {(active || type === 'modern') && (
        <div className={cn(
          "absolute top-3 right-3 py-1 px-3 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in duration-300 z-30",
          active ? "bg-blue-600 text-white" : "bg-amber-500 text-white"
        )}>
          {active ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          ) : (
            <span className="text-[8px] font-black uppercase tracking-widest">Premium</span>
          )}
        </div>
      )}
    </div>
  );
};
