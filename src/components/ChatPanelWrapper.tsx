"use client";

import dynamic from "next/dynamic";

const ChatPanel = dynamic(() => import("@/components/ChatPanel"), {
  ssr: false,
});

export default function ChatPanelWrapper() {
  return <ChatPanel />;
}
