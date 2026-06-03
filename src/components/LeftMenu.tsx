"use client";

import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Ad from "./Ad";
import { FiGrid, FiActivity, FiShoppingBag, FiCalendar, FiImage, FiVideo, FiGlobe, FiBookOpen, FiList, FiSettings } from "react-icons/fi";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  const links = [
    { href: "/", icon: FiGrid, label: "My Posts" },
    { href: "/", icon: FiActivity, label: "Activity" },
    { href: "/marketplace", icon: FiShoppingBag, label: "Marketplace" },
    { href: "/events", icon: FiCalendar, label: "Events" },
    { href: "/", icon: FiImage, label: "Albums" },
    { href: "/", icon: FiVideo, label: "Videos" },
    { href: "/", icon: FiGlobe, label: "News" },
    { href: "/", icon: FiBookOpen, label: "Courses" },
    { href: "/", icon: FiList, label: "Lists" },
    { href: "/settings", icon: FiSettings, label: "Settings" },
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
