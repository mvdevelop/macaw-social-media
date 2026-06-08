"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiX } from "react-icons/fi";
import { getAllUsers, getPosts } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/context/LanguageProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface SearchUser {
  id: string;
  name: string;
  surname: string;
  username: string;
  avatar: string;
}

interface SearchPost {
  id: number;
  content: string;
  user_id: string;
  user: SearchUser;
  created_at: string;
}

const DEBOUNCE_MS = 300;

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "users" | "posts">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  // Resultados reais (Supabase)
  const [realUsers, setRealUsers] = useState<SearchUser[]>([]);
  const [realPosts, setRealPosts] = useState<SearchPost[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  // Resultados mock (fallback)
  const mockUsers = getAllUsers().filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.surname.toLowerCase().includes(query.toLowerCase()) ||
      u.username.toLowerCase().includes(query.toLowerCase())
  );
  const mockPosts = getPosts().filter(
    (p) =>
      p.content.toLowerCase().includes(query.toLowerCase())
  );

  // Busca real no Supabase com debounce
  const searchSupabase = useCallback(async (q: string) => {
    if (!q.trim()) {
      setRealUsers([]);
      setRealPosts([]);
      setSearched(false);
      return;
    }

    setSearching(true);
    setSearched(true);

    try {
      const supabase = createClient();

      // Busca usuários
      const { data: users } = await supabase
        .from("users")
        .select("id, name, surname, username, avatar")
        .or(`name.ilike.%${q}%,surname.ilike.%${q}%,username.ilike.%${q}%`)
        .limit(10);

      if (users) setRealUsers(users as SearchUser[]);

      // Busca posts (só se tiver users como fallback visual)
      const { data: posts } = await supabase
        .from("posts")
        .select("id, content, user_id, created_at, user:users(id, name, surname, username, avatar)")
        .ilike("content", `%${q}%`)
        .order("created_at", { ascending: false })
        .limit(10);

      if (posts) {
        setRealPosts(
          (posts as any[]).map((p) => ({
            id: p.id,
            content: p.content,
            user_id: p.user_id,
            created_at: p.created_at,
            user: p.user || { id: p.user_id, name: "User", surname: "", username: "", avatar: "" },
          }))
        );
      }
    } catch {
      // Fallback silencioso — usa resultados mock
    } finally {
      setSearching(false);
    }
  }, []);

  // Debounce da busca
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchSupabase(query);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, searchSupabase]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setRealUsers([]);
      setRealPosts([]);
      setSearched(false);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!open) return null;

  // Decide quais resultados mostrar (reais primeiro, mock como fallback)
  const showUsers = realUsers.length > 0 ? realUsers : mockUsers;
  const showPosts = realPosts.length > 0 ? realPosts : mockPosts;
  const hasRealResults = realUsers.length > 0 || realPosts.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl mx-4 overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <FiSearch size={20} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t.search.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm dark:text-white"
          />
          {searching && (
            <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin shrink-0" />
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <FiX size={18} />
          </button>
        </div>

        {/* Tabs */}
        {query && (
          <div className="flex border-b border-gray-100 dark:border-gray-700">
            {(["all", "users", "posts"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                {tab === "all" ? t.search.all : tab === "users" ? t.search.people : t.search.posts}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {!query ? (
            <div className="py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
              <FiSearch size={32} className="mx-auto mb-3 opacity-50" />
              {t.search.empty}
            </div>
          ) : (
            <>
              {/* Users */}
              {(activeTab === "all" || activeTab === "users") && showUsers.length > 0 && (
                <div className="mb-2">
                  {activeTab === "all" && (
                    <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {t.search.people}
                      {hasRealResults && realUsers.length > 0 && (
                        <span className="ml-1 font-normal normal-case text-green-500 text-[10px]">• real</span>
                      )}
                    </p>
                  )}
                  {showUsers.map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <Image
                        src={user.avatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {user.name} {user.surname}
                        </p>
                        <p className="text-xs text-gray-400">@{user.username}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Posts */}
              {(activeTab === "all" || activeTab === "posts") && showPosts.length > 0 && (
                <div>
                  {activeTab === "all" && (
                    <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t.search.posts}</p>
                  )}
                  {showPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/profile/${post.user?.id}`}
                      onClick={onClose}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                    >
                      <Image
                        src={post.user?.avatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover mt-0.5 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">{post.content}</p>
                        <p className="text-xs text-gray-400">
                          {post.user?.name} {post.user?.surname}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {showUsers.length === 0 && showPosts.length === 0 && !searching && (
                <div className="py-8 text-center text-gray-400 text-sm">
                  {t.search.noResults} &quot;{query}&quot;
                </div>
              )}

              {searching && (
                <div className="py-8 text-center text-gray-400 text-sm">
                  <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-2" />
                  Searching...
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
