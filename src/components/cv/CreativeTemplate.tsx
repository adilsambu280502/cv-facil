import React from "react";
import { 
  Lock 
} from "lucide-react";
import { Answers, TransformResult } from "../../types";
import { cn } from "../../lib/utils";

interface TemplateProps {
  answers: Answers;
  result: TransformResult;
  hasPaid: boolean;
}

import React from "react";
import { 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe,
  Award,
  Zap,
  Target
} from "lucide-react";
import { Answers, TransformResult } from "../../types";
import { cn } from "../../lib/utils";

interface TemplateProps {
  answers: Answers;
  result: TransformResult;
  hasPaid: boolean;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({
  answers,
  result,
  hasPaid,
}) => {
  const primaryColor = answers.color || "#2563eb";
  
  // Sistema de Monograma Automático
  const initials = answers.name 
    ? answers.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "CV";

  return (
    <div className="flex flex-col h-full bg-white w-full min-h-[100%] @md:min-h-[1123px] font-sans selection:bg-blue-100">
      {/* Header Estilo Glassmorphism / Creative */}
      <div className="relative w-full h-[280px] @md:h-[320px] overflow-hidden flex items-end">
        {/* Background Abstract Shapes */}
        <div 
          className="absolute inset-0 opacity-90 transition-colors duration-700" 
          style={{ backgroundColor: primaryColor }}
        />
        <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20px] left-[-20px] w-[200px] h-[200px] bg-black/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 w-full p-8 @md:p-14 flex flex-col @md:flex-row items-center @md:items-end gap-8 @md:gap-10">
          {/* Avatar / Monograma */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all" />
            <div className="relative w-28 h-28 @md:w-40 @md:h-40 rounded-full border-4 border-white overflow-hidden bg-white shadow-2xl flex items-center justify-center">
              {answers.photo ? (
                <img src={answers.photo} alt={answers.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl @md:text-6xl font-black tracking-tighter" style={{ color: primaryColor }}>
                  {initials}
                </span>
              )}
            </div>
          </div>

          <div className="text-center @md:text-left flex-1 pb-2">
            <h1 className="text-[36px] @md:text-[56px] font-black text-white tracking-tighter leading-[0.9] mb-4 uppercase drop-shadow-md">
              {answers.name || "O Teu Nome"}
            </h1>
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30">
              <Zap size={16} className="text-white fill-white animate-pulse" />
              <span className="text-white text-xs @md:text-sm font-black uppercase tracking-widest">{result.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col @md:flex-row">
        {/* Sidebar Esquerda - Infos Rápidas */}
        <div className="w-full @md:w-[35%] bg-slate-50 p-8 @md:p-12 border-r border-slate-100 flex flex-col gap-10">
          <section>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <div className="w-6 h-[2px] rounded-full" style={{ backgroundColor: primaryColor }} />
              Contacto
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors border border-slate-100">
                  <Mail size={16} />
                </div>
                <span className="text-[13px] font-bold text-slate-600 truncate">{answers.email || "email@exemplo.com"}</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors border border-slate-100">
                  <Phone size={16} />
                </div>
                <span className="text-[13px] font-bold text-slate-600">{answers.phone || "9XX XXX XXX"}</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors border border-slate-100">
                  <MapPin size={16} />
                </div>
                <span className="text-[13px] font-bold text-slate-600">{answers.location || "Luanda, Angola"}</span>
              </div>
              {answers.linkedin && (
                <div className="flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors border border-slate-100">
                    <Linkedin size={16} />
                  </div>
                  <span className="text-[13px] font-bold text-slate-600 truncate">{answers.linkedin}</span>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <div className="w-6 h-[2px] rounded-full" style={{ backgroundColor: primaryColor }} />
              Top Skills
              {!hasPaid && <Lock size={12} className="opacity-40" />}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {result.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className={cn(
                    "px-4 py-2 rounded-xl text-[11px] font-black border transition-all",
                    !hasPaid ? "opacity-30 grayscale blur-[1px]" : "bg-white text-slate-700 border-slate-200 hover:border-blue-600 hover:text-blue-600 shadow-sm"
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <div className="w-6 h-[2px] rounded-full" style={{ backgroundColor: primaryColor }} />
              Formação
            </h3>
            <div className="p-5 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
              <p className="text-[13px] text-slate-600 leading-relaxed font-bold">
                {answers.education || "Detalhes da formação académica..."}
              </p>
            </div>
          </section>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-8 @md:p-14 bg-white relative">
          <div className="max-w-[550px]">
            <section className="mb-14">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
                    <Target size={24} />
                 </div>
                 <h3 className="text-[18px] font-black text-slate-900 uppercase tracking-tight">Objetivo & Perfil</h3>
              </div>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-medium text-justify">
                {result.professionalSummary}
              </p>
            </section>

            <section className="mb-14">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
                    <Award size={24} />
                 </div>
                 <h3 className="text-[18px] font-black text-slate-900 uppercase tracking-tight">
                   Experiência{" "}
                   {!hasPaid && <Lock size={16} className="inline-block ml-2 opacity-30" />}
                 </h3>
              </div>
              
              <div className="space-y-10 relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-slate-100" />

                {result.descriptionBullets.map((bullet, i) => (
                  <div key={i} className={cn(
                    "relative pl-16 group transition-all duration-700",
                    !hasPaid && "opacity-20 blur-[3px] select-none scale-95"
                  )}>
                    <div 
                      className="absolute left-[20px] top-1 w-3 h-3 rounded-full border-[3px] border-white ring-4 ring-slate-50 transition-all group-hover:scale-150" 
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group-hover:border-blue-600/20 group-hover:bg-white group-hover:shadow-xl transition-all">
                      <p className="text-[14px] text-slate-700 leading-relaxed font-bold">
                        {bullet}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Decoração Final */}
          <div className="absolute bottom-10 right-10 opacity-10 grayscale">
             <img src="/logo.png" alt="CV Fácil" className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
