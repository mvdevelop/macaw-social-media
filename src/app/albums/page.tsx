"use client";

import Image from "next/image";
import Link from "next/link";
import { getPosts, getCurrentUser } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { FiImage, FiArrowLeft } from "react-icons/fi";

export default function AlbumsPage() {
  const { t } = useTranslation();
  const currentUser = getCurrentUser();

  // Get posts with images (grouped by month/year as "albums")
  const allPostsWithImages = getPosts().filter(p => p.img);
  const userMedia = allPostsWithImages.filter(p => p.userId === currentUser.id);

  // Create album groupings
  const albums = [
    { name: "All Photos", cover: userMedia[0]?.img || allPostsWithImages[0]?.img || "", count: userMedia.length },
    { name: "2026", cover: allPostsWithImages.find(p => p.createdAt.startsWith("2026"))?.img || "", count: allPostsWithImages.filter(p => p.createdAt.startsWith("2026")).length },
    { name: "2025", cover: allPostsWithImages.find(p => p.createdAt.startsWith("2025"))?.img || "", count: allPostsWithImages.filter(p => p.createdAt.startsWith("2025")).length },
    { name: "Recent Uploads", cover: allPostsWithImages[0]?.img || "", count: Math.min(allPostsWithImages.length, 50) },
  ].filter(a => a.count > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
            <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.albums.title}</h1>
        </div>

        {albums.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
            <FiImage size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-400 dark:text-gray-500">{t.albums.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((album) => (
              <div key={album.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group cursor-pointer">
                <div className="relative h-44">
                  {album.cover ? (
                    <Image src={album.cover} alt={album.name} fill className="object-cover group-hover:scale-105 transition duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <FiImage size={40} className="text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 dark:text-white">{album.name}</h3>
                  <p className="text-sm text-gray-400">{album.count} {t.albums.photos}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent photos grid */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-10 mb-4">Recent Photos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {allPostsWithImages.slice(0, 24).map((post) => (
            <div key={post.id} className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={post.img!} alt="" fill className="object-cover hover:scale-110 transition duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
