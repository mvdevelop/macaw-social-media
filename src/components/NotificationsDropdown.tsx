"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiBell, FiHeart, FiMessageCircle, FiUserPlus, FiUserCheck } from "react-icons/fi";
import { getNotifications, getUnreadNotificationCount } from "@/lib/mock-data";
import type { MockNotification } from "@/lib/mock-data";

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<MockNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(getNotifications());
    setUnreadCount(getUnreadNotificationCount());
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const mins = Math.floor(diffMs / (1000 * 60));
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "like": return <FiHeart size={14} className="text-red-500" />;
      case "comment": return <FiMessageCircle size={14} className="text-blue-500" />;
      case "follow": return <FiUserPlus size={14} className="text-green-500" />;
      case "friend_request": return <FiUserCheck size={14} className="text-purple-500" />;
      default: return <FiBell size={14} />;
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition"
      >
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm">No notifications yet</div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 px-4 py-3 transition cursor-pointer ${
                    notif.read ? "hover:bg-gray-50 dark:hover:bg-gray-700" : "bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  }`}
                  onClick={() => setNotifications(notifications.map((n) => n.id === notif.id ? { ...n, read: true } : n))}
                >
                  <div className="relative shrink-0">
                    <Image src={notif.user.avatar} alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        {getIcon(notif.type)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">{notif.user.name} {notif.user.surname}</span>{" "}
                      {notif.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatTime(notif.createdAt)}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
