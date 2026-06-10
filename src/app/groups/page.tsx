"use client";

import Image from "next/image";
import { getGroups, getGroupCategories } from "@/lib/mock-data";
import { FiUsers, FiGrid, FiChevronRight, FiSearch } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useMemo } from "react";

export default function GroupsPage() {
  const [groups] = useState(() => getGroups());
  const categories = useMemo(() => getGroupCategories(), []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const filtered = groups.filter((g) => {
    const matchesCategory = selectedCategory ? g.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? g.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex gap-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 gap-4">
        {/* Discover header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-colors">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
            {t.groups.discover}
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {groups.length} {t.groups.members}
          </p>
        </div>

        {/* Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <FiGrid size={16} className="text-blue-500" />
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
              {t.groups.categories}
            </span>
          </div>

          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition mb-1 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <span>{t.groups.allCategories}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedCategory === null
                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>
              {groups.length}
            </span>
          </button>

          <div className="h-px bg-gray-100 dark:bg-gray-700 my-2" />

          <div className="space-y-0.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                  selectedCategory === cat.name
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FiChevronRight size={12} className={`transition ${
                    selectedCategory === cat.name ? "rotate-90 text-blue-500" : "opacity-0"
                  }`} />
                  <span>{cat.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.name
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {selectedCategory || t.groups.title}
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {filtered.length} {t.groups.members}
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-2 text-blue-500 hover:text-blue-600 text-xs font-medium"
                >
                  &larr; {t.groups.allCategories}
                </button>
              )}
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md text-sm text-gray-800 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all dark:border-gray-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mobile category selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 lg:hidden scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selectedCategory === null
                ? "bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white shadow-md"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
            }`}
          >
            {t.groups.allCategories}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition ${
                selectedCategory === cat.name
                  ? "bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group dark:border dark:border-gray-700"
            >
              <div className="relative h-40">
                <Image
                  src={group.img}
                  alt={group.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-md">
                  {group.name}
                </h3>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {group.category}
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FiUsers size={16} />
                  <span>{group.members.toLocaleString()} {t.groups.members}</span>
                </div>
                <button className="text-sm bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-4 py-1.5 rounded-lg font-medium hover:opacity-90 transition active:scale-95">
                  {t.groups.join}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <FiUsers size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No groups in this category</p>
            <p className="text-sm mt-1">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
