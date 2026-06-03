"use client";

import Image from "next/image";
import { getEvents } from "@/lib/mock-data";
import { FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useState } from "react";

export default function EventsPage() {
  const [events] = useState(() => getEvents());
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.events.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row dark:border dark:border-gray-700">
            <div className="relative h-48 md:h-auto md:w-48 shrink-0">
              <Image src={event.img} alt={event.title} fill className="object-cover" />
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">{event.title}</h3>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <FiCalendar size={14} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <FiMapPin size={14} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <FiUsers size={14} />
                  <span>{event.attendees.toLocaleString()} {t.events.attendees}</span>
                </div>
              </div>
              <button className="mt-4 bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                {t.events.interested}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
