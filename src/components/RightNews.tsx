"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageProvider";
import { FiGlobe, FiExternalLink, FiChevronRight } from "react-icons/fi";

const MINI_NEWS = [
  {
    title: "Digital Detox Benefits Confirmed by Study",
    source: "Tech Daily",
    image: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    url: "https://news.google.com",
  },
  {
    title: "Climate Summit Reaches Historic Agreement",
    source: "World News",
    image: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    url: "https://news.google.com",
  },
  {
    title: "AI Tool Diagnoses Diseases With 99% Accuracy",
    source: "Science Today",
    image: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    url: "https://news.google.com",
  },
  {
    title: "EV Sales Surge to New Record Worldwide",
    source: "Auto Weekly",
    image: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    url: "https://news.google.com",
  },
];

export default function RightNews() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col transition-colors overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <FiGlobe size={16} className="text-blue-500" />
          <span className="font-medium text-sm text-gray-500 dark:text-gray-400">
            {t.news.title}
          </span>
        </div>
        <Link
          href="/news"
          className="text-blue-500 text-xs font-medium hover:text-blue-600 transition flex items-center gap-0.5"
        >
          {t.common.seeAll} <FiChevronRight size={12} />
        </Link>
      </div>

      {/* News list */}
      <div className="flex-1 overflow-y-auto px-4 pb-3 space-y-2">
        {MINI_NEWS.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition group"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="40px"
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] text-gray-400">{item.source}</span>
                <FiExternalLink size={8} className="text-gray-400" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
