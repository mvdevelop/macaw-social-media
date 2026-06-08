"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";
import { FiGlobe, FiArrowLeft, FiClock, FiShare2 } from "react-icons/fi";

// Simulated news articles
const newsArticles = [
  {
    id: 1,
    title: "New Study Reveals Benefits of Digital Detox",
    summary: "Researchers find that taking regular breaks from social media can significantly improve mental health and productivity.",
    source: "Tech Daily",
    time: "2h",
    image: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    category: "Technology",
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement",
    summary: "World leaders commit to ambitious new targets for reducing carbon emissions by 2030.",
    source: "World News",
    time: "4h",
    image: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    category: "World",
  },
  {
    id: 3,
    title: "Revolutionary AI Tool Helps Diagnose Diseases Faster",
    summary: "New artificial intelligence system shows 99% accuracy in detecting early signs of common diseases.",
    source: "Science Today",
    time: "6h",
    image: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    category: "Science",
  },
  {
    id: 4,
    title: "Electric Vehicle Sales Surge Worldwide",
    summary: "EV market share reaches new record high as more consumers switch to sustainable transportation.",
    source: "Auto Weekly",
    time: "8h",
    image: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    category: "Business",
  },
  {
    id: 5,
    title: "Local Artist Wins International Photography Award",
    summary: "Aspiring photographer from the community takes home top prize at prestigious competition.",
    source: "Arts & Culture",
    time: "12h",
    image: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
    category: "Arts",
  },
  {
    id: 6,
    title: "New Space Telescope Captures Breathtaking Galaxy Images",
    summary: "The latest observatory reveals never-before-seen details of distant galaxies and nebulae.",
    source: "Space Explorer",
    time: "1d",
    image: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
    category: "Science",
  },
  {
    id: 7,
    title: "Health Experts Recommend New Exercise Guidelines",
    summary: "Updated fitness recommendations emphasize the importance of strength training and flexibility.",
    source: "Health Plus",
    time: "1d",
    image: "https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg",
    category: "Health",
  },
  {
    id: 8,
    title: "Startup Community Grows with New Innovation Hub Opening",
    summary: "Tech entrepreneurs gain access to state-of-the-art facilities and mentorship programs.",
    source: "Startup Insider",
    time: "2d",
    image: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
    category: "Business",
  },
  {
    id: 9,
    title: "Film Festival Announces Groundbreaking Lineup",
    summary: "This year's festival features record number of debut directors and diverse storytelling.",
    source: "Film Weekly",
    time: "2d",
    image: "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
    category: "Entertainment",
  },
  {
    id: 10,
    title: "Education Reform Bill Passes: What It Means for Students",
    summary: "New legislation brings significant changes to curriculum, testing, and school funding.",
    source: "Education Today",
    time: "3d",
    image: "https://images.pexels.com/photos/35122521/pexels-photo-35122521.jpeg",
    category: "Education",
  },
];

const categories = ["All", "Technology", "World", "Science", "Business", "Arts", "Health", "Entertainment", "Education"];

export default function NewsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
            <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.news.title}</h1>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                cat === "All"
                  ? "bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured article */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden mb-6 cursor-pointer hover:shadow-lg transition">
          <div className="relative h-64 md:h-80">
            <Image src={newsArticles[0].image} alt={newsArticles[0].title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-xs font-semibold text-blue-300 bg-blue-900/50 px-2 py-1 rounded-full">
                {newsArticles[0].category}
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">{newsArticles[0].title}</h2>
              <p className="text-sm text-gray-300 mt-2 line-clamp-2">{newsArticles[0].summary}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                <span>{newsArticles[0].source}</span>
                <FiClock size={12} />
                <span>{newsArticles[0].time} ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsArticles.slice(1).map((article) => (
            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer group">
              <div className="relative h-44">
                <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 dark:text-white">{article.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{article.summary}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-medium text-gray-500 dark:text-gray-400">{article.source}</span>
                    <span>·</span>
                    <span>{article.time} ago</span>
                  </div>
                  <button className="text-gray-400 hover:text-blue-500 transition">
                    <FiShare2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
