import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, X, AlertCircle } from 'lucide-react';
import { signInWithPopup, auth, provider, appleProvider } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          <div className="p-6">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors active:scale-95"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-8 mt-2">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Criar ou Aceder</h2>
              <p className="text-gray-500 text-sm mt-1">Guarda os teus currículos na nuvem</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex gap-2 items-start">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {method === 'select' ? (
              <div className="space-y-3">
                <button 
                  onClick={handleAppleLogin}
                  disabled={loading}
                  className="w-full bg-black hover:bg-black/90 border border-black text-white rounded-xl py-3.5 px-4 font-semibold text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.067 1.52-.058 2.095-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.554 3.6-3.014.896-1.309 1.265-2.583 1.306-2.648-.028-.016-2.478-.948-2.504-3.791-.025-2.378 1.942-3.535 2.032-3.593-1.12-1.638-2.859-1.859-3.486-1.884-2.046-.172-3.978 1.258-5.021 1.258-1.047 0-2.617-1.166-4.225-1.183zM15.42 4.41c.85-.987 1.424-2.36 1.268-3.725-1.168.047-2.61.765-3.489 1.775-.705.787-1.336 2.183-1.157 3.522 1.3-.095 2.65-.806 3.378-1.572z"/>
                  </svg>
                  Continuar com a Apple
                </button>
                
                <button 
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl py-3.5 px-4 font-semibold text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continuar com o Google
                </button>

                <button 
                  onClick={() => setMethod('email')}
                  disabled={loading}
                  className="w-full bg-gray-900 border border-gray-900 hover:bg-black text-white rounded-xl py-3.5 px-4 font-semibold text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  <Mail size={18} />
                  Continuar com E-mail
                </button>

                <button 
                  onClick={handleWhatsAppClick}
                  disabled={loading}
                  className="w-full bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 text-[#075E54] rounded-xl py-3.5 px-4 font-semibold text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  <Phone size={18} />
                  Continuar com WhatsApp
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 ml-1">E-mail</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="teu@email.com"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 ml-1">Palavra-passe</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  />
                </div>
                
                <div className="pt-2 flex flex-col gap-2">
                  <button 
                    type="submit"
                    disabled={loading || !email || !password}
                    className="w-full bg-gray-900 hover:bg-black disabled:opacity-50 text-white rounded-xl py-3.5 px-4 font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    {loading ? 'A processar...' : 'Entrar / Registar'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMethod('select')}
                    className="w-full text-gray-500 hover:text-gray-900 text-sm font-medium py-2 transition-colors"
                  >
                    Voltar às opções
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
