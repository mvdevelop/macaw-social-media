"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createComment } from "@/lib/actions";
import { getCommentsByPostId } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";
import { FiHeart } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import type { MockComment } from "@/lib/mock-data";

const Comments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<MockComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("comments")
          .select("*, user:users(*)")
          .eq("post_id", postId)
          .order("created_at", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: MockComment[] = data.map((c: any) => ({
            id: c.id,
            content: c.content,
            createdAt: c.created_at,
            userId: c.user_id,
            user: c.user || {
              id: c.user_id,
              username: "user",
              name: "User",
              surname: "",
              avatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
              cover: "",
              description: "",
              city: "",
              school: "",
              work: "",
              website: "",
              createdAt: "",
            },
            likes: 0,
          }));
          setComments(mapped);
        } else {
          setComments(getCommentsByPostId(postId));
        }
      } catch {
        setComments(getCommentsByPostId(postId));
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    const formData = new FormData();
    formData.append("content", newComment);
    formData.append("postId", String(postId));

    try {
      await createComment(formData);
      // Adiciona otimisticamente
      const optimistic: MockComment = {
        id: Date.now(),
        content: newComment,
        createdAt: new Date().toISOString(),
        userId: "u1",
        user: {
          id: "u1",
          username: "john_doe",
          name: "John",
          surname: "Doe",
          avatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
          cover: "",
          description: "",
          city: "",
          school: "",
          work: "",
          website: "",
          createdAt: "",
        },
        likes: 0,
      };
      setComments([...comments, optimistic]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Image
          src="https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2">
          <input
            type="text"
            placeholder={t.feed.writeComment}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm dark:text-white"
          />
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition disabled:opacity-50"
          >
            {t.feed.post}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Image
              src={comment.user.avatar}
              alt={comment.user.name}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-800 dark:text-white">
                    {comment.user.name} {comment.user.surname}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
              <div className="flex items-center gap-4 mt-1 ml-2">
                <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition">
                  <FiHeart size={12} />
                  <span>{comment.likes}</span>
                </button>
                <button className="text-xs text-gray-400 hover:text-blue-500 transition">{t.feed.reply}</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
