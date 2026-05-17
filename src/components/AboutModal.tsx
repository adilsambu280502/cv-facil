import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Target, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { scaleIn, staggerContainer, slideUp } from '../lib/motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-950/60 backdrop-blur-md"
        />
        
        <motion.div 
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full max-w-2xl bg-white dark:bg-slate-950 rounded-[40px] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-slate-100 dark:border-slate-800"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-900 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-20">
            <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">O Projeto</h2>
            <Button 
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-900 p-2.5 rounded-2xl transition-all active:scale-90"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Body */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="p-8 sm:p-12 overflow-y-auto custom-scrollbar"
          >
            <motion.div variants={slideUp} className="text-center mb-12">
              <div className="w-20 h-20 bg-slate-900 dark:bg-white rounded-3xl mx-auto flex items-center justify-center mb-6 text-white dark:text-slate-900 shadow-2xl shadow-blue-500/10">
                <Target size={32} />
              </div>
              <h3 className="text-[32px] font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-4">A Revolucionar o Recrutamento em Angola</h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold max-w-lg mx-auto leading-relaxed">Nascemos para dar às mentes brilhantes de Angola as ferramentas para mostrarem o seu valor de forma perfeita e sem frustrações.</p>
            </motion.div>
 
            <motion.div variants={slideUp} className="grid gap-6 sm:grid-cols-2 mb-12">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-600/20 group">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white mb-3 text-lg tracking-tight">Para os Jovens</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold">Simplificamos o complexo processo de criar um currículo para valorizar as tuas reais capacidades e sonhos.</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-600/20 group">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white mb-3 text-lg tracking-tight">Foco no Mercado</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold">Conhecemos os ATS e otimizamos o teu perfil para passar nos filtros reais das empresas Angolanas.</p>
              </div>
            </motion.div>
 
            <motion.div variants={slideUp} className="pt-10 border-t border-slate-50 dark:border-slate-900 text-center">
              <div className="inline-flex items-center gap-2 mb-4 text-blue-600">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Privacidade Garantida</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xl mx-auto italic font-bold">
                "Garantir que nenhum talento fica de fora de uma entrevista apenas por não saber desenhar um PDF. Acreditamos que uma história bem contada abre qualquer porta."
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
