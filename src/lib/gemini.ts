// TransformResult está centralizado em src/types/index.ts
// Este ficheiro apenas expõe a função de chamada à API

export async function transformExperience(rawInput: string, jobDescription?: string) {
  const response = await fetch('/api/transform', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawInput, jobDescription }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao comunicar com o servidor.');
  }

  return await response.json();
}
