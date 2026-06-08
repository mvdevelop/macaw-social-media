"use client";

import Image from "next/image";
import Link from "next/link";
import { getPostsByUserId, getCurrentUser, type MockPost } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { FiHeart, FiMessageCircle, FiArrowLeft } from "react-icons/fi";

export default function MyPostsPage() {
  const { t } = useTranslation();
  const currentUser = getCurrentUser();
  const userPosts = getPostsByUserId(currentUser.id).slice(0, 50);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return `${Math.floor(diffMs / (1000 * 60))}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
            <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.myPosts.title}</h1>
        </div>

        {/* User info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 flex items-center gap-4">
          <Image
            src={currentUser.avatar}
            alt={currentUser.name}
            width={64} height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              {currentUser.name} {currentUser.surname}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userPosts.length} {t.profile.posts}
            </p>
          </div>
        </div>

        {/* Posts list */}
        {userPosts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-400 dark:text-gray-500">{t.myPosts.empty}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.user.avatar}
                      alt={post.user.name}
                      width={36} height={36}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-medium text-sm text-gray-800 dark:text-white">
                        {post.user.name} {post.user.surname}
                      </span>
                      <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                {post.img && (
                  <div className="relative w-full h-56 rounded-lg overflow-hidden mb-3">
                    <Image src={post.img} alt="" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FiHeart size={14} /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMessageCircle size={14} /> {post.commentCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
