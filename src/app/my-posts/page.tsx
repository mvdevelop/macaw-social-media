"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getPostsByUserId,
  getCurrentUser,
  type MockPost,
} from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import {
  FiHeart,
  FiMessageCircle,
  FiArrowLeft,
  FiCamera,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";

export default function MyPostsPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<MockPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = createClient();
        const { data: userData } = await supabase.auth.getUser();

        if (userData?.user) {
          const { data: dbPosts } = await supabase
            .from("posts")
            .select("*, user:user_id(*)")
            .eq("user_id", userData.user.id)
            .order("created_at", { ascending: false });

          if (dbPosts && dbPosts.length > 0) {
            const mapped = dbPosts.map((p: any) => ({
              id: p.id,
              content: p.content || "",
              img: p.img || null,
              createdAt: p.created_at,
              userId: p.user_id,
              user: {
                id: p.user?.id || currentUser.id,
                username: p.user?.username || currentUser.username,
                name: p.user?.name || currentUser.name,
                surname: p.user?.surname || currentUser.surname,
                avatar: p.user?.avatar || currentUser.avatar,
                cover: p.user?.cover || currentUser.cover,
                description: p.user?.description || currentUser.description,
                city: p.user?.city || currentUser.city,
                school: p.user?.school || currentUser.school,
                work: p.user?.work || currentUser.work,
                website: p.user?.website || currentUser.website,
                createdAt: p.user?.created_at || currentUser.createdAt,
              },
              likes: p.likes_count || 0,
              liked: false,
              commentCount: p.comments_count || 0,
            }));
            setPosts(mapped);
            setLoading(false);
            return;
          }
        }
      } catch {
        // fallback to mock data
      }

      const mockPosts = getPostsByUserId(currentUser.id).slice(0, 50);
      setPosts(mockPosts);
      setLoading(false);
    };

    fetchPosts();
  }, [currentUser]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return `${Math.floor(diffMs / (1000 * 60))}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffHrs < 48) return "Yesterday";
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  const formatJoinDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const displayedPosts = posts.slice(0, displayCount);
  const hasMore = displayCount < posts.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <FiArrowLeft
              size={20}
              className="text-gray-600 dark:text-gray-400"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t.myPosts.title}
          </h1>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-5">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-900"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {currentUser.name} {currentUser.surname}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {posts.length} {t.profile.posts}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <FiCalendar size={12} />
                  {t.profile.joined} {formatJoinDate(currentUser.createdAt)}
                </span>
                {currentUser.city && (
                  <span className="flex items-center gap-1">
                    <FiMapPin size={12} />
                    {currentUser.city}
                  </span>
                )}
              </div>
              {currentUser.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                  {currentUser.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FiCamera
                size={36}
                className="text-gray-300 dark:text-gray-500"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-400 dark:text-gray-500 max-w-sm mx-auto">
              {t.myPosts.empty}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {displayedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={post.user.avatar}
                        alt={post.user.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-medium text-sm text-gray-800 dark:text-white">
                          {post.user.name} {post.user.surname}
                        </span>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <FiClock size={10} />
                          {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {post.content}
                  </p>

                  {/* Image */}
                  {post.img && (
                    <div className="relative w-full h-56 md:h-72 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={post.img}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <FiHeart
                        size={14}
                        className={
                          post.liked ? "text-red-500 fill-red-500" : ""
                        }
                      />
                      {post.likes} {t.feed.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiMessageCircle size={14} />
                      {post.commentCount} {t.feed.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setDisplayCount((prev) => prev + 10)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700"
                >
                  <FiChevronDown size={16} />
                  Load more ({posts.length - displayCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
