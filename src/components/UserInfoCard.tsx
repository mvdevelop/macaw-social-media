"use client";

import Image from "next/image";
import Link from "next/link";
import { getUserById, getCurrentUser } from "@/lib/mock-data";
import { followUser } from "@/lib/actions";
import { FiMapPin, FiBookOpen, FiBriefcase, FiLink, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "@/context/LanguageProvider";

const UserInfoCard = ({ userId }: { userId: string }) => {
  const user = getUserById(userId) || getCurrentUser();
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleFollow = async () => {
    setLoading(true);
    setFollowing(!following);
    try {
      await followUser(userId);
    } catch {
      setFollowing(following);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-4 transition-colors">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-400">{t.profile.userInfo}</span>
        <Link href="/" className="text-blue-500 text-xs">{t.profile.seeAll}</Link>
      </div>

      <div className="flex flex-col gap-4 text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black dark:text-white font-semibold">{user.name} {user.surname}</span>
          <span className="text-sm">@{user.username}</span>
        </div>
        <p className="text-sm dark:text-gray-300">{user.description}</p>

        <div className="flex items-center gap-2">
          <FiMapPin size={16} />
          <span>{t.profile.living} <b>{user.city}</b></span>
        </div>
        <div className="flex items-center gap-2">
          <FiBookOpen size={16} />
          <span>{t.profile.wentTo} <b>{user.school}</b></span>
        </div>
        <div className="flex items-center gap-2">
          <FiBriefcase size={16} />
          <span>{t.profile.worksAt} <b>{user.work}</b></span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <FiLink size={16} />
            <Link href={`https://${user.website}`} className="text-blue-500 font-medium text-xs">{user.website}</Link>
          </div>
          <div className="flex gap-1 items-center">
            <FiCalendar size={16} />
            <span className="text-xs">{t.profile.joined} {new Date(user.createdAt).getFullYear()}</span>
          </div>
        </div>

        <button
          onClick={handleFollow}
          disabled={loading}
          className={`text-sm rounded-lg p-2 font-medium transition ${
            following
              ? "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500"
              : "bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white hover:opacity-90"
          }`}
        >
          {loading ? "..." : following ? "Following" : t.profile.follow}
        </button>

        <span className="text-red-400 self-end text-xs cursor-pointer hover:text-red-500 transition">
          {t.profile.block}
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;
