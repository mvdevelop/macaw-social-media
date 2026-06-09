"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthProvider";
import { useTranslation } from "@/context/LanguageProvider";
import { FiBookmark, FiArrowLeft } from "react-icons/fi";
import Post from "@/components/Post";
import type { MockPost } from "@/lib/mock-data";

interface BookmarkedPost {
  id: number;
  post_id: number;
  posts: {
    id: number;
    content: string;
    img: string | null;
    created_at: string;
    user_id: string;
    user: { id: string; name: string; surname: string; username: string; avatar: string; cover: string; description: string; city: string; school: string; work: string; website: string; createdAt: string };
  };
}

export default function SavedPage() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const fetchBookmarks = async () => {
      const supabase = createClient();
      try {
        const { data } = await supabase
          .from("bookmarks")
          .select("id, post_id, posts:post_id(*)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (data) {
          // Transform to MockPost format
          const mapped = data
            .filter((b: any) => b.posts)
            .map((b: any) => ({
              id: b.posts.id,
              content: b.posts.content,
              img: b.posts.img,
              createdAt: b.posts.created_at,
              userId: b.posts.user_id,
              user: b.posts.user || { id: b.posts.user_id, name: "User", surname: "", username: "", avatar: "", cover: "", description: "", city: "", school: "", work: "", website: "", createdAt: "" },
              likes: 0,
              liked: false,
              commentCount: 0,
            }));
          setPosts(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [user, authLoading, router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
            <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <FiBookmark size={24} className="text-yellow-500" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Saved Posts</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <FiBookmark size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">No saved posts yet</h2>
            <p className="text-sm text-gray-400">Save posts you want to come back to later</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <Post post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
