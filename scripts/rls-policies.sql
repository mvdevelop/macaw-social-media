-- ============================================
-- RLS POLICIES - Macaw Social Media
-- Execute todo este script no SQL Editor do Supabase Dashboard
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================

-- 1. USERS TABLE
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Qualquer usuário autenticado pode LER qualquer perfil (para exibição)
CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

-- Usuário pode INSERIR próprio registro (sign-up)
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Usuário pode ATUALIZAR apenas o próprio registro
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Usuário pode DELETAR apenas o próprio registro
CREATE POLICY "Users can delete own profile"
  ON users FOR DELETE
  USING (auth.uid() = id);

-- 2. POSTS TABLE
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read posts"
  ON posts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- 3. COMMENTS TABLE
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert own comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- 4. LIKES TABLE
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read likes"
  ON likes FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage own likes"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- 5. FOLLOWERS TABLE
ALTER TABLE followers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read followers"
  ON followers FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage own follows"
  ON followers FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
  ON followers FOR DELETE
  USING (auth.uid() = follower_id);

-- 6. FOLLOW_REQUESTS TABLE
ALTER TABLE follow_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own requests"
  ON follow_requests FOR SELECT
  USING (auth.uid() = receiver_id OR auth.uid() = sender_id);

CREATE POLICY "Users can send requests"
  ON follow_requests FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can manage own requests"
  ON follow_requests FOR DELETE
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- 7. STORIES TABLE
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stories"
  ON stories FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert own stories"
  ON stories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 8. NOTIFICATIONS TABLE
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- 9. SHARES TABLE
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read shares"
  ON shares FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert shares"
  ON shares FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 10. CONVERSATIONS TABLE
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own conversations"
  ON conversations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = id AND user_id = auth.uid()
    )
  );

-- 11. CONVERSATION PARTICIPANTS
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own participations"
  ON conversation_participants FOR SELECT
  USING (user_id = auth.uid());

-- 12. MESSAGES TABLE
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read messages in own conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  );

-- ============================================
-- STORAGE BUCKETS (para upload de arquivos)
-- ============================================

-- Bucket: avatars (foto de perfil + capa)
CREATE POLICY "Anyone can read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update own avatars"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own avatars"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Bucket: post-images
CREATE POLICY "Anyone can read post images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');

CREATE POLICY "Users can upload own post images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'post-images' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own post images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'post-images' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Bucket: post-videos
CREATE POLICY "Anyone can read post videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-videos');

CREATE POLICY "Users can upload own post videos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'post-videos' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own post videos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'post-videos' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Bucket: story-images
CREATE POLICY "Anyone can read story images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'story-images');

CREATE POLICY "Users can upload own story images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'story-images' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
