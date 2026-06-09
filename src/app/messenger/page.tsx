"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { sendMessage, markConversationRead } from "@/lib/actions";
import { getConversations, getConversationById, getTotalUnreadMessages, getCurrentUser } from "@/lib/mock-data";
import { useOnlinePresence } from "@/lib/useOnlinePresence";
import { useTranslation } from "@/context/LanguageProvider";
import {
  FiMessageSquare, FiSend, FiSearch, FiChevronLeft,
  FiChevronDown, FiMoreVertical, FiPhone, FiInfo,
  FiCheck, FiCheckCircle, FiArrowLeft,
} from "react-icons/fi";

interface Conversation {
  id: number;
  user: { id: string; name: string; surname: string; avatar: string };
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  online: boolean;
}

export default function MessengerPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isOnline } = useOnlinePresence();

  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileList, setShowMobileList] = useState(true);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentUser = getCurrentUser();

  // Carrega conversas
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        loadConversations(user.id);
      } else {
        setConversations(getConversations() as Conversation[]);
        setLoading(false);
      }
    });
  }, []);

  const loadConversations = async (uid: string) => {
    const supabase = createClient();
    try {
      const { error: testError } = await supabase.from("conversations").select("id", { count: "exact", head: true });
      if (testError) throw testError;
    } catch {
      setConversations(getConversations() as Conversation[]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("conversation_participants")
        .select("conversation_id, conversation:conversations(id, updated_at)")
        .eq("user_id", uid);

      if (error || !data) throw error;

      const convList = await Promise.all(
        data.map(async (cp: any) => {
          const convId = cp.conversation?.id || cp.conversation_id;
          const { data: others } = await supabase
            .from("conversation_participants")
            .select("user:users(id, name, surname, avatar)")
            .eq("conversation_id", convId)
            .neq("user_id", uid);

          const otherUser = (others as any)?.[0]?.user || { id: "", name: "User", surname: "", avatar: "" };
          const { data: lastMsg } = await supabase
            .from("messages")
            .select("content, created_at")
            .eq("conversation_id", convId)
            .order("created_at", { ascending: false })
            .limit(1);

          return {
            id: convId,
            user: otherUser,
            lastMessage: (lastMsg as any)?.[0]?.content || "",
            lastMessageAt: (lastMsg as any)?.[0]?.created_at || "",
            unread: 0,
            online: false,
          } as Conversation;
        })
      );

      setConversations(convList);
    } catch {
      setConversations(getConversations() as Conversation[]);
    } finally {
      setLoading(false);
    }
  };

  const openConversation = useCallback(async (conv: Conversation) => {
    setActiveConv(conv);
    setShowMobileList(false);
    const supabase = createClient();

    try {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conv.id)
        .order("created_at", { ascending: true });

      if (data && data.length > 0) {
        setMessages(data);
        await markConversationRead(conv.id);
      } else {
        const mockConv = getConversationById(conv.id);
        setMessages(mockConv?.messages || []);
      }
    } catch {
      const mockConv = getConversationById(conv.id);
      setMessages(mockConv?.messages || []);
    }

    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c))
    );
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  // Subscribe to new messages
  useEffect(() => {
    if (!activeConv?.id) return;
    const supabase = createClient();
    const channel = supabase
      .channel(`messenger:${activeConv.id}`)
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${activeConv.id}` },
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !activeConv) return;
    const msgText = newMsg;
    setNewMsg("");

    const optimistic = {
      id: Date.now(),
      content: msgText,
      created_at: new Date().toISOString(),
      sender_id: userId || currentUser.id,
      conversation_id: activeConv.id,
      status: "sending",
    };
    setMessages((prev: any[]) => [...prev, optimistic]);

    try {
      await sendMessage(activeConv.id, msgText);
      setMessages((prev: any[]) =>
        prev.map((m: any) => m.id === optimistic.id ? { ...m, status: "sent" } : m)
      );
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
    if (!dateStr) return "";
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
    if (days === 1) return "Yesterday";
    if (days < 7) return date.toLocaleDateString(undefined, { weekday: "short" });
    return date.toLocaleDateString();
  };

  const filteredConversations = conversations.filter((c) =>
    `${c.user?.name} ${c.user?.surname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 flex transition-colors">
      {/* Sidebar */}
      <div className={`${showMobileList ? "flex" : "hidden"} md:flex w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col shrink-0`}>
        {/* Sidebar header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">Messages</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                <FiChevronDown size={18} className="text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                <FiMoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
          {/* Search */}
          <div className="relative">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm outline-none dark:text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm px-4">
              <FiMessageSquare size={36} className="mx-auto mb-3 opacity-50" />
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => openConversation(conv)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${
                  activeConv?.id === conv.id
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="relative shrink-0">
                  <Image
                    src={conv.user?.avatar || "/default-avatar.png"}
                    alt={conv.user?.name || "User"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {(conv.online || isOnline(conv.user?.id)) && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800 dark:text-white truncate">
                      {conv.user?.name} {conv.user?.surname}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0 ml-2">
                      {formatDate(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {conv.lastMessage || "No messages yet"}
                    </p>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-green-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0 ml-2">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className={`${!showMobileList ? "flex" : "hidden"} md:flex flex-1 flex-col bg-white dark:bg-gray-800`}>
        {activeConv ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setShowMobileList(true); setActiveConv(null); }}
                  className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <Link href={`/profile/${activeConv.user?.id}`} className="relative shrink-0">
                  <Image
                    src={activeConv.user?.avatar || ""}
                    alt={activeConv.user?.name || ""}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {(activeConv.online || isOnline(activeConv.user?.id)) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                  )}
                </Link>
                <div>
                  <Link
                    href={`/profile/${activeConv.user?.id}`}
                    className="font-semibold text-sm text-gray-800 dark:text-white hover:text-blue-500 transition"
                  >
                    {activeConv.user?.name} {activeConv.user?.surname}
                  </Link>
                  <p className="text-[11px] text-gray-400">
                    {(activeConv.online || isOnline(activeConv.user?.id)) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                  <FiPhone size={18} className="text-gray-500 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                  <FiInfo size={18} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-[url('/chat-bg.png')] bg-repeat bg-[#efeae2] dark:bg-[#0b141a] dark:bg-none">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <FiMessageSquare size={40} className="mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No messages yet. Say hello!</p>
                  </div>
                </div>
              )}
              {messages.map((msg: any) => {
                const isMe = msg.sender_id === (userId || currentUser.id);
                const isMock = typeof msg.id === "number" && msg.id < 10000;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-1`}>
                    {!isMe && (
                      <Image
                        src={activeConv.user?.avatar || ""}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover shrink-0 mb-0.5"
                      />
                    )}
                    <div
                      className={`relative max-w-[75%] px-3 py-2 text-sm shadow-sm ${
                        isMe
                          ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-gray-800 dark:text-white rounded-lg rounded-br-sm"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg rounded-bl-sm"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      <div className={`flex items-center justify-end gap-1 mt-0.5 ${isMe ? "" : "justify-start"}`}>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                          {formatTime(msg.created_at)}
                        </span>
                        {isMe && (
                          msg.status === "sending" ? (
                            <FiCheck size={12} className="text-gray-400" />
                          ) : isMock ? (
                            <FiCheck size={12} className="text-blue-500" />
                          ) : (
                            <FiCheckCircle size={12} className="text-blue-500" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2.5">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a message..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-sm dark:text-white"
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!newMsg.trim()}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0052FF] to-[#6825FF] flex items-center justify-center text-white hover:opacity-90 transition disabled:opacity-40 shrink-0"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center max-w-sm px-8">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto mb-6">
                <FiMessageSquare size={36} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your Messages</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Select a conversation from the left sidebar or start a new chat from someone's profile.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
