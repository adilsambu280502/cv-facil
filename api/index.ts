import express from "express";
import * as dotenv from "dotenv";
import { generateWithFallback } from "../src/services/ai_orchestrator";

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", environment: "vercel" });
});

app.post("/api/transform", async (req, res) => {
  console.log("📥 Recebido POST /api/transform");
  try {
    const { rawInput, jobDescription } = req.body;
    const prompt = `
    És um Especialista em Empregabilidade e Seleção de Elite (focado exclusivamente no mercado angolano).
    O teu objetivo é pegar numa experiência de vida, trabalho prático, projeto escolar, voluntariado ou apoio familiar e "traduzir" isso para a linguagem corporativa que o mercado de trabalho angolano (e os sistemas ATS) valoriza. Escreve sempre em Português de Angola (formal/corporativo, sem gírias, mas com fluidez natural do mercado angolano).
    Importante: Não deves fazer NENHUMA menção a termos como Inteligência Artificial, Consultor IA, ou robôs. Trata-se de uma análise humana de Elite do CV Fácil.
  
    Contexto do utilizador (Experiência descrita das palavras dele):
    "${rawInput}"
  
    A tua tarefa:
    1. Identificar um Título Profissional realista (Júnior, Assistente, Apoio, Operador).
    2. Criar um Resumo Profissional (professionalSummary) de 2-3 frases focado no perfil. ${jobDescription ? 'Deves adaptar fortemente este resumo para bater certo com a seguinte vaga: ' + jobDescription : ''}
    3. Escrever 2 a 3 bullet points descrevendo a responsabilidade usando "Verbos de Ação" no passado.
    4. Extrair 3 a 5 Competências Chave (Soft ou Hard skills).
    5. Identificar uma lista de Palavras-Chave ATS (atsKeywords).
    6. Atribuir um "Score" de 0 a 100.
    7. Fornecer feedback detalhado em scoreFeedback (pontos fortes e conselhos claros de melhoria como objetos { point, actionableAdvice }).
    8. Para a rubrica "Simulação de Recrutador", imagina o que o chefe dos Recursos Humanos pensaria ao olhar para o CV em apenas 6 segundos.
    ${jobDescription ? '9. Cria uma Carta de Apresentação (coverLetter) pronta a enviar adaptada à vaga. Máximo 2 parágrafos precisos.' : ''}
  
    Retorna EXCLUSIVAMENTE um objeto JSON estrito com esta estrutura:
    {
      "title": "Título Profissional",
      "professionalSummary": "Resumo...",
      "descriptionBullets": ["Bullet 1", "Bullet 2"],
      "skills": ["Competência 1", "Competência 2"],
      "atsKeywords": ["palavra-chave 1", "palavra-chave 2"],
      "score": 85,
      "scoreFeedback": {
        "strengths": [
          { "point": "Ponto Forte 1", "explanation": "Explicação..." }
        ],
        "improvements": [
          { "point": "Melhoria 1", "actionableAdvice": "Conselho prático..." }
        ]
      },
      "recruiterSimulation": {
        "sixSecondImpression": "...",
        "highlights": ["Destaque 1"],
        "rejectionRisks": ["Risco 1"]
      },
      "coverLetter": "..."
    }
    `;

    const aiResult = await generateWithFallback(prompt, true);
    console.log(`✅ Gerado via ${aiResult.provider}`);
    res.json(JSON.parse(aiResult.content));
  } catch (err: any) {
    console.error("❌ Erro em /api/transform:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/parse-cv", async (req, res) => {
  console.log("📥 Recebido POST /api/parse-cv");
  try {
    const { cvText, jobDescription } = req.body;
    if (!cvText) throw new Error("Conteúdo do CV vazio.");

    const prompt = `
És um Consultor de Carreira Sénior e Parser de CVs para o mercado angolano.
Extrai e estrutura o conteúdo do CV abaixo.

CONTEÚDO:
${cvText}

Responde EXCLUSIVAMENTE com o seguinte formato JSON:
{
  "title": "", "professionalSummary": "", 
  "layoutStrategy": { "profileType": "" },
  "transformedExperience": [{ "role": "", "company": "", "period": "", "responsibilities": [""] }],
  "transformedEducation": [{ "degree": "", "institution": "", "period": "" }],
  "projects": [{ "name": "", "description": "" }],
  "skills": [""], "languages": [""], "atsKeywords": [""],
  "score": 0, 
  "scoreFeedback": { "strengths": [], "improvements": [] },
  "recruiterSimulation": { "sixSecondImpression": "", "highlights": [], "rejectionRisks": [] },
  "coverLetter": "",
  "extractedContact": { "name": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "" }
}
    `;

    const aiResult = await generateWithFallback(prompt, true);
    console.log(`✅ CV processado via ${aiResult.provider}`);
    res.json(JSON.parse(aiResult.content));
  } catch (err: any) {
    console.error("❌ Erro em /api/parse-cv:", err.message);
    res.status(500).json({ error: err.message });
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
    const systemPrompt = `És o "Kamba de Carreira", o mentor de elite e amigo digital do CV Fácil em Angola.
    
    Diretrizes de Conversação:
    1. Fala de forma calorosa, humana, humilde e motivadora no português fluído e respeitoso de Angola (tratando o utilizador de forma próxima mas profissional).
    2. NUNCA uses qualquer tipo de formatação markdown, asteriscos ou negritos (ex: NUNCA escrevas **texto** ou *texto*). Escreve em texto limpo e natural, como se fosses uma pessoa real a responder no WhatsApp ou chat de apoio.
    3. Restrição Absoluta de Assunto: O teu papel é EXCLUSIVAMENTE falar sobre a criação de CVs, melhorias de currículo, cartas de apresentação, preparação para entrevistas de emprego e dicas de empregabilidade no mercado angolano. 
    4. Se o utilizador fizer qualquer pergunta ou comentário fora deste tema (ex: como cozinhar, desporto, cultura geral, programação genérica que não seja para o CV, etc.), deves recusar de forma muito educada e calorosa, lembrando que "O CV Fácil foca-se apenas no teu sucesso profissional e assuntos de carreira."
    
    Contexto do Currículo do Candidato: ${JSON.stringify(context || {})}`;
    
    let promptText = systemPrompt + "\n\n";
    messages.forEach((msg: any) => {
      promptText += `${msg.role === 'user' ? 'Candidato' : 'Kamba'}: ${msg.content || msg.text}\n`;
    });
    promptText += "\nKamba:";

    const aiResult = await generateWithFallback(promptText, false);
    // Garantir no servidor que removemos qualquer asterisco gerado acidentalmente pela IA
    const cleanContent = aiResult.content.replace(/\*\*/g, "").replace(/\*/g, "");
    res.json({ content: cleanContent });
  } catch (err: any) {
    console.error("❌ Erro no Chat:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Export the app for Vercel
export default app;
