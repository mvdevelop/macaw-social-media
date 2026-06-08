"use client";

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { FiPlus } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useEffect, useRef } from "react";
import { getStories } from "@/lib/mock-data";
import { getOrFetch } from "@/lib/cache";

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

const Stories = () => {
  const { t } = useTranslation();
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Carrega avatar real do usuário logado
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      supabase.from("users").select("avatar").eq("id", user.id).single().then(({ data }) => {
        if (data?.avatar && mountedRef.current) setUserAvatar(data.avatar);
      });
    });

    const fetchStories = async () => {
      try {
        const data = await getOrFetch<StoryItem[]>("stories", async () => {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("stories")
            .select("*, user:users(id, name, avatar)")
            .gt("expires_at", new Date().toISOString())
            .order("created_at", { ascending: false })
            .limit(10);

          if (error) throw error;

          if (data && data.length > 0) {
            return data.map((s: any) => ({
              id: s.id,
              img: s.img,
              user: s.user || { id: s.user_id, name: "User", avatar: "" },
            }));
          }
          return getStories().slice(0, 5).map((s) => ({
            id: s.id,
            img: s.img,
            user: { id: s.user.id, name: s.user.name, avatar: s.user.avatar },
          }));
        });

        if (mountedRef.current) setStories(data);
      } catch {
        if (mountedRef.current) setStories(
          getStories().slice(0, 5).map((s) => ({
            id: s.id,
            img: s.img,
            user: { id: s.user.id, name: s.user.name, avatar: s.user.avatar },
          }))
        );
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
        setStories((prev) => [
          { id: Date.now(), img: urlData.publicUrl, user: { id: userId, name: "You", avatar: userAvatar } },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto transition-colors">
        <div className="flex gap-4 w-max">
          {[...Array(5)].map((_, i) => (
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
            <Image src={userAvatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"} alt="" fill className="object-cover" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <FiPlus size={12} className="text-white" />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{t.feed.yourStory}</span>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAddStory} className="hidden" />
        </div>

        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="relative w-16 h-16 rounded-full ring-2 ring-pink-400 overflow-hidden">
              <Image src={story.img} alt={story.user.name} fill className="object-cover" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate w-16 text-center">
              {story.user.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
