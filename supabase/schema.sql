-- ══════════════════════════════════════════════════════════════
-- CV Fácil - Schema de Base de Dados (Supabase / PostgreSQL)
-- ══════════════════════════════════════════════════════════════

-- 1. TABELA: profiles (extensão do auth.users do Supabase)
-- Criada automaticamente quando um utilizador se regista
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  plan text default 'free' check (plan in ('free', 'pro', 'elite')),
  generations_today int default 0,
  last_generation_date date,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Política: cada utilizador só lê/escreve o seu próprio perfil
drop policy if exists "Perfil visível ao próprio utilizador" on public.profiles;
create policy "Perfil visível ao próprio utilizador"
  on public.profiles for select using (auth.uid() = id);

drop policy if exists "Perfil editável pelo próprio utilizador" on public.profiles;
create policy "Perfil editável pelo próprio utilizador"
  on public.profiles for update using (auth.uid() = id);

-- Trigger: criar perfil automático quando utilizador se regista
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Segurança Adicional: Remover privilégio de execução pública da função de trigger (Linter)
revoke execute on function public.handle_new_user() from public;

-- ──────────────────────────────────────────────────────────────

-- 2. TABELA: vouchers (Códigos de Desbloqueio Premium)
-- Cada código é gerado pelo admin e tem uso único
create table if not exists public.vouchers (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,                          -- O código (ex: CVFACIL8)
  plan text default 'pro' check (plan in ('pro', 'elite')),
  is_used boolean default false,                      -- Se já foi consumido
  used_by uuid references public.profiles(id),        -- Quem usou
  used_at timestamptz,                                -- Quando foi usado
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '30 days')  -- Validade
);

alter table public.vouchers enable row level security;

-- Política: qualquer pessoa pode verificar se um código existe/é válido
-- (leitura pública, mas sem revelar informação sensível)
drop policy if exists "Qualquer um pode verificar vouchers" on public.vouchers;
create policy "Qualquer um pode verificar vouchers"
  on public.vouchers for select using (true);

-- Política: só o sistema (service_role) pode inserir/atualizar vouchers
drop policy if exists "Apenas admin pode criar vouchers" on public.vouchers;
create policy "Apenas admin pode criar vouchers"
  on public.vouchers for insert with check (false);  -- Bloqueado no frontend; usar Service Role

-- Limpar a política perigosa antiga (para resolver o aviso rls_policy_always_true no Linter)
drop policy if exists "Sistema pode marcar voucher como usado" on public.vouchers;

-- Política: apenas admin pode atualizar vouchers diretamente
drop policy if exists "Apenas admin pode atualizar vouchers" on public.vouchers;
create policy "Apenas admin pode atualizar vouchers"
  on public.vouchers for update using (false);

-- ──────────────────────────────────────────────────────────────
-- RPC: Consumo Atómico de Vouchers
-- Esta função corre com privilégios de bypass (security definer)
-- para garantir que o utilizador não precisa de permissão de UPDATE direta na tabela.
create or replace function public.consume_voucher(voucher_code text)
returns json language plpgsql security definer set search_path = public as $$
declare
  v_voucher record;
  v_user_id uuid;
begin
  v_user_id := auth.uid(); -- Pode ser nulo se for guest/anónimo

  -- 1. Tentar encontrar e bloquear o voucher para update concorrente
  select id, is_used, expires_at, plan into v_voucher
  from public.vouchers
  where code = upper(voucher_code)
  for update;

  if v_voucher is null then
    return json_build_object('success', false, 'message', 'Código inválido. Verifica a formatação.');
  end if;

  if v_voucher.is_used then
    return json_build_object('success', false, 'message', 'Este código já foi utilizado.');
  end if;

  if v_voucher.expires_at is not null and v_voucher.expires_at < now() then
    return json_build_object('success', false, 'message', 'Este código expirou.');
  end if;

  -- 2. Consumir o voucher
  update public.vouchers
  set is_used = true,
      used_at = now(),
      used_by = v_user_id
  where id = v_voucher.id;

  -- 3. Retornar sucesso com o plano
  return json_build_object('success', true, 'plan', v_voucher.plan);
end;
$$;

-- ──────────────────────────────────────────────────────────────

-- 3. TABELA: resumes (CVs guardados)
create table if not exists public.resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text,                        -- Ex: "Gestor de Projetos - Junho 2026"
  template text,                     -- Ex: "modern", "executive"
  answers jsonb,                     -- Todo o objeto de respostas do wizard
  result jsonb,                      -- O resultado gerado (score, title, etc.)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.resumes enable row level security;

drop policy if exists "Utilizador vê apenas os seus CVs" on public.resumes;
create policy "Utilizador vê apenas os seus CVs"
  on public.resumes for select using (auth.uid() = user_id);

drop policy if exists "Utilizador pode criar CVs" on public.resumes;
create policy "Utilizador pode criar CVs"
  on public.resumes for insert with check (auth.uid() = user_id);

drop policy if exists "Utilizador pode atualizar os seus CVs" on public.resumes;
create policy "Utilizador pode atualizar os seus CVs"
  on public.resumes for update using (auth.uid() = user_id);

drop policy if exists "Utilizador pode apagar os seus CVs" on public.resumes;
create policy "Utilizador pode apagar os seus CVs"
  on public.resumes for delete using (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────────

-- 4. DADOS INICIAIS: Vouchers de teste para desenvolvimento
-- NOTA: Em produção, usar o Painel Admin do Supabase para criar vouchers reais
insert into public.vouchers (code, plan) values
  ('CVFACIL8', 'pro'),
  ('ELITE2026', 'elite'),
  ('A1B2C3D4', 'pro'),
  ('ANGOLA26', 'pro')
on conflict (code) do nothing;
