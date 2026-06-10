"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { getPosts, getCurrentUser } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import {
  FiImage,
  FiArrowLeft,
  FiFolder,
  FiGrid,
  FiHeart,
  FiClock,
  FiCamera,
  FiChevronRight,
} from "react-icons/fi";

type SidebarView =
  | "all"
  | "albums"
  | "favorites"
  | "recent"
  | "year-2026"
  | "year-2025"
  | "year-2024";

const SIDEBAR_ITEMS: {
  key: SidebarView;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: "all", label: "All Photos", icon: <FiImage size={16} /> },
  { key: "albums", label: "Albums", icon: <FiFolder size={16} /> },
  { key: "favorites", label: "Favorites", icon: <FiHeart size={16} /> },
  { key: "recent", label: "Recently Added", icon: <FiClock size={16} /> },
  { key: "year-2026", label: "Year: 2026", icon: <FiCamera size={16} /> },
  { key: "year-2025", label: "Year: 2025", icon: <FiCamera size={16} /> },
  { key: "year-2024", label: "Year: 2024", icon: <FiCamera size={16} /> },
];

export default function AlbumsPage() {
  const { t } = useTranslation();
  const currentUser = getCurrentUser();
  const [activeView, setActiveView] = useState<SidebarView>("all");
  const [thumbnailSize, setThumbnailSize] = useState<"small" | "large">(
    "large"
  );

  // All posts with images
  const allPostsWithImages = useMemo(
    () => getPosts().filter((p) => p.img),
    []
  );
  const userMedia = useMemo(
    () => allPostsWithImages.filter((p) => p.userId === currentUser.id),
    [currentUser.id, allPostsWithImages]
  );

  // Year groups
  const yearGroups = useMemo(() => {
    const groups: Record<string, typeof allPostsWithImages> = {};
    for (const post of allPostsWithImages) {
      const year = post.createdAt.slice(0, 4);
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    }
    return Object.entries(groups).sort(
      ([a], [b]) => Number(b) - Number(a)
    );
  }, [allPostsWithImages]);

  // Filter photos based on active view
  const visiblePhotos = useMemo(() => {
    switch (activeView) {
      case "all":
        return allPostsWithImages;
      case "albums":
        return []; // handled separately
      case "favorites":
        return allPostsWithImages.filter((p) => p.liked);
      case "recent":
        return allPostsWithImages.slice(0, 48);
      case "year-2026":
        return allPostsWithImages.filter((p) =>
          p.createdAt.startsWith("2026")
        );
      case "year-2025":
        return allPostsWithImages.filter((p) =>
          p.createdAt.startsWith("2025")
        );
      case "year-2024":
        return allPostsWithImages.filter((p) =>
          p.createdAt.startsWith("2024")
        );
      default:
        return allPostsWithImages;
    }
  }, [activeView, allPostsWithImages]);

  // Album groupings by year (for "Albums" view)
  const albumGroups = useMemo(() => {
    return yearGroups.map(([year, photos]) => ({
      name: year,
      cover: photos[0]?.img || "",
      count: photos.length,
    }));
  }, [yearGroups]);

  const showAlbumsGrid = activeView === "albums";
  const showPhotoGrid = !showAlbumsGrid;

  const noPhotos =
    showPhotoGrid && visiblePhotos.length === 0 && !showAlbumsGrid;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <FiArrowLeft
              size={20}
              className="text-gray-600 dark:text-gray-400"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t.albums.title}
          </h1>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sticky top-24">
              <nav className="space-y-1">
                {SIDEBAR_ITEMS.map((item) => {
                  const count =
                    item.key === "all"
                      ? allPostsWithImages.length
                      : item.key === "albums"
                      ? albumGroups.length
                      : item.key === "favorites"
                      ? allPostsWithImages.filter((p) => p.liked).length
                      : item.key === "recent"
                      ? Math.min(allPostsWithImages.length, 48)
                      : item.key === "year-2026"
                      ? allPostsWithImages.filter((p) =>
                          p.createdAt.startsWith("2026")
                        ).length
                      : item.key === "year-2025"
                      ? allPostsWithImages.filter((p) =>
                          p.createdAt.startsWith("2025")
                        ).length
                      : item.key === "year-2024"
                      ? allPostsWithImages.filter((p) =>
                          p.createdAt.startsWith("2024")
                        ).length
                      : 0;

                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setActiveView(item.key);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        activeView === item.key
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <span className="text-current">{item.icon}</span>
                      <span className="flex-1 text-left">{item.label}</span>
                      <span className="text-xs text-gray-400">{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile horizontal scroll sidebar */}
          <div className="lg:hidden w-full mb-4 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {SIDEBAR_ITEMS.map((item) => {
                const count =
                  item.key === "all"
                    ? allPostsWithImages.length
                    : item.key === "albums"
                    ? albumGroups.length
                    : item.key === "favorites"
                    ? allPostsWithImages.filter((p) => p.liked).length
                    : item.key === "recent"
                    ? Math.min(allPostsWithImages.length, 48)
                    : item.key === "year-2026"
                    ? allPostsWithImages.filter((p) =>
                        p.createdAt.startsWith("2026")
                      ).length
                    : item.key === "year-2025"
                    ? allPostsWithImages.filter((p) =>
                        p.createdAt.startsWith("2025")
                      ).length
                    : item.key === "year-2024"
                    ? allPostsWithImages.filter((p) =>
                        p.createdAt.startsWith("2024")
                      ).length
                    : 0;

                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveView(item.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                      activeView === item.key
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    <span className="text-[10px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Thumbnail size toggle (only in photo grid views) */}
            {showPhotoGrid && !noPhotos && (
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {visiblePhotos.length} photo{visiblePhotos.length !== 1 ? "s" : ""}
                </p>
                <div className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-0.5">
                  <button
                    onClick={() => setThumbnailSize("small")}
                    className={`p-1.5 rounded-md transition ${
                      thumbnailSize === "small"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                    title="Small thumbnails"
                  >
                    <FiGrid size={15} />
                  </button>
                  <button
                    onClick={() => setThumbnailSize("large")}
                    className={`p-1.5 rounded-md transition ${
                      thumbnailSize === "large"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                    title="Large thumbnails"
                  >
                    <FiCamera size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* ALBUMS VIEW */}
            {showAlbumsGrid && (
              <>
                {albumGroups.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
                    <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <FiFolder
                        size={36}
                        className="text-gray-300 dark:text-gray-500"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      No albums yet
                    </h3>
                    <p className="text-gray-400 dark:text-gray-500">
                      {t.albums.empty}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {albumGroups.map((album) => (
                      <div
                        key={album.name}
                        onClick={() =>
                          setActiveView(
                            `year-${album.name}` as SidebarView
                          )
                        }
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group cursor-pointer"
                      >
                        <div className="relative h-36">
                          {album.cover ? (
                            <Image
                              src={album.cover}
                              alt={album.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover group-hover:scale-105 transition duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <FiImage
                                size={40}
                                className="text-gray-300 dark:text-gray-600"
                              />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="flex items-center gap-2 text-white">
                              <FiFolder size={16} />
                              <span className="font-semibold text-sm">
                                {album.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {album.count} {t.albums.photos}
                          </p>
                          <FiChevronRight
                            size={14}
                            className="text-gray-300 dark:text-gray-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* PHOTO VIEWS (all, favorites, recent, year-*) */}
            {noPhotos && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiImage
                    size={36}
                    className="text-gray-300 dark:text-gray-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No photos here
                </h3>
                <p className="text-gray-400 dark:text-gray-500">
                  {activeView === "favorites"
                    ? "You haven't liked any photos yet."
                    : "No photos available in this view."}
                </p>
              </div>
            )}

            {showPhotoGrid && visiblePhotos.length > 0 && (
              <div
                className={
                  thumbnailSize === "large"
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                    : "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2"
                }
              >
                {visiblePhotos.slice(0, 200).map((post) => (
                  <div
                    key={post.id}
                    className={`relative rounded-lg overflow-hidden group ${
                      thumbnailSize === "large"
                        ? "aspect-square"
                        : "aspect-square"
                    }`}
                  >
                    <Image
                      src={post.img!}
                      alt=""
                      fill
                      sizes={
                        thumbnailSize === "large"
                          ? "(max-width: 768px) 50vw, 25vw"
                          : "(max-width: 768px) 33vw, 16vw"
                      }
                      className="object-cover hover:scale-110 transition duration-300"
                    />
                    {post.liked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <FiHeart size={12} className="text-white fill-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Show Recent Photos as a section at bottom when in "all" view */}
            {activeView === "all" && allPostsWithImages.length > 48 && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    Recent Photos
                  </h2>
                  <button
                    onClick={() => setActiveView("recent")}
                    className="text-sm text-blue-500 hover:text-blue-600 transition"
                  >
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {allPostsWithImages.slice(0, 12).map((post) => (
                    <div
                      key={post.id}
                      className="relative aspect-square rounded-lg overflow-hidden"
                    >
                      <Image
                        src={post.img!}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover hover:scale-110 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
