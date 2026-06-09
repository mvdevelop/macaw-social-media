import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

function getEnvVars() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "❌ SUPABASE_SERVICE_ROLE_KEY não configurada.\n" +
        "Adicione no .env.local:\n" +
        "  SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role\n" +
        "Você encontra essa chave em: Supabase Dashboard > Settings > API > service_role key\n" +
        "⚠️ Esta chave só deve ser usada no servidor, nunca no cliente!"
    );
  }

  return { url, key };
}

let _serviceClient: SupabaseClient<any> | null = null;

/**
 * Cliente Supabase com service_role (bypassa RLS).
 * Usar APENAS em server actions para operações de escrita autorizadas.
 */
export function getServiceClient(): SupabaseClient<any> {
  if (_serviceClient) return _serviceClient;
  const { url, key } = getEnvVars();
  _serviceClient = createClient<any>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return _serviceClient;
}
