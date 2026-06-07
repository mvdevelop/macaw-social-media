"use client";

import { use, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LeftMenu from "@/components/LeftMenu";
import Feed from "@/components/Feed";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { followUser, updateProfile, updateProfileCover } from "@/lib/actions";
import { processUpload } from "@/lib/image-utils";
import {
  FiCalendar, FiMapPin, FiUserPlus, FiUserCheck,
  FiCamera, FiEdit2, FiSettings, FiCheck, FiX,
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
  created_at: string;
}

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
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

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      setCurrentUserId(authUser.id);

      let targetId = id;
      if (id === "me") {
        router.replace(`/profile/${authUser.id}`);
        return;
      }

      let { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", targetId)
        .single();

      if (!profile && targetId === authUser.id) {
        const username = authUser.email?.split("@")[0] || `user_${authUser.id.slice(0, 8)}`;
        const { data: newUser } = await supabase
          .from("users")
          .insert({
            id: authUser.id, username,
            name: authUser.user_metadata?.name || username, surname: "",
            avatar: authUser.user_metadata?.avatar_url || "",
          })
          .select()
          .single();
        if (newUser) profile = newUser;
      }

      if (!profile) {
        setError("User not found");
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
      if (authUser.id !== targetId) {
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
    if (!currentUserId) return;
    setIsFollowing(!isFollowing);
    if (isFollowing) setFollowersCount((c) => Math.max(0, c - 1));
    else setFollowersCount((c) => c + 1);
    try { await followUser(id); }
    catch { setIsFollowing(isFollowing); }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const { blob } = await processUpload(file, "cover");
      const fd = new FormData();
      fd.append("cover", blob, "cover.webp");
      await updateProfileCover(fd);
      // Recarrega usuário
      const supabase = createClient();
      const { data } = await supabase.from("users").select("*").eq("id", currentUserId!).single();
      if (data) setUser(data as ProfileUser);
    } catch (err: any) { alert(err.message); }
    finally { setUploadingCover(false); if (e.target) e.target.value = ""; }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const { blob } = await processUpload(file, "avatar");
      const fd = new FormData();
      fd.append("avatar", blob, "avatar.webp");
      fd.append("name", user?.name || "");
      fd.append("surname", user?.surname || "");
      await updateProfile(fd);
      const supabase = createClient();
      const { data } = await supabase.from("users").select("*").eq("id", currentUserId!).single();
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

  const isOwnProfile = currentUserId === user?.id;

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
        <p className="text-gray-400">{error || "User not found"}</p>
        {currentUserId && (
          <button onClick={() => router.push(`/profile/${currentUserId}`)}
            className="text-blue-500 text-sm hover:underline">
            Go to my profile
          </button>
        )}
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
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
            {/* Cover */}
            <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-400 to-purple-500 group">
              {user.cover && (
                <Image src={user.cover} alt="Cover" fill className="object-cover" />
              )}

              {/* Cover upload overlay (só para o próprio perfil) */}
              {isOwnProfile && (
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
                    {uploadingCover ? "Uploading..." : "Change Cover"}
                  </button>
                </div>
              )}
              <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            </div>

            <div className="relative px-4 pb-4">
              <div className="flex flex-col items-center -mt-16">
                {/* Avatar com overlay de câmera */}
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

                  {isOwnProfile && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => avatarInputRef.current?.click()}>
                      <div className="w-28 h-28 rounded-full bg-black/40 flex items-center justify-center">
                        {uploadingAvatar ? (
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FiCamera size={22} className="text-white" />
                        )}
                      </div>
                    </div>
                  )}
                  <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </div>

                {/* Nome + username */}
                <div className="flex items-center gap-2 mt-4">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {user.name} {user.surname}
                  </h1>
                  {isOwnProfile && (
                    <button onClick={() => router.push("/settings")}
                      className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                      title="Edit profile">
                      <FiEdit2 size={14} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>

                {/* Bio editável */}
                {isOwnProfile && editingBio ? (
                  <div className="mt-2 w-full max-w-md space-y-2">
                    <textarea
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                      rows={3}
                      placeholder="Write something about yourself..."
                    />
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => { setEditingBio(false); setBioText(user.description || ""); }}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                        <FiX size={14} /> Cancel
                      </button>
                      <button onClick={handleSaveBio} disabled={savingBio}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50">
                        <FiCheck size={14} /> {savingBio ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : user.description ? (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-md text-center group relative">
                    {user.description}
                    {isOwnProfile && (
                      <button onClick={() => setEditingBio(true)}
                        className="ml-2 text-gray-400 hover:text-blue-500 transition opacity-0 group-hover:opacity-100 inline">
                        <FiEdit2 size={12} className="inline" />
                      </button>
                    )}
                  </p>
                ) : isOwnProfile ? (
                  <button onClick={() => setEditingBio(true)}
                    className="text-sm text-gray-400 hover:text-blue-500 mt-2 transition">
                    + Add bio
                  </button>
                ) : null}

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
                    <span>Joined {new Date(user.created_at || Date.now()).getFullYear()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 mt-4 mb-4">
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">{postCount}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">{followersCount}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">{followingCount}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {!isOwnProfile ? (
                    <button onClick={handleFollowToggle}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm transition ${
                        isFollowing
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-500"
                          : "bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white hover:opacity-90"
                      }`}>
                      {isFollowing ? <FiUserCheck size={16} /> : <FiUserPlus size={16} />}
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  ) : (
                    <button onClick={() => router.push("/settings")}
                      className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <FiSettings size={16} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Feed />
        </div>
      </div>

      <div className="hidden lg:block w-[30%]">
        <RightMenu userId={user.id} />
      </div>
    </div>
  );
}
