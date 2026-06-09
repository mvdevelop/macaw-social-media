"use client";

import Link from "next/link";
import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen((prev) => !prev)} className="text-white p-2">
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed left-0 top-16 w-full h-[calc(100vh-64px)] bg-white dark:bg-gray-900 flex flex-col items-center justify-start gap-1 font-medium text-base z-50 shadow-xl overflow-y-auto pt-8">
          <Link href="/" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.nav.home}
          </Link>
          <Link href="/groups" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.nav.groups}
          </Link>
          <Link href="/reels" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.nav.reels || "Reels"}
          </Link>
          <Link href="/news" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.news.title}
          </Link>
          <Link href="/marketplace" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.nav.marketplace}
          </Link>
          <Link href="/messenger" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.nav.messenger || "Messenger"}
          </Link>
          <hr className="border-gray-100 dark:border-gray-700 my-2 mx-8" />
          <Link href="/my-posts" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.sidebar.myPosts}
          </Link>
          <Link href="/events" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.events.title}
          </Link>
          <Link href="/albums" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.sidebar.albums}
          </Link>
          <Link href="/videos" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.sidebar.videos}
          </Link>
          <Link href="/news" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.sidebar.news}
          </Link>
          <Link href="/courses" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.sidebar.courses}
          </Link>
          <Link href="/lists" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.sidebar.lists}
          </Link>
          <Link href="/settings" prefetch={true} onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition px-8 py-3 w-full text-center">
            {t.nav.settings}
          </Link>

          {/* Mobile-only: Friend Requests & Birthdays (RightMenu fica oculto no mobile) */}
          <hr className="border-gray-100 dark:border-gray-700 my-2 mx-8" />
          <div className="w-full px-4 mt-2 space-y-4">
            <FriendRequests />
            <Birthdays />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
