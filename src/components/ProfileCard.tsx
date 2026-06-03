"use client";

import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthProvider";

const ProfileCard = () => {
  const { user: authUser } = useAuth();
  const mockUser = getCurrentUser();

  const displayUser = {
    name: authUser?.user_metadata?.username || mockUser.name,
    surname: mockUser.surname,
    avatar: authUser?.user_metadata?.avatar_url || mockUser.avatar,
    cover: mockUser.cover,
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm transition-colors">
      <div className="h-20 relative">
        <div className="absolute inset-0">
          <Image src={displayUser.cover} alt="" fill className="rounded-md object-cover" />
        </div>
        <div className="absolute left-0 right-0 m-auto -bottom-6 w-12 h-12 z-10 rounded-full ring-1 ring-white overflow-hidden">
          <Image src={displayUser.avatar} alt="" width={48} height={48} className="rounded-full object-cover w-12 h-12" />
        </div>
      </div>
      <div className="h-20 flex flex-col gap-2 items-center mt-2">
        <span className="font-semibold text-gray-800 dark:text-white">{displayUser.name} {displayUser.surname}</span>
        <div className="flex items-center gap-4">
          <div className="flex">
            {[...Array(3)].map((_, i) => (
              <Image key={i} src="/poll.png" alt="" width={12} height={12} className="rounded-full object-cover w-3 h-3 -ml-1 first:ml-0" />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">365 Followers</span>
        </div>
        <Link href={`/profile/${mockUser.id}`} className="bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white text-xs p-2 rounded-md hover:opacity-90 transition">
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
