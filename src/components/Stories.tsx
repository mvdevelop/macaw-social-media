"use client";

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { FiPlus } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useEffect, useRef } from "react";
import { getStories, getStoriesByUserId } from "@/lib/mock-data";
import { getOrFetch } from "@/lib/cache";
import StoryViewer from "./StoryViewer";

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
  const [userAvatar, setUserAvatar] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [viewerStories, setViewerStories] = useState<StoryItem[] | null>(null);
  const [viewerIndex, setViewerIndex] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef(true);

  /** Agrupa stories por usuário */
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

    // Carrega avatar real do usuário logado
    const loadUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      if (user.user_metadata?.avatar_url) {
        setUserAvatar(user.user_metadata.avatar_url);
      }
      try {
        const { data } = await supabase.from("users").select("avatar").eq("id", user.id).single();
        if (data?.avatar && mountedRef.current) setUserAvatar(data.avatar);
      } catch {}
    };
    loadUser();

    const fetchStories = async () => {
      try {
        const data = await getOrFetch<StoryItem[]>("stories", async () => {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("stories")
            .select("*, user:users(id, name, avatar)")
            .gt("expires_at", new Date().toISOString())
            .order("created_at", { ascending: false })
            .limit(30);

          if (error) throw error;

          if (data && data.length > 0) {
            return data.map((s: any) => ({
              id: s.id,
              img: s.img,
              user: s.user || { id: s.user_id, name: "User", avatar: "" },
            }));
          }
          return getStories().slice(0, 30).map((s) => ({
            id: s.id,
            img: s.img,
            user: { id: s.user.id, name: s.user.name, avatar: s.user.avatar },
          }));
        });

        if (mountedRef.current) {
          setStoryGroups(groupByUser(data).slice(0, 10));
        }
      } catch {
        if (mountedRef.current) {
          const mockStories = getStories().slice(0, 30).map((s) => ({
            id: s.id,
            img: s.img,
            user: { id: s.user.id, name: s.user.name, avatar: s.user.avatar },
          }));
          setStoryGroups(groupByUser(mockStories).slice(0, 10));
        }
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };

    fetchStories();
    return () => { mountedRef.current = false; };
  }, []);

  const handleAddStory = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const filePath = `stories/${userId}/${Date.now()}.${ext}`;

      await supabase.storage.from("story-images").upload(filePath, file);
      const { data: urlData } = supabase.storage.from("story-images").getPublicUrl(filePath);
      await supabase.from("stories").insert({
        user_id: userId,
        img: urlData.publicUrl,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });

      if (mountedRef.current) {
        setUserAvatar(urlData.publicUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStoryClick = async (group: StoryGroup) => {
    // Tenta buscar mais stories desse user do mock data
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
        {/* Add story */}
        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => fileRef.current?.click()}>
          <div className="relative w-16 h-16 rounded-full ring-2 ring-blue-400 overflow-hidden">
            <Image src={userAvatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"} alt="" fill sizes="64px" className="object-cover" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <FiPlus size={12} className="text-white" />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{t.feed.yourStory}</span>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAddStory} className="hidden" />
        </div>

        {storyGroups.map((group) => (
          <div
            key={group.userId}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => handleStoryClick(group)}
          >
            <div className="relative w-16 h-16 rounded-full ring-2 ring-pink-400 overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95">
              <Image src={group.preview} alt={group.user.name} fill sizes="64px" className="object-cover" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate w-16 text-center group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
              {group.user.name}
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
