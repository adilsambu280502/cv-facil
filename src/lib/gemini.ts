// TransformResult está centralizado em src/types/index.ts
// Este ficheiro apenas expõe a função de chamada à API

export async function transformExperience(rawInput: string, jobDescription?: string) {
  const response = await fetch('/api/transform', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawInput, jobDescription }),
  });

  if (!response.ok) {
    let errorMessage = "Fazer currículos dá trabalho, e a nossa IA também se cansa. 🤯 No momento, estamos a receber muitos pedidos em simultâneo. É chato, nós sabemos, mas o sistema está sobrecarregado. Dá-nos um minuto e tenta novamente na logo!";
    try {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch {
        // Se o retorno não for um JSON válido (ex: timeout da Vercel)
        if (response.status === 504) {
          errorMessage = "Fazer currículos dá trabalho, e a nossa IA também se cansa. 🤯 No momento, estamos a receber muitos pedidos em simultâneo. É chato, nós sabemos, mas o sistema está sobrecarregado. Dá-nos um minuto e tenta novamente na logo!";
        } else if (response.status === 404) {
          errorMessage = "Parece que a rota de transformação do CV se perdeu pelo caminho (Erro 404). Avisa o suporte se isto persistir!";
        }
      }
    } catch {
      errorMessage = "Parece que a tua internet está com preguiça ou perdemos a ligação com os servidores. Verifica a rede e tenta novamente!";
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}
