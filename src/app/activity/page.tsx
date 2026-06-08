"use client";

import Image from "next/image";
import Link from "next/link";
import { getNotifications, getCurrentUser, getPosts } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { FiHeart, FiMessageCircle, FiUserPlus, FiArrowLeft, FiBell } from "react-icons/fi";

export default function ActivityPage() {
  const { t } = useTranslation();
  const currentUser = getCurrentUser();
  const activities = getNotifications().slice(0, 50);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 60) return `${diffMins}${t.news.minAgo}`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}${t.news.hoursAgo}`;
    return `${Math.floor(diffHrs / 24)}${t.news.daysAgo}`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "like": return <FiHeart size={16} className="text-red-500" />;
      case "comment": return <FiMessageCircle size={16} className="text-blue-500" />;
      case "follow": return <FiUserPlus size={16} className="text-green-500" />;
      case "friend_request": return <FiUserPlus size={16} className="text-purple-500" />;
      default: return <FiBell size={16} className="text-gray-500" />;
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case "like": return t.activity.liked;
      case "comment": return t.activity.commented;
      case "follow": return t.activity.followed;
      case "friend_request": return t.activity.friendRequest;
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
            <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.activity.title}</h1>
        </div>

        {/* Activity list */}
        {activities.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
            <FiBell size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-400 dark:text-gray-500">{t.activity.empty}</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md divide-y divide-gray-100 dark:divide-gray-700">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <div className="relative shrink-0">
                  <Image
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    width={48} height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {activity.user.name} {activity.user.surname}
                    </span>{" "}
                    {getActivityText(activity.type)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(activity.createdAt)}</p>
                </div>
                {!activity.read && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
