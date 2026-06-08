-- ============================================
-- FIX: posts sequence auto-increment
-- Execute no SQL Editor do Supabase Dashboard
-- ============================================

-- Corrige a coluna id para usar auto-incremento
-- Mantém os dados existentes, apenas ajusta o schema

-- 1. Cria a sequence se não existir
CREATE SEQUENCE IF NOT EXISTS posts_id_seq;

-- 2. Define o valor inicial da sequence baseado no maior id existente
SELECT setval('posts_id_seq', COALESCE((SELECT MAX(id) FROM posts), 0) + 1, false);

-- 3. Altera a coluna id para usar a sequence como default
ALTER TABLE posts
  ALTER COLUMN id SET DEFAULT nextval('posts_id_seq');

-- 4. Garante que a sequence pertence à coluna
ALTER SEQUENCE posts_id_seq OWNED BY posts.id;

-- ============================================
-- FAÇA O MESMO PARA OUTRAS TABELAS SE NECESSÁRIO
-- ============================================

-- comments
CREATE SEQUENCE IF NOT EXISTS comments_id_seq;
SELECT setval('comments_id_seq', COALESCE((SELECT MAX(id) FROM comments), 0) + 1, false);
ALTER TABLE comments
  ALTER COLUMN id SET DEFAULT nextval('comments_id_seq');
ALTER SEQUENCE comments_id_seq OWNED BY comments.id;

-- likes
CREATE SEQUENCE IF NOT EXISTS likes_id_seq;
SELECT setval('likes_id_seq', COALESCE((SELECT MAX(id) FROM likes), 0) + 1, false);
ALTER TABLE likes
  ALTER COLUMN id SET DEFAULT nextval('likes_id_seq');
ALTER SEQUENCE likes_id_seq OWNED BY likes.id;

-- notifications
CREATE SEQUENCE IF NOT EXISTS notifications_id_seq;
SELECT setval('notifications_id_seq', COALESCE((SELECT MAX(id) FROM notifications), 0) + 1, false);
ALTER TABLE notifications
  ALTER COLUMN id SET DEFAULT nextval('notifications_id_seq');
ALTER SEQUENCE notifications_id_seq OWNED BY notifications.id;

-- messages
CREATE SEQUENCE IF NOT EXISTS messages_id_seq;
SELECT setval('messages_id_seq', COALESCE((SELECT MAX(id) FROM messages), 0) + 1, false);
ALTER TABLE messages
  ALTER COLUMN id SET DEFAULT nextval('messages_id_seq');
ALTER SEQUENCE messages_id_seq OWNED BY messages.id;
