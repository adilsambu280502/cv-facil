import React from 'react';
import { Answers, TransformResult } from '../../types';

interface Props {
  answers: Answers;
  result: TransformResult;
}

export const CleanATSWeb: React.FC<Props> = ({ answers, result }) => {
  return (
    <div className="w-full flex flex-col bg-white text-black min-h-[1000px] p-16 font-sans">
      {/* Header Centralizado ATS Style */}
      <header className="mb-12 text-center border-b-2 border-black pb-8">
        <h1 className="text-3xl font-bold mb-4 uppercase tracking-tight">
          {answers.name}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-[13px] font-bold">
          <span>{answers.email}</span>
          <span>{answers.phone}</span>
          <span>{answers.location}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[13px] font-bold mt-2 opacity-70">
          {answers.linkedin && <span>LinkedIn: {answers.linkedin}</span>}
          {answers.github && <span>GitHub: {answers.github}</span>}
        </div>
      </header>

      {/* Conteúdo Sequencial */}
      <div className="flex flex-col gap-10 max-w-4xl mx-auto w-full">
        <section>
          <h2 className="text-[14px] font-black uppercase border-b border-black mb-4 pb-1">
            Sumário Profissional
          </h2>
          <p className="text-base text-black leading-relaxed text-justify">
            {answers.activity || result.professionalSummary}
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-black uppercase border-b border-black mb-4 pb-1">
            Experiência e Competências
          </h2>
          <div className="space-y-6">
            <p className="text-base text-black leading-relaxed">
              {answers.teamwork || "Focado na entrega de resultados e colaboração eficiente."}
            </p>
            {answers.problemSolving && (
              <div className="mt-4">
                <p className="font-bold text-base mb-2">Principais Realizações:</p>
                <p className="text-base text-black leading-relaxed italic">
                  {answers.problemSolving}
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-[14px] font-black uppercase border-b border-black mb-4 pb-1">
            Habilidades Técnicas
          </h2>
          <p className="text-base text-black leading-relaxed">
            {answers.hardSkills || "Informação não fornecida."}
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-black uppercase border-b border-black mb-4 pb-1">
            Formação Académica
          </h2>
          <p className="text-base text-black font-bold leading-relaxed">
            {answers.education || 'Informação Académica'}
          </p>
        </section>
      </div>

      <footer className="mt-auto pt-10 border-t border-slate-200 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Documento Otimizado para ATS - Gerado por CV Fácil
        </p>
      </footer>
    </div>
  );
};
