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
  {
    title: "Major Cryptocurrency Reaches All-Time High",
    description: "Bitcoin and Ethereum lead the rally as institutional adoption accelerates across global markets.",
    url: "https://news.google.com",
    source: "Crypto Insider",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35291387/pexels-photo-35291387.jpeg",
    category: "business",
  },
  {
    title: "NASA Announces New Mission to Jupiter's Moon",
    description: "The Europa Clipper mission will search for signs of life beneath the icy surface of Europa.",
    url: "https://news.google.com",
    source: "Space Today",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
    category: "science",
  },
  {
    title: "Breakthrough in Quantum Computing Achieved",
    description: "Scientists have successfully demonstrated a quantum processor with 1000+ qubits, a major milestone.",
    url: "https://news.google.com",
    source: "Physics World",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
    category: "technology",
  },
  {
    title: "Premier League Transfer Window Breaks Records",
    description: "Clubs spent over £2 billion this summer as top talents move between Europe's biggest teams.",
    url: "https://news.google.com",
    source: "Sports Net",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
    category: "sports",
  },
  {
    title: "Olympic Committee Announces 2032 Host City",
    description: "Brisbane prepares to welcome the world as the official host of the 2032 Summer Olympics.",
    url: "https://news.google.com",
    source: "Olympic Review",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    category: "sports",
  },
  {
    title: "Hollywood Writers' Strike Ends After 148 Days",
    description: "Studios and writers reach a landmark deal addressing AI use and streaming residuals.",
    url: "https://news.google.com",
    source: "Entertainment Weekly",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35538741/pexels-photo-35538741.jpeg",
    category: "general",
  },
  {
    title: "World Population Reaches 9 Billion",
    description: "Demographers note population growth is slowing but regional disparities remain significant.",
    url: "https://news.google.com",
    source: "Global Times",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    category: "world",
  },
  {
    title: "New Renewable Energy Record Set in Europe",
    description: "Wind and solar generated 40% of EU electricity for the first time this spring.",
    url: "https://news.google.com",
    source: "Green Energy Journal",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    category: "world",
  },
  {
    title: "5G Networks Now Cover 90% of Urban Areas",
    description: "Major carriers complete the nationwide rollout, bringing faster speeds to millions.",
    url: "https://news.google.com",
    source: "Telecom Review",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35291387/pexels-photo-35291387.jpeg",
    category: "technology",
  },
  {
    title: "Archaeologists Discover Ancient City in the Amazon",
    description: "LiDAR technology reveals a lost civilization's urban center beneath dense rainforest canopy.",
    url: "https://news.google.com",
    source: "History Today",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    category: "science",
  },
  {
    title: "Global Food Prices Drop for Third Consecutive Month",
    description: "FAO reports decrease in cereal and vegetable oil prices, offering relief to consumers worldwide.",
    url: "https://news.google.com",
    source: "Economic Times",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
    category: "business",
  },
  {
    title: "New Treatment Shows Promise for Alzheimer's Disease",
    description: "Clinical trials reveal a drug that slows cognitive decline by up to 60% in early-stage patients.",
    url: "https://news.google.com",
    source: "Medical Journal",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    category: "science",
  },
  {
    title: "Tennis Star Announces Retirement After 20 Years",
    description: "The former world number one will retire at the end of the season after a legendary career.",
    url: "https://news.google.com",
    source: "Sports Illustrated",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
    category: "sports",
  },
  {
    title: "Major Tech Merger Shakes Silicon Valley",
    description: "Two of the biggest names in AI are joining forces in a $45 billion deal that redefines the industry.",
    url: "https://news.google.com",
    source: "Silicon Beat",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
    category: "business",
  },
  {
    title: "Japan Launches World's First Wooden Satellite",
    description: "The environmentally friendly satellite aims to reduce space debris and inspire sustainable engineering.",
    url: "https://news.google.com",
    source: "Space News",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg",
    category: "technology",
  },
  {
    title: "Record-Breaking Heatwave Affects Southern Europe",
    description: "Temperatures exceed 45°C in several countries, prompting health warnings and travel disruptions.",
    url: "https://news.google.com",
    source: "Weather Channel",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    category: "world",
  },
  {
    title: "Award-Winning Film Breaks Box Office Records",
    description: "The critically acclaimed drama becomes the highest-grossing independent film of all time.",
    url: "https://news.google.com",
    source: "Screen Daily",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35538741/pexels-photo-35538741.jpeg",
    category: "general",
  },
  {
    title: "Universal Basic Income Pilot Shows Promising Results",
    description: "Two-year study finds recipients report improved mental health and increased entrepreneurial activity.",
    url: "https://news.google.com",
    source: "Policy Review",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    category: "world",
  },
  {
    title: "Deep Sea Expedition Discovers New Marine Species",
    description: "Over 30 previously unknown species found in the unexplored depths of the Pacific Ocean.",
    url: "https://news.google.com",
    source: "Oceanographic",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    category: "science",
  },
  {
    title: "Electric Airplane Completes First Commercial Flight",
    description: "The short-haul route marks the beginning of a new era in sustainable aviation.",
    url: "https://news.google.com",
    source: "Aviation Weekly",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35291387/pexels-photo-35291387.jpeg",
    category: "technology",
  },
  {
    title: "Chess Grandmaster Breaks World Record",
    description: "The 19-year-old prodigy achieves the highest Elo rating in history after an undefeated tournament run.",
    url: "https://news.google.com",
    source: "Game Theory",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
    category: "sports",
  },
  {
    title: "World's Largest Vertical Farm Opens in Singapore",
    description: "The 30-story facility can produce 500 tons of vegetables annually using 95% less water.",
    url: "https://news.google.com",
    source: "Food Future",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
    category: "general",
  },
  {
    title: "Endangered Species Makes Remarkable Comeback",
    description: "Conservation efforts pay off as the population of the once nearly-extinct species triples in a decade.",
    url: "https://news.google.com",
    source: "Wildlife Trust",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg",
    category: "world",
  },
  {
    title: "New High-Speed Rail Connects Three Countries",
    description: "The cross-border line cuts travel time from 8 hours to just 2.5 hours between capitals.",
    url: "https://news.google.com",
    source: "Transport Today",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    category: "technology",
  },
  {
    title: "Researchers Develop Plastic That Biodegrades in 30 Days",
    description: "The plant-based material could revolutionize packaging and help solve the plastic pollution crisis.",
    url: "https://news.google.com",
    source: "Materials Science",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    category: "science",
  },
  {
    title: "Global E-Sports Viewership Surpasses Traditional Sports",
    description: "Over 600 million viewers tuned in for the biggest gaming tournament of the year.",
    url: "https://news.google.com",
    source: "E-Sports Insider",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
    category: "sports",
  },
  {
    title: "Major City Becomes Fully Carbon Neutral",
    description: "The capital city achieved its net-zero goal five years ahead of schedule through green policies.",
    url: "https://news.google.com",
    source: "Green Cities",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
    category: "world",
  },
  {
    title: "Social Media Platform Introduces End-to-End Encryption",
    description: "The update affects billions of users and represents a major shift in online privacy standards.",
    url: "https://news.google.com",
    source: "Tech Radar",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    category: "technology",
  },
  {
    title: "Innovative Desalination Plant Provides Fresh Water to Drought Region",
    description: "Solar-powered facility now supplies 50 million gallons of clean water daily to the arid region.",
    url: "https://news.google.com",
    source: "Water Solutions",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    category: "science",
  },
  {
    title: "World's Oldest Known Painting Found in Indonesian Cave",
    description: "The 45,000-year-old depiction of wild pigs challenges previous timelines of human artistic expression.",
    url: "https://news.google.com",
    source: "Archaeology Today",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    category: "general",
  },
  {
    title: "Robotic Exoskeleton Helps Paralyzed Patients Walk Again",
    description: "New lightweight design powered by AI adapts to each user's unique movement patterns.",
    url: "https://news.google.com",
    source: "Medical Innovation",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    category: "science",
  },
  {
    title: "International Space Station Celebrates 30 Years",
    description: "A look back at three decades of scientific discovery and international collaboration in orbit.",
    url: "https://news.google.com",
    source: "Space Chronicle",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
    category: "science",
  },
  {
    title: "Guitar Legend Announces Farewell World Tour",
    description: "The iconic musician will perform in 50 cities across 6 continents for one last tour.",
    url: "https://news.google.com",
    source: "Music Weekly",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
    category: "general",
  },
  {
    title: "World Hunger Rates Fall to Historic Low",
    description: "UN report shows global hunger has decreased by 60% over the past two decades thanks to coordinated aid.",
    url: "https://news.google.com",
    source: "Development News",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
    category: "world",
  },
  {
    title: "Augmented Reality Glasses Go Mainstream",
    description: "The latest AR glasses weigh just 80 grams and offer all-day battery life for everyday use.",
    url: "https://news.google.com",
    source: "Gadget Review",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35291387/pexels-photo-35291387.jpeg",
    category: "technology",
  },
  {
    title: "Marathon Runner Completes 100th Race at Age 80",
    description: "Inspiring athlete proves age is just a number, finishing her 100th marathon in under 5 hours.",
    url: "https://news.google.com",
    source: "Running World",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
    category: "sports",
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
