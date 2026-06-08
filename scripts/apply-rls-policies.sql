-- ============================================
-- RLS POLICIES - Macaw Social Media
-- Execute todo este script no SQL Editor do Supabase Dashboard
-- https://supabase.com/dashboard/project/_/sql/new
--
-- IMPORTANTE: Se você já criou as tabelas mas esqueceu de aplicar
-- as políticas RLS, execute este script completo.
--
-- Para tables que não existem, os comandos ALTER TABLE e CREATE POLICY
-- serão ignorados silenciosamente.
-- ============================================

-- ============================================
-- 1. USERS TABLE
-- ============================================
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read all profiles" ON users;
CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert own profile" ON users;
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete own profile" ON users;
CREATE POLICY "Users can delete own profile"
  ON users FOR DELETE
  USING (auth.uid() = id);

-- ============================================
-- 2. POSTS TABLE
-- ============================================
ALTER TABLE IF EXISTS posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read posts" ON posts;
CREATE POLICY "Anyone can read posts"
  ON posts FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert own posts" ON posts;
CREATE POLICY "Users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own posts" ON posts;
CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own posts" ON posts;
CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 3. COMMENTS TABLE
-- ============================================
ALTER TABLE IF EXISTS comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read comments" ON comments;
CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert own comments" ON comments;
CREATE POLICY "Users can insert own comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own comments" ON comments;
CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 4. LIKES TABLE
-- ============================================
ALTER TABLE IF EXISTS likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read likes" ON likes;
CREATE POLICY "Anyone can read likes"
  ON likes FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can manage own likes" ON likes;
CREATE POLICY "Users can manage own likes"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own likes" ON likes;
CREATE POLICY "Users can delete own likes"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 5. FOLLOWERS TABLE
-- ============================================
ALTER TABLE IF EXISTS followers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read followers" ON followers;
CREATE POLICY "Anyone can read followers"
  ON followers FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can manage own follows" ON followers;
CREATE POLICY "Users can manage own follows"
  ON followers FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

DROP POLICY IF EXISTS "Users can unfollow" ON followers;
CREATE POLICY "Users can unfollow"
  ON followers FOR DELETE
  USING (auth.uid() = follower_id);

-- ============================================
-- 6. FOLLOW_REQUESTS TABLE
-- ============================================
ALTER TABLE IF EXISTS follow_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own requests" ON follow_requests;
CREATE POLICY "Users can read own requests"
  ON follow_requests FOR SELECT
  USING (auth.uid() = receiver_id OR auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can send requests" ON follow_requests;
CREATE POLICY "Users can send requests"
  ON follow_requests FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can manage own requests" ON follow_requests;
CREATE POLICY "Users can manage own requests"
  ON follow_requests FOR DELETE
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- ============================================
-- 7. STORIES TABLE
-- ============================================
ALTER TABLE IF EXISTS stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read stories" ON stories;
CREATE POLICY "Anyone can read stories"
  ON stories FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert own stories" ON stories;
CREATE POLICY "Users can insert own stories"
  ON stories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 8. NOTIFICATIONS TABLE
-- ============================================
ALTER TABLE IF EXISTS notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own notifications" ON notifications;
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Primeiro garante que os buckets existem
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('post-videos', 'post-videos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('story-images', 'story-images', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket: avatars (foto de perfil + capa)
DROP POLICY IF EXISTS "Anyone can read avatars" ON storage.objects;
CREATE POLICY "Anyone can read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can upload own avatars" ON storage.objects;
CREATE POLICY "Users can upload own avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can update own avatars" ON storage.objects;
CREATE POLICY "Users can update own avatars"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can delete own avatars" ON storage.objects;
CREATE POLICY "Users can delete own avatars"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Bucket: post-images
DROP POLICY IF EXISTS "Anyone can read post images" ON storage.objects;
CREATE POLICY "Anyone can read post images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');

DROP POLICY IF EXISTS "Users can upload own post images" ON storage.objects;
CREATE POLICY "Users can upload own post images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'post-images' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can delete own post images" ON storage.objects;
CREATE POLICY "Users can delete own post images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'post-images' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Bucket: post-videos
DROP POLICY IF EXISTS "Anyone can read post videos" ON storage.objects;
CREATE POLICY "Anyone can read post videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-videos');

DROP POLICY IF EXISTS "Users can upload own post videos" ON storage.objects;
CREATE POLICY "Users can upload own post videos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'post-videos' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can delete own post videos" ON storage.objects;
CREATE POLICY "Users can delete own post videos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'post-videos' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Bucket: story-images
DROP POLICY IF EXISTS "Anyone can read story images" ON storage.objects;
CREATE POLICY "Anyone can read story images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'story-images');

DROP POLICY IF EXISTS "Users can upload own story images" ON storage.objects;
CREATE POLICY "Users can upload own story images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'story-images' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- ============================================
-- VERIFICAÇÃO: Lista todas as políticas aplicadas
-- ============================================
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

SELECT
  schemaname,
  tablename,
  policyname
FROM pg_policies
WHERE schemaname = 'storage'
ORDER BY tablename, policyname;
