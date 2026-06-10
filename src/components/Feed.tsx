"use client";

import Post from "./Post";
import { getPosts } from "@/lib/mock-data";
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { getOrFetch } from "@/lib/cache";
import { useTranslation } from "@/context/LanguageProvider";
import { FiRefreshCw, FiShuffle } from "react-icons/fi";
import type { MockPost } from "@/lib/mock-data";
import { clearCache } from "@/lib/cache";

const CACHE_KEY = "feed:posts";
const PAGE_SIZE = 10;
const STAGGER_DELAY = 50; // ms between each post animation

// Seeded shuffle (Fisher-Yates with Date.now seed so it's different each time)
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  let seed = Date.now();
  const rng = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const Feed = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<MockPost[]>([]);
  const [displayPosts, setDisplayPosts] = useState<MockPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [animatingIds, setAnimatingIds] = useState<Set<number>>(new Set());
  const [currentBatch, setCurrentBatch] = useState(0);
  const mountedRef = useRef(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const allPostsRef = useRef<MockPost[]>([]);

  // Fetch initial posts
  useEffect(() => {
    mountedRef.current = true;

    const fetchPosts = async () => {
      try {
        const data = await getOrFetch<MockPost[]>(CACHE_KEY, async () => {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("posts")
            .select("*, user:users(*), comments:comments(count)")
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
              likes: 0, liked: false, commentCount: p.comments?.[0]?.count ?? 0,
            }));
          }
          return getPosts();
        });

        if (mountedRef.current) {
          setPosts(data);
          setDisplayPosts(data);
          allPostsRef.current = data;
          setHasMore(data.length >= PAGE_SIZE);
        }
      } catch {
        if (mountedRef.current) {
          const fallback = getPosts();
          setPosts(fallback);
          setDisplayPosts(fallback);
          allPostsRef.current = fallback;
        }
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };

    fetchPosts();
    return () => { mountedRef.current = false; };
  }, []);

  // Handle refresh — carrega posts frescos do mock data + embaralha
  const handleRefresh = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);

    // Se estiver no fallback mock, carrega um subset aleatório dos 17000 posts
    const mockSource = getPosts();
    const freshPosts = shuffleArray(mockSource).slice(0, PAGE_SIZE);
    allPostsRef.current = freshPosts;

    const ids = new Set(freshPosts.map(p => p.id));
    setAnimatingIds(ids);

    setTimeout(() => {
      setPosts(freshPosts);
      setDisplayPosts(freshPosts);
      setPage(0);
      setHasMore(mockSource.length > PAGE_SIZE);
      setCurrentBatch(prev => prev + 1);
    }, 50);

    setTimeout(() => {
      setAnimatingIds(new Set());
      setRefreshing(false);
    }, freshPosts.length * STAGGER_DELAY + 300);
  }, [refreshing]);

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
        .select("*, user:users(*), comments:comments(count)")
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
          likes: 0, liked: false, commentCount: p.comments?.[0]?.count ?? 0,
        }));
        setPosts((prev) => [...prev, ...mapped]);
        setDisplayPosts((prev) => [...prev, ...mapped]);
        setPage(nextPage);
        setHasMore(data.length >= PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch {
      // Fallback mock: carrega mais do dataset completo de 17000 posts
      const mockSource = getPosts();
      const fromIdx = (page + 1) * PAGE_SIZE;
      const morePosts = mockSource.slice(fromIdx, fromIdx + PAGE_SIZE);
      if (morePosts.length > 0) {
        setPosts((prev) => [...prev, ...morePosts]);
        setDisplayPosts((prev) => [...prev, ...morePosts]);
        setPage(page + 1);
        setHasMore(fromIdx + PAGE_SIZE < mockSource.length);
      } else {
        setHasMore(false);
      }
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
          // Invalida o cache para que a próxima carga inicial busque dados frescos
          clearCache(CACHE_KEY);
          setPosts((prev) => [mapped, ...prev]);
          setDisplayPosts((prev) => [mapped, ...prev]);
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
      {/* Pull-to-refresh hint */}
      {displayPosts.length > 0 && (
        <div className="text-center py-0.5 opacity-60">
          <div className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
            <FiRefreshCw size={10} />
            <span>Pull to refresh</span>
          </div>
        </div>
      )}

      {/* Refresh/Shuffle bar */}
      {displayPosts.length > 0 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {displayPosts.length} posts
          </p>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition disabled:opacity-50"
            title="Refresh feed"
          >
            <FiRefreshCw
              size={14}
              className={`transition-all ${refreshing ? "animate-spin" : ""}`}
            />
            <FiShuffle size={12} />
            <span>{t.feed.shuffle || "Shuffle"}</span>
          </button>
        </div>
      )}

      {/* Posts with stagger animation */}
      {displayPosts.map((post, index) => {
        const isNewBatch = animatingIds.has(post.id);
        const delay = isNewBatch ? index * STAGGER_DELAY : 0;

        return (
          <div
            key={`${post.id}-${currentBatch}`}
            className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors ${
              isNewBatch ? "animate-fadeSlideIn" : ""
            }`}
            style={{
              animationDelay: isNewBatch ? `${delay}ms` : "0ms",
              animationFillMode: "backwards",
            }}
          >
            <Post
              post={post}
              onDelete={(id) => {
                setPosts((prev) => prev.filter((p) => p.id !== id));
                setDisplayPosts((prev) => prev.filter((p) => p.id !== id));
              }}
            />
          </div>
        );
      })}

      {/* Sentinel para infinite scroll */}
      <div ref={sentinelRef} className="h-4" />

      {loadingMore && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {!hasMore && displayPosts.length > 0 && (
        <p className="text-center text-gray-400 text-sm py-4">{t.feed.allCaughtUp || "You've seen all posts"}</p>
      )}
    </div>
  );
};

export default Feed;
