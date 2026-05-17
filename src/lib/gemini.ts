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
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error || errorMessage;
    } catch {
      errorMessage = 'Ocorreu um erro no servidor. Verifica a tua chave API ou tenta novamente.';
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}
