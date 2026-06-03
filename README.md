# 🦜 Macaw Social Media

Uma rede social moderna construída com **Next.js 16**, **Supabase** e **Tailwind CSS**.

## 🚀 Funcionalidades

- **Autenticação** — Login com email/senha e Google OAuth via Supabase
- **Feed Dinâmico** — Postagens com texto e imagens, ordenadas por data
- **Interações** — Curtidas, comentários e compartilhamentos
- **Sistema de Amizades** — Seguir/deixar de seguir, solicitações
- **Chat em Tempo Real** — Mensagens diretas entre usuários
- **Notificações** — Alertas de likes, comentários e follow
- **Marketplace** — Anúncios de produtos com fotos e preços
- **Eventos** — Descoberta de eventos próximos
- **Grupos** — Comunidades por interesse
- **Stories** — Conteúdo temporário com expiração de 24h
- **Perfil de Usuário** — Página personalizada com bio, foto e posts
- **Internacionalização** — Suporte a Inglês, Português e Espanhol
- **Modo Dark/Light** — Alternância com persistência local

## 🛠️ Stack

| Frontend | Backend | Database |
|---|---|---|
| Next.js 16 (App Router) | Supabase Auth | PostgreSQL |
| React 18 | Server Actions | Supabase Storage |
| Tailwind CSS | RLS Policies | Buckets (imagens/stories) |
| Lucide / React Icons | Edge Runtime | pg_cron (expiração) |

## 📦 Como rodar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local
# Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY

# Iniciar desenvolvimento
npm run dev

# Build de produção
npm run build
```

## 🗄️ Configuração do Supabase

Execute os scripts SQL na ordem:
1. `supabase-schema.sql` — Tabelas e RLS
2. `supabase-trigger.sql` — Trigger para criar perfil automaticamente
3. `supabase-storage-cron.sql` — Buckets e limpeza de stories

## 🌐 Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

## 📁 Estrutura

```
src/
├── app/          # Páginas (App Router)
├── components/   # Componentes React
├── context/      # Providers (Auth, Tema, Idioma)
├── lib/          # Utilitários, mock-data, actions, i18n
└── proxy.ts      # Middleware Next.js
```

## 👨‍💻 Autor

Desenvolvido por [@mvdevelop](https://github.com/mvdevelop)
