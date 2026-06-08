"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createComment, likeComment } from "@/lib/actions";
import { getCommentsByPostId, getCurrentUser } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";
import { getOrFetch } from "@/lib/cache";
import { FiHeart, FiCornerDownRight } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";

interface CommentUser {
  id: string; name: string; surname: string; avatar: string;
}

interface CommentItem {
  id: number; content: string; createdAt: string; userId: string;
  user: CommentUser; likes: number; parentId: number | null;
}

const Comments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: number; name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const mountedRef = useRef(true);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  // Carrega avatar do usuário logado
  useEffect(() => {
    const loadAvatar = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Não logado → usa mock
        const mock = getCurrentUser();
        if (mountedRef.current) setUserAvatar(mock.avatar);
        return;
      }
      // Logado → usa avatar do Google/auth metadata primeiro
      if (user.user_metadata?.avatar_url) {
        setUserAvatar(user.user_metadata.avatar_url);
      }
      // Depois tenta buscar do Supabase (pode ter avatar customizado)
      try {
        const { data } = await supabase.from("users").select("avatar").eq("id", user.id).single();
        if (data?.avatar && mountedRef.current) setUserAvatar(data.avatar);
      } catch {}
    };
    loadAvatar();
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const fetchComments = async () => {
      try {
        const data = await getOrFetch<CommentItem[]>(`comments:${postId}`, async () => {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("comments")
            .select("*, user:users(id, name, surname, avatar)")
            .eq("post_id", postId)
            .order("created_at", { ascending: true })
            .limit(50); // Limite seguro de 50 comentários por requisição
          if (error) throw error;
          if (data && data.length > 0) {
            return data.map((c: any) => ({
              id: c.id, content: c.content, createdAt: c.created_at,
              userId: c.user_id, parentId: c.parent_id,
              user: c.user || { id: c.user_id, name: "User", surname: "", avatar: "" },
              likes: 0,
            }));
          }
          return getCommentsByPostId(postId).map((c: any) => ({
            ...c, parentId: null, likes: c.likes || 0,
          }));
        });
        if (mountedRef.current) setComments(data);
      } catch {
        if (mountedRef.current) setComments(
          getCommentsByPostId(postId).map((c: any) => ({ ...c, parentId: null, likes: c.likes || 0 }))
        );
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };
    fetchComments();
    return () => { mountedRef.current = false; };
  }, [postId]);

  useEffect(() => {
    if (replyTo && replyInputRef.current) replyInputRef.current.focus();
  }, [replyTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append("content", newComment);
    formData.append("postId", String(postId));
    if (replyTo) formData.append("parentId", String(replyTo.id));

    try {
      await createComment(formData);
      const optimistic: CommentItem = {
        id: Date.now(), content: newComment, createdAt: new Date().toISOString(),
        userId: "", parentId: replyTo?.id || null,
        user: { id: "", name: "You", surname: "", avatar: userAvatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg" },
        likes: 0,
      };
      setComments([...comments, optimistic]);
      setNewComment("");
      setReplyTo(null);
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  const handleLike = async (commentId: number) => {
    setComments((prev) => prev.map((c) =>
      c.id === commentId ? { ...c, likes: c.likes + (c.userId === "" ? 0 : 1) } : c
    ));
    try { await likeComment(commentId); } catch (err) { console.error(err); }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return `${Math.floor(diffMs / (1000 * 60))}m`;
    if (diffHrs < 24) return `${diffHrs}h`;
    return `${Math.floor(diffHrs / 24)}d`;
  };

  // Separa comentários principais e respostas
  const topLevel = comments.filter((c) => !c.parentId);
  const replies = comments.filter((c) => c.parentId);
  const getReplies = (parentId: number) => replies.filter((r) => r.parentId === parentId);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
            <div className="flex-1 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Comment input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Image
          src={userAvatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"}
          alt="" width={32} height={32}
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 flex flex-col">
          {replyTo && (
            <div className="flex items-center gap-1 mb-1 text-xs text-blue-500">
              <FiCornerDownRight size={12} />
              <span>Replying to <strong>{replyTo.name}</strong></span>
              <button type="button" onClick={() => setReplyTo(null)} className="ml-1 text-gray-400 hover:text-gray-600">✕</button>
            </div>
          )}
          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2">
            <input
              ref={replyInputRef}
              type="text"
              placeholder={replyTo ? `Reply to ${replyTo.name}...` : t.feed.writeComment}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm dark:text-white"
            />
            <button type="submit" disabled={submitting || !newComment.trim()}
              className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition disabled:opacity-50">
              {t.feed.post}
            </button>
          </div>
        </div>
      </form>

      {/* Comments list */}
      {topLevel.map((comment) => {
        const childReplies = getReplies(comment.id);
        return (
          <CommentBlock
            key={comment.id}
            comment={comment}
            replies={childReplies}
            onReply={(id, name) => setReplyTo({ id, name })}
            onLike={handleLike}
            formatDate={formatDate}
            t={t}
          />
        );
      })}
    </div>
  );
};

// Subcomponente para cada comentário com suas respostas
function CommentBlock({
  comment, replies, onReply, onLike, formatDate, t,
}: {
  comment: CommentItem;
  replies: CommentItem[];
  onReply: (id: number, name: string) => void;
  onLike: (id: number) => void;
  formatDate: (s: string) => string;
  t: any;
}) {
  return (
    <div className="space-y-2">
      {/* Comment */}
      <div className="flex gap-3">
        <Link href={`/profile/${comment.user.id}`} className="shrink-0">
          <Image
            src={comment.user.avatar}
            alt={comment.user.name}
            width={36} height={36}
            className="w-9 h-9 rounded-full object-cover shrink-0 hover:opacity-90 transition"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/profile/${comment.user.id}`} className="font-semibold text-sm text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition">
                {comment.user.name} {comment.user.surname}
              </Link>
              <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1 ml-2">
            <button onClick={() => onLike(comment.id)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition">
              <FiHeart size={12} /> <span>{comment.likes}</span>
            </button>
            <button onClick={() => onReply(comment.id, `${comment.user.name} ${comment.user.surname}`)}
              className="text-xs text-gray-400 hover:text-blue-500 transition">
              {t.feed.reply}
            </button>
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="ml-10 space-y-2 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <Link href={`/profile/${reply.user.id}`} className="shrink-0">
                <Image
                  src={reply.user.avatar}
                  alt={reply.user.name}
                  width={32} height={32}
                  className="w-8 h-8 rounded-full object-cover shrink-0 hover:opacity-90 transition"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50/50 dark:bg-gray-700/50 rounded-xl px-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Link href={`/profile/${reply.user.id}`} className="font-semibold text-sm text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition">
                      {reply.user.name} {reply.user.surname}
                    </Link>
                    <span className="text-xs text-gray-400">{formatDate(reply.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                </div>
                <div className="flex items-center gap-4 mt-1 ml-2">
                  <button onClick={() => onLike(reply.id)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition">
                    <FiHeart size={12} /> <span>{reply.likes}</span>
                  </button>
                  <button onClick={() => onReply(reply.id, `${reply.user.name} ${reply.user.surname}`)}
                    className="text-xs text-gray-400 hover:text-blue-500 transition">
                    {t.feed.reply}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
