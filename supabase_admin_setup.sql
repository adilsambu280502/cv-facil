-- Adicionar ao supabase_setup.sql após as tabelas existentes
-- (ou correr separadamente no SQL Editor do Supabase)

-- ─── Tabela de transações / histórico de pagamentos ───────────────────────────
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    voucher_code TEXT REFERENCES public.vouchers(code) ON DELETE SET NULL,
    customer_name TEXT,
    customer_phone TEXT,
    customer_whatsapp TEXT,
    amount NUMERIC(10, 2) DEFAULT 1500.00,
    currency TEXT DEFAULT 'AOA',
    payment_method TEXT DEFAULT 'Multicaixa',
    notes TEXT,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role pode gerir transacoes" ON public.transactions;

-- Apenas admins autenticados (ou service_role) conseguem aceder
CREATE POLICY "Service role pode gerir transacoes"
ON public.transactions FOR ALL
TO service_role USING (true);

-- ─── View para estatísticas do painel admin ────────────────────────────────────
CREATE OR REPLACE VIEW public.admin_stats AS
SELECT
    (SELECT COUNT(*) FROM public.resumes) AS total_cvs,
    (SELECT COUNT(DISTINCT user_id) FROM public.resumes) AS total_users,
    (SELECT COUNT(*) FROM public.vouchers) AS total_vouchers,
    (SELECT COUNT(*) FROM public.vouchers WHERE is_used = true) AS vouchers_used,
    (SELECT COUNT(*) FROM public.vouchers WHERE is_used = false) AS vouchers_available,
    (SELECT COALESCE(SUM(amount), 0) FROM public.transactions) AS total_revenue,
    (SELECT COUNT(*) FROM public.transactions) AS total_transactions;
