/**
 * Serviço de integração com Multicaixa Express (Simulado)
 * Em produção, isto chamaria o backend para gerar uma referência de pagamento
 */

export interface PaymentStatus {
  status: "idle" | "waiting" | "success" | "error";
  message?: string;
}

export const generatePaymentReference = async (amount: number) => {
  // Simula chamada de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    reference: Math.random().toString().slice(2, 11),
    amount,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(), // 30 mins
  };
};

export const verifyPaymentToken = async (token: string) => {
  // Numa app real, isto verificaria o token no Firestore/Backend
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const validTokens = ["CVFACIL8", "ELITE2026", "A1B2C3D4", "ANGOLA26"];
  
  if (validTokens.includes(token.trim().toUpperCase())) {
    return { success: true };
  }
  
  return { success: false, message: "Código inválido. Contacte o suporte via WhatsApp para obter um código válido." };
};
