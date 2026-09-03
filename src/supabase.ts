import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_CONFIG_KEY = 'salesflow_supabase_config';

// Helper to determine active credentials from localStorage or environment variables
function resolveSupabaseCredentials(): { url: string; key: string; isConfigured: boolean } {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  let savedConfig: { url: string; anonKey: string } | null = null;
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
      if (raw) savedConfig = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error parsing stored supabase config', e);
  }

  const url = savedConfig?.url || envUrl || 'https://xyzcompany.supabase.co';
  const key = savedConfig?.anonKey || envKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dummy';

  const isConfigured = Boolean(
    url &&
    key &&
    url !== 'https://xyzcompany.supabase.co' &&
    url !== 'https://your-project.supabase.co' &&
    key !== 'your-anon-key' &&
    key !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dummy'
  );

  return { url, key, isConfigured };
}

const initialCredentials = resolveSupabaseCredentials();

/**
 * Instância única e centralizada do Supabase compartilhada em toda a aplicação.
 */
export let supabase: SupabaseClient = createClient(
  initialCredentials.url,
  initialCredentials.key,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

/**
 * Retorna a instância compartilhada do Supabase ou null se não configurado.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const creds = resolveSupabaseCredentials();
  if (creds.isConfigured) {
    return supabase;
  }
  // Retorna a instância mesmo em modo de demonstração/local para compatibilidade com chamadas auth
  return supabase;
}

/**
 * Atualiza a instância compartilhada do cliente caso novas credenciais sejam configuradas em runtime.
 */
export function setSupabaseCredentials(newUrl: string, newKey: string): SupabaseClient {
  supabase = createClient(newUrl, newKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  return supabase;
}

/**
 * Verifica se o Supabase está com credenciais reais configuradas.
 */
export function isSupabaseConfigured(): boolean {
  return resolveSupabaseCredentials().isConfigured;
}

export default supabase;

