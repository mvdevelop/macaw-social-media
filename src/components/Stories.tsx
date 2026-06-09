"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";
import { FiPlus } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useEffect, useRef } from "react";
import { getStories, getStoriesByUserId } from "@/lib/mock-data";
import { clearCache } from "@/lib/cache";

const StoryViewer = dynamic(() => import("./StoryViewer"), { ssr: false });

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
}

interface StoryItem {
  id: number;
  img: string;
  user: StoryUser;
}

interface StoryGroup {
  userId: string;
  user: StoryUser;
  stories: StoryItem[];
  preview: string;
}

const Stories = () => {
  const { t } = useTranslation();
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [userStories, setUserStories] = useState<StoryItem[]>([]);
  const [viewerStories, setViewerStories] = useState<StoryItem[] | null>(null);
  const [viewerIndex, setViewerIndex] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef(true);
  const authUserIdRef = useRef<string | null>(null); // ref para usar em closures

  const groupByUser = (items: StoryItem[]): StoryGroup[] => {
    const map = new Map<string, StoryItem[]>();
    for (const s of items) {
      if (!map.has(s.user.id)) map.set(s.user.id, []);
      map.get(s.user.id)!.push(s);
    }
    const groups: StoryGroup[] = [];
    for (const [userId, userStories] of map) {
      groups.push({
        userId,
        user: userStories[0].user,
        stories: userStories,
        preview: userStories[0].img,
      });
    }
    return groups;
  };

  useEffect(() => {
    mountedRef.current = true;
    clearCache("stories"); // limpa cache para garantir dados frescos

    const init = async () => {
      const supabase = createClient();

      // Carrega dados do auth
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAuthUserId(user.id);
        authUserIdRef.current = user.id;
        setUserName(user.user_metadata?.name || user.email?.split("@")[0] || "User");
        if (user.user_metadata?.avatar_url) setUserAvatar(user.user_metadata.avatar_url);
        try {
          const { data } = await supabase.from("users").select("avatar, name").eq("id", user.id).single();
          if (data?.avatar) setUserAvatar(data.avatar);
          if (data?.name && data.name !== user.email?.split("@")[0]) setUserName(data.name);
        } catch {}
      }

      // SEMPRE carrega stories mock como base
      const baseMock = getStories().slice(0, 30).map((s) => ({
        id: s.id,
        img: s.img,
        user: { id: s.user.id, name: s.user.name, avatar: s.user.avatar },
      }));

      try {
        // Tenta buscar stories reais do Supabase
        const { data: supabaseStories } = await supabase
          .from("stories")
          .select("*, user:users(id, name, avatar)")
          .gt("expires_at", new Date().toISOString())
          .order("created_at", { ascending: false })
          .limit(30);

        if (supabaseStories && supabaseStories.length > 0) {
          // Mescla: stories reais primeiro, depois mock (evita duplicar)
          const realIds = new Set(supabaseStories.map((s: any) => `${s.user_id}-${s.id}`));
          const realMapped = supabaseStories.map((s: any) => ({
            id: s.id,
            img: s.img,
            user: s.user || { id: s.user_id, name: "User", avatar: "" },
          }));
          const filteredMock = baseMock.filter((m) => !realIds.has(`${m.user.id}-${m.id}`));
          const merged = [...realMapped, ...filteredMock];

          if (mountedRef.current) {
            const groups = groupByUser(merged).slice(0, 10);
            setStoryGroups(groups);
            const uid = authUserIdRef.current;
            if (uid) setUserStories(merged.filter((s) => s.user.id === uid));
          }
        } else {
          // Sem stories reais → só mock
          if (mountedRef.current) {
            const groups = groupByUser(baseMock).slice(0, 10);
            setStoryGroups(groups);
          }
        }
      } catch {
        // Erro na consulta → só mock
        if (mountedRef.current) {
          const groups = groupByUser(baseMock).slice(0, 10);
          setStoryGroups(groups);
        }
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };

    init();
    return () => { mountedRef.current = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddStory = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authUserId) return;

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const filePath = `stories/${authUserId}/${Date.now()}.${ext}`;

      await supabase.storage.from("story-images").upload(filePath, file);
      const { data: urlData } = supabase.storage.from("story-images").getPublicUrl(filePath);
      await supabase.from("stories").insert({
        user_id: authUserId,
        img: urlData.publicUrl,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });

      if (mountedRef.current) {
        const newStory: StoryItem = {
          id: Date.now(),
          img: urlData.publicUrl,
          user: { id: authUserId, name: userName, avatar: userAvatar },
        };
        setUserStories((prev) => [newStory, ...prev]);
        setUserAvatar(urlData.publicUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOwnStoryClick = () => {
    if (userStories.length > 0) {
      // Ver stories existentes
      setViewerStories(userStories);
      setViewerIndex(0);
    } else {
      // Adicionar novo story
      fileRef.current?.click();
    }
  };

  const handleFriendStoryClick = (group: StoryGroup) => {
    // Tenta buscar mais stories do mock (fallback)
    const allUserStories = getStoriesByUserId(group.userId);
    const storiesForViewer = allUserStories.length > 0
      ? allUserStories.map((s) => ({
          id: s.id,
          img: s.img,
          user: { id: s.user.id, name: s.user.name, avatar: s.user.avatar },
        }))
      : group.stories;

    setViewerStories(storiesForViewer);
    setViewerIndex(0);
  };

  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto transition-colors">
        <div className="flex gap-4 w-max">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto transition-colors">
      <div className="flex gap-4 w-max">
        {/* Your Story — mostra stories do próprio user ou add */}
        <div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={handleOwnStoryClick}
        >
          <div className="relative w-16 h-16 rounded-full ring-2 ring-blue-400 overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#4A8CFF] to-[#A855F7] flex items-center justify-center text-white text-lg font-bold">
                {userName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] rounded-full flex items-center justify-center border-2 border-white">
              <FiPlus size={12} className="text-white" />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {userStories.length > 0 ? userName?.split(" ")[0] : t.feed.yourStory}
          </span>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAddStory} className="hidden" />
        </div>

        {/* Friend stories */}
        {storyGroups
          .filter((g) => g.userId !== authUserId)
          .map((group) => (
          <div
            key={group.userId}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => handleFriendStoryClick(group)}
          >
            <div className="relative w-16 h-16 rounded-full ring-2 ring-pink-400 overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95">
              <Image src={group.preview} alt={group.user.name} fill sizes="64px" className="object-cover" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate w-16 text-center group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
              {group.user.name?.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      {viewerStories && (
        <StoryViewer
          stories={viewerStories}
          initialIndex={viewerIndex}
          onClose={() => setViewerStories(null)}
        />
      )}
    </div>
  );
};

export default Stories;
