"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";
import { FiGlobe, FiArrowLeft, FiClock, FiExternalLink, FiRefreshCw } from "react-icons/fi";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  urlToImage: string | null;
  category: string;
}

// Fallback curated news (usadas quando a API não responde)
const fallbackNews: NewsArticle[] = [
  {
    title: "New Study Reveals Benefits of Digital Detox",
    description: "Researchers find that taking regular breaks from social media can significantly improve mental health and productivity.",
    url: "https://news.google.com",
    source: "Tech Daily",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    category: "technology",
  },
  {
    title: "Global Climate Summit Reaches Historic Agreement",
    description: "World leaders commit to ambitious new targets for reducing carbon emissions by 2030.",
    url: "https://news.google.com",
    source: "World News",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    category: "world",
  },
  {
    title: "Revolutionary AI Tool Helps Diagnose Diseases Faster",
    description: "New artificial intelligence system shows 99% accuracy in detecting early signs of common diseases.",
    url: "https://news.google.com",
    source: "Science Today",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    category: "science",
  },
  {
    title: "Electric Vehicle Sales Surge Worldwide",
    description: "EV market share reaches new record high as more consumers switch to sustainable transportation.",
    url: "https://news.google.com",
    source: "Auto Weekly",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    category: "business",
  },
];

// RSS feeds de fontes de notícias gratuitas
const RSS_FEEDS = [
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", source: "New York Times", category: "general" },
  { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC News", category: "general" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", source: "NYT Tech", category: "technology" },
  { url: "https://feeds.bbci.co.uk/news/technology/rss.xml", source: "BBC Tech", category: "technology" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", source: "NYT World", category: "world" },
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC World", category: "world" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Science.xml", source: "NYT Science", category: "science" },
  { url: "https://feeds.bbci.co.uk/news/business/rss.xml", source: "BBC Business", category: "business" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml", source: "NYT Business", category: "business" },
  { url: "https://feeds.bbci.co.uk/sport/rss.xml", source: "BBC Sport", category: "sports" },
];

const categories = ["All", "general", "technology", "world", "science", "business", "sports"];

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffHrs = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  if (diffHrs < 1) return `${Math.floor((now.getTime() - date.getTime()) / (1000 * 60))}m`;
  if (diffHrs < 24) return `${diffHrs}h`;
  return `${Math.floor(diffHrs / 24)}d`;
}

export default function NewsPage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      // Tenta converter RSS para JSON via rss2json (serviço gratuito)
      const results = await Promise.allSettled(
        RSS_FEEDS.map(async (feed) => {
          const res = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`,
            { cache: "no-store" }
          );
          if (!res.ok) throw new Error(`Failed: ${feed.source}`);
          const data = await res.json();
          if (data.status !== "ok") throw new Error(`RSS error: ${data.message}`);

          return (data.items || []).slice(0, 5).map((item: any) => ({
            title: item.title || "Untitled",
            description: item.description?.replace(/<[^>]*>/g, "").slice(0, 200) || "",
            url: item.link || feed.url,
            source: feed.source,
            publishedAt: item.pubDate || new Date().toISOString(),
            urlToImage: item.thumbnail || item.enclosure?.link || null,
            category: feed.category,
          }));
        })
      );

      const allArticles: NewsArticle[] = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          allArticles.push(...result.value);
        }
      }

      if (allArticles.length > 0) {
        // Deduplica por título e ordena por data
        const seen = new Set<string>();
        const unique = allArticles.filter((a) => {
          const key = a.title.slice(0, 50);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        setArticles(unique.slice(0, 50));
      } else {
        setArticles(fallbackNews);
      }
    } catch (err) {
      console.error("News fetch error:", err);
      setArticles(fallbackNews);
      setError("Could not fetch live news. Showing curated stories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const featured = filtered[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
              <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.news.title}</h1>
            <FiGlobe size={20} className="text-blue-500" />
          </div>
          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition disabled:opacity-50"
          >
            <FiRefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg text-sm text-yellow-700 dark:text-yellow-300">
            {error}
          </div>
        )}

        {/* Category filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                cat === activeCategory
                  ? "bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
              }`}
            >
              {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md h-80 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md h-64 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden mb-6 hover:shadow-lg transition group"
              >
                <div className="relative h-64 md:h-80">
                  {featured.urlToImage ? (
                    <Image src={featured.urlToImage} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-[1.02] transition duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                      <FiGlobe size={48} className="text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-blue-300 bg-blue-900/50 px-2 py-1 rounded-full">
                        {featured.category}
                      </span>
                      <span className="text-xs text-gray-400">{featured.source}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{featured.title}</h2>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">{featured.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                      <FiClock size={12} />
                      <span>{timeAgo(featured.publishedAt)} ago</span>
                      <FiExternalLink size={12} className="ml-2" />
                      <span>Open</span>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* News grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.slice(1).map((article, index) => (
                <a
                  key={`${article.url}-${index}`}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="relative h-44">
                    {article.urlToImage ? (
                      <Image src={article.urlToImage} alt={article.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                        <FiGlobe size={32} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 dark:text-white line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="font-medium text-gray-500 dark:text-gray-400">{article.source}</span>
                        <span>·</span>
                        <span>{timeAgo(article.publishedAt)} ago</span>
                      </div>
                      <FiExternalLink size={14} className="text-gray-400 group-hover:text-blue-500 transition" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg">No news in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
