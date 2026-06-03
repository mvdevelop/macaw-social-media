"use client";

import Image from "next/image";
import { getGroups } from "@/lib/mock-data";
import { FiUsers } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useState } from "react";

export default function GroupsPage() {
  const [groups] = useState(() => getGroups());
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.groups.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group dark:border dark:border-gray-700">
            <div className="relative h-40">
              <Image src={group.img} alt={group.name} fill className="object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg">{group.name}</h3>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FiUsers size={16} />
                <span>{group.members.toLocaleString()} {t.groups.members}</span>
              </div>
              <button className="text-sm bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-4 py-1.5 rounded-lg font-medium hover:opacity-90 transition">
                {t.groups.join}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
