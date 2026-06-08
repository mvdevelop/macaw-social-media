"use client";

import Image from "next/image";
import Link from "next/link";
import { getPosts, getCurrentUser } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { FiVideo, FiPlay, FiArrowLeft } from "react-icons/fi";

export default function VideosPage() {
  const { t } = useTranslation();

  // Simulate video posts from the feed - filter posts with specific content patterns
  const allPosts = getPosts().filter(p => p.content.toLowerCase().includes("track") || p.content.toLowerCase().includes("video") || p.content.toLowerCase().includes("music") || p.content.toLowerCase().includes("watch") || p.content.toLowerCase().includes("album") || p.img?.includes("video")).slice(0, 20);

  // Also show some posts with images as "featured videos"
  const featuredPosts = getPosts().filter(p => p.img).slice(0, 8);

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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
            <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.videos.title}</h1>
        </div>

        {/* Featured / Trending */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Trending Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {featuredPosts.slice(0, 4).map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group cursor-pointer">
              <div className="relative aspect-video">
                <Image src={post.img!} alt="" fill className="object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <FiPlay size={20} className="text-gray-800 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Image src={post.user.avatar} alt="" width={20} height={20} className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-xs text-gray-400">{post.user.name}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{post.likes} views · {formatDate(post.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* All videos */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">All Videos</h2>
        {allPosts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
            <FiVideo size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-400 dark:text-gray-500">{t.videos.empty}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {allPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex gap-4 hover:shadow-lg transition cursor-pointer">
                <div className="relative w-40 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  {post.img ? (
                    <Image src={post.img} alt="" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiVideo size={24} className="text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <FiPlay size={18} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Image src={post.user.avatar} alt="" width={18} height={18} className="w-4.5 h-4.5 rounded-full object-cover" />
                    <span className="text-xs text-gray-400">{post.user.name} {post.user.surname}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{post.likes} views · {formatDate(post.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
