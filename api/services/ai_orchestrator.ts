import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

// Configurações de Modelos
const MODELS = {
  gemini: "gemini-2.5-flash",
  openai: "gpt-4o-mini", // Modelo económico e rápido
  anthropic: "claude-3-5-sonnet-20240620", // O melhor para escrita
};

// Inicialização de Clientes (Lazy)
let _gemini: GoogleGenerativeAI | null = null;
let _openai: OpenAI | null = null;
let _anthropic: Anthropic | null = null;

function getGemini() {
  if (!_gemini && process.env.GEMINI_API_KEY) {
    _gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return _gemini;
}

function getOpenAI() {
  if (!_openai && process.env.OPENAI_API_KEY) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

function getAnthropic() {
  if (!_anthropic && process.env.ANTHROPIC_API_KEY) {
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _anthropic;
}

export interface AIResponse {
  content: string;
  provider: "gemini" | "openai" | "anthropic";
}

function cleanJSON(text: string): string {
  // Remove blocos de código markdown se existirem
  return text.replace(/```json\n?|```/g, "").trim();
}

/**
 * Orquestrador de IA com Fallback Automático.
 * Tenta Gemini -> OpenAI -> Anthropic.
 */
export async function generateWithFallback(
  prompt: string,
  jsonMode: boolean = true
): Promise<AIResponse> {
  const errors: string[] = [];

  // 1. Tentar Gemini (Prioridade 1 - Custo/Disponibilidade)
  const gemini = getGemini();
  if (gemini) {
    try {
      console.log("🤖 Tentando Gemini (2.5 Flash)...");
      const model = gemini.getGenerativeModel({
        model: MODELS.gemini,
        generationConfig: jsonMode ? { responseMimeType: "application/json" } : {},
      });
      const result = await model.generateContent(prompt);
      let text = result.response.text();
      if (text) {
        if (jsonMode) text = cleanJSON(text);
        console.log(`[Gemini] Raw Content:`, text.substring(0, 100) + "...");
        return { content: text, provider: "gemini" };
      }
    } catch (err: any) {
      console.warn("⚠️ Gemini falhou:", err.message);
      errors.push(`Gemini: ${err.message}`);
    }
  }

  // 2. Tentar OpenAI (Fallback 1)
  const openai = getOpenAI();
  if (openai) {
    try {
      console.log("🤖 Tentando OpenAI (Fallback)...");
      const response = await openai.chat.completions.create({
        model: MODELS.openai,
        messages: [{ role: "user", content: prompt }],
        response_format: jsonMode ? { type: "json_object" } : undefined,
        temperature: 0.2,
      });
      let text = response.choices[0]?.message?.content;
      if (text) {
        if (jsonMode) text = cleanJSON(text);
        return { content: text, provider: "openai" };
      }
    } catch (err: any) {
      console.warn("⚠️ OpenAI falhou:", err.message);
      errors.push(`OpenAI: ${err.message}`);
    }
  }

  // 3. Tentar Anthropic (Fallback 2 - O mestre da redação)
  const anthropic = getAnthropic();
  if (anthropic) {
    try {
      console.log("🤖 Tentando Anthropic (Mestre)...");
      const msg = await anthropic.messages.create({
        model: MODELS.anthropic,
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
        system: jsonMode ? "Responde APENAS com JSON válido. Sem explicações." : undefined,
        temperature: 0.2,
      });
      
      let text = msg.content[0].type === 'text' ? msg.content[0].text : '';
      if (text) {
        if (jsonMode) text = cleanJSON(text);
        return { content: text, provider: "anthropic" };
      }
    } catch (err: any) {
      console.warn("⚠️ Anthropic falhou:", err.message);
      errors.push(`Anthropic: ${err.message}`);
    }
  }

  throw new Error(`Toda a equipa de IA falhou. Erros acumulados: ${errors.join(" | ")}`);
}
