import { generateWithFallback } from "../src/services/ai_orchestrator";

async function main() {
  try {
    console.log("Calling generateWithFallback...");
    const res = await generateWithFallback("Olá, responde apenas com um JSON contendo a chave 'status' com o valor 'ok'", true);
    console.log("Success:", res);
  } catch (e: any) {
    console.error("Error occurred:", e.message || e);
  }
}

main();
