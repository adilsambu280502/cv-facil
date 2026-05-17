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

const getAdminPassword = (): string => {
  return sessionStorage.getItem("admin_password") || 'cvfacil-admin-2024';
};

// ─── Criar um novo voucher ─────────────────────────────────────────────────────
export const createVoucher = async (plan: string = 'premium'): Promise<{ success: boolean; code?: string; error?: string }> => {
  const { data, error } = await supabase.rpc('create_voucher_admin', {
    admin_password: getAdminPassword(),
    voucher_plan: plan
  });
  if (error) return { success: false, error: error.message };
  
  const res = data as { success: boolean; code?: string; message?: string };
  if (!res.success) return { success: false, error: res.message };
  return { success: true, code: res.code };
};

// ─── Listar todos os vouchers ──────────────────────────────────────────────────
export const listVouchers = async (): Promise<Voucher[]> => {
  const { data, error } = await supabase.rpc('list_vouchers_admin', {
    admin_password: getAdminPassword()
  });
  if (error) { console.error("Erro ao listar vouchers:", error); return []; }
  return data || [];
};

// ─── Listar transações ─────────────────────────────────────────────────────────
export const listTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase.rpc('list_transactions_admin', {
    admin_password: getAdminPassword()
  });
  if (error) { console.error("Erro ao listar transações:", error); return []; }
  return data || [];
};

// ─── Registar transação após pagamento confirmado ─────────────────────────────
export const registerTransaction = async (
  payload: Omit<Transaction, 'id' | 'created_at'>
): Promise<boolean> => {
  const { data, error } = await supabase.rpc('register_transaction_admin', {
    admin_password: getAdminPassword(),
    v_code: payload.voucher_code,
    c_name: payload.customer_name,
    c_phone: payload.customer_phone,
    c_whatsapp: payload.customer_whatsapp,
    v_amount: payload.amount,
    v_method: payload.payment_method,
    v_notes: payload.notes
  });
  if (error) { console.error("Erro ao registar transação:", error); return false; }
  const res = data as { success: boolean };
  return res.success;
};

// ─── Estatísticas do Admin ─────────────────────────────────────────────────────
export const fetchAdminStats = async (): Promise<AdminStats | null> => {
  const { data, error } = await supabase.rpc('get_admin_stats', {
    admin_password: getAdminPassword()
  });
  if (error) {
    console.error("Erro ao obter estatísticas:", error);
    return null;
  }
  const res = data as { success: boolean; total_cvs: number; total_vouchers: number; vouchers_used: number; vouchers_available: number; total_revenue: number; total_transactions: number };
  if (!res.success) return null;
  return {
    total_cvs: res.total_cvs,
    total_users: 0,
    total_vouchers: res.total_vouchers,
    vouchers_used: res.vouchers_used,
    vouchers_available: res.vouchers_available,
    total_revenue: Number(res.total_revenue),
    total_transactions: res.total_transactions
  };
};

// ─── Apagar voucher não utilizado ─────────────────────────────────────────────
export const deleteVoucher = async (code: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc('delete_voucher_admin', {
    admin_password: getAdminPassword(),
    voucher_code: code
  });
  if (error) { console.error("Erro ao apagar voucher:", error); return false; }
  const res = data as { success: boolean };
  return res.success;
};
