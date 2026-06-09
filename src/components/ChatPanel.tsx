"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";
import {
  FiMessageSquare, FiX, FiSend, FiMinus, FiChevronLeft, FiExternalLink,
} from "react-icons/fi";
import { createClient } from "@/lib/supabase/client";
import { sendMessage, markConversationRead } from "@/lib/actions";
import { getConversations, getConversationById, getTotalUnreadMessages, getCurrentUser } from "@/lib/mock-data";
import { useOnlinePresence } from "@/lib/useOnlinePresence";
import type { MockConversation, MockMessage } from "@/lib/mock-data";

interface SupabaseMessage {
  id: number;
  content: string;
  created_at: string;
  sender_id: string;
  conversation_id: number;
}

interface SupabaseConversation {
  id: number;
  created_at: string;
  updated_at: string;
  participants: { user_id: string; users: any }[];
  lastMessage?: string;
  lastMessageAt?: string;
  unread: number;
}

export default function ChatPanel() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConv, setActiveConv] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [unreadTotal, setUnreadTotal] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();

  // Online presence tracking
  const { isOnline } = useOnlinePresence();

  // Load current user and conversations
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        // Fallback mock
        setConversations(getConversations());
        setUnreadTotal(getTotalUnreadMessages());
        return;
      }
      setUserId(user.id);
      loadConversations(user.id);
    });
  }, []);

  const loadConversations = async (uid: string) => {
    const supabase = createClient();

    // Quick connectivity test - if conversations table doesn't exist, fallback to mock data
    try {
      const { error: testError } = await supabase.from("conversations").select("id", { count: "exact", head: true });
      if (testError) throw testError;
    } catch {
      setConversations(getConversations());
      setUnreadTotal(getTotalUnreadMessages());
      return;
    }

    try {
      const { data, error } = await supabase
        .from("conversation_participants")
        .select("conversation_id, conversation:conversations(id, updated_at), user:users!inner(*)")
        .eq("user_id", uid);

      if (error || !data) throw error;

      const convList = await Promise.all(
        data.map(async (cp: any) => {
          const convId = cp.conversation?.id || cp.conversation_id;

          // Get the other participant
          const { data: others } = await supabase
            .from("conversation_participants")
            .select("user:users(id, name, surname, avatar)")
            .eq("conversation_id", convId)
            .neq("user_id", uid);

          const otherUser = (others as any)?.[0]?.user || { name: "User", avatar: "" };

          // Get last message
          const { data: lastMsg } = await supabase
            .from("messages")
            .select("content, created_at")
            .eq("conversation_id", convId)
            .order("created_at", { ascending: false })
            .limit(1);

          // Get unread count
          const { data: unreadData } = await supabase
            .from("messages")
            .select("id", { count: "exact" })
            .eq("conversation_id", convId)
            .neq("sender_id", uid);

          return {
            id: convId,
            user: otherUser,
            lastMessage: (lastMsg as any)?.[0]?.content || "",
            lastMessageAt: (lastMsg as any)?.[0]?.created_at || cp.conversation?.updated_at,
            unread: (unreadData as any)?.length || 0,
            online: false,
          };
        })
      );

      setConversations(convList);
      setUnreadTotal(convList.reduce((acc: number, c: any) => acc + c.unread, 0));
    } catch {
      // Fallback mock
      setConversations(getConversations());
      setUnreadTotal(getTotalUnreadMessages());
    }
  };

  // Load messages when opening a conversation
  const openConversation = useCallback(async (convId: number) => {
    const supabase = createClient();
    const conv = conversations.find((c: any) => c.id === convId);
    setActiveConv(conv);

    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setMessages(data);
        // Mark as read
        await markConversationRead(convId);
      } else {
        // Fallback mock
        const mockConv = getConversationById(convId);
        setMessages(mockConv?.messages || []);
      }
    } catch {
      const mockConv = getConversationById(convId);
      setMessages(mockConv?.messages || []);
    }

    if (userId) {
      setConversations((prev: any[]) =>
        prev.map((c: any) => (c.id === convId ? { ...c, unread: 0 } : c))
      );
      setUnreadTotal(0);
    }
    setMinimized(false);
  }, [conversations, userId]);

  // Subscribe to new messages
  useEffect(() => {
    if (!activeConv?.id) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`chat:${activeConv.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConv.id}`,
        },
        (payload) => {
          const newMessage = payload.new as any;
          setMessages((prev: any[]) => {
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeConv?.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !activeConv) return;

    const msgText = newMsg;
    setNewMsg("");

    // Optimistic update
    const optimistic = {
      id: Date.now(),
      content: msgText,
      created_at: new Date().toISOString(),
      sender_id: userId || currentUser.id,
      conversation_id: activeConv.id,
    };
    setMessages((prev: any[]) => [...prev, optimistic]);

    // Send to server
    try {
      await sendMessage(activeConv.id, msgText);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return formatTime(dateStr);
    if (days === 1) return t.chat.yesterday;
    return date.toLocaleDateString();
  };

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setMinimized(false); }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#0052FF] to-[#6825FF] rounded-full shadow-xl flex items-center justify-center text-white hover:opacity-90 transition z-50"
      >
        <FiMessageSquare size={24} />
        {unreadTotal > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
            {unreadTotal > 99 ? "99+" : unreadTotal}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${minimized ? "w-72 h-12" : "w-80 h-[500px] md:w-96 md:h-[550px]"}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0052FF] to-[#6825FF] rounded-t-xl px-4 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          {activeConv && (
            <button onClick={() => setActiveConv(null)} className="p-1 hover:bg-white/10 rounded-lg transition">
              <FiChevronLeft size={18} />
            </button>
          )}
          <FiMessageSquare size={18} />
          <Link
            href={activeConv ? "/messenger" : "#"}
            className="font-semibold text-sm hover:underline flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {activeConv ? activeConv.user?.name : t.chat.messages}
            {activeConv && <FiExternalLink size={12} className="opacity-60" />}
          </Link>
          {(activeConv?.online || (activeConv?.user?.id && isOnline(activeConv.user.id))) && (
            <span className="w-2 h-2 rounded-full bg-green-400" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setMinimized(!minimized)} className="p-1 hover:bg-white/10 rounded-lg transition">
            <FiMinus size={16} />
          </button>
          <button onClick={() => { setOpen(false); setActiveConv(null); }} className="p-1 hover:bg-white/10 rounded-lg transition">
            <FiX size={16} />
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-xl border-x border-b border-gray-100 dark:border-gray-700 h-[calc(100%-48px)] flex flex-col">
          {activeConv ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg: any) => {
                  const isMe = msg.sender_id === (userId || currentUser.id);
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] ${isMe ? "bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white rounded-2xl rounded-br-sm" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-sm"} px-4 py-2.5 text-sm`}>
                        <p>{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-gray-400"}`}>
                          {formatTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2">
                  <input
                    type="text"
                    placeholder={t.chat.typeMessage}
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-sm dark:text-white"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMsg.trim()}
                    className="text-blue-500 hover:text-blue-600 disabled:opacity-40 transition p-1"
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-sm">{t.chat.noConversations}</div>
              ) : (
                conversations.map((conv: any) => (
                  <div
                    key={conv.id}
                    onClick={() => openConversation(conv.id)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer border-b border-gray-50 dark:border-gray-700"
                  >
                    <div className="relative shrink-0">
                      <Image
                        src={conv.user?.avatar || ""}
                        alt={conv.user?.name || "User"}
                        width={44} height={44}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      {(conv.online || isOnline(conv.user?.id)) && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-gray-800 dark:text-white truncate">
                          {conv.user?.name} {conv.user?.surname}
                        </span>
                        <span className="text-xs text-gray-400 shrink-0">{formatDate(conv.lastMessageAt)}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 ml-2">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
