"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiX } from "react-icons/fi";
import { getAllUsers, getPosts } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "users" | "posts">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
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

  const users = getAllUsers().filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.surname.toLowerCase().includes(query.toLowerCase()) ||
      u.username.toLowerCase().includes(query.toLowerCase())
  );

  const posts = getPosts().filter(
    (p) =>
      p.content.toLowerCase().includes(query.toLowerCase())
  );

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
            placeholder="Search users, posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm dark:text-white"
          />
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
                {tab === "all" ? "All" : tab === "users" ? "People" : "Posts"}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {!query ? (
            <div className="py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
              <FiSearch size={32} className="mx-auto mb-3 opacity-50" />
              Type to search users and posts
            </div>
          ) : (
            <>
              {/* Users */}
              {(activeTab === "all" || activeTab === "users") && users.length > 0 && (
                <div className="mb-2">
                  {activeTab === "all" && (
                    <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">People</p>
                  )}
                  {users.map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <Image src={user.avatar} alt={user.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name} {user.surname}</p>
                        <p className="text-xs text-gray-400">@{user.username}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Posts */}
              {(activeTab === "all" || activeTab === "posts") && posts.length > 0 && (
                <div>
                  {activeTab === "all" && (
                    <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Posts</p>
                  )}
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      onClick={onClose}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                    >
                      <Image src={post.user.avatar} alt="" width={28} height={28} className="w-7 h-7 rounded-full object-cover mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">{post.content}</p>
                        <p className="text-xs text-gray-400">{post.user.name} {post.user.surname}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {users.length === 0 && posts.length === 0 && (
                <div className="py-8 text-center text-gray-400 text-sm">
                  No results found for &quot;{query}&quot;
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
