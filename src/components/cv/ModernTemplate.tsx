import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Lock
} from "lucide-react";
import { Answers, TransformResult } from "../../types";
import { cn } from "../../lib/utils";

interface TemplateProps {
  answers: Answers;
  result: TransformResult;
  hasPaid: boolean;
}

export const ModernTemplate: React.FC<TemplateProps> = ({
  answers,
  result,
  hasPaid,
}) => {
  const primaryColor = answers.color || "#2563eb";
  
  const initials = answers.name 
    ? answers.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "CV";

  return (
    <div className="flex flex-col @md:flex-row w-full h-full min-h-[100%] @md:min-h-[1123px] bg-white font-sans">
      {/* Sidebar - Otimizada para Estética e Exportação */}
      <div 
        className="w-full @md:w-[32%] text-white p-8 @md:p-12 flex flex-col relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
        
        {/* Avatar / Monograma Moderno */}
        <div className="w-28 h-28 @md:w-36 @md:h-36 rounded-[32px] overflow-hidden border-4 border-white/20 mb-10 mx-auto relative z-10 shadow-2xl flex items-center justify-center bg-white/10 backdrop-blur-sm">
          {answers.photo ? (
            <img src={answers.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl @md:text-5xl font-black text-white tracking-tighter">{initials}</span>
          )}
        </div>

        <div className="space-y-10 relative z-10">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[3px] text-white/50 mb-6 border-b border-white/10 pb-2">
              Contacto
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white/40 shrink-0" />
                <span className="text-[13px] break-all">{answers.email || "email@exemplo.com"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white/40 shrink-0" />
                <span className="text-[13px]">{answers.phone || "9XX XXX XXX"}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-white/40 shrink-0" />
                <span className="text-[13px]">{answers.location || "Angola"}</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[3px] text-white/50 mb-6 border-b border-white/10 pb-2">
              Educação
              {!hasPaid && <Lock size={12} className="inline-block ml-2 opacity-30" />}
            </h3>
            <p className="text-[13px] text-white/80 leading-relaxed font-medium whitespace-pre-line">
              {answers.education || "Detalhes da formação..."}
            </p>
          </section>

          {answers.languages && (
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[3px] text-white/50 mb-6 border-b border-white/10 pb-2">
                Idiomas
              </h3>
              <p className="text-[13px] text-white/80 leading-relaxed font-medium">
                {answers.languages}
              </p>
            </section>
          )}
        </div>
      </div>

      {/* Conteúdo Principal - Minimalismo Moderno */}
      <div className="w-full @md:w-[68%] p-8 @md:p-16 flex flex-col bg-white">
        <header className="mb-14">
          <h1 className="text-[36px] @md:text-[52px] font-black leading-[0.9] tracking-tighter mb-4 uppercase text-slate-900">
            {answers.name || "O Teu Nome"}
          </h1>
          <div className="flex items-center gap-4">
             <div className="h-1 w-12 rounded-full" style={{ backgroundColor: primaryColor }} />
             <h2 className="text-[18px] @md:text-[22px] font-bold text-slate-400 tracking-tight">
               {result.title}
             </h2>
          </div>
        </header>

        <section className="mb-14">
          <h3 className="text-[13px] font-black uppercase tracking-[4px] text-slate-900 mb-6">
            Perfil Profissional
          </h3>
          <p className="text-[15px] text-slate-600 leading-relaxed font-medium text-justify">
            {result.professionalSummary}
          </p>
        </section>

        <section className="mb-14 relative">
          <h3 className="text-[13px] font-black uppercase tracking-[4px] text-slate-900 mb-8">
            Experiência
            {!hasPaid && <Lock size={14} className="inline-block ml-3 opacity-20" />}
          </h3>
          
          <div className={cn("space-y-8", !hasPaid && "opacity-20 blur-[3px] select-none scale-[0.98] transition-all")}>
            <div className="relative pl-6 border-l-2 border-slate-100">
               <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-slate-200" />
               <h4 className="text-[16px] font-black text-slate-900 mb-4 uppercase tracking-tighter">{result.title}</h4>
               <ul className="space-y-4">
                 {result.descriptionBullets.map((bullet, i) => (
                   <li key={i} className="text-[14px] text-slate-600 leading-relaxed flex gap-3">
                     <span className="font-black" style={{ color: primaryColor }}>→</span>
                     <span>{bullet}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </section>

        <section className="mt-auto pt-10 border-t border-slate-50">
          <h3 className="text-[11px] font-black uppercase tracking-[3px] text-slate-300 mb-6">
            Expertise & Talento
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill) => (
              <span
                key={skill}
                className="bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-[12px] font-black border border-slate-100 hover:border-slate-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
