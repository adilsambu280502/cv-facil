import express from "express";
import { createServer as createViteServer } from "vite";
import path from "node:path";
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

// Instanciar o cliente AI
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/transform", async (req, res) => {
    try {
      const { rawInput, jobDescription } = req.body;
      const ai = getAI();
      const MODEL_NAME = "gemini-1.5-pro";

      const prompt = `
      És um Headhunter Senior e Especialista em Empregabilidade Jovem (focado exclusivamente no mercado angolano).
      O teu objetivo é pegar numa experiência de vida, trabalho prático, projeto escolar, voluntariado ou apoio familiar e "traduzir" isso para a linguagem corporativa que o mercado de trabalho angolano (e os sistemas ATS) valoriza. Escreve sempre em Português de Angola (formal/corporativo, sem gírias, mas com fluidez natural do mercado angolano).
    
      Contexto do utilizador (Experiência descrita das palavras dele):
      "${rawInput}"
    
      A tua tarefa:
      1. Identificar um Título Profissional realista (Júnior, Assistente, Apoio, Operador). Nunca cries cargos de liderança ou séniores para experiências informais ou prestação de serviços não qualificados.
      2. Criar um Resumo Profissional (professionalSummary) de 2-3 frases focado de forma geral no perfil, destacando as suas principais mais-valias. ${jobDescription ? 'Deves adaptar fortemente este resumo para bater certo com a seguinte vaga: ' + jobDescription : ''}
      3. Escrever 2 a 3 bullet points descrevendo a responsabilidade usando "Verbos de Ação" no passado (Ex: Organizou, Apoiou, Assegurou, Comunicou). Foca-te em responsabilidades e comportamentos transferíveis (atendimento, organização, gestão de tempo, controlo de caixa). NÃO inventes dados ou factos que o utilizador não referiu. Eleva o nível da escrita. ${jobDescription ? 'Garante que alinhas estas responsabilidades aos requisitos da vaga.' : ''}
      4. Extrair 3 a 5 Competências Chave (Soft ou Hard skills). ${jobDescription ? 'Extrai competências que correspondam EXATAMENTE às procuradas na vaga e que este perfil demonstre possuir, mesmo de forma básica.' : ''}
      5. Identificar uma lista de Palavras-Chave ATS (atsKeywords). Estas são palavras exatas que os filtros vão procurar. ${jobDescription ? 'Usa a descrição da vaga para extrair estas palavras-chave ATS se elas se adequarem.' : ''}
      6. Atribuir um "Score" de 0 a 100 avaliando a robustez da experiência para o mercado de trabalho local ${jobDescription ? ' face a esta vaga específica' : ''}.
      7. Fornecer feedback detalhado (pontos fortes e conselhos claros de melhoria para o mercado angolano).
      8. Para a rubrica "Simulação de Recrutador", imagina o que o chefe dos Recursos Humanos pensaria ao olhar para o CV em apenas 6 segundos. Dá uma impressão geral e pontua destaques (positivos) e potenciais motivos de rejeição.
      ${jobDescription ? '9. Cria uma Carta de Apresentação (coverLetter) pronta a enviar adaptada à vaga, usando o histórico do utilizador. Tem de soar profissional mas confiante e de leitura rápida, para ser enviada por email ou entregue em mãos. Máximo 2 parágrafos precisos.' : ''}
    
      Retorna EXCLUSIVAMENTE um objeto JSON estrito com esta estrutura. Nenhuma outra formatação de texto fora de objectos JSON é aceite.
      `;

      const result = await ai.getGenerativeModel({ 
        model: MODEL_NAME,
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
      }).generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const response = result.response;
      const text = response.text();
      if (!text) {
        throw new Error("No response generated.");
      }
      
      res.json(JSON.parse(text));
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  });

  // Unlock Token Verification Route
  app.post("/api/verify-token", async (req, res) => {
    try {
      const { token } = req.body;
      
      if (!token || token.length !== 8) {
        return res.status(400).json({ error: "O código deve ter exatamente 8 caracteres." });
      }

      // TODO: Connect this to a real Database (e.g., Firebase Firestore, Supabase, PostgreSQL)
      // Here you would check if token exists and hasn't been used yet.
      // For now, we mock success for ANY 8-character token.
      console.log(`[Mock] Validating token: ${token} via DB...`);
      await new Promise(resolve => setTimeout(resolve, 1500)); 

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
      const MODEL_NAME = "gemini-1.5-flash"; // Mais rápido para chat

      const systemPrompt = `
      És o "Coach CV Fácil", um mentor de carreira sénior especializado no mercado de trabalho de Angola.
      O teu objetivo é transformar jovens candidatos em profissionais magnéticos para as empresas angolanas.
      
      Contexto do utilizador (Perfil atual): ${JSON.stringify(context || {})}
      
      Regras de Ouro:
      1. Linguagem: Português de Angola (formal mas caloroso). Usa expressões como "Estamos juntos", "Força aí", mas mantém o profissionalismo.
      2. Estilo: Respostas curtas, incisivas e acionáveis. Máximo 150 palavras.
      3. Sabedoria Local: Conheces os desafios de Luanda às províncias. Sabes que em Angola o "quem conheces" (networking) é forte, então sugere formas de abordar pessoas de forma profissional no LinkedIn ou pessoalmente.
      4. Foco: Se o utilizador estiver inseguro, destaca que as competências "moles" (atitude, pontualidade, vontade de aprender) são o que as empresas mais procuram em perfis juniores.
      5. Se o currículo dele tiver uma pontuação baixa, dá 1 dica prática imediata para subir o nível.
      `;

      let promptText = systemPrompt + "\n\n--- Diálogo Recente ---\n";
      messages.forEach((msg: any) => {
        const roleName = msg.role === 'user' ? 'Candidato' : 'Coach';
        promptText += `${roleName}: ${msg.content || msg.text}\n`;
      });
      promptText += "\nCoach:";

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: promptText,
        config: {
          temperature: 0.8,
        },
      });

      const text = response.text;
      if (!text) throw new Error("Sem resposta da IA.");

      res.json({ content: text });
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
