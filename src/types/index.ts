import { Timestamp } from "firebase/firestore";

export interface TransformResult {
  title: string;
  professionalSummary: string;
  descriptionBullets: string[];
  skills: string[];
  atsKeywords: string[];
  coverLetter?: string;
  score: number;
  scoreFeedback: {
    strengths: { point: string; explanation: string }[];
    improvements: { point: string; actionableAdvice: string }[];
  };
  recruiterSimulation: {
    sixSecondImpression: string;
    highlights: string[];
    rejectionRisks: string[];
  };
}

export interface Answers {
  name: string;
  activity: string;
  teamwork: string;
  problemSolving: string;
  timeManagement: string;
  leadership: string;
  jobDescription: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  facebook: string;
  instagram: string;
  github: string;
  education: string;
  languages: string;
  hardSkills: string;
  programmingLanguages: string;
  photo: string;
  template: "minimalist" | "modern" | "executive" | "creative" | "technical";
  color: string;
  font: string;
}

export interface CV {
  id?: string;
  userId: string;
  answers: Answers;
  result: TransformResult;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  plan: "free" | "premium";
}

export interface ChatMessage {
  role: "bot" | "user";
  text: string;
  time: string;
}
