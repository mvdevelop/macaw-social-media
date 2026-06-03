import { createBrowserClient } from "@supabase/ssr";

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

export function createClient() {
  const { url, key } = getEnvVars();
  return createBrowserClient(url, key);
}
