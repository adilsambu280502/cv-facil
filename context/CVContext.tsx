import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Answers, TransformResult, ChatMessage } from "../types";
import { transformExperience } from "../lib/gemini";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

interface CVContextType {
  step: number;
  setStep: (step: number) => void;
  answers: Answers;
  setAnswers: (answers: Answers) => void;
  result: TransformResult | null;
  setResult: (result: TransformResult | null) => void;
  hasPaid: boolean;
  setHasPaid: (paid: boolean) => void;
  user: User | null;
  loading: boolean;
  isGenerating: boolean;
  generateCV: () => Promise<void>;
  resetCV: () => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const initialAnswers: Answers = {
  name: "",
  activity: "",
  teamwork: "",
  problemSolving: "",
  timeManagement: "",
  leadership: "",
  jobDescription: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  facebook: "",
  instagram: "",
  github: "",
  education: "",
  languages: "",
  programmingLanguages: "",
  photo: "",
  template: "minimalist",
  color: "blue",
  font: "inter",
};

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  const [answers, setAnswers] = useState<Answers>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cv_answers") : null;
    return saved ? JSON.parse(saved) : initialAnswers;
  });

  const [result, setResult] = useState<TransformResult | null>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cv_result") : null;
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("cv_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (result) localStorage.setItem("cv_result", JSON.stringify(result));
  }, [result]);

  const generateCV = useCallback(async () => {
    setIsGenerating(true);
    setStep(10); // Loading step
    const combinedInput = `Atividade/Experiência: ${answers.activity}. Lidar com Desafios/Trabalhar em equipa: ${answers.teamwork}. Como resolveu problemas: ${answers.problemSolving}. Gestão de tempo/prazos: ${answers.timeManagement}. Iniciativa/Liderança: ${answers.leadership}`;

    try {
      const res = await transformExperience(combinedInput, answers.jobDescription);
      setResult(res);
      setStep(11); // Result step
    } catch (error) {
      console.error("Erro ao gerar CV:", error);
      setStep(9); // Return to review step on error
    } finally {
      setIsGenerating(false);
    }
  }, [answers]);

  const resetCV = useCallback(() => {
    setStep(0);
    setAnswers(initialAnswers);
    setResult(null);
    localStorage.removeItem("cv_answers");
    localStorage.removeItem("cv_result");
  }, []);

  return (
    <CVContext.Provider
      value={{
        step,
        setStep,
        answers,
        setAnswers,
        result,
        setResult,
        hasPaid,
        setHasPaid,
        user,
        loading,
        isGenerating,
        generateCV,
        resetCV,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
