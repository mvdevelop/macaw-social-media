"use client";

import Image from "next/image";
import Link from "next/link";
import { getBirthdays } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";

const Birthdays = () => {
  const birthdays = getBirthdays();
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-4 transition-colors">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-400">{t.common.birthdays}</span>
      </div>

      {birthdays.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/profile/${user.id}`}>
              <Image src={user.avatar} alt={user.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition" />
            </Link>
            <Link href={`/profile/${user.id}`} className="font-semibold text-sm text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition">
              {user.name} {user.surname}
            </Link>
          </div>
          <button className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-600 transition">
            {t.common.celebrate}
          </button>
        </div>
      ))}

      <div className="p-3 bg-slate-50 dark:bg-gray-700 rounded-lg flex items-center gap-3">
        <Image src="/gift.png" alt="" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-0.5 text-xs">
          <span className="text-gray-700 dark:text-gray-200 font-semibold">{t.common.upcomingBirthdays}</span>
          <span className="text-gray-500 dark:text-gray-400">{t.common.seeOtherBirthdays}</span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
