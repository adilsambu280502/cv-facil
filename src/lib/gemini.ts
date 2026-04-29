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

export async function transformExperience(rawInput: string, jobDescription?: string): Promise<TransformResult> {
  try {
    const response = await fetch('/api/transform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawInput, jobDescription }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao comunicar com o servidor.');
    }

    const data = await response.json();
    return data as TransformResult;
  } catch (error) {
    console.error("Erro na transformação de dados:", error);
    throw error;
  }
}

