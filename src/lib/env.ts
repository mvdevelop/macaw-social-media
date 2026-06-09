// Validação de variáveis de ambiente em tempo de build
// Previne que o build prossiga se faltarem variáveis essenciais

const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

export function validateEnv(): void {
  for (const key of requiredVars) {
    if (!process.env[key]) {
      throw new Error(
        `❌ Variável de ambiente obrigatória ausente: ${key}\n` +
          "Verifique o arquivo .env.local ou .env.example para referência."
      );
    }
  }
}
