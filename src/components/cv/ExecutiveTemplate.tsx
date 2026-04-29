import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Facebook, 
  Instagram, 
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
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Lock,
  Award,
  Globe,
  Briefcase
} from "lucide-react";
import { Answers, TransformResult } from "../../types";
import { cn } from "../../lib/utils";

interface TemplateProps {
  answers: Answers;
  result: TransformResult;
  hasPaid: boolean;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({
  answers,
  result,
  hasPaid,
}) => {
  const primaryColor = answers.color || "#0f172a";

  return (
    <div className="flex flex-col h-full bg-white w-full min-h-[100%] @md:min-h-[1123px] font-serif p-10 @md:p-20 selection:bg-slate-200">
      {/* Header Executivo - Autoridade Máxima */}
      <header className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-900 mb-8" style={{ backgroundColor: primaryColor }} />
        
        <h1 className="text-[42px] @md:text-[52px] font-black tracking-tighter text-slate-900 leading-none mb-4 uppercase mt-8">
          {answers.name || "O Teu Nome"}
        </h1>
        <h2 className="text-[18px] @md:text-[20px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-10">
          {result.title}
        </h2>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[13px] font-bold text-slate-600 border-t border-b border-slate-100 py-6">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-slate-400" />
            <span>{answers.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-slate-400" />
            <span>{answers.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-slate-400" />
            <span>{answers.location}</span>
          </div>
          {answers.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={14} className="text-slate-400" />
              <span>LinkedIn</span>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-14">
        {/* Sumário Executivo */}
        <section>
          <div className="flex items-center gap-6 mb-6">
             <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-[0.3em] shrink-0">Resumo Estratégico</h3>
             <div className="h-[1px] bg-slate-100 flex-1" />
          </div>
          <p className="text-[16px] text-slate-700 leading-[1.8] text-justify italic font-medium max-w-4xl mx-auto">
            "{result.professionalSummary}"
          </p>
        </section>

        {/* Experiência - Foco em Resultados */}
        <section className="relative">
          <div className="flex items-center gap-6 mb-8">
             <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-[0.3em] shrink-0">
               Trajectória Profissional
               {!hasPaid && <Lock size={16} className="inline-block ml-3 opacity-20" />}
             </h3>
             <div className="h-[1px] bg-slate-100 flex-1" />
          </div>

          <div className={cn("space-y-12 transition-all duration-700", !hasPaid && "opacity-20 blur-[4px] select-none scale-95")}>
             <div className="relative pl-8 border-l-2 border-slate-900" style={{ borderColor: primaryColor }}>
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-900 rounded-full" style={{ borderColor: primaryColor }} />
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-[20px] font-black text-slate-900 tracking-tight">{result.title}</h4>
                  <span className="text-[13px] font-black text-slate-400 uppercase tracking-widest">2020 — Presente</span>
                </div>
                <ul className="space-y-4">
                  {result.descriptionBullets.map((bullet, i) => (
                    <li key={i} className="flex gap-4 text-[15px] text-slate-700 leading-relaxed font-medium">
                       <span className="text-slate-300">•</span>
                       <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </section>

        {/* Grelha de Competências e Formação */}
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-16">
          <section>
            <div className="flex items-center gap-6 mb-8">
               <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-[0.3em] shrink-0">Áreas de Especialidade</h3>
               <div className="h-[1px] bg-slate-100 flex-1" />
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {result.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3 group">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-900 transition-all group-hover:scale-150" style={{ backgroundColor: primaryColor }} />
                   <span className="text-[14px] font-bold text-slate-700">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-6 mb-8">
               <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-[0.3em] shrink-0">Formação Académica</h3>
               <div className="h-[1px] bg-slate-100 flex-1" />
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-[14px] text-slate-800 font-bold leading-relaxed">
                 {answers.education || "Detalhes da formação de alto nível..."}
               </p>
            </div>
          </section>
        </div>

        {/* Rodapé de Prestígio */}
        <footer className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center opacity-40 grayscale">
           <div className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">CV Fácil / Executive Edition</div>
           <Award size={24} className="text-slate-900" style={{ color: primaryColor }} />
        </footer>
      </div>
    </div>
  );
};
