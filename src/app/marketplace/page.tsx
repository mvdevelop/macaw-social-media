"use client";

import Image from "next/image";
import { getMarketplaceItems } from "@/lib/mock-data";
import { FiMapPin, FiHeart } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useState } from "react";

export default function MarketplacePage() {
  const [items] = useState(() => getMarketplaceItems());
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.marketplace.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group dark:border dark:border-gray-700">
            <div className="relative h-48">
              <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition duration-300" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                <FiHeart size={16} className="text-gray-500 dark:text-gray-300" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-lg font-bold text-gray-800 dark:text-white">{item.price}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{item.title}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                <FiMapPin size={12} />
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
