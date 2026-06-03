"use client";

import Image from "next/image";
import Comments from "./Comments";
import { useState } from "react";
import { likePost } from "@/lib/actions";
import { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import type { MockPost } from "@/lib/mock-data";

const Post = ({ post }: { post: MockPost }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [animating, setAnimating] = useState(false);
  const { t } = useTranslation();

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
    // Optimistic update
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    try {
      await likePost(post.id);
    } catch {
      // Reverter em caso de erro
      setLiked(liked);
      setLikes(post.likes);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={post.user.avatar}
            alt={post.user.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <span className="font-medium text-sm text-gray-800 dark:text-white">
              {post.user.name} {post.user.surname}
            </span>
            <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <FiMoreHorizontal className="text-gray-400 cursor-pointer" />
      </div>

      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{post.content}</p>

      {post.img && (
        <div className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden">
          <Image src={post.img} alt="Post image" fill className="object-cover" />
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{likes} {t.feed.likes}</span>
        <span>{post.commentCount} {t.feed.comments}</span>
      </div>

      <hr className="border-gray-100 dark:border-gray-700" />

      <div className="flex items-center justify-between">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            liked
              ? "text-red-500 bg-red-50 dark:bg-red-900/30"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          } ${animating ? "scale-110" : ""}`}
        >
          <FiHeart size={20} fill={liked ? "currentColor" : "none"} />
          <span className="text-sm font-medium">{t.feed.like}</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          <FiMessageCircle size={20} />
          <span className="text-sm font-medium">{t.feed.comment}</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          <FiShare2 size={20} />
          <span className="text-sm font-medium">{t.feed.share}</span>
        </button>
      </div>

      <Comments postId={post.id} />
    </div>
  );
};

export default Post;
