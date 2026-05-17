import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileWarning, CheckCircle2 } from 'lucide-react';
import { slideUp, staggerContainer } from '../../lib/motion';

export const ATSSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left: Copy */}
          <div>
            <motion.p variants={slideUp} className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-4 opacity-80">
              A Barreira Invisível
            </motion.p>
            <motion.h2 variants={slideUp} className="text-[36px] sm:text-[48px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white mb-6">
              O que é um <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Currículo ATS?</span>
            </motion.h2>
            
            <motion.p variants={slideUp} className="text-lg text-slate-500 dark:text-slate-400 font-semibold leading-relaxed mb-8">
              A maioria das empresas modernas utiliza Sistemas de Rastreamento de Candidatos (ATS) para analisar e filtrar automaticamente milhares de currículos antes que um recrutador humano os veja.
            </motion.p>

            <motion.div variants={slideUp} className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0 mt-1 shadow-inner border border-rose-500/20">
                  <FileWarning className="text-rose-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-black text-xl mb-2">O Problema Oculto</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-medium leading-relaxed">
                    Mais de 75% dos currículos convencionais são sumariamente rejeitados por estes sistemas. Formatações complexas ou designs amadores confundem os algoritmos, e tu és ignorado sem sequer seres avaliado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0 mt-1 shadow-inner border border-blue-600/20">
                  <ShieldCheck className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-black text-xl mb-2">A Solução Sem Esforço</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-medium leading-relaxed">
                    O nosso sistema estrutura os teus dados na linguagem exata e limpa que os algoritmos ATS exigem. Sem precisares de conhecimentos técnicos: tu inseres a tua experiência, e nós garantimos que passas na triagem.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual Experience */}
          <motion.div variants={slideUp} className="relative">
             <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-slate-50 dark:bg-slate-900/40 rounded-[40px] border-2 border-slate-100 dark:border-slate-800/60 p-8 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden group">
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent pointer-events-none z-0" />
                
                {/* Visual Representation of ATS processing */}
                <div className="relative z-10 w-full max-w-md">
                   <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 mb-6 transform group-hover:-translate-y-4 transition-transform duration-700 ease-out">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 border-2 border-blue-600 rounded-full animate-[spin_4s_linear_infinite] border-t-transparent" />
                          <CheckCircle2 className="text-blue-600 w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">Processamento</div>
                          <div className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Leitura de Perfil</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-600 w-full animate-pulse" />
                        </div>
                        <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500 w-full animate-pulse" style={{ animationDelay: "150ms" }} />
                        </div>
                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-400 w-full animate-pulse" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                   </div>

                   <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-2xl flex items-center justify-between transform group-hover:scale-[1.02] transition-transform duration-500 delay-100 ml-auto w-4/5">
                     <div className="flex items-center gap-3">
                        <ShieldCheck className="text-emerald-500 w-5 h-5" />
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Estrutura Validada</span>
                     </div>
                     <span className="text-xl font-black text-emerald-500">100%</span>
                   </div>
                </div>

             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
