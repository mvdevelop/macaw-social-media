"use client";

import Image from "next/image";
import { getStories, getCurrentUser } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/client";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

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
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("stories")
          .select("*, user:users(*)")
          .gt("expires_at", new Date().toISOString())
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setStories(
            data.map((s: any) => ({
              id: s.id,
              img: s.img,
              user: s.user || { id: s.user_id, name: "User", avatar: currentUser.avatar },
            }))
          );
        } else {
          // Fallback mock
          setStories(
            getStories().map((s) => ({
              id: s.id,
              img: s.img,
              user: { id: s.user.id, name: s.user.name, avatar: s.user.avatar },
            }))
          );
        }
      } catch {
        setStories(
          getStories().map((s) => ({
            id: s.id,
            img: s.img,
            user: { id: s.user.id, name: s.user.name, avatar: s.user.avatar },
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleAddStory = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const ext = file.name.split(".").pop();
      const filePath = `stories/${user.id}/${Date.now()}.${ext}`;

      await supabase.storage.from("story-images").upload(filePath, file);

      const { data: urlData } = supabase.storage.from("story-images").getPublicUrl(filePath);

      await supabase.from("stories").insert({
        user_id: user.id,
        img: urlData.publicUrl,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });

      // Adiciona otimisticamente
      setStories([
        {
          id: Date.now(),
          img: urlData.publicUrl,
          user: { id: user.id, name: "You", avatar: currentUser.avatar },
        },
        ...stories,
      ]);
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
            <Image src={currentUser.avatar} alt="" fill className="object-cover" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <FiPlus size={12} className="text-white" />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Your Story</span>
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
