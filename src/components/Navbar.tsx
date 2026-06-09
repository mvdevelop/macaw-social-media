"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";
import NotificationsDropdown from "./NotificationsDropdown";
import { useAuth } from "@/context/AuthProvider";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useRef, useEffect } from "react";
import { FiSearch, FiLogOut, FiSettings, FiChevronDown, FiUser } from "react-icons/fi";
import MacawIcon from "@/components/MacawIcon";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

const Navbar = () => {
  const { user, loading, signOut } = useAuth();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Landing page (sem usuário) não mostra navbar
  if (!loading && !user) return null;

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-[#4A8CFF] via-[#7C5CFC] to-[#A855F7] dark:from-[#1e1e2e] dark:via-[#2d2d44] dark:to-[#1a1a2e] h-16" />
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#4A8CFF] via-[#7C5CFC] to-[#A855F7] dark:from-[#1e1e2e] dark:via-[#2d2d44] dark:to-[#1a1a2e] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="h-16 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <MacawIcon size={28} className="text-white" />
            <span className="text-white font-bold text-lg hidden sm:block">Macaw</span>
          </Link>
        </div>

        {/* Center - Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" prefetch={true} className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            {t.nav.home}
          </Link>
          <Link href="/groups" prefetch={true} className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            {t.nav.groups}
          </Link>
          <Link href="/reels" prefetch={true} className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            Reels
          </Link>
          <Link href="/news" prefetch={true} className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            {t.news.title}
          </Link>
          <Link href="/marketplace" prefetch={true} className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            {t.nav.marketplace}
          </Link>
          <Link href="/messenger" prefetch={true} className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            Messenger
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 px-3 py-2 rounded-lg transition text-sm"
          >
            <FiSearch size={16} />
            <span className="hidden lg:inline">{t.nav.search}</span>
          </button>

          {/* Theme + Language */}
          <ThemeToggle />
          <LanguageSwitch />

          {/* Notifications */}
          <NotificationsDropdown />

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 text-white hover:bg-white/10 pl-2 pr-3 py-1.5 rounded-lg transition"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
                {user!.user_metadata?.avatar_url ? (
                  <Image
                    src={user!.user_metadata.avatar_url}
                    alt="Avatar"
                    width={28}
                    height={28}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  user!.email?.charAt(0).toUpperCase() || "U"
                )}
              </div>
              <FiChevronDown size={14} className={`transition ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

              {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                {/* User info header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user!.email}</p>
                  <p className="text-xs text-gray-500">@{user!.user_metadata?.username || "user"}</p>
                </div>

                <Link
                  href="/profile/me"
                  prefetch={true}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiUser size={16} className="text-gray-400" />
                  {t.profile.myProfile}
                </Link>

                <Link
                  href="/settings"
                  prefetch={true}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiSettings size={16} className="text-gray-400" />
                  {t.nav.settings}
                </Link>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    signOut();
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <FiLogOut size={16} />
                  {t.nav.signOut}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <MobileMenu />
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default Navbar;
