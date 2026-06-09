"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FiHome, FiSearch, FiMessageSquare, FiBell, FiUser } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

const NAV_ITEMS = [
  { href: "/", icon: FiHome, labelKey: "nav.home", isSearch: false },
  { href: null, icon: FiSearch, labelKey: "nav.search", isSearch: true },
  { href: "/messenger", icon: FiMessageSquare, labelKey: "nav.messenger", isSearch: false },
  { href: "/activity", icon: FiBell, labelKey: "notifications.title", isSearch: false },
  { href: "/profile/me", icon: FiUser, labelKey: "profile.myProfile", isSearch: false },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
        <div className="flex items-center justify-around h-14">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === pathname;
            return item.isSearch ? (
              <button
                key="search"
                onClick={() => setSearchOpen(true)}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors ${
                  "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <FiSearch size={20} />
                <span className="text-[10px] font-medium">
                  {item.labelKey
                    .split(".")
                    .reduce((obj: any, key: string) => obj?.[key], t as any) || item.labelKey}
                </span>
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors ${
                  isActive
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-medium">
                  {item.labelKey
                    .split(".")
                    .reduce((obj: any, key: string) => obj?.[key], t as any) || item.labelKey}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
