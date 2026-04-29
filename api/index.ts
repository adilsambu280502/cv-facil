import express from "express";
import Stripe from "stripe";
import * as dotenv from "dotenv";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

dotenv.config();

let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

let aiClient: GoogleGenerativeAI | null = null;
function getAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        throw new Error('GEMINI_API_KEY is not defined');
    }
    aiClient = new GoogleGenerativeAI(key);
  }
  return aiClient;
}

const app = express();
app.use(express.json());

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", environment: "vercel" });
});

app.post("/api/transform", async (req, res) => {
  try {
    const { rawInput, jobDescription } = req.body;
    const ai = getAI();
    const MODEL_NAME = "gemini-1.5-pro"; // Usando a versão estável e recomendada

    const prompt = `
    És um Headhunter Senior e Especialista em Empregabilidade Jovem (focado exclusivamente no mercado angolano).
    O teu objetivo é pegar numa experiência de vida, trabalho prático, projeto escolar, voluntariado ou apoio familiar e "traduzir" isso para a linguagem corporativa que o mercado de trabalho angolano (e os sistemas ATS) valoriza. Escreve sempre em Português de Angola (formal/corporativo, sem gírias, mas com fluidez natural do mercado angolano).
  
    Contexto do utilizador (Experiência descrita das palavras dele):
    "${rawInput}"
  
    A tua tarefa:
    1. Identificar um Título Profissional realista (Júnior, Assistente, Apoio, Operador).
    2. Criar um Resumo Profissional (professionalSummary) de 2-3 frases focado de forma geral no perfil. ${jobDescription ? 'Deves adaptar fortemente este resumo para bater certo com a seguinte vaga: ' + jobDescription : ''}
    3. Escrever 2 a 3 bullet points descrevendo a responsabilidade usando "Verbos de Ação" no passado.
    4. Extrair 3 a 5 Competências Chave (Soft ou Hard skills).
    5. Identificar uma lista de Palavras-Chave ATS (atsKeywords).
    6. Atribuir um "Score" de 0 a 100.
    7. Fornecer feedback detalhado (pontos fortes e conselhos claros de melhoria).
    8. Para a rubrica "Simulação de Recrutador", imagina o que o chefe dos Recursos Humanos pensaria ao olhar para o CV em apenas 6 segundos.
    ${jobDescription ? '9. Cria uma Carta de Apresentação (coverLetter) pronta a enviar adaptada à vaga. Máximo 2 parágrafos precisos.' : ''}
  
    Retorna EXCLUSIVAMENTE um objeto JSON estrito com esta estrutura.
    `;

    const result = await ai.getGenerativeModel({ model: MODEL_NAME }).generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            title: { type: SchemaType.STRING },
            professionalSummary: { type: SchemaType.STRING },
            descriptionBullets: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            skills: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            atsKeywords: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            score: { type: SchemaType.NUMBER },
            scoreFeedback: {
              type: SchemaType.OBJECT,
              properties: {
                strengths: {
                  type: SchemaType.ARRAY,
                  items: { 
                    type: SchemaType.OBJECT,
                    properties: { point: { type: SchemaType.STRING }, explanation: { type: SchemaType.STRING } },
                    required: ["point", "explanation"]
                  },
                },
                improvements: {
                  type: SchemaType.ARRAY,
                  items: { 
                    type: SchemaType.OBJECT,
                    properties: { point: { type: SchemaType.STRING }, actionableAdvice: { type: SchemaType.STRING } },
                    required: ["point", "actionableAdvice"]
                  },
                }
              },
              required: ["strengths", "improvements"]
            },
            recruiterSimulation: {
              type: SchemaType.OBJECT,
              properties: {
                sixSecondImpression: { type: SchemaType.STRING },
                highlights: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                rejectionRisks: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
              },
              required: ["sixSecondImpression", "highlights", "rejectionRisks"]
            },
            coverLetter: { type: SchemaType.STRING }
          },
          required: ["title", "professionalSummary", "descriptionBullets", "skills", "atsKeywords", "score", "scoreFeedback", "recruiterSimulation"],
        },
        temperature: 0.2,
      },
    });

    const response = result.response;
    const text = response.text();
    res.json(JSON.parse(text));
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

app.post("/api/verify-token", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token || token.length !== 8) {
      return res.status(400).json({ error: "O código deve ter exatamente 8 caracteres." });
    }
    // Mock de validação
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return res.json({ success: true, message: "Acesso Premium Desbloqueado." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, context } = req.body;
    const ai = getAI();
    const MODEL_NAME = "gemini-1.5-flash";

    const systemPrompt = `
    És o "Coach CV Hoje", um mentor de carreira sénior especializado no mercado de trabalho de Angola.
    Responde sempre em Português de Angola. Respostas curtas e acionáveis.
    Contexto: ${JSON.stringify(context || {})}
    `;

    const chat = ai.getGenerativeModel({ model: MODEL_NAME }).startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content || m.text }],
      })),
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content || messages[messages.length - 1].text);
    const response = result.response;
    res.json({ content: response.text() });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

// Export the app for Vercel
export default app;
