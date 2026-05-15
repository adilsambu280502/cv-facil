import React from 'react';
import { Answers, TransformResult } from '../../types';

interface Props {
  answers: Answers;
  result: TransformResult;
}

export const CreativeEliteWeb: React.FC<Props> = ({ answers, result }) => {
  return (
    <div className="w-full flex bg-white min-h-[1000px] shadow-2xl rounded-sm overflow-hidden font-sans">
      {/* Sidebar Esquerda */}
      <aside className="w-[30%] bg-slate-900 text-white p-8 flex flex-col gap-10">
        <div className="flex flex-col items-center">
          {answers.photo ? (
             <div className="w-24 h-24 rounded-full border-4 border-blue-400 overflow-hidden mb-6 shadow-xl">
               <img src={answers.photo} alt="Profile" className="w-full h-full object-cover" />
             </div>
          ) : (
             <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6">
               <span className="text-2xl font-black text-slate-500">{answers.name.charAt(0)}</span>
             </div>
          )}
        </div>

        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 border-b border-slate-800 pb-2">Contacto</h3>
          <ul className="space-y-3 text-[11px] text-slate-400 font-bold">
            <li className="flex flex-col gap-0.5">
              <span className="text-white text-[9px] uppercase tracking-widest opacity-40">Telefone</span>
              {answers.phone}
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="text-white text-[9px] uppercase tracking-widest opacity-40">Email</span>
              {answers.email}
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="text-white text-[9px] uppercase tracking-widest opacity-40">Local</span>
              {answers.location}
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 border-b border-slate-800 pb-2">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {(answers.hardSkills?.split(',') || []).map((s: string, i: number) => (
              <span key={i} className="px-3 py-1.5 bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-wider text-white hover:bg-blue-600 transition-colors">
                {s.trim()}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 border-b border-slate-800 pb-2">Educação</h3>
          <p className="text-[11px] text-slate-300 font-bold leading-relaxed">
            {answers.education || 'Informação Académica'}
          </p>
        </section>
      </aside>

      {/* Conteúdo Principal Direita */}
      <main className="w-[70%] p-12 flex flex-col">
        <div className="mb-16">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4 uppercase">
            {answers.name}
          </h1>
          <p className="text-lg font-black text-blue-600 uppercase tracking-[0.4em]">
            {result.title || 'Criativo de Vanguarda'}
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              Sobre Mim
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium text-justify">
              {answers.activity || result.professionalSummary}
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              Trabalho em Equipa
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              {answers.teamwork || "Focado na colaboração e excelência criativa."}
            </p>
          </section>

          {answers.problemSolving && (
            <section>
              <h2 className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">
                <span className="w-8 h-[2px] bg-blue-600"></span>
                Diferencial Criativo
              </h2>
              <div className="p-8 bg-blue-50 rounded-3xl border-2 border-blue-100">
                <p className="text-lg text-blue-900 leading-relaxed italic font-bold">
                  {answers.problemSolving}
                </p>
              </div>
            </section>
          )}
        </div>

        <footer className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">© 2026 CV Fácil</span>
          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Arquiteto de Carreira</span>
        </footer>
      </main>
    </div>
  );
};
