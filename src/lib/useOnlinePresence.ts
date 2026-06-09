"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useCallback } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

type OnlineUsers = Set<string>;

// ─── Singleton state (module-level) ─────────────────────────────
// O RealtimeClient reusa canais com o mesmo topic name. Para
// evitar o erro "cannot add presence callbacks after subscribe()"
// usamos um tópico único por instância + removeChannel() na limpeza,
// o que funciona mesmo durante HMR (hot reload do Turbopack).
let refCount = 0;
let topicCounter = 0;
let supabaseClient: SupabaseClient | null = null;
let channel: ReturnType<SupabaseClient["channel"]> | null = null;
let setupPromise: Promise<void> | null = null;
let listeners = new Set<(ids: OnlineUsers) => void>();
let currentIds = new Set<string>();

function notify() {
  const snapshot = new Set(currentIds);
  listeners.forEach((fn) => fn(snapshot));
}

async function setupChannel() {
  supabaseClient = createClient();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) return;

  // Tópico único evita colisão com canais de execuções anteriores (HMR)
  const topic = `online-presence-${++topicCounter}`;
  const ch = supabaseClient.channel(topic);

  ch
    .on("presence", { event: "sync" }, () => {
      const state = ch.presenceState();
      currentIds = new Set<string>(Object.keys(state));
      notify();
    })
    .on("presence", { event: "join" }, ({ key }) => {
      currentIds = new Set<string>(Array.from(currentIds).concat(key));
      notify();
    })
    .on("presence", { event: "leave" }, ({ key }) => {
      currentIds = new Set<string>(Array.from(currentIds).filter((k) => k !== key));
      notify();
    });

  return new Promise<void>((resolve) => {
    ch.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await ch.track({
          user_id: user.id,
          online_at: new Date().toISOString(),
        });
      }
      resolve();
    });
    channel = ch;
  });
}

// ─── Hook ───────────────────────────────────────────────────────
/**
 * Hook que rastreia usuários online via Supabase Realtime Presence.
 * Compartilha um único canal Realtime entre todos os consumidores
 * usando um singleton com contagem de referências.
 */
export function useOnlinePresence() {
  const [onlineUserIds, setOnlineUserIds] = useState<OnlineUsers>(new Set());

  useEffect(() => {
    refCount++;
    listeners.add(setOnlineUserIds);

    // Sincroniza com estado atual (caso o canal já tenha sido iniciado)
    setOnlineUserIds(new Set(currentIds));

    // Inicia o canal uma única vez
    if (!setupPromise) {
      setupPromise = setupChannel();
    }

    return () => {
      refCount--;
      listeners.delete(setOnlineUserIds);

      // Último a sair apaga a luz
      if (refCount === 0) {
        if (channel && supabaseClient) {
          supabaseClient.removeChannel(channel);
        }
        channel = null;
        supabaseClient = null;
        setupPromise = null;
        currentIds = new Set();
      }
    };
  }, []);

  const isOnline = useCallback(
    (userId: string) => onlineUserIds.has(userId),
    [onlineUserIds],
  );

  return { onlineUserIds, isOnline };
}
