"use client";

import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Ad from "./Ad";
import { useTranslation } from "@/context/LanguageProvider";
import { FiGrid, FiUsers, FiActivity, FiCalendar, FiImage, FiVideo, FiBookOpen, FiList } from "react-icons/fi";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  const { t } = useTranslation();

  const links = [
    { href: "/my-posts", icon: FiGrid, label: t.sidebar.myPosts },
    { href: "/friends", icon: FiUsers, label: t.nav.friends },
    { href: "/activity", icon: FiActivity, label: t.sidebar.activity },
    { href: "/events", icon: FiCalendar, label: t.events.title },
    { href: "/albums", icon: FiImage, label: t.sidebar.albums },
    { href: "/videos", icon: FiVideo, label: t.sidebar.videos },
    { href: "/courses", icon: FiBookOpen, label: t.sidebar.courses },
    { href: "/lists", icon: FiList, label: t.sidebar.lists },
  ];

  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}

      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-1 transition-colors">
        {links.map((link, i) => (
          <div key={link.label}>
            <Link
              href={link.href}
              className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-700 transition group"
            >
              <link.icon size={18} className="group-hover:text-blue-500 transition" />
              <span className="group-hover:text-gray-700 dark:group-hover:text-white transition">{link.label}</span>
            </Link>
            {i < links.length - 1 && <hr className="border-gray-50 dark:border-gray-700 mx-2" />}
          </div>
        ))}
      </div>

      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
