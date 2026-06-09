"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useRef, useState, useCallback } from "react";

type OnlineUsers = Set<string>;

/**
 * Hook que rastreia usuários online via Supabase Realtime Presence.
 * Registra callbacks de presença e subscribe na ordem correta.
 */
export function useOnlinePresence() {
  const [onlineUserIds, setOnlineUserIds] = useState<OnlineUsers>(new Set());
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>["channel"]> | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    const setup = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) return;

      // Cria canal SEM config de presença
      const channel = supabase.channel("online-presence");

      // Registra callbacks ANTES de subscribe
      channel
        .on("presence", { event: "sync" }, () => {
          if (cancelled) return;
          const state = channel.presenceState();
          const online = new Set<string>();
          for (const key of Object.keys(state)) {
            online.add(key);
          }
          setOnlineUserIds(online);
        })
        .on("presence", { event: "join" }, ({ key }) => {
          if (!cancelled) {
            setOnlineUserIds((prev) => new Set(prev).add(key));
          }
        })
        .on("presence", { event: "leave" }, ({ key }) => {
          if (!cancelled) {
            setOnlineUserIds((prev) => {
              const next = new Set(prev);
              next.delete(key);
              return next;
            });
          }
        });

      // Subscribe depois dos callbacks
      channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED" && !cancelled) {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });

      channelRef.current = channel;
    };

    setup();

    return () => {
      cancelled = true;
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, []);

  const isOnline = useCallback(
    (userId: string) => onlineUserIds.has(userId),
    [onlineUserIds]
  );

  return { onlineUserIds, isOnline };
}
