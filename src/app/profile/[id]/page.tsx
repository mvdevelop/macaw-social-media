"use client";

import { use } from "react";
import LeftMenu from "@/components/LeftMenu";
import Feed from "@/components/Feed";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";
import { getUserById, getCurrentUser, getPostsByUserId } from "@/lib/mock-data";
import { FiCalendar, FiMapPin } from "react-icons/fi";

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = getUserById(id) || getCurrentUser();
  const userPosts = getPostsByUserId(user.id);

  return (
    <div className="flex gap-6 pt-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
            <div className="relative h-48 md:h-64">
              <Image src={user.cover} alt="Cover" fill className="object-cover" />
            </div>
            <div className="relative px-4 pb-4">
              <div className="flex flex-col items-center -mt-16">
                <Image src={user.avatar} alt={user.name} width={120} height={120} className="w-28 h-28 rounded-full ring-4 ring-white dark:ring-gray-800 object-cover" />
                <h1 className="mt-4 mb-1 text-2xl font-bold text-gray-800 dark:text-white">{user.name} {user.surname}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-md text-center">{user.description}</p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiMapPin size={14} />
                    <span>{user.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCalendar size={14} />
                    <span>Joined {new Date(user.createdAt).getFullYear()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 mt-4 mb-4">
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">{userPosts.length}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">405</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">540</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                  </div>
                </div>

                <button className="bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition">
                  Follow
                </button>
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
