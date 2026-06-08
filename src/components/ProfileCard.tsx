"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { useTranslation } from "@/context/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import { getCurrentUser, getUserById, getPostsByUserId } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { FiCamera, FiEdit2 } from "react-icons/fi";

const ProfileCard = () => {
  const { user: authUser } = useAuth();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<{
    id: string;
    name: string;
    surname: string;
    username: string;
    avatar: string;
    cover: string;
    description: string;
  } | null>(null);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });

  useEffect(() => {
    const loadProfile = async () => {
      if (!authUser) {
        // Fallback: usa mock data quando não está autenticado
        const mock = getCurrentUser();
        setProfile({
          id: mock.id,
          name: mock.name,
          surname: mock.surname,
          username: mock.username,
          avatar: mock.avatar,
          cover: mock.cover,
          description: mock.description,
        });
        setStats({
          posts: getPostsByUserId(mock.id).length,
          followers: 365,
          following: 128,
        });
        return;
      }

      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("users")
          .select("id, name, surname, username, avatar, cover, description, city, school, work")
          .eq("id", authUser.id)
          .single();

        if (data && data.name) {
          setProfile({
            id: data.id,
            name: data.name,
            surname: data.surname || "",
            username: data.username || "",
            avatar: data.avatar || "",
            cover: data.cover || "",
            description: data.description || "",
          });
        } else {
          setProfile({
            id: authUser.id,
            name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "User",
            surname: authUser.user_metadata?.surname || "",
            username: authUser.user_metadata?.username || authUser.email?.split("@")[0] || "",
            avatar: authUser.user_metadata?.avatar_url || "",
            cover: "",
            description: "",
          });
        }

        // Busca contagens
        const [postCount, followerCount, followingCount] = await Promise.all([
          supabase.from("posts").select("id", { count: "exact", head: true }).eq("user_id", authUser.id),
          supabase.from("followers").select("id", { count: "exact", head: true }).eq("following_id", authUser.id),
          supabase.from("followers").select("id", { count: "exact", head: true }).eq("follower_id", authUser.id),
        ]);
        setStats({
          posts: postCount.count ?? 0,
          followers: followerCount.count ?? 0,
          following: followingCount.count ?? 0,
        });
      } catch {
        // Fallback em caso de erro
        setProfile({
          id: authUser.id,
          name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "User",
          surname: authUser.user_metadata?.surname || "",
          username: authUser.user_metadata?.username || "",
          avatar: authUser.user_metadata?.avatar_url || "",
          cover: "",
          description: "",
        });
      }
    };
    loadProfile();
  }, [authUser]);

  if (!profile) return null;

  const displayCover = profile.cover || "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg";
  const displayAvatar = profile.avatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors">
      {/* Cover */}
      <Link href={`/profile/${profile.id}`} className="block relative h-24 group">
        <Image
          src={displayCover}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <FiCamera size={14} className="text-white" />
        </div>
      </Link>

      {/* Avatar + Nome */}
      <div className="relative px-4 pb-3">
        <div className="flex justify-center">
          <Link
            href={`/profile/${profile.id}`}
            className="relative -mt-10 w-20 h-20 rounded-full ring-4 ring-white dark:ring-gray-800 overflow-hidden group"
          >
            <Image
              src={displayAvatar}
              alt=""
              width={80}
              height={80}
              className="rounded-full object-cover w-20 h-20"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-full" />
          </Link>
        </div>

        <Link href={`/profile/${profile.id}`} className="block text-center mt-1 group">
          <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
            {profile.name} {profile.surname}
          </h3>
          {profile.username && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              @{profile.username}
            </p>
          )}
        </Link>

        {/* Bio */}
        {profile.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2 leading-relaxed line-clamp-2">
            {profile.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-around mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <span className="block text-sm font-bold text-gray-800 dark:text-white">
              {stats.posts}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {t.profile.posts}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm font-bold text-gray-800 dark:text-white">
              {stats.followers >= 1000
                ? `${(stats.followers / 1000).toFixed(1)}k`
                : stats.followers}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {t.profile.followers}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm font-bold text-gray-800 dark:text-white">
              {stats.following >= 1000
                ? `${(stats.following / 1000).toFixed(1)}k`
                : stats.following}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {t.profile.following}
            </span>
          </div>
        </div>

        {/* Botão Perfil */}
        <Link
          href={`/profile/${profile.id}`}
          className="block mt-3 text-center text-xs font-semibold text-white bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] py-2 rounded-lg hover:opacity-90 transition active:scale-[0.98]"
        >
          {t.profile.myProfile}
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
