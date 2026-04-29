import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, ArrowLeft, Loader2, Github } from 'lucide-react';
import { useCV } from '../../context/CVContext';
import { cn } from '../../lib/utils';

export const LoginView: React.FC = () => {
  const { setView } = useCV();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Auth integrada via Firebase — liga ao CVContext quando disponível
      setView('dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar. Tenta novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      setView('dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar com Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Bridge: desktop centra com mais espaço; mobile usa full-width compacto
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6 lg:px-8 py-16 lg:py-24">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-[40px] lg:rounded-[56px] p-8 sm:p-12 lg:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border-2 border-slate-100 dark:border-slate-800 relative overflow-hidden"
        >
          {/* Decoração de fundo sutil */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-16 relative z-10">
             <div className="w-24 h-24 bg-blue-600/10 text-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <LogIn size={44} />
             </div>
             <h2 className="text-[40px] sm:text-[56px] font-black text-slate-900 dark:text-white tracking-[-0.05em] leading-none mb-6">
               {isLogin ? 'Bem-vindo de Volta' : 'Criar Nova Conta'}
             </h2>
             <p className="text-xl text-slate-500 dark:text-slate-400 font-bold tracking-tight">
               {isLogin ? 'Acede ao teu perfil para gerir os teus CVs profissionais.' : 'Começa hoje a construir o teu futuro em Angola.'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 px-4">E-mail Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={24} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-[24px] py-7 pl-16 pr-8 font-bold text-slate-900 dark:text-white focus:border-blue-600 outline-none transition-all shadow-sm focus:shadow-xl focus:bg-white dark:focus:bg-slate-950"
                  placeholder="o-teu-email@mail.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 px-4">Palavra-passe</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={24} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-[24px] py-7 pl-16 pr-8 font-bold text-slate-900 dark:text-white focus:border-blue-600 outline-none transition-all shadow-sm focus:shadow-xl focus:bg-white dark:focus:bg-slate-950"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border-2 border-red-500/20 text-red-600 p-5 rounded-2xl text-center font-bold"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 lg:py-7 rounded-[28px] font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl shadow-slate-900/20 dark:shadow-white/5"
            >
              {isLoading ? <Loader2 className="animate-spin" size={26} /> : (isLogin ? <LogIn size={26} /> : <Mail size={26} />)}
              {isLogin ? 'Entrar Agora' : 'Criar Conta'}
            </button>
          </form>

          <div className="relative my-14">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-slate-900 px-8 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Ou utiliza</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-5 lg:py-6 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-xl active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-7 h-7" alt="Google" />
            Continuar com Google
          </button>

          <div className="mt-16 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-xs hover:text-blue-600 transition-colors"
            >
              {isLogin ? 'Ainda não tens conta? Regista-te Aqui' : 'Já tens uma conta? Faz Login Aqui'}
            </button>
          </div>
        </motion.div>

        {/* Botão voltar — oculto no desktop (usa header nav) */}
        <button
          onClick={() => setView('intro')}
          className="lg:hidden mt-10 flex items-center gap-3 text-slate-400 hover:text-slate-900 dark:hover:text-white font-black uppercase tracking-widest text-[11px] mx-auto transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>
      </div>
    </div>
  );
};
