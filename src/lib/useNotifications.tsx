"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { getCurrentUser, getAllUsers, getPosts, type MockUser, type MockPost } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";
import { getOrFetch, setCache } from "@/lib/cache";

// ─── Types ──────────────────────────────────────────────────────
export interface AppNotification {
  id: string;
  type: "like" | "comment" | "follow" | "friend_request" | "share" | "message" | "birthday" | "suggested";
  actor: MockUser;
  postId?: number;
  content: string;
  createdAt: Date;
  read: boolean;
  persistent?: boolean;
}

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearAll: () => {},
});

export function useNotifications() {
  return useContext(NotificationContext);
}

// ─── Fake engagement messages (PT + EN mix for realism) ─────────
const LIKE_TEXTS = [
  "curtiu seu post", "curtiu sua foto", "adorei seu post ❤️",
  "deu like no seu post", "amou sua publicação",
];
const COMMENT_TEXTS = [
  'comentou: "Incrível! 🔥"', 'comentou: "Que lindo! 😍"', 'comentou: "Maravilhoso!"',
  'comentou: "Compartilho dessa opinião ✨"', 'comentou: "Show de bola! 👏"',
  'comentou: "Demais! 🔥🔥"', 'comentou: "Que máximo!"', 'comentou: "Inspirador 🙌"',
];
const SHARE_TEXTS = [
  "compartilhou seu post", "compartilhou sua foto",
];
const FOLLOW_TEXTS = [
  "começou a seguir você", "seguiu você",
  "está seguindo você agora",
];
const FRIEND_REQUEST_TEXTS = [
  "enviou uma solicitação de amizade",
  "quer ser seu amigo",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── Factory ────────────────────────────────────────────────────
let notifCounter = 0;

function createFakeNotification(
  type: AppNotification["type"],
  users: MockUser[],
  posts: MockPost[]
): AppNotification {
  notifCounter++;
  const actor = users[randInt(1, users.length - 1)]; // Skip user 0 (current user)
  const post = posts[randInt(0, posts.length - 1)];

  let content = "";
  switch (type) {
    case "like":
      content = pick(LIKE_TEXTS);
      break;
    case "comment":
      content = pick(COMMENT_TEXTS);
      break;
    case "share":
      content = pick(SHARE_TEXTS);
      break;
    case "follow":
      content = pick(FOLLOW_TEXTS);
      break;
    case "friend_request":
      content = pick(FRIEND_REQUEST_TEXTS);
      break;
    case "birthday":
      content = "faz aniversário hoje! 🎂";
      break;
    case "suggested":
      content = "talvez você conheça";
      break;
    default:
      content = "interagiu com você";
  }

  return {
    id: `notif-${Date.now()}-${notifCounter}`,
    type,
    actor,
    postId: type === "like" || type === "comment" || type === "share" ? post.id : undefined,
    content,
    createdAt: new Date(),
    read: false,
  };
}

// ─── Provider ───────────────────────────────────────────────────
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMockMode, setIsMockMode] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fakeUsersRef = useRef<MockUser[]>([]);
  const fakePostsRef = useRef<MockPost[]>([]);

  // Bootstrap: init from mock data + load Supabase if available
  const bootstrap = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Mock mode — start fake notification engine
      setIsMockMode(true);
      fakeUsersRef.current = getAllUsers();
      fakePostsRef.current = getPosts();

      // Load existing mock notifications
      const { getNotifications, getUnreadNotificationCount } = await import("@/lib/mock-data");
      const existing = getNotifications().map((n: any) => ({
        id: `mock-${n.id}`,
        type: n.type as AppNotification["type"],
        actor: n.user as MockUser,
        postId: n.postId,
        content: n.content,
        createdAt: new Date(n.createdAt),
        read: n.read,
      }));
      setNotifications(existing);
      setUnreadCount(getUnreadNotificationCount());
      return;
    }

    setUserId(user.id);

    // Load real notifications from Supabase
    try {
      const { data } = await supabase
        .from("notifications")
        .select("*, actor:actor_id(id, name, surname, avatar, username)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30);

      if (data && data.length > 0) {
        const mapped: AppNotification[] = data.map((n: any) => ({
          id: `supa-${n.id}`,
          type: n.type as AppNotification["type"],
          actor: n.actor || { id: n.actor_id, name: "User", surname: "", username: "", avatar: "", cover: "", description: "", city: "", school: "", work: "", website: "", createdAt: "" },
          postId: n.post_id,
          content: n.content,
          createdAt: new Date(n.created_at),
          read: n.read,
        }));
        setNotifications(mapped);
        setUnreadCount(mapped.filter((n) => !n.read).length);
      }
    } catch {
      // Fallback mock
      setIsMockMode(true);
      fakeUsersRef.current = getAllUsers();
      fakePostsRef.current = getPosts();
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  // ─── Realtime subscription (real mode) ────────────────────────
  useEffect(() => {
    if (!userId) return;
    const supabase = createClient();
    const channel = supabase
      .channel("notifications-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
        async (payload) => {
          const n = payload.new as any;
          const { data: actor } = await supabase.from("users").select("id, name, surname, avatar, username").eq("id", n.actor_id).single();
          const notif: AppNotification = {
            id: `supa-${n.id}`,
            type: n.type as AppNotification["type"],
            actor: (actor || { id: n.actor_id, name: "User", surname: "", username: "", avatar: "", cover: "", description: "", city: "", school: "", work: "", website: "", createdAt: "" }) as MockUser,
            postId: n.post_id,
            content: n.content,
            createdAt: new Date(n.created_at),
            read: false,
          };
          setNotifications((prev) => [notif, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  // ─── Fake engagement engine (mock mode) ───────────────────────
  useEffect(() => {
    if (!isMockMode) return;

    const generate = () => {
      const users = fakeUsersRef.current;
      const posts = fakePostsRef.current;
      if (users.length < 2 || posts.length === 0) return;

      // Generate 1-3 notifications
      const count = randInt(1, 3);
      const types: AppNotification["type"][] = ["like", "comment", "follow", "friend_request", "share"];
      for (let i = 0; i < count; i++) {
        const type = pick(types);
        const notif = createFakeNotification(type, users, posts);
        setNotifications((prev) => [notif, ...prev]);
        setUnreadCount((prev) => prev + 1);
      }
    };

    // First batch after 5s
    const firstTimeout = setTimeout(generate, 5000);

    // Then every 20-45 seconds
    const scheduleNext = () => {
      const delay = randInt(20000, 45000);
      intervalRef.current = setTimeout(() => {
        generate();
        scheduleNext();
      }, delay);
    };
    scheduleNext();

    return () => {
      clearTimeout(firstTimeout);
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isMockMode]);

  // ─── Birthday notifications (daily) ───────────────────────────
  useEffect(() => {
    if (!isMockMode) return;
    const users = getAllUsers();
    // Pick 2-3 "birthday" users
    const birthdayUsers = users.slice(1, 5); // just a few
    for (const u of birthdayUsers) {
      const notif: AppNotification = {
        id: `birthday-${u.id}-${Date.now()}`,
        type: "birthday",
        actor: u,
        content: "faz aniversário hoje! 🎂",
        createdAt: new Date(),
        read: true, // auto-read, just informational
        persistent: true,
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  }, [isMockMode]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
