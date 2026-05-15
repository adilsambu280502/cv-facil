import React from 'react';
import { Answers, TransformResult } from '../../types';

interface Props {
  answers: Answers;
  result: TransformResult;
}

export const ExecutiveEliteWeb: React.FC<Props> = ({ answers, result }) => {
  return (
    <div className="w-full flex flex-col bg-white text-slate-900 min-h-[1000px] p-12 font-serif">
      {/* Header Centralizado e Sóbrio */}
      <header className="mb-16 text-center border-b border-slate-200 pb-10">
        <h1 className="text-4xl font-bold tracking-[0.2em] mb-4 uppercase text-slate-900">
          {answers.name}
        </h1>
        <p className="text-sm font-medium tracking-[0.4em] uppercase text-slate-500 mb-8">
          {result.title || 'Líder Estratégico'}
        </p>
        
        <div className="flex justify-center gap-10 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-8">
          <span>{answers.email}</span>
          <span>{answers.phone}</span>
          <span>{answers.location}</span>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="flex flex-col gap-12 max-w-3xl mx-auto w-full">
        {/* Seção: Perfil Executivo */}
        <section>
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6 bg-slate-50 py-2 text-center border-y border-slate-100">
            Perfil Executivo
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed text-justify">
            {answers.activity || result.professionalSummary}
          </p>
        </section>

        {/* Seção: Experiência e Impacto */}
        <section>
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6 bg-slate-50 py-2 text-center border-y border-slate-100">
            Experiência e Realizações
          </h2>
          <div className="space-y-10">
            <div className="text-lg text-slate-700 leading-relaxed text-justify">
              {answers.teamwork || "Experiência sólida na condução de processos e gestão de equipas."}
            </div>
            
            {answers.problemSolving && (
              <div className="p-10 border-l-4 border-slate-900 bg-slate-50">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Impacto Estratégico</p>
                <p className="text-lg text-slate-800 leading-relaxed italic">
                  {answers.problemSolving}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Seção: Educação e Skills */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6 bg-slate-50 py-2 text-center border-y border-slate-100">
              Formação Académica
            </h2>
            <p className="text-base text-slate-700 font-bold leading-relaxed">
              {answers.education || 'Informação Académica'}
            </p>
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6 bg-slate-50 py-2 text-center border-y border-slate-100">
              Domínios de Expertise
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {(answers.hardSkills?.split(',') || result.skills || []).map((skill: string, i: number) => (
                <span key={i} className="text-sm font-bold text-slate-600">
                  {typeof skill === 'string' ? skill.trim() : skill} {i < (answers.hardSkills?.split(',').length || 0) - 1 ? '•' : ''}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer Executivo */}
      <footer className="mt-auto pt-16 border-t border-slate-100 text-center">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300">
          Documento Confidencial — Gerado por CV Fácil Arquiteto de Carreira
        </p>
      </footer>
    </div>
  );
};
