import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, collection, setDoc, Timestamp } from "firebase/firestore";
import { transformExperience } from "../lib/gemini";
import { Answers, TransformResult, CV } from "../types";

interface CVContextType {
  user: User | null;
  authLoading: boolean;
  view: 'intro' | 'wizard' | 'about' | 'login' | 'dashboard';
  setView: (view: 'intro' | 'wizard' | 'about' | 'login' | 'dashboard') => void;
  step: number;
  setStep: (step: number) => void;
  answers: Answers;
  setAnswers: (answers: Answers) => void;
  result: TransformResult | null;
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

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState<'intro' | 'wizard' | 'about' | 'login' | 'dashboard'>('intro');
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasPaid, setHasPaid] = useState(() => {
    return localStorage.getItem("cv_has_paid") === "true";
  });

  useEffect(() => {
    localStorage.setItem("cv_has_paid", hasPaid.toString());
  }, [hasPaid]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [result, setResult] = useState<TransformResult | null>(null);
  
  const [answers, setAnswers] = useState<Answers>(() => {
    const saved = localStorage.getItem("cv_answers");
    return saved ? JSON.parse(saved) : initialAnswers;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
      if (u) setView('dashboard');
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem("cv_answers", JSON.stringify(answers));
  }, [answers]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("cv_theme") === "dark";
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem("cv_theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const [error, setError] = useState<string | null>(null);

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
        Formação Académica: ${answers.education}
        Línguas: ${answers.languages || "Não referidas"}
        Linguagens de Programação: ${answers.programmingLanguages || "Não referidas"}
        Ferramentas/Software: ${answers.hardSkills || "Não referidas"}
        LinkedIn: ${answers.linkedin}
        GitHub: ${answers.github}
        Atividade Recente: ${answers.activity}
        Trabalho em Equipa: ${answers.teamwork}
        Resolução de Problemas: ${answers.problemSolving}
        Gestão de Tempo: ${answers.timeManagement}
        Liderança: ${answers.leadership}
      `;

      const res = await transformExperience(
        rawInput,
        answers.jobDescription
      );
      setResult(res);
      
      if (user) {
        const cvRef = doc(collection(db, `users/${user.uid}/cvs`));
        await setDoc(cvRef, {
          title: `CV - ${answers.jobDescription || "Geral"}`,
          data: res,
          createdAt: Timestamp.now(),
        });
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

  const logout = async () => {
    await signOut(auth);
    setView('intro');
  };

  return (
    <CVContext.Provider value={{
      user,
      authLoading,
      view,
      setView,
      step,
      setStep,
      answers,
      setAnswers,
      result,
      isGenerating,
      generateCV,
      hasPaid,
      setHasPaid,
      logout,
      showPaymentModal,
      setShowPaymentModal,
      error,
      darkMode,
      toggleDarkMode
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
