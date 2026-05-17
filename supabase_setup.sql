-- ==============================================================================
-- CV Fácil - Configuração Inicial Supabase
-- Copia e cola este código no "SQL Editor" do teu dashboard do Supabase
-- ==============================================================================

-- 1. Tabela 'resumes'
-- Armazena os currículos de cada utilizador (formato flexível JSONB)
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    template TEXT DEFAULT 'minimalist',
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    result JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar segurança RLS para a tabela resumes
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Evitar erros de políticas já existentes removendo-as se existirem
DROP POLICY IF EXISTS "Utilizadores podem ver os seus próprios currículos" ON public.resumes;
DROP POLICY IF EXISTS "Utilizadores podem criar os seus próprios currículos" ON public.resumes;
DROP POLICY IF EXISTS "Utilizadores podem atualizar os seus próprios currículos" ON public.resumes;
DROP POLICY IF EXISTS "Utilizadores podem eliminar os seus próprios currículos" ON public.resumes;

-- Política de Leitura: O utilizador só pode ver os seus próprios currículos
CREATE POLICY "Utilizadores podem ver os seus próprios currículos" 
ON public.resumes FOR SELECT 
USING (auth.uid() = user_id);

-- Política de Inserção: O utilizador só pode inserir se o user_id for o dele
CREATE POLICY "Utilizadores podem criar os seus próprios currículos" 
ON public.resumes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Política de Atualização: O utilizador só pode atualizar os seus próprios currículos
CREATE POLICY "Utilizadores podem atualizar os seus próprios currículos" 
ON public.resumes FOR UPDATE 
USING (auth.uid() = user_id);

-- Política de Eliminação: O utilizador só pode eliminar os seus próprios currículos
CREATE POLICY "Utilizadores podem eliminar os seus próprios currículos" 
ON public.resumes FOR DELETE 
USING (auth.uid() = user_id);


-- ==============================================================================
-- 2. Tabela 'vouchers' (PAYWALL / MONETIZAÇÃO)
-- Armazena os códigos de desbloqueio vendidos via WhatsApp/Multicaixa
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.vouchers (
    code TEXT PRIMARY KEY,
    plan TEXT DEFAULT 'premium',
    is_used BOOLEAN DEFAULT false,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Apenas o servidor (através da RPC) ou o Admin podem mexer nos vouchers
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Qualquer pessoa logada pode ler vouchers para verificação atómica" ON public.vouchers;

-- Política restrita para leitura de vouchers
CREATE POLICY "Qualquer pessoa logada pode ler vouchers para verificação atómica"
ON public.vouchers FOR SELECT
TO authenticated
USING (true);


-- ==============================================================================
-- 3. Stored Procedure (RPC) - consume_voucher
-- Função atómica para validar e consumir um código de forma segura (previne double-spending)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.consume_voucher(voucher_code TEXT)
RETURNS JSON AS $$
DECLARE
    voucher_record RECORD;
    result JSON;
BEGIN
    -- Procurar o voucher bloqueando a linha para leitura (FOR UPDATE)
    SELECT * INTO voucher_record 
    FROM public.vouchers 
    WHERE code = voucher_code 
    FOR UPDATE;

    -- Se o código não existir
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'message', 'Código inválido ou inexistente.');
    END IF;

    -- Se o código já foi utilizado
    IF voucher_record.is_used THEN
        RETURN json_build_object('success', false, 'message', 'Este código já foi utilizado.');
    END IF;

    -- Marcar como utilizado
    UPDATE public.vouchers 
    SET is_used = true, used_at = now() 
    WHERE code = voucher_code;

    -- Devolver sucesso e o plano associado
    RETURN json_build_object('success', true, 'plan', voucher_record.plan);

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- SECURITY DEFINER permite que a função altere a tabela mesmo ignorando o RLS do utilizador (útil para pagamentos)
