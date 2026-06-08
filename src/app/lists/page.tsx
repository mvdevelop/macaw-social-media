"use client";

import Image from "next/image";
import Link from "next/link";
import { getPosts, getCurrentUser } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { FiList, FiArrowLeft, FiPlus, FiBookmark, FiHeart, FiCamera, FiMusic, FiMapPin } from "react-icons/fi";

// Simulated saved lists
const savedLists = [
  {
    id: 1,
    name: "Best Restaurants",
    description: "Places I want to try",
    itemCount: 12,
    icon: FiMapPin,
    color: "from-red-400 to-pink-500",
    items: [
      { id: 1, title: "Italian Place Downtown", type: "Restaurant" },
      { id: 2, title: "Sushi Bar", type: "Restaurant" },
    ],
  },
  {
    id: 2,
    name: "Travel Destinations",
    description: "Dream vacation spots",
    itemCount: 8,
    icon: FiMapPin,
    color: "from-blue-400 to-cyan-500",
    items: [
      { id: 3, title: "Tokyo, Japan", type: "Destination" },
      { id: 4, title: "Paris, France", type: "Destination" },
    ],
  },
  {
    id: 3,
    name: "Favorite Music",
    description: "Albums and artists I love",
    itemCount: 25,
    icon: FiMusic,
    color: "from-purple-400 to-indigo-500",
    items: [
      { id: 5, title: "Latest Album", type: "Music" },
    ],
  },
  {
    id: 4,
    name: "Inspiring Photos",
    description: "Photos that inspire my photography",
    itemCount: 42,
    icon: FiCamera,
    color: "from-green-400 to-emerald-500",
    items: [],
  },
  {
    id: 5,
    name: "Saved Posts",
    description: "Posts I want to revisit",
    itemCount: 15,
    icon: FiBookmark,
    color: "from-amber-400 to-orange-500",
    items: [],
  },
];

export default function ListsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
              <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.lists.title}</h1>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
            <FiPlus size={16} />
            {t.lists.createList}
          </button>
        </div>

        {/* Lists grid */}
        {savedLists.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
            <FiList size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-400 dark:text-gray-500">{t.lists.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedLists.map((list) => {
              const Icon = list.icon;
              return (
                <div key={list.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer group">
                  <div className={`bg-gradient-to-r ${list.color} p-5 relative overflow-hidden`}>
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
                    <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-white/10 rounded-full" />
                    <Icon size={28} className="text-white mb-2" />
                    <h3 className="text-white font-bold text-lg">{list.name}</h3>
                    <p className="text-white/80 text-sm">{list.description}</p>
                    <p className="text-white/60 text-xs mt-1">{list.itemCount} {t.lists.items}</p>
                  </div>
                  <div className="p-4">
                    {list.items.length > 0 ? (
                      <div className="space-y-2">
                        {list.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <FiHeart size={14} className="text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-white">{item.title}</p>
                              <p className="text-xs text-gray-400">{item.type}</p>
                            </div>
                          </div>
                        ))}
                        {list.items.length < list.itemCount && (
                          <p className="text-xs text-gray-400 text-center py-1">
                            +{list.itemCount - list.items.length} more items
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-3">No items yet</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recently saved posts */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-10 mb-4">Recently Saved</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md divide-y divide-gray-100 dark:divide-gray-700">
          {getPosts().slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-700 flex items-center justify-center shrink-0">
                <FiBookmark size={16} className="text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-white line-clamp-1">{post.content}</p>
                <p className="text-xs text-gray-400">by {post.user.name} {post.user.surname}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{post.likes} likes</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
