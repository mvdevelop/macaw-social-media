"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiSearch, FiMessageSquare, FiBell, FiUser } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";

const NAV_ITEMS = [
  { href: "/", icon: FiHome, labelKey: "nav.home" },
  { href: "/search", icon: FiSearch, labelKey: "nav.search" },
  { href: "/messenger", icon: FiMessageSquare, labelKey: "nav.messenger" },
  { href: "/activity", icon: FiBell, labelKey: "notifications.title" },
  { href: "/profile/me", icon: FiUser, labelKey: "profile.myProfile" },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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
  );
}
