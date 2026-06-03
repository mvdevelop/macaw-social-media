"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiMessageSquare, FiX, FiSend, FiMinus, FiChevronLeft, FiCircle } from "react-icons/fi";
import { getConversations, getConversationById, getTotalUnreadMessages, getCurrentUser } from "@/lib/mock-data";
import type { MockConversation, MockMessage } from "@/lib/mock-data";

export default function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [conversations] = useState(() => getConversations());
  const [activeConv, setActiveConv] = useState<MockConversation | null>(null);
  const [messages, setMessages] = useState<MockMessage[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [unreadTotal, setUnreadTotal] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    setUnreadTotal(getTotalUnreadMessages());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openConversation = (convId: number) => {
    const conv = getConversationById(convId);
    if (conv) {
      setActiveConv(conv);
      setMessages(conv.messages);
      conv.unread = 0;
      setUnreadTotal(conversations.reduce((acc, c) => acc + c.unread, 0));
      setMinimized(false);
    }
  };

  const handleSend = () => {
    if (!newMsg.trim() || !activeConv) return;
    const msg: MockMessage = {
      id: Date.now(),
      senderId: currentUser.id,
      text: newMsg,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setMessages([...messages, msg]);
    activeConv.lastMessage = newMsg;
    setNewMsg("");
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
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return formatTime(dateStr);
    if (days === 1) return "Yesterday";
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
            {unreadTotal}
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
          <span className="font-semibold text-sm">
            {activeConv ? activeConv.user.name : "Messages"}
          </span>
          {activeConv?.online && (
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
            /* Chat messages */
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] ${isMe ? "bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white rounded-2xl rounded-br-sm" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-sm"} px-4 py-2.5 text-sm`}>
                        <p>{msg.text}</p>
                        <p className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-gray-400"}`}>{formatTime(msg.createdAt)}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
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
            /* Conversation list */
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => openConversation(conv.id)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer border-b border-gray-50 dark:border-gray-700"
                >
                  <div className="relative shrink-0">
                    <Image src={conv.user.avatar} alt={conv.user.name} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-gray-800 dark:text-white truncate">
                        {conv.user.name} {conv.user.surname}
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
