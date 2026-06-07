"use client";

import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { updateProfile, updateProfileCover, deletePost } from "@/lib/actions";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiCamera, FiSave, FiTrash2, FiImage } from "react-icons/fi";
import { processUpload } from "@/lib/image-utils";

interface Profile {
  id: string;
  name: string;
  surname: string;
  username: string;
  avatar: string;
  cover: string;
  description: string;
  city: string;
  school: string;
  work: string;
  website: string;
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase.from("users").select("*").eq("id", user.id).single().then(({ data }) => {
      if (data) setProfile(data as Profile);
    });
    supabase.from("posts").select("id, content, created_at, img").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20).then(({ data }) => {
      if (data) setPosts(data);
    });
  }, [user]);

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(new FormData(e.currentTarget));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost(postId);
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>

          {/* Cover preview */}
          {profile.cover && (
            <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
              <Image src={profile.cover} alt="Cover" fill className="object-cover" />
            </div>
          )}

          {/* Avatar + Cover uploads */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-800 -mt-10">
              {profile.avatar ? (
                <Image src={profile.avatar} alt="" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400">
                  {profile.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <FiCamera size={16} />
                Avatar
                <input type="file" name="avatar" accept="image/*" className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const { blob } = await processUpload(file, "avatar");
                      const fd = new FormData();
                      fd.append("avatar", blob, "avatar.webp");
                      await updateProfile(fd);
                      setSaved(true);
                      setTimeout(() => setSaved(false), 3000);
                      const supabase = createClient();
                      const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
                      if (data) setProfile(data as Profile);
                    } catch (err: any) { alert(err.message); }
                  }}
                />
              </label>
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <FiImage size={16} />
                Cover
                <input type="file" name="cover" accept="image/*" className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const { blob } = await processUpload(file, "cover");
                      const fd = new FormData();
                      fd.append("cover", blob, "cover.webp");
                      await updateProfileCover(fd);
                      setSaved(true);
                      setTimeout(() => setSaved(false), 3000);
                      const supabase = createClient();
                      const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
                      if (data) setProfile(data as Profile);
                    } catch (err: any) { alert(err.message); }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" name="name" defaultValue={profile.name} />
            <InputField label="Last Name" name="surname" defaultValue={profile.surname} />
            <InputField label="City" name="city" defaultValue={profile.city} />
            <InputField label="School" name="school" defaultValue={profile.school} />
            <InputField label="Work" name="work" defaultValue={profile.work} />
            <InputField label="Website" name="website" defaultValue={profile.website} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={profile.description}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            <FiSave size={16} />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </form>

        {/* My Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">My Posts ({posts.length})</h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="flex items-start justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2">{post.content}</p>
                  {post.img && <p className="text-xs text-blue-500 mt-1">📷 Has image</p>}
                  <p className="text-xs text-gray-400 mt-1">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="ml-3 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue || ""}
        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
      />
    </div>
  );
}
