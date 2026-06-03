"use client";

import Post from "./Post";
import { getPosts } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { MockPost } from "@/lib/mock-data";

const Feed = () => {
  const [posts, setPosts] = useState<MockPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("posts")
          .select("*, user:users(*)")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: MockPost[] = data.map((p: any) => ({
            id: p.id,
            content: p.content,
            img: p.img,
            createdAt: p.created_at,
            userId: p.user_id,
            user: p.user || {
              id: p.user_id,
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
            liked: false,
            commentCount: 0,
          }));
          setPosts(mapped);
        } else {
          // Fallback para mock data
          setPosts(getPosts());
        }
      } catch {
        setPosts(getPosts());
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
