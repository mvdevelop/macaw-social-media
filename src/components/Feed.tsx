"use client";

import Post from "./Post";
import { getPosts } from "@/lib/mock-data";
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { getOrFetch } from "@/lib/cache";
import type { MockPost } from "@/lib/mock-data";

const CACHE_KEY = "feed:posts";
const PAGE_SIZE = 10;

const Feed = () => {
  const [posts, setPosts] = useState<MockPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const mountedRef = useRef(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Fetch initial posts
  useEffect(() => {
    mountedRef.current = true;

    const fetchPosts = async () => {
      try {
        const data = await getOrFetch<MockPost[]>(CACHE_KEY, async () => {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("posts")
            .select("*, user:users(*)")
            .order("created_at", { ascending: false })
            .limit(PAGE_SIZE);

          if (error) throw error;

          if (data && data.length > 0) {
            return data.map((p: any) => ({
              id: p.id,
              content: p.content,
              img: p.img,
              createdAt: p.created_at,
              userId: p.user_id,
              user: p.user || {
                id: p.user_id, username: "user", name: "User", surname: "",
                avatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
                cover: "", description: "", city: "", school: "", work: "", website: "", createdAt: "",
              },
              likes: 0, liked: false, commentCount: 0,
            }));
          }
          return getPosts();
        });

        if (mountedRef.current) {
          setPosts(data);
          setHasMore(data.length >= PAGE_SIZE);
        }
      } catch {
        if (mountedRef.current) setPosts(getPosts());
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };

    fetchPosts();
    return () => { mountedRef.current = false; };
  }, []);

  // Load more posts (infinite scroll)
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const supabase = createClient();
      const nextPage = page + 1;
      const from = nextPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("posts")
        .select("*, user:users(*)")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (data && data.length > 0) {
        const mapped = data.map((p: any) => ({
          id: p.id,
          content: p.content,
          img: p.img,
          createdAt: p.created_at,
          userId: p.user_id,
          user: p.user || {
            id: p.user_id, username: "user", name: "User", surname: "",
            avatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
            cover: "", description: "", city: "", school: "", work: "", website: "", createdAt: "",
          },
          likes: 0, liked: false, commentCount: 0,
        }));
        setPosts((prev) => [...prev, ...mapped]);
        setPage(nextPage);
        setHasMore(data.length >= PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch {
      // Silently fail
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  // IntersectionObserver para infinite scroll
  useEffect(() => {
    if (!sentinelRef.current || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore, loadingMore, loadMore]);

  // Realtime subscription para novos posts
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("feed-posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        async (payload) => {
          const newPost = payload.new as any;
          const { data: user } = await supabase.from("users").select("*").eq("id", newPost.user_id).single();
          const mapped: MockPost = {
            id: newPost.id, content: newPost.content, img: newPost.img,
            createdAt: newPost.created_at, userId: newPost.user_id,
            user: user || { id: newPost.user_id, username: "user", name: "User", surname: "", avatar: "", cover: "", description: "", city: "", school: "", work: "", website: "", createdAt: "" },
            likes: 0, liked: false, commentCount: 0,
          };
          setPosts((prev) => [mapped, ...prev]);
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
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
      {posts.map((post, index) => (
        <div key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
          <Post post={post} onDelete={(id) => setPosts((prev) => prev.filter((p) => p.id !== id))} />
        </div>
      ))}

      {/* Sentinel para infinite scroll */}
      <div ref={sentinelRef} className="h-4" />

      {loadingMore && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-400 text-sm py-4">You've seen all posts</p>
      )}
    </div>
  );
};

export default Feed;
