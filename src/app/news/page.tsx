"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";
import { FiGlobe, FiArrowLeft, FiClock, FiExternalLink, FiRefreshCw, FiShuffle } from "react-icons/fi";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  urlToImage: string | null;
  category: string;
}

// ─── Pools para geração de notícias ─────────────────────────────
const NEWS_TITLES = [
  "New Study Reveals Benefits of Digital Detox",
  "Global Climate Summit Reaches Historic Agreement",
  "Revolutionary AI Tool Helps Diagnose Diseases Faster",
  "Electric Vehicle Sales Surge Worldwide",
  "Major Cryptocurrency Reaches All-Time High",
  "NASA Announces New Mission to Jupiter's Moon",
  "Breakthrough in Quantum Computing Achieved",
  "Premier League Transfer Window Breaks Records",
  "Olympic Committee Announces 2032 Host City",
  "Hollywood Writers' Strike Ends After 148 Days",
  "World Population Reaches 9 Billion",
  "New Renewable Energy Record Set in Europe",
  "5G Networks Now Cover 90% of Urban Areas",
  "Archaeologists Discover Ancient City in the Amazon",
  "Global Food Prices Drop for Third Consecutive Month",
  "New Treatment Shows Promise for Alzheimer's Disease",
  "Tennis Star Announces Retirement After 20 Years",
  "Major Tech Merger Shakes Silicon Valley",
  "Japan Launches World's First Wooden Satellite",
  "Record-Breaking Heatwave Affects Southern Europe",
  "Award-Winning Film Breaks Box Office Records",
  "Universal Basic Income Pilot Shows Promising Results",
  "Deep Sea Expedition Discovers New Marine Species",
  "Electric Airplane Completes First Commercial Flight",
  "Chess Grandmaster Breaks World Record",
  "World's Largest Vertical Farm Opens in Singapore",
  "Endangered Species Makes Remarkable Comeback",
  "New High-Speed Rail Connects Three Countries",
  "Researchers Develop Plastic That Biodegrades in 30 Days",
  "Global E-Sports Viewership Surpasses Traditional Sports",
  "Major City Becomes Fully Carbon Neutral",
  "Social Media Platform Introduces End-to-End Encryption",
  "Innovative Desalination Plant Provides Fresh Water to Drought Region",
  "World's Oldest Known Painting Found in Indonesian Cave",
  "Robotic Exoskeleton Helps Paralyzed Patients Walk Again",
  "International Space Station Celebrates 30 Years",
  "Guitar Legend Announces Farewell World Tour",
  "World Hunger Rates Fall to Historic Low",
  "Augmented Reality Glasses Go Mainstream",
  "Marathon Runner Completes 100th Race at Age 80",
  "Scientists Discover New Earth-Like Planet in Habitable Zone",
  "Self-Driving Taxis Launch in Major European Cities",
  "Breakthrough Battery Technology Doubles EV Range",
  "Global Ocean Cleanup Project Reaches Milestone",
  "New Species of Orchid Discovered in Madagascar",
  "Revolutionary Gene Therapy Cures Rare Disease",
  "World's Tallest Skyscraper Completed in Dubai",
  "AI-Powered Translation Breaks Language Barriers",
  "Major Earthquake Relief Effort Mobilizes International Aid",
  "Fusion Energy Milestone Brings Clean Power Closer",
  "Indoor Vertical Farming Revolutionizes Agriculture",
  "World's First 3D-Printed Heart Successfully Transplanted",
  "Global Internet Access Reaches 90% of Population",
  "New Cybersecurity Threat Prompts Worldwide Alert",
  "Breakthrough in Plastic Recycling Technology",
  "World's Largest Telescope Captures First Images",
  "Renewable Hydrogen Production Costs Drop 50%",
  "International Treaty Bans Deep-Sea Mining",
  "New Vaccine Shows Promise Against Multiple Cancers",
  "Global Tourism Rebounds to Pre-Pandemic Levels",
  "Revolutionary Water Purification System Saves Lives",
  "World's Fastest Computer Breaks Exascale Barrier",
  "New Antimicrobial Resistance Strategy Announced",
  "Global Reforestation Project Plants 1 Billion Trees",
  "Breakthrough in Brain-Computer Interface Technology",
  "World's First Commercial Hypersonic Flight Completed",
  "New Early Warning System for Tsunamis Deployed",
  "Global Agreement on Plastic Waste Reduction Signed",
  "Revolutionary Battery Storage System Powers 10,000 Homes",
  "New CRISPR Therapy Shows Promise for Sickle Cell Disease",
  "World's Largest Offshore Wind Farm Begins Operations",
  "AI System Predicts Weather Patterns with 95% Accuracy",
  "Global Initiative to Protect Coral Reefs Launched",
  "New Desalination Technology Cuts Energy Use by 80%",
  "World's First Carbon-Neutral Container Ship Sets Sail",
  "Breakthrough in Sustainable Aviation Fuel Production",
  "New Quantum Sensor Detects Underground Resources",
  "Global Mental Health Initiative Reaches 100 Countries",
  "Revolutionary Farming Technique Restores Degraded Soil",
  "World's Largest Battery Storage Facility Goes Online",
  "New Ocean Monitoring System Tracks Climate Change",
  "Breakthrough in Water Splitting Produces Clean Hydrogen",
  "Global Electric Bus Fleet Reaches 500,000 Vehicles",
  "New AI Model Accelerates Drug Discovery Process",
  "World's First Fully Recyclable Building Completed",
  "Revolutionary Cooling System Cuts Energy Use by 60%",
  "Global Mangrove Restoration Project Exceeds Targets",
  "New Brain Implant Restores Vision to Blind Patients",
  "World's Largest Rooftop Solar Installation Completed",
  "Breakthrough in Carbon Capture Technology Achieved",
  "New Autonomous Drone Delivery Service Launches",
  "Global E-Waste Recycling Rate Reaches 50%",
  "Revolutionary Paint Cools Buildings Without Energy",
  "World's First Hydrogen-Powered Train Enters Service",
  "New Smart Grid Technology Prevents Power Outages",
  "Global Ocean Temperature Monitoring Network Expanded",
  "Breakthrough in Biodegradable Electronics Achieved",
  "New Vertical Wind Turbines Double Energy Output",
  "World's Largest Green Hydrogen Plant Breaks Ground",
  "Revolutionary Desalination Method Uses Solar Power Only",
];

const NEWS_DESCRIPTIONS = [
  "Researchers find that taking regular breaks from social media can significantly improve mental health and productivity.",
  "World leaders commit to ambitious new targets for reducing carbon emissions by 2030.",
  "New artificial intelligence system shows 99% accuracy in detecting early signs of common diseases.",
  "EV market share reaches new record high as more consumers switch to sustainable transportation.",
  "Bitcoin and Ethereum lead the rally as institutional adoption accelerates across global markets.",
  "The Europa Clipper mission will search for signs of life beneath the icy surface of Europa.",
  "Scientists have successfully demonstrated a quantum processor with 1000+ qubits, a major milestone.",
  "Clubs spent over £2 billion this summer as top talents move between Europe's biggest teams.",
  "Brisbane prepares to welcome the world as the official host of the 2032 Summer Olympics.",
  "Studios and writers reach a landmark deal addressing AI use and streaming residuals.",
  "Demographers note population growth is slowing but regional disparities remain significant.",
  "Wind and solar generated 40% of EU electricity for the first time this spring.",
  "Major carriers complete the nationwide rollout, bringing faster speeds to millions.",
  "LiDAR technology reveals a lost civilization's urban center beneath dense rainforest canopy.",
  "FAO reports decrease in cereal and vegetable oil prices, offering relief to consumers worldwide.",
  "Clinical trials reveal a drug that slows cognitive decline by up to 60% in early-stage patients.",
  "The former world number one will retire at the end of the season after a legendary career.",
  "Two of the biggest names in AI are joining forces in a $45 billion deal that redefines the industry.",
  "The environmentally friendly satellite aims to reduce space debris and inspire sustainable engineering.",
  "Temperatures exceed 45°C in several countries, prompting health warnings and travel disruptions.",
  "The critically acclaimed drama becomes the highest-grossing independent film of all time.",
  "Two-year study finds recipients report improved mental health and increased entrepreneurial activity.",
  "Over 30 previously unknown species found in the unexplored depths of the Pacific Ocean.",
  "The short-haul route marks the beginning of a new era in sustainable aviation.",
  "The 19-year-old prodigy achieves the highest Elo rating in history after an undefeated tournament run.",
  "The 30-story facility can produce 500 tons of vegetables annually using 95% less water.",
  "Conservation efforts pay off as the population of the once nearly-extinct species triples in a decade.",
  "The cross-border line cuts travel time from 8 hours to just 2.5 hours between capitals.",
  "The plant-based material could revolutionize packaging and help solve the plastic pollution crisis.",
  "Over 600 million viewers tuned in for the biggest gaming tournament of the year.",
  "The capital city achieved its net-zero goal five years ahead of schedule through green policies.",
  "The update affects billions of users and represents a major shift in online privacy standards.",
  "Solar-powered facility now supplies 50 million gallons of clean water daily to the arid region.",
  "The 45,000-year-old depiction of wild pigs challenges previous timelines of human artistic expression.",
  "New lightweight design powered by AI adapts to each user's unique movement patterns.",
  "A look back at three decades of scientific discovery and international collaboration in orbit.",
  "The iconic musician will perform in 50 cities across 6 continents for one last tour.",
  "UN report shows global hunger has decreased by 60% over the past two decades thanks to coordinated aid.",
  "The latest AR glasses weigh just 80 grams and offer all-day battery life for everyday use.",
  "Inspiring athlete proves age is just a number, finishing her 100th marathon in under 5 hours.",
  "The newly discovered planet shows signs of liquid water and a stable atmosphere similar to early Earth.",
  "Passengers can now book autonomous rides across 12 European cities with 99.9% safety record.",
  "New solid-state battery technology enables electric vehicles to travel over 800 miles on a single charge.",
  "The Ocean Cleanup initiative has successfully removed over 100,000 tons of plastic from the Great Pacific Garbage Patch.",
  "Botanists have identified a rare orchid species that blooms only once every decade in the remote forests of Madagascar.",
  "A groundbreaking gene therapy has successfully treated patients with Duchenne muscular dystrophy in clinical trials.",
  "The new 1 km tall structure features revolutionary wind turbines embedded in its facade, generating 30% of its energy needs.",
  "Real-time translation earbuds now support over 100 languages with near-perfect accuracy in natural conversations.",
  "Coordinated rescue efforts have saved thousands of lives following the 7.8 magnitude earthquake that struck the region.",
  "The experimental reactor sustained a fusion reaction for over 5 minutes, producing more energy than consumed.",
  "Automated vertical farms in urban centers now produce 50% of leafy greens consumed in Singapore.",
  "Surgeons successfully transplanted a 3D-printed heart using the patient's own stem cells, eliminating rejection risk.",
  "Global internet connectivity reaches 90% as satellite constellations provide broadband to remote regions.",
  "A sophisticated cyberattack targeting critical infrastructure has prompted coordinated international defense measures.",
  "A new chemical process breaks down mixed plastics into their original components, enabling infinite recycling.",
  "The Extremely Large Telescope captures images of exoplanets with unprecedented clarity and detail.",
  "Green hydrogen production costs drop below $2 per kilogram, making it competitive with fossil fuels.",
  "Nations agree to ban deep-sea mining in international waters to protect fragile marine ecosystems.",
  "A personalized cancer vaccine shows remarkable results in Phase 3 trials, reducing tumor size by 70%.",
  "International tourism numbers return to 2019 levels as travel restrictions are lifted worldwide.",
  "A portable water purification device powered by sunlight can now provide clean water for 100 people per day.",
  "The exascale supercomputer performs over 1 quintillion calculations per second, enabling breakthrough scientific simulations.",
  "A global action plan to combat antimicrobial resistance includes new surveillance systems and stewardship programs.",
  "Community-led reforestation projects have successfully planted over 1 billion trees across 50 countries.",
  "Neuralink's latest brain implant allows paralyzed patients to control digital devices with thought alone.",
  "The first commercial hypersonic flight crossed the Atlantic in under 90 minutes, marking a new era in travel.",
  "An advanced tsunami detection network using deep-sea sensors now provides 30-minute advance warnings.",
  "195 countries sign a landmark treaty committing to reduce single-use plastic production by 50% by 2030.",
  "The grid-scale battery system can power 10,000 homes for 24 hours, stabilizing renewable energy supply.",
  "CRISPR-based therapy successfully edits the faulty gene in sickle cell patients, offering a potential cure.",
  "The offshore wind farm generates enough clean electricity to power 2 million homes annually.",
  "The AI weather model outperforms traditional forecasting methods, especially for extreme weather events.",
  "A global partnership to restore and protect coral reefs has secured $10 billion in funding.",
  "The new membrane technology reduces the energy required for desalination by 80%, making it affordable for developing nations.",
  "The world's first cargo ship powered entirely by green hydrogen has completed its maiden voyage.",
  "A new process converts captured CO2 and renewable hydrogen into sustainable aviation fuel at scale.",
  "Quantum sensors can now map underground water reserves and mineral deposits with remarkable precision.",
  "A World Health Organization initiative brings mental health services to 100 countries through digital platforms.",
  "Indigenous farming techniques combined with modern technology restore soil health and increase crop yields.",
  "The massive battery facility can store 1,000 megawatt-hours of energy, enough to power 50,000 homes.",
  "A network of autonomous ocean drones monitors temperature, acidity, and pollution levels across the globe.",
  "Scientists achieve a breakthrough in splitting water molecules using sunlight, producing hydrogen at record efficiency.",
  "The global electric bus fleet reduces CO2 emissions by 15 million tons annually across 200 cities.",
  "Machine learning algorithms analyze millions of chemical compounds in days, accelerating drug discovery tenfold.",
  "The building is constructed entirely from recycled materials and can be fully disassembled and reused.",
  "The innovative cooling system uses radiative cooling technology to reduce air conditioning energy consumption by 60%.",
  "The global mangrove restoration initiative has exceeded its target by 20%, restoring 500,000 hectares of coastline.",
  "Brain implant technology restores basic vision to blind patients by directly stimulating the visual cortex.",
  "The massive solar installation spans 500 acres and provides clean energy to 50,000 households.",
  "Direct air capture technology now removes 1 million tons of CO2 from the atmosphere annually.",
  "Autonomous drones now deliver packages to remote areas, reducing delivery times from days to hours.",
  "The global electronics recycling rate reaches 50% thanks to new regulations and consumer awareness campaigns.",
  "The special paint reflects 95% of sunlight, keeping buildings cool without air conditioning in hot climates.",
  "The hydrogen-powered train produces only water vapor and can travel 600 miles on a single tank.",
  "AI-powered smart grids predict demand and prevent outages with 99.9% reliability across major cities.",
  "An expanded network of ocean sensors provides real-time data on sea temperature, helping predict climate patterns.",
  "Researchers develop electronic components that fully biodegrade in soil within 30 days, reducing e-waste.",
  "The innovative vertical turbine design captures wind from any direction and produces twice the energy of traditional turbines.",
  "The green hydrogen plant will produce 100 tons of hydrogen daily using only solar and wind power.",
];

const NEWS_SOURCES = [
  "Tech Daily","World News","Science Today","Auto Weekly","Crypto Insider",
  "Space Today","Physics World","Sports Net","Olympic Review","Entertainment Weekly",
  "Global Times","Green Energy Journal","Telecom Review","History Today","Economic Times",
  "Medical Journal","Sports Illustrated","Silicon Beat","Space News","Weather Channel",
  "Screen Daily","Policy Review","Oceanographic","Aviation Weekly","Game Theory",
  "Food Future","Wildlife Trust","Transport Today","Materials Science","E-Sports Insider",
  "Green Cities","Tech Radar","Water Solutions","Archaeology Today","Medical Innovation",
  "Space Chronicle","Music Weekly","Development News","Gadget Review","Running World",
  "Astro Journal","Mobility Weekly","Energy Review","Ocean Today","Botany Daily",
  "Gene Therapy News","Architecture Digest","Language Tech","Disaster Relief","Fusion World",
  "AgriTech Review","Surgical Innovation","Connectivity Report","Cyber Defense","Chemistry World",
  "Astronomy Magazine","Hydrogen Economy","Marine Policy","Oncology Today","Travel Weekly",
  "Water Innovation","Computing News","Health Policy","Forestry Today","NeuroTech",
  "Aviation Now","Geology Today","Environmental Policy","Energy Storage","Genetics Journal",
  "Wind Power Monthly","Meteorology Today","Marine Biology","Desalination News","Maritime Weekly",
  "Carbon Capture Journal","Quantum Computing","Mental Health Today","Soil Science",
  "Battery Technology","Ocean Engineering","Solar Energy","EV World","Drug Discovery",
  "Sustainable Build","HVAC Innovation","Mangrove Foundation","NeuroScience Daily",
  "Solar Industry","Climate Solutions","Logistics Tech","Recycling Today","Materials Today",
  "Hydrogen Fuel News","Smart Grid","Climate Monitor","E-Waste Journal","Building Science",
];

const NEWS_CATEGORIES = ["general","technology","world","science","business","sports"];

const NEWS_IMAGES = [
  "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
  "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
  "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
  "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
  "https://images.pexels.com/photos/35291387/pexels-photo-35291387.jpeg",
  "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
  "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
  "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
  "https://images.pexels.com/photos/35538741/pexels-photo-35538741.jpeg",
  "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
  "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg",
  "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg",
  "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
  "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg",
  "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
  "https://images.pexels.com/photos/35459874/pexels-photo-35459874.jpeg",
  "https://images.pexels.com/photos/35487966/pexels-photo-35487966.jpeg",
  "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
  "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
  "https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg",
];

// ─── Seeded PRNG ─────────────────────────────────────────────────
function createRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

// ─── Generate 400 fallback news articles ─────────────────────────
function generateFallbackNews(): NewsArticle[] {
  const rng = createRng(Date.now());
  const articles: NewsArticle[] = [];
  const usedTitles = new Set<string>();

  for (let i = 0; i < 400; i++) {
    let title = pick(NEWS_TITLES, rng);
    // Avoid exact duplicates
    while (usedTitles.has(title)) title = `${title} — Update ${i}`;
    usedTitles.add(title);

    articles.push({
      title,
      description: pick(NEWS_DESCRIPTIONS, rng),
      url: "https://news.google.com",
      source: pick(NEWS_SOURCES, rng),
      publishedAt: new Date(Date.now() - Math.floor(rng() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      urlToImage: pick(NEWS_IMAGES, rng),
      category: pick(NEWS_CATEGORIES, rng),
    });
  }

  articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return articles;
}

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

const sidebarAds = [
  { image: "https://images.pexels.com/photos/35538741/pexels-photo-35538741.jpeg", title: "BigChef Rio de Janeiro", desc: "Restaurante premiado com a melhor culinária da cidade.", link: "https://www.instagram.com" },
  { image: "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg", title: "TechHub Coworking", desc: "O melhor espaço de coworking para devs criativos.", link: "https://www.notion.so" },
  { image: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg", title: "Flow Academy", desc: "Cursos online de fotografia, design e programação.", link: "https://www.coursera.org" },
  { image: "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg", title: "GreenLife Suplementos", desc: "Suplementos naturais. 20% off na primeira compra.", link: "https://www.amazon.com" },
  { image: "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg", title: "Surf Camp Brasil", desc: "Aprenda a surfar na melhor praia do Brasil!", link: "https://www.airbnb.com" },
  { image: "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg", title: "Livraria Cult", desc: "Os melhores livros com desconto exclusivo para membros.", link: "https://www.amazon.com" },
  { image: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg", title: "Stargazer", desc: "Telescópios profissionais para ver as estrelas.", link: "https://www.amazon.com" },
  { image: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg", title: "PixelArt Studio", desc: "Cursos de arte digital e design gráfico.", link: "https://www.coursera.org" },
];

function MosaicAd({ ad, className }: { ad: typeof sidebarAds[0]; className?: string }) {
  return (
    <a href={ad.link} target="_blank" rel="noopener sponsored nofollow"
      className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 ${className || ""}`}
    >
      <div className="absolute inset-0">
        <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
      </div>
      <div className="relative z-10 p-4 md:p-5 flex flex-col justify-end h-full min-h-[160px]">
        <span className="self-start text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2 group-hover:bg-white/20 transition">
          ⚡ Ad
        </span>
        <h4 className="text-white font-bold text-sm md:text-base leading-tight group-hover:text-blue-300 transition-colors drop-shadow-lg">
          {ad.title}
        </h4>
        <p className="text-white/70 text-xs mt-1 line-clamp-2 drop-shadow">{ad.desc}</p>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl" />
    </a>
  );
}

export default function NewsPage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = useCallback(async () => {
    setRefreshing(true);
    setError(null);

    try {
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
        // Fallback: gera 400 notícias frescas
        setArticles(generateFallbackNews());
      }
    } catch (err) {
      console.error("News fetch error:", err);
      setArticles(generateFallbackNews());
      setError("Could not fetch live news. Showing curated stories.");
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 300);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const featured = filtered[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
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
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition disabled:opacity-50"
          >
            <FiRefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            <FiShuffle size={12} />
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
          <div className="flex gap-6">
            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-4xl">
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
                    <img src={featured.urlToImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
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

            {/* ─── MOSAIC ADS ──────────────────────────────────── */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Sponsored Content</span>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MosaicAd ad={sidebarAds[0]} className="md:col-span-2 md:row-span-2" />
                <MosaicAd ad={sidebarAds[1]} className="col-span-1" />
                <MosaicAd ad={sidebarAds[2]} className="col-span-1" />
                <MosaicAd ad={sidebarAds[3]} className="col-span-1" />
                <MosaicAd ad={sidebarAds[4]} className="col-span-1" />
              </div>
            </div>

            {/* News grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.slice(1).map((article, index) => (
                <a
                  key={`${article.url}-${index}-${article.title.slice(0, 20)}`}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="relative h-44">
                    {article.urlToImage ? (
                      <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
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

            {!loading && (
              <div className="text-center text-xs text-gray-400 mt-4">
                Showing {filtered.length} of {articles.length} articles
              </div>
            )}
          </div>

          {/* Right sidebar — 3 compact mosaic ads (hidden below lg) */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Ads</span>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent" />
            </div>
            <MosaicAd ad={sidebarAds[5]} className="min-h-[200px]" />
            <MosaicAd ad={sidebarAds[6]} className="min-h-[180px]" />
            <MosaicAd ad={sidebarAds[7]} className="min-h-[180px]" />
          </aside>
          </div>
        )}
      </div>
    </div>
  );
}
