/**
 * Serviço de Pagamento: Validação de Vouchers via Supabase
 * 
 * Fluxo:
 * 1. Admin gera um código na tabela 'vouchers' do Supabase
 * 2. Cliente insere o código no VoucherModal
 * 3. Este serviço valida e marca como usado atomicamente
 */

import { supabase } from '../lib/supabase';

export const verifyPaymentToken = async (token: string): Promise<{ success: boolean; plan?: string; message?: string }> => {
  const cleanToken = token.trim().toUpperCase();

  try {
    // Chamar a Stored Procedure (RPC) no Supabase para consumo atómico
    const { data, error } = await supabase.rpc('consume_voucher', {
      voucher_code: cleanToken
    });

    if (error) {
      console.error('Erro na chamada RPC consume_voucher:', error);
      return { success: false, message: 'Erro ao validar o código. Tenta novamente.' };
    }

    // A RPC retorna um objeto JSON com success, message e plan
    if (!data.success) {
      return { success: false, message: data.message };
    }

    return { success: true, plan: data.plan };

  } catch (err) {
    console.error('Erro inesperado na verificação do voucher:', err);
    return { success: false, message: 'Erro de ligação. Verifica a tua internet e tenta novamente.' };
  }
};

export const generatePaymentReference = async (amount: number) => {
  // Placeholder para referência Multicaixa futura
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    reference: Math.random().toString().slice(2, 11),
    amount,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
  };
};
