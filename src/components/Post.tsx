"use client";

import Image from "next/image";
import Comments from "./Comments";
import { useState, useRef, useEffect } from "react";
import { likePost, sharePost, deletePost, updatePost } from "@/lib/actions";
import { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import type { MockPost } from "@/lib/mock-data";

const Post = ({ post, onDelete }: { post: MockPost; onDelete?: (id: number) => void }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [animating, setAnimating] = useState(false);
  const [shareAnim, setShareAnim] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [savingEdit, setSavingEdit] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return `${Math.floor(diffMs / (1000 * 60))}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  const handleLike = async () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    try { await likePost(post.id); } catch { setLiked(liked); setLikes(post.likes); }
  };

  const handleShare = async () => {
    setShareAnim(true);
    setTimeout(() => setShareAnim(false), 300);
    try { await sharePost(post.id); } catch (err) { console.error(err); }
  };

  const handleEdit = async () => {
    if (!editContent.trim() || savingEdit) return;
    setSavingEdit(true);
    try {
      await updatePost(post.id, editContent);
      setEditing(false);
    } catch (err) { console.error(err); }
    finally { setSavingEdit(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost(post.id);
      onDelete?.(post.id);
    } catch (err) { console.error(err); }
    setMenuOpen(false);
  };

  const isVideo = post.img?.includes("post-videos") || post.img?.endsWith(".mp4") || post.img?.endsWith(".webm");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={post.user.avatar} alt={post.user.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <span className="font-medium text-sm text-gray-800 dark:text-white">
              {post.user.name} {post.user.surname}
            </span>
            <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <FiMoreHorizontal className="text-gray-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-700 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600 z-50 overflow-hidden">
              <button
                onClick={() => { setEditing(true); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                <FiEdit2 size={14} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
              >
                <FiTrash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {editing ? (
        <div className="space-y-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white rounded-lg p-3 outline-none resize-none text-sm min-h-[80px]"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setEditing(false); setEditContent(post.content); }}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <FiX size={14} /> Cancel
            </button>
            <button onClick={handleEdit} disabled={savingEdit}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50">
              <FiCheck size={14} /> {savingEdit ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{post.content}</p>
      )}

      {post.img && !editing && (
        <div className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden bg-black">
          {isVideo ? (
            <video src={post.img} controls className="w-full h-full object-contain" />
          ) : (
            <Image src={post.img} alt="Post image" fill className="object-cover" />
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{likes} {t.feed.likes}</span>
        <span>{post.commentCount} {t.feed.comments}</span>
      </div>

      <hr className="border-gray-100 dark:border-gray-700" />

      <div className="flex items-center justify-between">
        <button onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            liked ? "text-red-500 bg-red-50 dark:bg-red-900/30" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          } ${animating ? "scale-110" : ""}`}>
          <FiHeart size={20} fill={liked ? "currentColor" : "none"} />
          <span className="text-sm font-medium">{t.feed.like}</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          <FiMessageCircle size={20} />
          <span className="text-sm font-medium">{t.feed.comment}</span>
        </button>
        <button onClick={handleShare}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${shareAnim ? "scale-110" : ""}`}>
          <FiShare2 size={20} />
          <span className="text-sm font-medium">{t.feed.share}</span>
        </button>
      </div>

      <Comments postId={post.id} />
    </div>
  );
};

export default Post;
