import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Target, ShieldCheck, Sparkles } from 'lucide-react';

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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-gray-950 rounded-[40px] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-gray-100 dark:border-gray-900"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-900 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-20">
            <h2 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">O Projeto</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-900 p-2.5 rounded-2xl transition-all active:scale-90"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gray-900 dark:bg-white rounded-3xl mx-auto flex items-center justify-center mb-6 text-white dark:text-gray-900 shadow-2xl shadow-blue-500/10">
                <Sparkles size={32} />
              </div>
              <h3 className="text-[32px] font-black text-gray-900 dark:text-white tracking-tighter leading-tight mb-4">A Revolucionar o Recrutamento em Angola</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">Nascemos para dar às mentes brilhantes de Angola as ferramentas para mostrarem o seu valor de forma perfeita e sem frustrações.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 mb-12">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 transition-all hover:border-blue-600/20 group">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <h4 className="font-black text-gray-900 dark:text-white mb-3 text-lg">Para os Jovens</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Simplificamos o complexo processo de criar um currículo para valorizar as tuas reais capacidades e sonhos.</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 transition-all hover:border-blue-600/20 group">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <h4 className="font-black text-gray-900 dark:text-white mb-3 text-lg">Foco no Mercado</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Conhecemos os ATS e otimizamos o teu perfil para passar nos filtros reais das empresas Angolanas.</p>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-50 dark:border-gray-900 text-center">
              <div className="inline-flex items-center gap-2 mb-4 text-blue-600">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Privacidade Garantida</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xl mx-auto italic font-medium">
                "Garantir que nenhum talento fica de fora de uma entrevista apenas por não saber desenhar um PDF. Acreditamos que uma história bem contada abre qualquer porta."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
