"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBell, FiHeart, FiMessageCircle, FiUserPlus,
  FiUserCheck, FiShare2, FiGift, FiUsers, FiX, FiCheck,
} from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useNotifications, type AppNotification } from "@/lib/useNotifications";
import { getCurrentUser } from "@/lib/mock-data";

function getIcon(type: string) {
  switch (type) {
    case "like": return <FiHeart size={14} className="text-red-500" />;
    case "comment": return <FiMessageCircle size={14} className="text-blue-500" />;
    case "follow": return <FiUserPlus size={14} className="text-green-500" />;
    case "friend_request": return <FiUserCheck size={14} className="text-purple-500" />;
    case "share": return <FiShare2 size={14} className="text-orange-500" />;
    case "birthday": return <FiGift size={14} className="text-pink-500" />;
    case "suggested": return <FiUsers size={14} className="text-cyan-500" />;
    default: return <FiBell size={14} className="text-gray-500" />;
  }
}

function getIconBg(type: string): string {
  switch (type) {
    case "like": return "bg-red-100 dark:bg-red-900/30";
    case "comment": return "bg-blue-100 dark:bg-blue-900/30";
    case "follow": return "bg-green-100 dark:bg-green-900/30";
    case "friend_request": return "bg-purple-100 dark:bg-purple-900/30";
    case "share": return "bg-orange-100 dark:bg-orange-900/30";
    case "birthday": return "bg-pink-100 dark:bg-pink-900/30";
    case "suggested": return "bg-cyan-100 dark:bg-cyan-900/30";
    default: return "bg-gray-100 dark:bg-gray-700";
  }
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString();
}

export default function NotificationsDropdown() {
  const { t } = useTranslation();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatPreview = (n: AppNotification): string => {
    const name = n.actor?.name || "Someone";
    if (n.type === "like") return `${name} ${n.content}`;
    if (n.type === "comment") return `${name} ${n.content}`;
    if (n.type === "follow") return `${name} ${n.content}`;
    if (n.type === "friend_request") return `${name} ${n.content}`;
    if (n.type === "share") return `${name} ${n.content}`;
    if (n.type === "birthday") return `${name} ${n.content}`;
    if (n.type === "suggested") return `${name} — ${n.content}`;
    return name;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition"
        title={t.notifications.title}
      >
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center px-1 shadow-lg animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">
              {t.notifications.title}
            </h3>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-500 hover:text-blue-600 font-medium transition"
                    >
                      {t.notifications.markAllRead}
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                  >
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-gray-400 dark:text-gray-500">
                <FiBell size={36} className="mb-3 opacity-50" />
                <p className="text-sm font-medium">{t.notifications.empty}</p>
                <p className="text-xs mt-1 opacity-60">Activity from your friends will appear here</p>
              </div>
            ) : (
              <>
                {/* Recent section */}
                {notifications.slice(0, 50).map((n) => {
                  const isBirthday = n.type === "birthday";
                  const isSuggested = n.type === "suggested";
                  const actorId = n.actor?.id || "";

                  return (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 transition group ${
                        n.read
                          ? "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          : "bg-blue-50/60 dark:bg-blue-900/15 hover:bg-blue-50 dark:hover:bg-blue-900/25"
                      }`}
                    >
                      {/* Avatar */}
                      <Link
                        href={`/profile/${actorId}`}
                        className="relative shrink-0"
                        onClick={() => { if (!n.read) markAsRead(n.id); }}
                      >
                        <Image
                          src={n.actor?.avatar || ""}
                          alt={n.actor?.name || ""}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                        {!isBirthday && !isSuggested && (
                          <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 ${getIconBg(n.type)}`}>
                            {getIcon(n.type)}
                          </div>
                        )}
                        {isBirthday && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                            <FiGift size={10} className="text-pink-500" />
                          </div>
                        )}
                      </Link>

                      {/* Content */}
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => { if (!n.read) markAsRead(n.id); }}
                      >
                        {isBirthday ? (
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-gray-800 dark:text-white">
                              {n.actor?.name} {n.actor?.surname}
                            </span>{" "}
                            {n.content}
                          </p>
                        ) : isSuggested ? (
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-gray-800 dark:text-white">
                              {n.actor?.name} {n.actor?.surname}
                            </span>{" "}
                            {n.content}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                            <span className="font-semibold text-gray-800 dark:text-white hover:text-blue-500 transition-colors">
                              {n.actor?.name} {n.actor?.surname}
                            </span>{" "}
                            {n.content}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-gray-400">{timeAgo(n.createdAt)}</span>
                          {!n.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          )}
                        </div>
                      </div>

                      {/* Action buttons for friend requests */}
                      {n.type === "friend_request" && (
                        <div className="flex gap-1.5 shrink-0 mt-1">
                          <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition active:scale-90">
                            <FiCheck size={14} />
                          </button>
                          <button className="w-8 h-8 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 transition active:scale-90">
                            <FiX size={14} />
                          </button>
                        </div>
                      )}

                      {/* Follow back button */}
                      {n.type === "follow" && !n.read && (
                        <button className="shrink-0 mt-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition active:scale-90">
                          Follow Back
                        </button>
                      )}
                    </div>
                  );
                })}

                {/* Footer */}
                {notifications.length > 0 && (
                  <Link
                    href="/activity"
                    className="block px-4 py-3 text-center text-sm text-blue-500 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium border-t border-gray-100 dark:border-gray-700 transition"
                    onClick={() => setOpen(false)}
                  >
                    {t.notifications.seeAll}
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
