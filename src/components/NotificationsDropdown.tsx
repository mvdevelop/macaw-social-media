"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiBell, FiHeart, FiMessageCircle, FiUserPlus, FiUserCheck, FiShare2 } from "react-icons/fi";
import { createClient } from "@/lib/supabase/client";
import { markNotificationRead, markAllNotificationsRead } from "@/lib/actions";
import { getNotifications, getUnreadNotificationCount } from "@/lib/mock-data";
import type { MockNotification } from "@/lib/mock-data";

interface Notification {
  id: number;
  type: string;
  content?: string;
  created_at: string;
  read: boolean;
  user_id: string;
  actor_id: string;
  post_id?: number;
  actor?: {
    id: string;
    name: string;
    surname: string;
    avatar: string;
  };
}

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        // Fallback mock
        setNotifications(getNotifications());
        setUnreadCount(getUnreadNotificationCount());
        return;
      }
      setUserId(user.id);
      loadNotifications(user.id);
    });
  }, []);

  const loadNotifications = async (uid: string) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("notifications")
        .select("*, actor:actor_id(id, name, surname, avatar)")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.read).length);
      }
    } catch {
      // Fallback mock
      setNotifications(getNotifications());
      setUnreadCount(getUnreadNotificationCount());
    }
  };

  // Subscribe to new notifications in realtime
  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        async (payload) => {
          const newNotif = payload.new as Notification;

          // Fetch actor data
          const { data: actor } = await supabase
            .from("users")
            .select("id, name, surname, avatar")
            .eq("id", newNotif.actor_id)
            .single();

          setNotifications((prev: any[]) => [
            { ...newNotif, actor },
            ...prev,
          ]);
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  // Close on outside click
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
      case "share": return <FiShare2 size={14} className="text-orange-500" />;
      default: return <FiBell size={14} />;
    }
  };

  const getContent = (notif: any) => {
    const name = `${notif.actor?.name || ""} ${notif.actor?.surname || ""}`.trim();
    switch (notif.type) {
      case "like": return <><span className="font-semibold">{name}</span> liked your post</>;
      case "comment": return <><span className="font-semibold">{name}</span> commented on your post</>;
      case "follow": return <><span className="font-semibold">{name}</span> started following you</>;
      case "friend_request": return <><span className="font-semibold">{name}</span> sent you a friend request</>;
      case "share": return <><span className="font-semibold">{name}</span> shared your post</>;
      case "message": return <><span className="font-semibold">{name}</span> sent you a message</>;
      default: return "";
    }
  };

  const handleMarkRead = async (id: number) => {
    setNotifications((prev: any[]) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    try {
      await markNotificationRead(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev: any[]) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await markAllNotificationsRead();
    } catch (err) {
      console.error(err);
    }
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
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs text-blue-500 hover:text-blue-600 font-medium">
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
                    notif.read
                      ? "hover:bg-gray-50 dark:hover:bg-gray-700"
                      : "bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  }`}
                  onClick={() => !notif.read && handleMarkRead(notif.id)}
                >
                  <div className="relative shrink-0">
                    <Image
                      src={notif.actor?.avatar || ""}
                      alt=""
                      width={36} height={36}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        {getIcon(notif.type)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {getContent(notif)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatTime(notif.created_at)}</p>
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
