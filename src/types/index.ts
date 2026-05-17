export interface TransformResult {
  title: string;
  displayName?: string;
  professionalSummary: string;
  transformedExperience: {
    role: string;
    company: string;
    period: string;
    responsibilities: string[];
  }[];
  transformedEducation: {
    degree: string;
    institution: string;
    period: string;
  }[];
  projects: {
    name: string;
    description: string;
  }[];
  skills: string[];
  languages: string[];
  atsKeywords: string[];
  coverLetter?: string;
  layoutStrategy: {
    profileType: "entry_level" | "experienced" | "operational";
  };
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
  extractedContact?: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
  plan: "free" | "pro" | "elite";
}

export interface ChatMessage {
  role: "bot" | "user";
  text: string;
  time: string;
}
