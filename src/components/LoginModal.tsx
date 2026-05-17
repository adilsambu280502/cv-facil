import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, X, AlertCircle, Loader2 } from 'lucide-react';
import { signInWithPopup, auth, provider, appleProvider } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { slideUp, fadeIn, scaleIn } from '../lib/motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [method, setMethod] = useState<'select' | 'email'>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (e: any) {
      console.error(e);
      setError('Erro ao entrar com o Google. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithPopup(auth, appleProvider);
      onSuccess();
    } catch (e: any) {
      console.error(e);
      setError('Erro ao entrar com a Apple. Tenta novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Import signInWithEmailAndPassword dynamically here to avoid clutter if not used
      const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import('firebase/auth');
      
      try {
        await signInWithEmailAndPassword(auth, email, password);
        onSuccess();
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          // If not found, create one (simple flow for demo, in prod better to have separate forms)
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            onSuccess();
          } catch (createErr: any) {
            console.error(createErr);
            setError(createErr.message || 'Erro ao criar conta.');
          }
        } else {
          setError(err.message || 'Erro ao fazer login.');
        }
      }
    } catch (err: any) {
      console.error(err);
      setError('Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    setError('O login por WhatsApp ficará disponível em breve!');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        
        <motion.div 
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden z-10 border border-slate-100 dark:border-slate-800"
        >
          <div className="p-8">
            <Button 
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all active:scale-95"
            >
              <X size={18} />
            </Button>            <div className="text-center mb-10 mt-2">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl mx-auto flex items-center justify-center mb-6">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">Criar conta é chato, nós sabemos.</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold mt-3">Mas prometemos que o teu currículo vai agradecer o esforço.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-sm font-bold flex gap-3 items-start">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {method === 'select' ? (
              <div className="space-y-4">
                <Button 
                  onClick={handleAppleLogin}
                  disabled={loading}
                  size="lg"
                  className="w-full bg-black hover:bg-black/90 text-white rounded-2xl py-7 font-black text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-none shadow-xl"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.067 1.52-.058 2.095-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.554 3.6-3.014.896-1.309 1.265-2.583 1.306-2.648-.028-.016-2.478-.948-2.504-3.791-.025-2.378 1.942-3.535 2.032-3.593-1.12-1.638-2.859-1.859-3.486-1.884-2.046-.172-3.978 1.258-5.021 1.258-1.047 0-2.617-1.166-4.225-1.183zM15.42 4.41c.85-.987 1.424-2.36 1.268-3.725-1.168.047-2.61.765-3.489 1.775-.705.787-1.336 2.183-1.157 3.522 1.3-.095 2.65-.806 3.378-1.572z"/>
                  </svg>
                  Entrar com Apple
                </Button>
                
                <Button 
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  variant="outline"
                  size="lg"
                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl py-7 font-black text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Entrar com Google
                </Button>

                <Button 
                  onClick={() => setMethod('email')}
                  disabled={loading}
                  size="lg"
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl py-7 font-black text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-none shadow-xl"
                >
                  <Mail size={20} />
                  Entrar com E-mail
                </Button>

                <Button 
                  onClick={handleWhatsAppClick}
                  disabled={loading}
                  variant="outline"
                  size="lg"
                  className="w-full bg-green-500/10 dark:bg-green-500/5 border-2 border-green-500/20 hover:bg-green-500/20 text-green-700 dark:text-green-400 rounded-2xl py-7 font-black text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  <Phone size={20} />
                  Entrar com WhatsApp
                </Button>
              </div>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">E-mail</label>
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="teu@email.com"
                    className="h-16 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-6 font-bold focus:border-blue-600 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Palavra-passe</label>
                  <Input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Mínimo 6 caracteres"
                    className="h-16 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-6 font-bold focus:border-blue-600 transition-all shadow-sm"
                  />
                </div>
                
                <div className="pt-4 flex flex-col gap-3">
                  <Button 
                    type="submit"
                    disabled={loading || !email || !password}
                    size="2xl"
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] border-none shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Entrar na minha conta'}
                  </Button>
                  <Button 
                    type="button"
                    variant="ghost"
                    onClick={() => setMethod('select')}
                    className="w-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-black uppercase tracking-[0.2em] py-4 transition-colors"
                  >
                    Voltar às opções
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
