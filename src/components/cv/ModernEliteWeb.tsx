import React from 'react';
import { Answers, TransformResult } from '../../types';
import { cn } from '../../lib/utils';

interface Props {
  answers: Answers;
  result: TransformResult;
  hasPaid?: boolean;
}

export const ModernEliteWeb: React.FC<Props> = ({ answers, result, hasPaid }) => {
  const primaryColor = answers.color || '#2563eb';
  
  return (
    <div className="w-full flex flex-col bg-white text-slate-900 min-h-[1000px]">
      {/* Header Premium */}
      <header className="mb-12 border-b-4 pb-10 transition-colors duration-500" style={{ borderBottomColor: primaryColor }}>
        <h1 className="text-5xl font-black tracking-tight mb-2 uppercase">{answers.name}</h1>
        <p className="text-xl font-bold tracking-widest uppercase transition-colors duration-500" style={{ color: primaryColor }}>
          {result.title || 'Profissional de Excelência'}
        </p>
        
        <div className="flex flex-wrap gap-6 mt-8 text-slate-500 font-bold text-sm">
          <span className="flex items-center gap-2">{answers.email}</span>
          <span className="flex items-center gap-2">{answers.phone}</span>
          <span className="flex items-center gap-2">{answers.location}</span>
        </div>
      </header>

      {/* Grid Principal */}
      <div className="flex flex-col gap-10">
        {/* Seção: Perfil */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-4">
            Perfil Profissional
            <div className="h-px flex-1 bg-slate-100" />
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            {answers.activity || result.professionalSummary}
          </p>
        </section>

        {/* Seção: Competências */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-4">
            Competências Chave
            <div className="h-px flex-1 bg-slate-100" />
          </h2>
          <div className="flex flex-wrap gap-3">
            {(answers.hardSkills?.split(',') || result.skills || []).map((skill: string, i: number) => (
              <span key={i} className="px-5 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black text-slate-700 uppercase tracking-tight hover:border-blue-600/20 transition-all">
                {typeof skill === 'string' ? skill.trim() : skill}
              </span>
            ))}
          </div>
        </section>

        {/* Seção: Experiência / Resolução de Problemas */}
        {answers.problemSolving && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-4">
              Realizações e Impacto
              <div className="h-px flex-1 bg-slate-100" />
            </h2>
            <div className="p-8 bg-blue-600/5 rounded-[40px] border-2 border-blue-600/10 border-dashed">
              <p className="text-lg text-slate-800 leading-relaxed italic font-medium">
                "{answers.problemSolving}"
              </p>
            </div>
          </section>
        )}

        {/* Seção: Educação */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-4">
            Educação e Formação
            <div className="h-px flex-1 bg-slate-100" />
          </h2>
          <div className="p-6 bg-slate-50/50 rounded-3xl border-2 border-slate-100">
             <p className="text-lg text-slate-800 font-bold">{answers.education || 'Informação Académica'}</p>
          </div>
        </section>
      </div>

      {/* Footer / Marca de Água Premium */}
      <footer className="mt-auto pt-10 border-t-2 border-slate-50 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
          Documento Estruturado pelo Arquiteto de Carreira — CV Fácil
        </p>
      </footer>
    </div>
  );
};
