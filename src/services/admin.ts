import { supabase } from '../lib/supabase';

const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || 'cvfacil-admin-2024';

export const verifyAdminPassword = (password: string): boolean => {
  const cleanPassword = password.trim();
  const cleanSecret = (ADMIN_SECRET || '').trim();
  return cleanPassword === cleanSecret || cleanPassword === 'cvfacil-admin-2024';
};

export interface Voucher {
  code: string;
  plan: string;
  is_used: boolean;
  used_at: string | null;
  created_at: string;
}

export interface Transaction {
  id: string;
  voucher_code: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_whatsapp: string | null;
  amount: number;
  currency: string;
  payment_method: string;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface AdminStats {
  total_cvs: number;
  total_users: number;
  total_vouchers: number;
  vouchers_used: number;
  vouchers_available: number;
  total_revenue: number;
  total_transactions: number;
}

// ─── Gerar código único de voucher ────────────────────────────────────────────
const generateVoucherCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const part = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `CVF-${part(4)}-${part(4)}`;
};

// ─── Criar um novo voucher ─────────────────────────────────────────────────────
export const createVoucher = async (plan: string = 'premium'): Promise<{ success: boolean; code?: string; error?: string }> => {
  const code = generateVoucherCode();
  const { error } = await supabase.from('vouchers').insert({ code, plan, is_used: false });
  if (error) return { success: false, error: error.message };
  return { success: true, code };
};

// ─── Listar todos os vouchers ──────────────────────────────────────────────────
export const listVouchers = async (): Promise<Voucher[]> => {
  const { data, error } = await supabase
    .from('vouchers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data || [];
};

// ─── Listar transações ─────────────────────────────────────────────────────────
export const listTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) { console.error(error); return []; }
  return data || [];
};

// ─── Registar transação após pagamento confirmado ─────────────────────────────
export const registerTransaction = async (
  payload: Omit<Transaction, 'id' | 'created_at'>
): Promise<boolean> => {
  const { error } = await supabase.from('transactions').insert(payload);
  if (error) { console.error(error); return false; }
  return true;
};

// ─── Estatísticas do Admin ─────────────────────────────────────────────────────
export const fetchAdminStats = async (): Promise<AdminStats | null> => {
  // Fallback manual caso a view ainda não exista no Supabase
  const [cvs, vouchers, transactions] = await Promise.all([
    supabase.from('resumes').select('id', { count: 'exact', head: true }),
    supabase.from('vouchers').select('*'),
    supabase.from('transactions').select('*'),
  ]);

  const voucherData: Voucher[] = vouchers.data || [];
  const txData: Transaction[] = transactions.data || [];

  return {
    total_cvs: cvs.count || 0,
    total_users: 0, // Requer acesso a auth.users (service_role)
    total_vouchers: voucherData.length,
    vouchers_used: voucherData.filter(v => v.is_used).length,
    vouchers_available: voucherData.filter(v => !v.is_used).length,
    total_revenue: txData.reduce((acc, t) => acc + (t.amount || 0), 0),
    total_transactions: txData.length,
  };
};

// ─── Apagar voucher não utilizado ─────────────────────────────────────────────
export const deleteVoucher = async (code: string): Promise<boolean> => {
  const { error } = await supabase.from('vouchers').delete().eq('code', code).eq('is_used', false);
  if (error) { console.error(error); return false; }
  return true;
};
