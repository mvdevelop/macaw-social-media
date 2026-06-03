import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getEnvVars() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "❌ Variáveis de ambiente do Supabase não encontradas.\n" +
        "Verifique se o arquivo .env.local existe na raiz do projeto e contém:\n" +
        "  NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co\n" +
        "  NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon\n" +
        "Depois reinicie o servidor (Ctrl+C e npm run dev novamente)."
    );
  }

  return { url, key };
}

export async function createClient() {
  const { url, key } = getEnvVars();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      },
    },
  });
}
