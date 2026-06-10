"use client";

import Image from "next/image";
import { getEvents } from "@/lib/mock-data";
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiSearch,
  FiMusic,
  FiMonitor,
  FiCoffee,
  FiActivity,
  FiAperture,
  FiBriefcase,
  FiSmile,
  FiBookOpen,
  FiUsers as FiUsersIcon,
} from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useMemo } from "react";

const CATEGORIES = [
  { key: "all", label: "All", icon: FiCalendar, color: "bg-blue-500" },
  { key: "Music", label: "Music", icon: FiMusic, color: "bg-purple-500" },
  { key: "Tech", label: "Tech", icon: FiMonitor, color: "bg-cyan-500" },
  { key: "Food", label: "Food", icon: FiCoffee, color: "bg-orange-500" },
  { key: "Sports", label: "Sports", icon: FiActivity, color: "bg-green-500" },
  { key: "Arts", label: "Arts", icon: FiAperture, color: "bg-pink-500" },
  { key: "Business", label: "Business", icon: FiBriefcase, color: "bg-indigo-500" },
  { key: "Comedy", label: "Comedy", icon: FiSmile, color: "bg-yellow-500" },
  { key: "Science", label: "Science", icon: FiBookOpen, color: "bg-teal-500" },
  { key: "Family", label: "Family", icon: FiUsersIcon, color: "bg-red-500" },
];

const EVENT_CATEGORY_MAP: Record<number, string> = {
  1: "Music", 2: "Tech", 3: "Arts", 4: "Food", 5: "Business",
  6: "Sports", 7: "Arts", 8: "Food", 9: "Sports", 10: "Sports",
  11: "Arts", 12: "Arts", 13: "Arts", 14: "Sports", 15: "Business",
  16: "Food", 17: "Tech", 18: "Music", 19: "Comedy", 20: "Music",
  21: "Science", 22: "Science", 23: "Food", 24: "Tech",
  25: "Science", 26: "Tech", 27: "Family", 28: "Family",
  29: "Tech", 30: "Science",
};

function getEventCategory(eventId: number): string {
  return EVENT_CATEGORY_MAP[eventId] || "Arts";
}

function getCategoryColor(category: string): string {
  const found = CATEGORIES.find((c) => c.label === category);
  return found ? found.color : "bg-gray-500";
}

function getCategoryTextColor(category: string): string {
  const map: Record<string, string> = {
    Music: "text-purple-600 dark:text-purple-400",
    Tech: "text-cyan-600 dark:text-cyan-400",
    Food: "text-orange-600 dark:text-orange-400",
    Sports: "text-green-600 dark:text-green-400",
    Arts: "text-pink-600 dark:text-pink-400",
    Business: "text-indigo-600 dark:text-indigo-400",
    Comedy: "text-yellow-600 dark:text-yellow-400",
    Science: "text-teal-600 dark:text-teal-400",
    Family: "text-red-600 dark:text-red-400",
  };
  return map[category] || "text-gray-600 dark:text-gray-400";
}

export default function EventsPage() {
  const [events] = useState(() => getEvents());
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const filteredEvents = useMemo(() => {
    return events
      .map((ev) => ({ ...ev, category: getEventCategory(ev.id) }))
      .filter((ev) => {
        if (selectedCategory !== "all" && ev.category !== selectedCategory)
          return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            ev.title.toLowerCase().includes(q) ||
            ev.location.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
  }, [events, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {t.events.title}
        </h1>

        <div className="flex gap-6">
          {/* Sidebar Categories — hidden below lg, horizontal scroll on mobile */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sticky top-24">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Categories
              </h3>
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const count =
                    cat.key === "all"
                      ? events.length
                      : events.filter(
                          (e) => getEventCategory(e.id) === cat.key
                        ).length;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        selectedCategory === cat.key
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${cat.color}`}
                      />
                      <Icon size={15} />
                      <span className="flex-1 text-left">{cat.label}</span>
                      <span className="text-xs text-gray-400">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile categories horizontal scroll */}
          <div className="lg:hidden w-full mb-4 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const count =
                  cat.key === "all"
                    ? events.length
                    : events.filter(
                        (e) => getEventCategory(e.id) === cat.key
                      ).length;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                      selectedCategory === cat.key
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Icon size={13} />
                    {cat.label}
                    <span className="text-[10px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="relative mb-6">
              <FiSearch
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search events by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
              />
            </div>

            {/* Empty state */}
            {filteredEvents.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiCalendar
                    size={32}
                    className="text-gray-300 dark:text-gray-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No events found
                </h3>
                <p className="text-gray-400 dark:text-gray-500 max-w-sm mx-auto">
                  {searchQuery
                    ? "Try adjusting your search or category filter."
                    : "There are no events in this category yet."}
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row dark:border dark:border-gray-700 hover:shadow-lg transition"
                    >
                      <div className="relative h-48 md:h-auto md:w-48 shrink-0">
                        <Image
                          src={event.img}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`text-xs font-semibold text-white px-2.5 py-0.5 rounded-full ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                            {event.title}
                          </h3>
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
                            <span>
                              {event.attendees.toLocaleString()}{" "}
                              {t.events.attendees}
                            </span>
                          </div>
                        </div>
                        <button className="mt-4 bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                          {t.events.interested}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
