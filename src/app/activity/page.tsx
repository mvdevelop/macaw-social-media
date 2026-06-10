"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  getNotifications,
  type MockNotification,
} from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { markAllNotificationsRead } from "@/lib/actions";
import {
  FiHeart,
  FiMessageCircle,
  FiUserPlus,
  FiArrowLeft,
  FiBell,
  FiCheckSquare,
  FiShare2,
  FiMail,
} from "react-icons/fi";

type FilterType = "all" | "like" | "comment" | "follow" | "friend_request";

export default function ActivityPage() {
  const { t } = useTranslation();
  const allActivities = getNotifications().slice(0, 50);
  const [activities, setActivities] = useState(allActivities);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const handleMarkAllRead = async () => {
    const updated = activities.map((a) => ({ ...a, read: true }));
    setActivities(updated);
    try {
      await markAllNotificationsRead();
    } catch {
      // silent fallback
    }
  };

  const filteredActivities =
    activeFilter === "all"
      ? activities
      : activities.filter((a) => a.type === activeFilter);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "like":
        return <FiHeart size={16} className="text-red-500" />;
      case "comment":
        return <FiMessageCircle size={16} className="text-blue-500" />;
      case "follow":
        return <FiUserPlus size={16} className="text-green-500" />;
      case "friend_request":
        return <FiUserPlus size={16} className="text-purple-500" />;
      case "share":
        return <FiShare2 size={16} className="text-cyan-500" />;
      case "message":
        return <FiMail size={16} className="text-amber-500" />;
      default:
        return <FiBell size={16} className="text-gray-500" />;
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case "like":
        return t.notifications.liked;
      case "comment":
        return t.notifications.commented;
      case "follow":
        return t.notifications.followed;
      case "friend_request":
        return t.notifications.friendRequest;
      case "share":
        return t.notifications.shared;
      case "message":
        return t.notifications.message;
      default:
        return "";
    }
  };

  const getTypeBadgeBg = (type: string) => {
    switch (type) {
      case "like":
        return "bg-red-100 dark:bg-red-900/30";
      case "comment":
        return "bg-blue-100 dark:bg-blue-900/30";
      case "follow":
        return "bg-green-100 dark:bg-green-900/30";
      case "friend_request":
        return "bg-purple-100 dark:bg-purple-900/30";
      case "share":
        return "bg-cyan-100 dark:bg-cyan-900/30";
      case "message":
        return "bg-amber-100 dark:bg-amber-900/30";
      default:
        return "bg-gray-100 dark:bg-gray-700";
    }
  };

  const formatTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Group activities by date bucket
  const groupByDateBucket = (items: MockNotification[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(thisWeekStart.getDate() - today.getDay());

    const buckets: Record<string, MockNotification[]> = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      Earlier: [],
    };

    for (const item of items) {
      const d = new Date(item.createdAt);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      if (dayStart.getTime() === today.getTime()) {
        buckets["Today"].push(item);
      } else if (dayStart.getTime() === yesterday.getTime()) {
        buckets["Yesterday"].push(item);
      } else if (dayStart >= thisWeekStart) {
        buckets["This Week"].push(item);
      } else {
        buckets["Earlier"].push(item);
      }
    }

    return Object.entries(buckets).filter(([, items]) => items.length > 0);
  };

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "like", label: "Likes" },
    { key: "comment", label: "Comments" },
    { key: "follow", label: "Follows" },
    { key: "friend_request", label: "Requests" },
  ];

  const getEmptyMessage = () => {
    switch (activeFilter) {
      case "like":
        return "No likes yet.";
      case "comment":
        return "No comments yet.";
      case "follow":
        return "No new followers.";
      case "friend_request":
        return "No friend requests.";
      default:
        return "No recent activity.";
    }
  };

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
            {t.activity.title}
          </h1>
        </div>

        {/* Filter Tabs + Mark all read */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const count =
                tab.key === "all"
                  ? activities.length
                  : activities.filter((a) => a.type === tab.key).length;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeFilter === tab.key
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
          <button
            onClick={handleMarkAllRead}
            disabled={activities.every((a) => a.read)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiCheckSquare size={15} />
            {t.notifications.markAllRead}
          </button>
        </div>

        {/* Activity List */}
        {filteredActivities.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FiBell
                size={36}
                className="text-gray-300 dark:text-gray-500"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nothing here
            </h3>
            <p className="text-gray-400 dark:text-gray-500">
              {getEmptyMessage()}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
            {groupByDateBucket(filteredActivities).map(
              ([bucketName, bucketItems]) => (
                <div key={bucketName}>
                  {/* Date group header */}
                  <div className="px-5 pt-5 pb-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {bucketName}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {bucketItems.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-center gap-4 px-5 py-4 transition ${
                          !activity.read
                            ? "bg-blue-50/50 dark:bg-blue-900/10"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        }`}
                      >
                        {/* Avatar with type badge */}
                        <div className="relative shrink-0">
                          <Image
                            src={activity.user.avatar}
                            alt={activity.user.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getTypeBadgeBg(
                              activity.type
                            )}`}
                          >
                            {getActivityIcon(activity.type)}
                          </div>
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-gray-800 dark:text-white">
                              {activity.user.name} {activity.user.surname}
                            </span>{" "}
                            {getActivityText(activity.type)}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {formatTimestamp(activity.createdAt)}
                          </p>
                        </div>

                        {/* Unread dot */}
                        {!activity.read && (
                          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
