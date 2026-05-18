// TransformResult está centralizado em src/types/index.ts
// Este ficheiro apenas expõe a função de chamada à API

export async function transformExperience(rawInput: string, jobDescription?: string) {
  const response = await fetch('/api/transform', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawInput, jobDescription }),
  });

  if (!response.ok) {
    let errorMessage = 'Erro ao comunicar com o servidor.';
    try {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch {
        // Se o retorno não for um JSON válido (ex: timeout da Vercel)
        if (response.status === 504) {
          errorMessage = 'O tempo limite de processamento foi excedido (Timeout da Vercel). O texto da tua experiência é muito longo ou o servidor está sobrecarregado. Tenta novamente em instantes.';
        } else if (response.status === 404) {
          errorMessage = 'A rota de transformação de experiência não foi encontrada (Erro 404).';
        } else {
          errorMessage = `Ocorreu um erro no servidor (Status HTTP ${response.status}). Verifica se a variável de ambiente GEMINI_API_KEY está configurada no painel da Vercel.`;
        }
      }
    } catch {
      errorMessage = 'Não foi possível obter a resposta de erro do servidor. Verifica a tua ligação à rede.';
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}
