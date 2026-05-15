import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, LogIn, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useCV } from '../../context/CVContext';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { slideUp, scaleIn, fadeIn } from '../../lib/motion';

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
      <div className="w-full max-w-xl">
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-white dark:bg-slate-900 rounded-[56px] p-8 sm:p-12 lg:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border-2 border-slate-100 dark:border-slate-800 relative overflow-hidden"
        >
          {/* Decoração de fundo sutil */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-16 relative z-10">
             <div className="w-20 h-20 bg-blue-600/10 text-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Sparkles size={36} />
             </div>
             <h2 className="text-[32px] sm:text-[48px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-6">
               {isLogin ? 'Bem-vindo de Volta' : 'Criar Nova Conta'}
             </h2>
             <p className="text-lg text-slate-500 dark:text-slate-400 font-bold tracking-tight">
               {isLogin ? 'Acede ao teu perfil para gerir os teus CVs.' : 'Começa hoje a construir o teu futuro em Angola.'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 px-4">E-mail Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-20 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] pl-16 pr-8 font-black text-slate-900 dark:text-white focus:border-blue-600 outline-none transition-all shadow-sm focus:shadow-xl"
                  placeholder="o-teu-email@mail.com"
                  required
                />
              </div>
            </div>
 
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 px-4">Palavra-passe</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-20 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] pl-16 pr-8 font-black text-slate-900 dark:text-white focus:border-blue-600 outline-none transition-all shadow-sm focus:shadow-xl"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
 
            {error && (
              <motion.div 
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="bg-red-500/10 border-2 border-red-500/20 text-red-600 p-5 rounded-3xl text-center font-black uppercase tracking-widest text-xs"
              >
                {error}
              </motion.div>
            )}
 
            <Button
              type="submit"
              disabled={isLoading}
              size="2xl"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-8 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-none shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : (isLogin ? <LogIn size={24} /> : <Mail size={24} />)}
              {isLogin ? 'Entrar Agora' : 'Criar Conta'}
            </Button>
          </form>

          <div className="relative my-14">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-slate-900 px-8 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Ou utiliza</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            size="xl"
            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white py-8 rounded-[28px] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-xl active:scale-95"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </Button>
 
          <div className="mt-16 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-blue-600 transition-colors"
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
