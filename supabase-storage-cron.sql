-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Criar buckets de storage
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('story-images', 'story-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas do bucket post-images
CREATE POLICY "Anyone can view post images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-images' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Owners can delete post images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Políticas do bucket story-images
CREATE POLICY "Anyone can view story images"
ON storage.objects FOR SELECT
USING (bucket_id = 'story-images');

CREATE POLICY "Authenticated users can upload story images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'story-images' AND
  auth.role() = 'authenticated'
);

-- ============================================
-- CRON JOB: Limpar stories expiradas
-- (requer extensão pg_cron ativada no Supabase)
-- ============================================

-- Ativar extensão pg_cron (necessário uma vez)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Função que apaga stories expiradas
CREATE OR REPLACE FUNCTION public.clean_expired_stories()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.stories WHERE expires_at < NOW();
END;
$$;

-- Agendar para rodar a cada hora
-- SELECT cron.schedule('clean-stories-hourly', '0 * * * *', 'SELECT public.clean_expired_stories();');

-- ============================================
-- FUNÇÃO: Contar likes de um post
-- ============================================

CREATE OR REPLACE FUNCTION public.get_post_likes(post_id BIGINT)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  like_count BIGINT;
BEGIN
  SELECT COUNT(*) INTO like_count FROM public.likes WHERE likes.post_id = get_post_likes.post_id;
  RETURN like_count;
END;
$$;

-- ============================================
-- FUNÇÃO: Verificar se usuário curtiu
-- ============================================

CREATE OR REPLACE FUNCTION public.has_user_liked(post_id BIGINT, user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  liked BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM public.likes WHERE likes.post_id = has_user_liked.post_id AND likes.user_id = has_user_liked.user_id
  ) INTO liked;
  RETURN liked;
END;
$$;
