"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { useTranslation } from "@/context/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import { getCurrentUser } from "@/lib/mock-data";
import { useState, useEffect } from "react";

const ProfileCard = () => {
  const { user: authUser } = useAuth();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<{
    name: string; surname: string; avatar: string; cover: string; id: string;
  } | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!authUser) {
        // Fallback: usa mock data quando não está autenticado no Supabase
        const mock = getCurrentUser();
        setProfile({ id: mock.id, name: mock.name, surname: mock.surname, avatar: mock.avatar, cover: mock.cover });
        return;
      }
      try {
        const supabase = createClient();
        const { data } = await supabase.from("users").select("id, name, surname, avatar, cover").eq("id", authUser.id).single();
        if (data) {
          setProfile(data as any);
        } else {
          // Fallback mock data
          const mock = getCurrentUser();
          setProfile({ id: mock.id, name: mock.name, surname: mock.surname, avatar: mock.avatar, cover: mock.cover });
        }
      } catch {
        const mock = getCurrentUser();
        setProfile({ id: mock.id, name: mock.name, surname: mock.surname, avatar: mock.avatar, cover: mock.cover });
      }
    };
    loadProfile();
  }, [authUser]);

  if (!profile) return null;

  const displayCover = profile.cover || "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg";

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm transition-colors">
      <div className="h-20 relative">
        <div className="absolute inset-0">
          <Image src={displayCover} alt="" fill className="rounded-md object-cover" />
        </div>
        <div className="absolute left-0 right-0 m-auto -bottom-6 w-12 h-12 z-10 rounded-full ring-1 ring-white overflow-hidden">
          <Image
            src={profile.avatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"}
            alt="" width={48} height={48}
            className="rounded-full object-cover w-12 h-12"
          />
        </div>
      </div>
      <div className="h-20 flex flex-col gap-2 items-center mt-2">
        <span className="font-semibold text-gray-800 dark:text-white">{profile.name} {profile.surname}</span>
        <div className="flex items-center gap-4">
          <div className="flex">
            {[...Array(3)].map((_, i) => (
              <Image key={i} src="/poll.png" alt="" width={12} height={12} className="rounded-full object-cover w-3 h-3 -ml-1 first:ml-0" />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">365 {t.profile.followers}</span>
        </div>
        <Link href="/profile/me" className="bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] text-white text-xs p-2 rounded-md hover:opacity-90 transition">
          {t.profile.myProfile}
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
