import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Aviso: Chaves do Supabase em falta no .env. A ligação à base de dados vai falhar.");
}

// O cliente oficial para comunicar com a tua base de dados PostgreSQL e Autenticação
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
