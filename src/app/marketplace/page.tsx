"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";
import {
  FiMapPin, FiHeart, FiGrid, FiHome, FiTruck, FiBriefcase,
  FiSmartphone, FiShoppingBag, FiUsers, FiTool, FiCamera,
  FiSearch, FiX, FiStar, FiClock, FiBookmark,
} from "react-icons/fi";

// ============================================
// SEEDED PRNG
// ============================================
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
function randInt(min: number, max: number, rng: () => number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

// ============================================
// CATEGORIES
// ============================================
const CATEGORIES = [
  { id: "all", label: "All", icon: FiGrid },
  { id: "favorites", label: "Favorites", icon: FiBookmark },
  { id: "products", label: "Products", icon: FiShoppingBag },
  { id: "electronics", label: "Electronics", icon: FiSmartphone },
  { id: "vehicles", label: "Vehicles", icon: FiTruck },
  { id: "housing", label: "Houses", icon: FiHome },
  { id: "rentals", label: "Rentals", icon: FiHome },
  { id: "services", label: "Services", icon: FiTool },
  { id: "jobs", label: "Jobs", icon: FiBriefcase },
  { id: "fashion", label: "Fashion", icon: FiCamera },
  { id: "pets", label: "Pets", icon: FiUsers },
];

// ============================================
// POOLS FOR GENERATION
// ============================================
const TITLE_POOLS: Record<string, string[]> = {
  products: [
    "Vintage Camera Polaroid","Acoustic Guitar Takamine","Mountain Bike Trek X-Caliber",
    "Yoga Mat Premium","Designer Watch","Leather Jacket","Coffee Machine",
    "Vintage Vinyl Collection","Record Player","Board Game Collection","Artwork Original",
    "Running Shoes (New)","Dumbbells Set 20kg","Skateboard Custom","Surfboard 6'2\"",
    "Camping Stove","Backpack 65L","Hammock Double","Portable Speaker JBL",
    "Chef Knife Set","Cast Iron Skillet","Stand Mixer","Electric Kettle",
    "Desk Lamp LED","Ergonomic Chair","Standing Desk","Bookshelf 5-Tier",
    "Plant Pot Collection","Wall Art Set","Rug Persian 6x4","Cushion Set",
    "Sunglasses Ray-Ban","Backpack Herschel","Canvas Tote Bag","Wool Scarf",
    "Perfume Collection","Skincare Set","Hair Dryer Pro","Electric Toothbrush",
  ],
  electronics: [
    "MacBook Pro M3 14\"","iPhone 15 Pro Max 256GB","Sony WH-1000XM5 Headphones",
    "PS5 Console + 3 Games","iPad Air 11\"","Apple Watch Ultra 2",
    "Samsung Galaxy S24 Ultra","Dell XPS 16\" Laptop","Nintendo Switch OLED",
    "GoPro Hero 12 Black","Kindle Paperwhite","Bose SoundLink Speaker",
    "Sony A7 IV Camera","DJI Mini 4 Pro Drone","Rode Wireless Mic",
    "Xbox Series X","RTX 4080 Super GPU","BenQ 27\" 4K Monitor",
    "Logitech MX Master 3S","Keychron Q1 Keyboard","AirPods Pro 2",
  ],
  vehicles: [
    "Tesla Model 3 2023","Honda Civic 2022","Yamaha R1 2021",
    "Ford Mustang GT 2020","Toyota Camry 2023","Harley Davidson Sportster",
    "Chevrolet Silverado 2022","BMW X5 2021","Audi Q5 2023",
    "VW Golf GTI 2022","Kawasaki Ninja 650","Ducati Monster 937",
    "Jeep Wrangler 2023","Tesla Model Y","Honda CR-V 2022",
    "Subaru Outback 2023","Mazda CX-5","Hyundai Ioniq 6",
  ],
  housing: [
    "4BR House with Pool","Beachfront Condo","Colonial Style Home",
    "Modern Townhouse","Fixer Upper Bungalow","Lake House Retreat",
    "Mountain Cabin with View","Victorian Brownstone","Mid-Century Modern Home",
    "Ranch Style Estate","Craftsman Bungalow","Contemporary Loft",
    "Spanish Villa","Cape Cod Cottage","Tudor Style Home",
  ],
  rentals: [
    "3BR Modern Loft Downtown","Studio Apartment - Soho","2BR Apartment - Water View",
    "1BR in Williamsburg","Penthouse with Terrace","Co-living Space",
    "Duplex in Silver Lake","Basement Studio","Furnished 1BR - Midtown",
    "Townhouse Shared","Room in 3BR Apt","Guest House Backyard",
    "Beach Studio Monthly","Ski Chalet Weekly","Downtown Corporate Apt",
  ],
  services: [
    "Professional Photography","Personal Trainer - Home Visits","Web Development Freelancer",
    "Mountain Bike Tour Guide","House Cleaning Service","Tutoring Math & Science",
    "Pet Sitting Service","Personal Chef","Massage Therapy",
    "Interior Design Consult","Event Planning","Private Yoga Lessons",
    "Language Tutor Spanish","Dog Walking Service","Career Coaching",
    "Financial Advisor","Legal Consultation","Plumber Emergency",
  ],
  jobs: [
    "Senior Software Engineer","Graphic Designer (Remote)","Product Manager",
    "Data Scientist","UX Designer","Marketing Director",
    "Frontend Developer","Backend Engineer","DevOps Specialist",
    "Content Writer","Customer Success Manager","Sales Representative",
    "AI Research Scientist","Mobile Developer","Cloud Architect",
  ],
  fashion: [
    "Rolex Submariner 2024","Louis Vuitton Neverfull MM","Wedding Dress Designer",
    "Gucci Leather Belt","Prada Sunglasses","Diamond Engagement Ring",
    "Hermès Scarf","Chanel Classic Flap Bag","Cartier Love Bracelet",
    "Tiffany Pearl Necklace","YSL Evening Dress","Versace Blazer",
    "Omega Speedmaster Watch","Bottega Pouch","Balenciaga Sneakers",
  ],
  pets: [
    "Golden Retriever Puppies","Cat Tree Tower 6ft","Dog Crate Large",
    "Aquarium 50 Gallon","Pet Stroller","Bird Cage Deluxe",
    "Cat Water Fountain","Dog Bed Orthopedic","Pet Carrier Backpack",
    "Hamster Habitat","Reptile Terrarium","Automatic Pet Feeder",
    "Fish Tank Filter","Dog Harness No Pull","Cat Scratching Post",
  ],
};
const ALL_TITLES = Object.values(TITLE_POOLS).flat();

const PRICES: Record<string, string[]> = {
  products: ["$49","$79","$99","$149","$199","$249","$299","$349","$399","$449","$549","$699","$899"],
  electronics: ["$279","$449","$599","$799","$999","$1,299","$1,499","$1,899","$2,499","$3,499"],
  vehicles: ["$13,500","$22,500","$31,900","$38,900","$42,500","$55,000","$68,000","$85,000"],
  housing: ["$350,000","$420,000","$550,000","$650,000","$780,000","$895,000","$1,200,000","$1,800,000"],
  rentals: ["$1,200/mo","$1,600/mo","$1,800/mo","$2,200/mo","$2,800/mo","$3,500/mo","$4,200/mo"],
  services: ["$45/hr","$65/hr","$80/hr","$100/hr","$150/hr","$200/hr","$350/hr"],
  jobs: ["$65k/yr","$85k/yr","$110k/yr","$130k/yr","$150k/yr","$180k/yr","$220k/yr","$280k/yr"],
  fashion: ["$89","$220","$890","$1,200","$1,890","$2,400","$4,500","$8,900","$12,500"],
  pets: ["$45","$79","$89","$120","$189","$250","$450","$1,200"],
};

const LOCATIONS = [
  "Brooklyn, NY","Manhattan, NY","Austin, TX","Miami, FL","Chicago, IL",
  "Los Angeles, CA","San Francisco, CA","Portland, OR","Orlando, FL","Seattle, WA",
  "New York, NY","Dallas, TX","Santa Monica, CA","Denver, CO","Boston, MA",
  "San Jose, CA","Nashville, TN","Phoenix, AZ","Boulder, CO","Atlanta, GA",
  "Houston, TX","San Diego, CA","Minneapolis, MN","Philadelphia, PA","Detroit, MI",
  "Charlotte, NC","Tampa, FL","Raleigh, NC","Salt Lake City, UT","Kansas City, MO",
  "Remote","Remote - US","Remote - Global",
];

const LAT_LNG: Record<string, [number, number]> = {
  "Brooklyn, NY": [40.6782, -73.9442],
  "Manhattan, NY": [40.7831, -73.9712],
  "Austin, TX": [30.2672, -97.7431],
  "Miami, FL": [25.7617, -80.1918],
  "Chicago, IL": [41.8781, -87.6298],
  "Los Angeles, CA": [34.0522, -118.2437],
  "San Francisco, CA": [37.7749, -122.4194],
  "Portland, OR": [45.5152, -122.6784],
  "Orlando, FL": [28.5383, -81.3792],
  "Seattle, WA": [47.6062, -122.3321],
  "New York, NY": [40.7527, -73.9772],
  "Dallas, TX": [32.7767, -96.7970],
  "Santa Monica, CA": [34.0195, -118.4912],
  "Denver, CO": [39.7392, -104.9903],
  "Boston, MA": [42.3601, -71.0589],
  "San Jose, CA": [37.3382, -121.8863],
  "Nashville, TN": [36.1627, -86.7816],
  "Phoenix, AZ": [33.4484, -112.0740],
  "Boulder, CO": [40.0150, -105.2705],
  "Atlanta, GA": [33.7490, -84.3880],
  "Houston, TX": [29.7604, -95.3698],
  "San Diego, CA": [32.7157, -117.1611],
  "Minneapolis, MN": [44.9778, -93.2650],
  "Philadelphia, PA": [39.9526, -75.1652],
  "Detroit, MI": [42.3314, -83.0458],
  "Charlotte, NC": [35.2271, -80.8431],
  "Tampa, FL": [27.9506, -82.4572],
  "Raleigh, NC": [35.7796, -78.6382],
  "Salt Lake City, UT": [40.7608, -111.8910],
  "Kansas City, MO": [39.0997, -94.5786],
  "Remote": [40.7128, -74.0060],
  "Remote - US": [40.7128, -74.0060],
  "Remote - Global": [40.7128, -74.0060],
};

const DESCRIPTIONS = [
  "Excellent condition, barely used. All original accessories included.",
  "Like new, only used a few times. Comes with original box and warranty.",
  "Great starter option for beginners and enthusiasts alike.",
  "Premium quality, well maintained. Minor signs of use.",
  "Open to offers. Quick sale needed, priced to move!",
  "Top of the line model, fully loaded with all options.",
  "Recently serviced and in perfect working condition.",
  "Limited edition model, hard to find in this condition.",
  "Includes all accessories, manuals, and original packaging.",
  "Beautiful piece, must see in person to appreciate.",
];

const IMG_POOL = [
  "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
  "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
  "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
  "https://images.pexels.com/photos/35291387/pexels-photo-35291387.jpeg",
  "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
  "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
  "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
  "https://images.pexels.com/photos/35680942/pexels-photo-35680942.jpeg",
  "https://images.pexels.com/photos/35701815/pexels-photo-35701815.jpeg",
  "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
  "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg",
  "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg",
  "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
  "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg",
  "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
  "https://images.pexels.com/photos/35459874/pexels-photo-35459874.jpeg",
  "https://images.pexels.com/photos/35487966/pexels-photo-35487966.jpeg",
  "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
  "https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg",
];

const TIME_AGO = ["2h ago","5h ago","6h ago","1d ago","2d ago","3d ago","4d ago","1w ago","2w ago"];

// ============================================
// MARKETPLACE ITEM INTERFACE
// ============================================
interface MarketplaceItem {
  id: number;
  title: string;
  price: string;
  img: string;
  location: string;
  category: string;
  description: string;
  lat: number;
  lng: number;
  date: string;
  featured: boolean;
}

// ============================================
// GENERATE 280+ ITEMS
// ============================================
const categoryKeys = ["products","electronics","vehicles","housing","rentals","services","jobs","fashion","pets"];

function generateItems(): MarketplaceItem[] {
  const rng = createRng(42);
  const items: MarketplaceItem[] = [];

  for (const cat of categoryKeys) {
    const titles = TITLE_POOLS[cat];
    const prices = PRICES[cat];
    const count = cat === "products" ? 50 : cat === "electronics" ? 35 : cat === "vehicles" ? 30 : 28;

    for (let i = 0; i < count; i++) {
      const title = pick(titles, rng);
      const location = pick(LOCATIONS, rng);
      const [lat, lng] = LAT_LNG[location] || [40.7128, -74.0060];
      items.push({
        id: items.length + 1,
        title: `${title}${i > titles.length - 1 ? ` #${i + 1}` : ""}`,
        price: pick(prices, rng),
        img: pick(IMG_POOL, rng),
        location,
        category: cat,
        description: pick(DESCRIPTIONS, rng),
        lat,
        lng,
        date: pick(TIME_AGO, rng),
        featured: randInt(0, 5, rng) === 0,
      });
    }
  }

  // Shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

const GENERATED_ITEMS = generateItems();

// ============================================
// COMPONENTE MAPA
// ============================================
function LocationMap({ lat, lng, location }: { lat: number; lng: number; location: string }) {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05}%2C${lat - 0.05}%2C${lng + 0.05}%2C${lat + 0.05}&layer=mapnik&marker=${lat}%2C${lng}`;
  return (
    <div className="space-y-2">
      <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <iframe src={mapSrc} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Map of ${location}`} />
      </div>
      <a href={mapSrc} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition">
        <FiMapPin size={14} />
        <span>View on OpenStreetMap</span>
      </a>
    </div>
  );
}

// ============================================
// COMPONENTE ITEM DETAIL MODAL
// ============================================
function ItemDetailModal({
  item, onClose, isFavorite, onToggleFavorite
}: {
  item: MarketplaceItem;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-64 md:h-96">
          <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition">
            <FiX size={20} />
          </button>
          <button
            onClick={() => onToggleFavorite(item.id)}
            className="absolute top-3 left-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition active:scale-90"
            title={isFavorite ? "Remove from favorites" : "Save to favorites"}
          >
            <FiHeart size={18} className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"} />
          </button>
          {item.featured && (
            <span className="absolute bottom-3 left-3 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
              Featured
            </span>
          )}
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{item.title}</h2>
              <p className="text-sm text-gray-400 mt-1 capitalize">{item.category}</p>
            </div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">{item.price}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <FiClock size={14} />
            <span>{item.date}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <FiMapPin size={16} />
              Location: {item.location}
            </h3>
            <LocationMap lat={item.lat} lng={item.lng} location={item.location} />
          </div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white font-semibold hover:opacity-90 transition active:scale-[0.99]">
            Message Seller
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
const FAVORITES_KEY = "macaw:marketplace:favorites";

export default function MarketplacePage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  // Persist favorites to localStorage
  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "favorites") {
      return GENERATED_ITEMS.filter((item) => favorites.has(item.id));
    }
    return GENERATED_ITEMS.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const matchSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, favorites]);

  const featured = GENERATED_ITEMS.filter(
    (i) => i.featured && (activeCategory === "all" || i.category === activeCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-56" : "w-0"} lg:w-56 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all overflow-hidden`}>
        <div className="p-4 space-y-1">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h2>
          {CATEGORIES.map((cat) => {
            const count = cat.id === "favorites"
              ? favorites.size
              : cat.id === "all"
                ? GENERATED_ITEMS.length
                : GENERATED_ITEMS.filter((i) => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSidebarOpen(true); }}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <cat.icon size={18} />
                  {cat.id === "favorites" ? t.marketplace.favorites || "Favorites" : cat.label}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="p-4 md:p-8">
          {/* Header + Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <FiGrid size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {activeCategory === "favorites" ? t.marketplace.favorites || "Favorites" : t.marketplace.title}
              </h1>
              <span className="text-sm text-gray-400">({filtered.length} items)</span>
            </div>
            <div className="relative w-full sm:w-64">
              <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search marketplace..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Featured Row */}
          {featured.length > 0 && activeCategory === "all" && !searchQuery && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <FiStar size={18} className="text-yellow-500" />
                Featured
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                {featured.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="snap-start shrink-0 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="relative h-36">
                      <Image src={item.img} alt={item.title} fill sizes="256px" className="object-cover group-hover:scale-105 transition duration-300" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold rounded-full">Featured</span>
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-gray-800 dark:text-white">{item.price}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state for favorites */}
          {filtered.length === 0 && activeCategory === "favorites" ? (
            <div className="text-center py-16">
              <FiHeart size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                {t.marketplace.noFavorites || "No favorites yet"}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {t.marketplace.noFavoritesHint || "Click the heart on items to save them here"}
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <FiShoppingBag size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">No items found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((item) => {
                const isFav = favorites.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group cursor-pointer border border-gray-100 dark:border-gray-700 relative"
                  >
                    <div className="relative h-48">
                      <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full capitalize">
                          {item.category}
                        </span>
                      </div>
                      {/* Favorite button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-gray-900 transition active:scale-90 shadow-md"
                        title={isFav ? t.marketplace.removeFav || "Remove from favorites" : t.marketplace.addFav || "Save to favorites"}
                      >
                        <FiHeart
                          size={15}
                          className={`transition-all ${isFav ? "text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]" : "text-gray-500 dark:text-gray-400"}`}
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-lg font-bold text-gray-800 dark:text-white">{item.price}</p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1 line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-1">{item.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <FiMapPin size={12} />
                          <span className="truncate max-w-[140px]">{item.location}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">{item.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          isFavorite={favorites.has(selectedItem.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
