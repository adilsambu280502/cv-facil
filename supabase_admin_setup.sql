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


-- ─── 1. Função para Obter Estatísticas Seguras do Admin ─────────────────────────
CREATE OR REPLACE FUNCTION public.get_admin_stats(admin_password TEXT)
RETURNS JSON AS $$
DECLARE
    secret TEXT := 'cvfacil-admin-2024';
BEGIN
    IF admin_password IS NULL OR admin_password = '' OR admin_password != secret THEN
        RETURN json_build_object('success', false, 'message', 'Acesso não autorizado.');
    END IF;

    RETURN json_build_object(
        'success', true,
        'total_cvs', (SELECT COUNT(*) FROM public.resumes),
        'total_vouchers', (SELECT COUNT(*) FROM public.vouchers),
        'vouchers_used', (SELECT COUNT(*) FROM public.vouchers WHERE is_used = true),
        'vouchers_available', (SELECT COUNT(*) FROM public.vouchers WHERE is_used = false AND (now() - created_at) <= INTERVAL '1 hour'),
        'total_revenue', COALESCE((
            SELECT SUM(t.amount) 
            FROM public.transactions t
            JOIN public.vouchers v ON t.voucher_code = v.code
            WHERE v.is_used = true
        ), 0),
        'total_transactions', (
            SELECT COUNT(*) 
            FROM public.transactions t
            JOIN public.vouchers v ON t.voucher_code = v.code
            WHERE v.is_used = true
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─── 2. Função para Listar Vouchers de forma Segura ─────────────────────────────
CREATE OR REPLACE FUNCTION public.list_vouchers_admin(admin_password TEXT)
RETURNS TABLE (
    code TEXT,
    plan TEXT,
    is_used BOOLEAN,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    secret TEXT := 'cvfacil-admin-2024';
BEGIN
    IF admin_password IS NULL OR admin_password = '' OR admin_password != secret THEN
        RAISE EXCEPTION 'Acesso não autorizado.';
    END IF;

    RETURN QUERY 
    SELECT v.code, v.plan, v.is_used, v.used_at, v.created_at
    FROM public.vouchers v
    ORDER BY v.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─── 3. Função para Listar Transações de forma Segura ───────────────────────────
CREATE OR REPLACE FUNCTION public.list_transactions_admin(admin_password TEXT)
RETURNS TABLE (
    id UUID,
    voucher_code TEXT,
    customer_name TEXT,
    customer_phone TEXT,
    customer_whatsapp TEXT,
    amount NUMERIC,
    currency TEXT,
    payment_method TEXT,
    notes TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    secret TEXT := 'cvfacil-admin-2024';
BEGIN
    IF admin_password IS NULL OR admin_password = '' OR admin_password != secret THEN
        RAISE EXCEPTION 'Acesso não autorizado.';
    END IF;

    RETURN QUERY 
    SELECT 
        t.id, 
        t.voucher_code, 
        t.customer_name, 
        t.customer_phone, 
        t.customer_whatsapp, 
        t.amount, 
        t.currency, 
        t.payment_method, 
        t.notes, 
        CASE 
            WHEN v.is_used = true THEN 'confirmada'
            WHEN (now() - v.created_at) > INTERVAL '1 hour' THEN 'expirada'
            ELSE 'pendente'
        END AS status, 
        t.created_at
    FROM public.transactions t
    LEFT JOIN public.vouchers v ON t.voucher_code = v.code
    ORDER BY t.created_at DESC
    LIMIT 100;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;



-- ─── 4. Função para Criar Voucher de forma Segura ───────────────────────────────
CREATE OR REPLACE FUNCTION public.create_voucher_admin(admin_password TEXT, voucher_plan TEXT)
RETURNS JSON AS $$
DECLARE
    new_code TEXT;
    chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    part1 TEXT := '';
    part2 TEXT := '';
    i INT;
    secret TEXT := 'cvfacil-admin-2024';
BEGIN
    IF admin_password IS NULL OR admin_password = '' OR admin_password != secret THEN
        RETURN json_build_object('success', false, 'message', 'Acesso não autorizado.');
    END IF;

    -- Gerar código CVF-XXXX-XXXX
    FOR i IN 1..4 LOOP
        part1 := part1 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    FOR i IN 1..4 LOOP
        part2 := part2 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    new_code := 'CVF-' || part1 || '-' || part2;

    INSERT INTO public.vouchers (code, plan, is_used)
    VALUES (new_code, voucher_plan, false);

    RETURN json_build_object('success', true, 'code', new_code);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─── 5. Função para Registar Transação de forma Segura ──────────────────────────
CREATE OR REPLACE FUNCTION public.register_transaction_admin(
    admin_password TEXT,
    v_code TEXT,
    c_name TEXT,
    c_phone TEXT,
    c_whatsapp TEXT,
    v_amount NUMERIC,
    v_method TEXT,
    v_notes TEXT
)
RETURNS JSON AS $$
DECLARE
    secret TEXT := 'cvfacil-admin-2024';
BEGIN
    IF admin_password IS NULL OR admin_password = '' OR admin_password != secret THEN
        RETURN json_build_object('success', false, 'message', 'Acesso não autorizado.');
    END IF;

    INSERT INTO public.transactions (
        voucher_code, customer_name, customer_phone, customer_whatsapp,
        amount, currency, payment_method, notes, status
    ) VALUES (
        v_code, c_name, c_phone, c_whatsapp,
        v_amount, 'AOA', v_method, v_notes, 'completed'
    );

    RETURN json_build_object('success', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─── 6. Função para Eliminar Voucher de forma Segura ────────────────────────────
CREATE OR REPLACE FUNCTION public.delete_voucher_admin(admin_password TEXT, voucher_code TEXT)
RETURNS JSON AS $$
DECLARE
    secret TEXT := 'cvfacil-admin-2024';
BEGIN
    IF admin_password IS NULL OR admin_password = '' OR admin_password != secret THEN
        RETURN json_build_object('success', false, 'message', 'Acesso não autorizado.');
    END IF;

    DELETE FROM public.vouchers 
    WHERE code = voucher_code AND is_used = false;

    RETURN json_build_object('success', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
