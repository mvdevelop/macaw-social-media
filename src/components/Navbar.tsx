"use client";

import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";
import SearchModal from "./SearchModal";
import NotificationsDropdown from "./NotificationsDropdown";
import { useAuth } from "@/context/AuthProvider";
import { useState, useRef, useEffect } from "react";
import { FiSearch, FiMessageSquare, FiLogOut, FiSettings, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const { user, loading, signOut } = useAuth();
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
      <div className="bg-gradient-to-r from-[#0052FF] to-[#C100FF] h-16" />
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#0052FF] via-[#6825FF] to-[#C100FF] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="h-16 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦜</span>
            <span className="text-white font-bold text-lg hidden sm:block">Macaw</span>
          </Link>
        </div>

        {/* Center - Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            Home
          </Link>
          <Link href="/friends" className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            Friends
          </Link>
          <Link href="/marketplace" className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            Marketplace
          </Link>
          <Link href="/groups" className="text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm font-medium">
            Groups
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
            <span className="hidden lg:inline">Search</span>
          </button>

          {/* Theme + Language */}
          <ThemeToggle />
          <LanguageSwitch />

          {/* Notifications */}
          <NotificationsDropdown />

          {/* Messages - abre o ChatPanel via window event */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-chat"))}
            className="relative text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition"
          >
            <FiMessageSquare size={20} />
          </button>

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
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiSettings size={16} className="text-gray-400" />
                  Settings
                </Link>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    signOut();
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <FiLogOut size={16} />
                  Sign Out
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
