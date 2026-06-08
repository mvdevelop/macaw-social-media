"use client";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LeftMenu from "@/components/LeftMenu";
import Feed from "@/components/Feed";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { followUser, updateProfile, updateProfileCover } from "@/lib/actions";
import { processUpload } from "@/lib/image-utils";
import { getUserById, getPostsByUserId, getCurrentUser, getStories } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import {
  FiCalendar, FiMapPin, FiUserPlus, FiUserCheck,
  FiCamera, FiEdit2, FiSettings, FiCheck, FiX, FiArrowLeft,
} from "react-icons/fi";

interface ProfileUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  avatar: string;
  cover: string;
  description: string;
  city: string;
  school: string;
  work: string;
  website: string;
  created_at?: string;
  createdAt?: string;
}

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { t } = useTranslation();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postCount, setPostCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState("");
  const [savingBio, setSavingBio] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [isMockUser, setIsMockUser] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setCurrentUserId(authUser?.id || null);

      let targetId = id;
      if (id === "me") {
        if (authUser) {
          router.replace(`/profile/${authUser.id}`);
          return;
        } else {
          // Fallback: usa o mock user u1 como "meu perfil"
          const mock = getCurrentUser();
          setUser(mock as ProfileUser);
          setIsMockUser(true);
          setPostCount(getPostsByUserId(mock.id).length);
          setFollowersCount(128);
          setFollowingCount(56);
          setLoading(false);
          return;
        }
      }

      // Try Supabase first
      let profile: any = null;
      if (authUser) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", targetId)
          .single();
        profile = data;
      }

      // Fallback: mock data
      if (!profile) {
        const mockUser = getUserById(targetId);
        if (mockUser) {
          setUser(mockUser as ProfileUser);
          setIsMockUser(true);
          setPostCount(getPostsByUserId(mockUser.id).length);
          setFollowersCount(Math.floor(Math.random() * 500) + 10);
          setFollowingCount(Math.floor(Math.random() * 200) + 5);
          setBioText(mockUser.description || "");
          setLoading(false);
          return;
        }
      }

      if (!profile) {
        setError(t.profile.userNotFound);
        setLoading(false);
        return;
      }

      setUser(profile as ProfileUser);
      setBioText(profile.description || "");

      // Conta posts
      const { count: pCount } = await supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", targetId);
      if (pCount !== null) setPostCount(pCount);

      // Conta followers
      const { count: folCount } = await supabase
        .from("followers")
        .select("id", { count: "exact", head: true })
        .eq("following_id", targetId);
      if (folCount !== null) setFollowersCount(folCount);

      // Conta following
      const { count: fingCount } = await supabase
        .from("followers")
        .select("id", { count: "exact", head: true })
        .eq("follower_id", targetId);
      if (fingCount !== null) setFollowingCount(fingCount);

      // Verifica follow
      if (authUser && authUser.id !== targetId) {
        const { data: follow } = await supabase
          .from("followers")
          .select("id")
          .eq("follower_id", authUser.id)
          .eq("following_id", targetId)
          .maybeSingle();
        setIsFollowing(!!follow);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [id, router]);

  const handleFollowToggle = async () => {
    if (!currentUserId) {
      setIsFollowing(!isFollowing);
      setFollowersCount((c) => (isFollowing ? Math.max(0, c - 1) : c + 1));
      return;
    }
    setIsFollowing(!isFollowing);
    if (isFollowing) setFollowersCount((c) => Math.max(0, c - 1));
    else setFollowersCount((c) => c + 1);
    try { await followUser(id); }
    catch { setIsFollowing(isFollowing); }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUserId) return;
    setUploadingCover(true);
    try {
      const { blob } = await processUpload(file, "cover");
      const fd = new FormData();
      fd.append("cover", blob, "cover.webp");
      await updateProfileCover(fd);
      const supabase = createClient();
      const { data } = await supabase.from("users").select("*").eq("id", currentUserId).single();
      if (data) setUser(data as ProfileUser);
    } catch (err: any) { alert(err.message); }
    finally { setUploadingCover(false); if (e.target) e.target.value = ""; }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUserId) return;
    setUploadingAvatar(true);
    try {
      const { blob } = await processUpload(file, "avatar");
      const fd = new FormData();
      fd.append("avatar", blob, "avatar.webp");
      fd.append("name", user?.name || "");
      fd.append("surname", user?.surname || "");
      await updateProfile(fd);
      const supabase = createClient();
      const { data } = await supabase.from("users").select("*").eq("id", currentUserId).single();
      if (data) setUser(data as ProfileUser);
    } catch (err: any) { alert(err.message); }
    finally { setUploadingAvatar(false); if (e.target) e.target.value = ""; }
  };

  const handleSaveBio = async () => {
    if (!currentUserId) return;
    setSavingBio(true);
    try {
      const fd = new FormData();
      fd.append("description", bioText);
      fd.append("name", user?.name || "");
      fd.append("surname", user?.surname || "");
      await updateProfile(fd);
      setUser((prev) => prev ? { ...prev, description: bioText } : prev);
      setEditingBio(false);
    } catch (err) { console.error(err); }
    finally { setSavingBio(false); }
  };

  const isOwnProfile = currentUserId === user?.id || (isMockUser && id === "me");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">{error || t.profile.userNotFound}</p>
        <Link href="/" className="text-blue-500 text-sm hover:underline">
          {t.profile.goToHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-6 pt-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* Top bar */}
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
              <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="font-bold text-gray-800 dark:text-white">{user.name} {user.surname}</h1>
              <p className="text-xs text-gray-400">{postCount} {t.profile.posts}</p>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
            {/* Cover */}
            <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-400 to-purple-500 group">
              {user.cover && (
                <Image src={user.cover} alt="Cover" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
              )}

              {/* Cover upload overlay (só para o próprio perfil) */}
              {isOwnProfile && !isMockUser && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <button
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploadingCover}
                    className="flex items-center gap-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-white transition"
                  >
                    {uploadingCover ? (
                      <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
                    ) : (
                      <FiCamera size={16} />
                    )}
                    {uploadingCover ? t.profile.uploading : t.profile.changeCover}
                  </button>
                </div>
              )}
              <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            </div>

            <div className="relative px-4 pb-4">
              <div className="flex flex-col items-center -mt-16">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full ring-4 ring-white dark:ring-gray-800 overflow-hidden bg-gray-100">
                    {user.avatar ? (
                      <Image src={user.avatar} alt={user.name} width={120} height={120} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Nome + username */}
                <div className="flex items-center gap-2 mt-4">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {user.name} {user.surname}
                  </h1>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>

                {/* Bio */}
                {user.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-md text-center">
                    {user.description}
                  </p>
                )}

                {/* Location + Date */}
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {user.city && (
                    <div className="flex items-center gap-1">
                      <FiMapPin size={14} />
                      <span>{user.city}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <FiCalendar size={14} />
                    <span>{t.profile.joined} {new Date(user.created_at || user.createdAt || Date.now()).getFullYear()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 mt-4 mb-4">
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">{postCount}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.profile.posts}</p>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">{followersCount}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.profile.followers}</p>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">{followingCount}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.profile.following}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {!isOwnProfile ? (
                    <button onClick={handleFollowToggle}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm transition ${
                        isFollowing
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-500"
                          : "bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] text-white hover:opacity-90"
                      }`}>
                      {isFollowing ? <FiUserCheck size={16} /> : <FiUserPlus size={16} />}
                      {isFollowing ? t.profile.following : t.profile.follow}
                    </button>
                  ) : currentUserId && !isMockUser ? (
                    <button onClick={() => router.push("/settings")}
                      className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <FiSettings size={16} />
                      {t.profile.editProfileBtn}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Stories section for this user */}
          {isMockUser && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">{t.profile.stories}</h3>
              <div className="flex gap-3 overflow-x-auto">
                {getStories().filter(s => s.userId === user.id).slice(0, 5).map((story) => (
                  <div key={story.id} className="flex flex-col items-center gap-1 cursor-pointer shrink-0">
                    <div className="w-16 h-16 rounded-full ring-2 ring-pink-400 overflow-hidden">
                      <Image src={story.img} alt="" width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-500">{story.user.name}</span>
                  </div>
                ))}
                {getStories().filter(s => s.userId === user.id).length === 0 && (
                  <p className="text-xs text-gray-400 py-4">{t.profile.noStories}</p>
                )}
              </div>
            </div>
          )}

          <Feed />
        </div>
      </div>

      <div className="hidden lg:block w-[30%]">
        <RightMenu userId={user.id} />
      </div>
    </div>
  );
}
