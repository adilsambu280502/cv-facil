import React from 'react';
import { motion } from 'motion/react';
import { Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { slideUp, staggerContainer } from '../../lib/motion';

export const CoverLetterSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left: Visual Experience */}
          <motion.div variants={slideUp} className="order-2 lg:order-1 relative">
             <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-slate-800/50 dark:bg-slate-900/80 rounded-[40px] border border-slate-700/50 p-8 sm:p-12 flex items-center justify-center relative overflow-hidden group">
                
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* CV Document */}
                  <div className="absolute left-2 sm:left-12 w-[48%] h-[80%] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5 transform -rotate-6 group-hover:-rotate-12 group-hover:-translate-x-6 transition-all duration-700 ease-out z-10">
                    <div className="w-1/3 h-2 bg-blue-100 dark:bg-blue-900/30 rounded mb-5" />
                    <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded mb-3" />
                    <div className="w-5/6 h-1 bg-slate-100 dark:bg-slate-800 rounded mb-5" />
                    <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded mb-3" />
                    <div className="w-4/5 h-1 bg-slate-100 dark:bg-slate-800 rounded mb-3" />
                    <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded mb-3" />
                    <div className="absolute bottom-5 right-5 text-[9px] font-black tracking-widest text-slate-300">CURRÍCULO</div>
                  </div>

                  {/* Link Badge */}
                  <div className="absolute z-30 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-600/30 border-4 border-slate-900 transform group-hover:scale-110 transition-transform duration-500 delay-100">
                    <LinkIcon className="text-white w-6 h-6" />
                  </div>

                  {/* Cover Letter Document */}
                  <div className="absolute right-2 sm:right-12 w-[48%] h-[80%] bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5 transform rotate-6 group-hover:rotate-12 group-hover:translate-x-6 transition-all duration-700 ease-out z-10">
                    <div className="w-1/2 h-2 bg-slate-200 dark:bg-slate-700 rounded mb-8 mt-4" />
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                    <div className="w-3/4 h-1 bg-slate-200 dark:bg-slate-700 rounded mb-8" />
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                    <div className="w-5/6 h-1 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="absolute bottom-5 left-5 text-[9px] font-black tracking-widest text-slate-400">CARTA</div>
                  </div>
                </div>

             </div>
          </motion.div>

          {/* Right: Copy */}
          <div className="order-1 lg:order-2">
            <motion.p variants={slideUp} className="text-xs font-black uppercase tracking-[0.4em] text-blue-400 mb-4 opacity-80">
              O Combo Perfeito
            </motion.p>
            <motion.h2 variants={slideUp} className="text-[36px] sm:text-[48px] lg:text-[56px] font-black leading-[1.05] tracking-tight text-white mb-6">
              O Currículo abre a porta. A <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Carta fecha o negócio.</span>
            </motion.h2>
            
            <motion.p variants={slideUp} className="text-lg text-slate-400 font-semibold leading-relaxed mb-8">
              Um currículo diz o que fizeste, mas uma Carta de Apresentação explica apaixonadamente por que razão tu és a escolha certa. É a tua voz antes da entrevista.
            </motion.p>

            <motion.div variants={slideUp} className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                <CheckCircle2 className="text-emerald-400 w-6 h-6 shrink-0" />
                <p className="text-slate-300 text-sm font-medium">Todos os <strong className="text-white">modelos premium (pagos)</strong> incluem automaticamente a carta de apresentação com o mesmo design e estrutura.</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                <CheckCircle2 className="text-emerald-400 w-6 h-6 shrink-0" />
                <p className="text-slate-300 text-sm font-medium">Não precisas de pensar no layout. Nós garantimos a consistência visual que impressiona os recrutadores de elite.</p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
