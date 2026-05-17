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
          header: "flex justify-between items-start border-b border-slate-200 pb-4 mb-4",
          name: "text-slate-900 font-black text-[13px] leading-none uppercase tracking-tight",
          title: "text-blue-600 font-black text-[6.5px] uppercase tracking-[0.25em] mt-1.5",
          section: "text-slate-900 font-black text-[7px] mb-2.5 uppercase border-b border-slate-100 pb-1 tracking-wider",
          text: "text-slate-500 font-bold text-[5.5px] leading-relaxed",
          bullet: "w-1 h-1 bg-blue-600 rounded-full shrink-0 mt-1",
          sidebar: "w-[35%] bg-slate-50 p-3 rounded-xl -mr-2 -mb-2 ml-4 flex flex-col gap-2 shrink-0 border border-slate-100",
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
        return {
          header: "border-b-2 border-slate-900 pb-3 mb-4",
          name: "text-slate-900 font-black text-[10px]",
          title: "text-slate-500 font-bold text-[6px] uppercase tracking-widest",
          section: "text-slate-900 font-black text-[7px] mb-2 uppercase border-b border-slate-100 pb-1",
          text: "text-slate-400 font-medium text-[5px] leading-relaxed",
          bullet: "w-1 h-1 bg-slate-300 rounded-full shrink-0 mt-1",
        };
    }
  };

  const getTemplateInfo = () => {
    switch (type) {
      case 'minimalist':
        return { 
          name: "MAURO CHILUTE", 
          title: "Engenheiro Eletrotécnico",
          email: "mauro.chilute@email.ao",
          phone: "+244 923 112 334",
          location: "Benguela, Angola",
          role1: "Engenheiro de Manutenção",
          desc1: "Supervisão e comissionamento de subestações elétricas de média e alta tensão.",
          role2: "Técnico de Redes Elétricas",
          desc2: "Manutenção corretiva e preventiva de sistemas elétricos industriais complexos.",
          education: "Licenciatura em Engenharia Eletrotécnica - ISPTEC",
          skills: ["Liderança", "Estratégia", "Redes Elétricas", "Manutenção Industrial"]
        };
      case 'modern':
        return { 
          name: "ANABELA KASSOLA", 
          title: "Gestora de Recursos Humanos",
          email: "anabela.kassola@email.ao",
          phone: "+244 931 445 566",
          location: "Luanda, Angola",
          role1: "Business Partner de RH",
          desc1: "Desenho e implementação de planos de carreira, recrutamento e retenção de talentos chave.",
          role2: "Analista de Desenvolvimento",
          desc2: "Coordenação de avaliações de desempenho de larga escala e planos de formação.",
          education: "Licenciatura em Gestão de Recursos Humanos - UAN",
          skills: ["Gestão de Talentos", "Relações Laborais", "Desenvolvimento", "Liderança"]
        };
      case 'technical':
        return { 
          name: "VALTER CHIPENDA", 
          title: "Desenvolvedor Full Stack",
          email: "valter.chipenda@email.ao",
          phone: "+244 945 778 899",
          location: "Huambo, Angola",
          role1: "Desenvolvedor Core Sénior",
          desc1: "Desenvolvimento de APIs robustas em Node.js e arquiteturas SPA em React/TypeScript.",
          role2: "Engenheiro de Software",
          desc2: "Desenho de bases de dados PostgreSQL seguras e otimização de consultas críticas.",
          education: "Licenciatura em Ciências da Computação - ISUTIC",
          skills: ["React / Next.js", "Node.js / Express", "PostgreSQL", "Prisma ORM"]
        };
      case 'creative':
        return { 
          name: "NAYARA BENTO", 
          title: "Motion Designer Sénior",
          email: "nayara.bento@email.ao",
          phone: "+244 922 889 900",
          location: "Luanda, Angola",
          role1: "Lead Motion Designer",
          desc1: "Criação de animações e identidades dinâmicas para campanhas publicitárias premium.",
          role2: "Designer Multimédia",
          desc2: "Produção de designs interativos e protótipos de alta fidelidade baseados em UX.",
          education: "Licenciatura em Design de Comunicação - ISIA",
          skills: ["After Effects", "UI/UX & Figma", "Motion Graphics", "Photoshop"]
        };
      case 'executive':
        return { 
          name: "RUI SARDINHA", 
          title: "Diretor Comercial & Operações",
          email: "rui.sardinha@email.ao",
          phone: "+244 929 766 995",
          location: "Luanda, Angola",
          role1: "Diretor Geral de Vendas",
          desc1: "Liderança de operações comerciais de larga escala, resultando em 45% de crescimento anual.",
          role2: "Gestor de Vendas Sénior",
          desc2: "Gestão e reestruturação da equipa comercial de alta performance com foco em conversão.",
          education: "Mestrado em Gestão de Negócios (MBA) - UAN",
          skills: ["Gestão Comercial", "Liderança de Equipas", "Negociação B2B"]
        };
      default:
        return { 
          name: "CANDIDATO ANGOLANO", 
          title: "Profissional Qualificado",
          email: "candidato@email.ao",
          phone: "+244 923 000 000",
          location: "Angola",
          role1: "Profissional Sénior",
          desc1: "Descrição da experiência profissional e conquistas mensuráveis relevantes.",
          role2: "Especialista Sénior",
          desc2: "Descrição de responsabilidades e realizações de alto impacto.",
          education: "Formação Superior Concluída",
          skills: ["Competência A", "Competência B", "Competência C"]
        };
    }
  };

  const s = getStyles();
  const info = getTemplateInfo();

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
        <div className={cn(s.name, "dark:text-white")}>{info.name}</div>
        <div className={cn(s.title, "dark:text-slate-400")}>{info.title}</div>
      </div>

      {/* Conteúdo Realista */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Se não for executive e tiver sidebar, renderiza na esquerda (como o creative) */}
        {s.sidebar && type !== 'executive' && (
          <div className={cn(s.sidebar, "dark:border-slate-800")}>
            <div className={cn(s.section, "dark:text-blue-400")}>Contacto</div>
            <div className="space-y-1 mb-4">
              <div className={cn(s.text, "dark:text-slate-400")}>{info.location}</div>
              <div className={cn(s.text, "dark:text-slate-400")}>{info.email}</div>
            </div>
            <div className={cn(s.section, "dark:text-blue-400")}>Skills</div>
            <div className="flex flex-wrap gap-1">
               {info.skills.slice(0, 2).map((skill, idx) => (
                 <div key={idx} className={cn(s.text, "dark:text-slate-400")}>{skill}</div>
               ))}
            </div>
          </div>
        )}

        <div className="flex-1">
          <div className={cn(s.section, "dark:text-blue-400")}>Experiência Profissional</div>
          <div className="space-y-3 mb-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="text-[6px] font-black text-slate-800 dark:text-slate-200">
                  {info.role1}
                </div>
                <div className="text-[5px] font-bold text-slate-400">2020 - Presente</div>
              </div>
              <div className={cn(s.text, "dark:text-slate-400")}>
                {info.desc1}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="text-[6px] font-black text-slate-800 dark:text-slate-200">
                  {info.role2}
                </div>
                <div className="text-[5px] font-bold text-slate-400">2018 - 2020</div>
              </div>
              <div className={cn(s.text, "dark:text-slate-400")}>
                {info.desc2}
              </div>
            </div>
          </div>

          <div className={cn(s.section, "dark:text-blue-400")}>Educação</div>
          <div className={cn(s.text, "dark:text-slate-400")}>
            {info.education}
          </div>
        </div>

        {/* Se for executive, renderiza a sidebar na direita (Layout Espelhado do Executivo Pro!) */}
        {s.sidebar && type === 'executive' && (
          <div className={cn(s.sidebar, "dark:border-slate-800 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 flex flex-col gap-2 shrink-0")}>
            <div className={cn(s.section, "dark:text-blue-400")}>Contacto</div>
            <div className="space-y-1 mb-3">
              <div className={cn(s.text, "dark:text-slate-400")}>{info.location}</div>
              <div className={cn(s.text, "dark:text-slate-400")}>{info.email}</div>
              <div className={cn(s.text, "dark:text-slate-400")}>{info.phone}</div>
            </div>
            <div className={cn(s.section, "dark:text-blue-400")}>Skills</div>
            <div className="flex flex-col gap-1">
               {info.skills.map((skill, idx) => (
                 <div key={idx} className={cn(s.text, "dark:text-slate-400")}>• {skill}</div>
               ))}
            </div>
          </div>
        )}
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
