import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { transformExperience } from "../lib/gemini";
import { Answers, TransformResult, CV } from "../types";

interface CVContextType {
  user: User | null;
  session: Session | null;
  authLoading: boolean;
  view: 'intro' | 'wizard' | 'about' | 'login' | 'dashboard' | 'terms' | 'privacy' | 'import' | 'admin';
  setView: (view: 'intro' | 'wizard' | 'about' | 'login' | 'dashboard' | 'terms' | 'privacy' | 'import' | 'admin') => void;
  step: number;
  setStep: (step: number) => void;
  answers: Answers;
  setAnswers: (answers: Answers) => void;
  result: TransformResult | null;
  setResult: (res: TransformResult | null) => void;
  isGenerating: boolean;
  generateCV: () => Promise<void>;
  hasPaid: boolean;
  setHasPaid: (val: boolean) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (val: boolean) => void;
  error: string | null;
  logout: () => Promise<void>;
  darkMode: boolean;
  toggleDarkMode: () => void;
  savedCVs: CV[];
  fetchCVs: () => Promise<void>;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const initialAnswers: Answers = {
  name: "",
  email: "",
  phone: "+244 9",
  location: "",
  activity: "",
  teamwork: "",
  problemSolving: "",
  timeManagement: "",
  leadership: "",
  education: "",
  languages: "",
  hardSkills: "",
  programmingLanguages: "",
  jobDescription: "",
  linkedin: "",
  github: "",
  facebook: "",
  instagram: "",
  website: "",
  template: "minimalist",
  color: "#2563eb",
  font: "Inter",
  photo: ""
};

const formatDisplayName = (fullName: string) => {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 2) return fullName;
  return `${parts[0]} ${parts[parts.length - 1]}`;
};

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState<'intro' | 'wizard' | 'about' | 'login' | 'dashboard' | 'terms' | 'privacy' | 'import' | 'admin'>('intro');
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasPaid, setHasPaid] = useState(() => {
    return localStorage.getItem("cv_has_paid") === "true";
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [result, setResult] = useState<TransformResult | null>(null);
  const [answers, setAnswers] = useState<Answers>(() => {
    const saved = localStorage.getItem("cv_answers");
    return saved ? JSON.parse(saved) : initialAnswers;
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("cv_theme") === "dark";
  });
  const [error, setError] = useState<string | null>(null);
  const [savedCVs, setSavedCVs] = useState<CV[]>([]);

  // ── Supabase Auth: escutar mudanças de sessão ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthLoading(false);
      if (session?.user) {
        // Quando loga, buscar CVs
        fetchCVs();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Buscar CVs do Utilizador ──
  const fetchCVs = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedCVs(data || []);
      
      // Se houver um CV recente e estivermos no dashboard, carregar o último
      if (data && data.length > 0 && view === 'dashboard' && !result) {
        setAnswers(data[0].answers);
        setResult(data[0].result);
      }
    } catch (err) {
      console.error("Erro ao buscar CVs:", err);
    }
  };

  useEffect(() => {
    if (user) fetchCVs();
  }, [user]);

  // ── Persistência local ──
  useEffect(() => {
    localStorage.setItem("cv_has_paid", hasPaid.toString());
  }, [hasPaid]);

  useEffect(() => {
    localStorage.setItem("cv_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("cv_theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // ── Geração do CV ──
  const generateCV = async () => {
    setIsGenerating(true);
    setError(null);
    setStep(15); // Loading step
    try {
      const rawInput = `
        Nome: ${answers.name}
        Email: ${answers.email || "Não fornecido"}
        Telemóvel: ${answers.phone || "Não fornecido"}
        Localização: ${answers.location || "Não fornecido"}
        LinkedIn: ${answers.linkedin || "Não fornecido"}
        GitHub: ${answers.github || "Não fornecido"}
        Website/Portfólio: ${answers.website || "Não fornecido"}
        
        Formação Académica: ${answers.education}
        Línguas: ${answers.languages || "Não referidas"}
        
        Ferramentas / Software / Competências Técnicas: ${answers.hardSkills || "Não referidas"}
        Linguagens de Programação: ${answers.programmingLanguages || "Não referidas"}
        
        Atividade Principal / Experiência de Trabalho: ${answers.activity}
        Trabalho em Equipa: ${answers.teamwork}
        Resolução de Problemas: ${answers.problemSolving}
        Gestão de Tempo: ${answers.timeManagement}
        Liderança: ${answers.leadership}
      `;

      const res = await transformExperience(rawInput, answers.jobDescription);
      setResult(res);

      // Guardar CV no Supabase (só se autenticado)
      if (user) {
        const { error: insertError } = await supabase.from('resumes').insert({
          user_id: user.id,
          title: `CV - ${answers.jobDescription?.slice(0, 40) || "Geral"}`,
          template: answers.template,
          answers: answers,
          result: res,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
        if (insertError) console.error("Erro ao guardar CV:", insertError);
        fetchCVs(); // Recarregar lista
      }

      setView('dashboard');
    } catch (err) {
      console.error(err);
      setError("Falha ao comunicar com os servidores. Por favor, tenta novamente.");
      setStep(14);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Logout ──
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setSavedCVs([]);
    setResult(null);
    setAnswers(initialAnswers);
    setView('intro');
  };

  return (
    <CVContext.Provider value={{
      user,
      session,
      authLoading,
      view,
      setView,
      step,
      setStep,
      answers,
      setAnswers,
      result,
      setResult,
      isGenerating,
      generateCV,
      hasPaid,
      setHasPaid,
      logout,
      showPaymentModal,
      setShowPaymentModal,
      error,
      darkMode,
      toggleDarkMode,
      savedCVs,
      fetchCVs
    }}>
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error("useCV must be used within a CVProvider");
  return context;
};
