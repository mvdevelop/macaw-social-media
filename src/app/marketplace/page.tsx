"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageProvider";
import {
  FiMapPin, FiHeart, FiGrid, FiHome, FiTruck, FiBriefcase,
  FiSmartphone, FiShoppingBag, FiUsers, FiTool, FiCamera,
  FiSearch, FiChevronLeft, FiX, FiStar, FiClock, FiCalendar,
} from "react-icons/fi";

// ============================================
// CATEGORIES
// ============================================
const CATEGORIES = [
  { id: "all", label: "All", icon: FiGrid },
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
// ENRICHED MOCK DATA
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

const MOCK_ITEMS: MarketplaceItem[] = [
  // PRODUCTS
  { id: 1, title: "Vintage Camera Polaroid", price: "$149", img: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg", location: "Brooklyn, NY", category: "products", description: "Classic Polaroid camera in excellent condition. Comes with 3 film packs.", lat: 40.6782, lng: -73.9442, date: "2h ago", featured: false },
  { id: 2, title: "MacBook Pro M3 14\"", price: "$1,899", img: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg", location: "Manhattan, NY", category: "electronics", description: "Space Gray, 16GB RAM, 512GB SSD. Like new condition, only 3 months old.", lat: 40.7831, lng: -73.9712, date: "5h ago", featured: true },
  { id: 3, title: "Acoustic Guitar Takamine", price: "$299", img: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg", location: "Austin, TX", category: "products", description: "Takamine GD30CE, great for beginners and intermediate players.", lat: 30.2672, lng: -97.7431, date: "1d ago", featured: false },
  // ELECTRONICS
  { id: 4, title: "iPhone 15 Pro Max 256GB", price: "$999", img: "https://images.pexels.com/photos/35291387/pexels-photo-35291387.jpeg", location: "Miami, FL", category: "electronics", description: "Natural Titanium, unlocked, 98% battery health. Includes original box.", lat: 25.7617, lng: -80.1918, date: "3h ago", featured: true },
  { id: 5, title: "Sony WH-1000XM5 Headphones", price: "$279", img: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg", location: "Chicago, IL", category: "electronics", description: "Noise cancelling, black, barely used for 2 weeks. Original accessories included.", lat: 41.8781, lng: -87.6298, date: "6h ago", featured: false },
  { id: 6, title: "PS5 Console + 3 Games", price: "$449", img: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg", location: "Los Angeles, CA", category: "electronics", description: "PlayStation 5 disc version with controller, comes with FIFA, Spider-Man and Call of Duty.", lat: 34.0522, lng: -118.2437, date: "1d ago", featured: false },
  // VEHICLES
  { id: 7, title: "Tesla Model 3 2023", price: "$38,900", img: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg", location: "San Francisco, CA", category: "vehicles", description: "Long Range AWD, 25k miles, white exterior, black interior. Supercharger access.", lat: 37.7749, lng: -122.4194, date: "2d ago", featured: true },
  { id: 8, title: "Honda Civic 2022", price: "$22,500", img: "https://images.pexels.com/photos/35680942/pexels-photo-35680942.jpeg", location: "Portland, OR", category: "vehicles", description: "EX-L trim, 30k miles, excellent condition, single owner, no accidents.", lat: 45.5152, lng: -122.6784, date: "4d ago", featured: false },
  { id: 9, title: "Yamaha R1 2021", price: "$13,500", img: "https://images.pexels.com/photos/35701815/pexels-photo-35701815.jpeg", location: "Orlando, FL", category: "vehicles", description: "Blue, 8k miles, full exhaust system, always garaged.", lat: 28.5383, lng: -81.3792, date: "3d ago", featured: false },
  // HOUSING
  { id: 10, title: "3BR Modern Loft Downtown", price: "$1,800/mo", img: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg", location: "Seattle, WA", category: "rentals", description: "Modern loft in Capitol Hill. Open floor plan, stainless steel appliances, rooftop access.", lat: 47.6062, lng: -122.3321, date: "1d ago", featured: true },
  { id: 11, title: "Studio Apartment - Soho", price: "$2,200/mo", img: "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg", location: "New York, NY", category: "rentals", description: "Cozy studio in prime Soho location. Recently renovated with exposed brick.", lat: 40.7233, lng: -73.9970, date: "2d ago", featured: false },
  { id: 12, title: "4BR House with Pool", price: "$650,000", img: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg", location: "Dallas, TX", category: "housing", description: "Beautiful home in quiet neighborhood. Pool, garden, 3-car garage. School district A+.", lat: 32.7767, lng: -96.7970, date: "5d ago", featured: true },
  { id: 13, title: "Beachfront Condo", price: "$420,000", img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", location: "Santa Monica, CA", category: "housing", description: "2BR/2BA with panoramic ocean views. Recently renovated, walking distance to pier.", lat: 34.0195, lng: -118.4912, date: "1w ago", featured: false },
  // SERVICES
  { id: 14, title: "Professional Photography", price: "$150/hr", img: "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg", location: "Denver, CO", category: "services", description: "Portrait and event photography. 10 years experience. Includes editing.", lat: 39.7392, lng: -104.9903, date: "4h ago", featured: false },
  { id: 15, title: "Personal Trainer - Home Visits", price: "$80/session", img: "https://images.pexels.com/photos/4753982/pexels-photo-4753982.jpeg", location: "Boston, MA", category: "services", description: "Certified personal trainer. Specialized in strength training and weight loss.", lat: 42.3601, lng: -71.0589, date: "1d ago", featured: false },
  { id: 16, title: "Web Development - Freelancer", price: "$65/hr", img: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg", location: "Remote", category: "services", description: "Full-stack developer. React, Next.js, Node.js. Available for projects of all sizes.", lat: 40.7128, lng: -74.0060, date: "2h ago", featured: false },
  // JOBS
  { id: 17, title: "Senior Software Engineer", price: "$180k/yr", img: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg", location: "San Jose, CA", category: "jobs", description: "Series B startup looking for senior engineer. React+Python. Equity included.", lat: 37.3382, lng: -121.8863, date: "3d ago", featured: true },
  { id: 18, title: "Graphic Designer (Remote)", price: "$85k/yr", img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg", location: "Remote - US", category: "jobs", description: "Creative agency seeking talented designer. Figma, Adobe Suite, branding experience.", lat: 40.7128, lng: -74.0060, date: "1w ago", featured: false },
  // FASHION
  { id: 19, title: "Rolex Submariner 2024", price: "$12,500", img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", location: "Beverly Hills, CA", category: "fashion", description: "Brand new, unworn, with box and papers. Black dial, stainless steel.", lat: 34.0736, lng: -118.4004, date: "2d ago", featured: true },
  { id: 20, title: "Louis Vuitton Neverfull MM", price: "$1,890", img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", location: "New York, NY", category: "fashion", description: "Damier Ebene canvas. Excellent condition, purchased 2023.", lat: 40.7527, lng: -73.9772, date: "4d ago", featured: false },
  // PETS
  { id: 21, title: "Golden Retriever Puppies", price: "$1,200", img: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg", location: "Nashville, TN", category: "pets", description: "AKC registered, 8 weeks old, vet checked, first shots included.", lat: 36.1627, lng: -86.7816, date: "3d ago", featured: false },
  { id: 22, title: "Cat Tree Tower 6ft", price: "$89", img: "https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg", location: "Phoenix, AZ", category: "pets", description: "Large cat tree with scratching posts, platforms and hammock. Like new.", lat: 33.4484, lng: -112.0740, date: "1w ago", featured: false },
  // MORE PRODUCTS
  { id: 23, title: "Mountain Bike Trek X-Caliber 8", price: "$1,850", img: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg", location: "Boulder, CO", category: "products", description: "2023 model, carbon frame, tubeless setup. Used for only 2 rides.", lat: 40.0150, lng: -105.2705, date: "2d ago", featured: false },
  { id: 24, title: "Mechanical Keyboard Custom", price: "$220", img: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg", location: "Atlanta, GA", category: "electronics", description: "Custom built with Gateron Black switches, aluminum case, RGB.", lat: 33.7490, lng: -84.3880, date: "6h ago", featured: false },
  { id: 25, title: "Wedding Dress Designer", price: "$2,400", img: "https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg", location: "Miami, FL", category: "fashion", description: "Vera Wang, size 6, worn once. Professionally cleaned and preserved.", lat: 25.7617, lng: -80.1918, date: "1w ago", featured: false },
  { id: 26, title: "Mountain Bike Tour Guide", price: "$45/hr", img: "https://images.pexels.com/photos/2884591/pexels-photo-2884591.jpeg", location: "Park City, UT", category: "services", description: "Local expert guiding mountain bike tours. All levels welcome, gear included.", lat: 40.6461, lng: -111.4980, date: "3d ago", featured: false },
  { id: 27, title: "2BR Apartment - Water View", price: "$1,600/mo", img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg", location: "Chicago, IL", category: "rentals", description: "Beautiful 2BR with lake view. In-unit laundry, gym, doorman building.", lat: 41.8827, lng: -87.6233, date: "1d ago", featured: false },
  { id: 28, title: "Ford Mustang GT 2020", price: "$31,900", img: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg", location: "Houston, TX", category: "vehicles", description: "GT Premium, 35k miles, Grabber Blue, performance package, clean title.", lat: 29.7604, lng: -95.3698, date: "4d ago", featured: false },
];

// ============================================
// COMPONENTE MAPA (OpenStreetMap embed)
// ============================================
function LocationMap({ lat, lng, location }: { lat: number; lng: number; location: string }) {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05}%2C${lat - 0.05}%2C${lng + 0.05}%2C${lat + 0.05}&layer=mapnik&marker=${lat}%2C${lng}`;
  const dirLink = `https://www.openstreetmap.org/directions?from=&to=${lat}%2C${lng}`;

  return (
    <div className="space-y-2">
      <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <iframe
          src={mapSrc}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${location}`}
        />
      </div>
      <a
        href={dirLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition"
      >
        <FiMapPin size={14} />
        <span>Get directions on OpenStreetMap</span>
      </a>
    </div>
  );
}

// ============================================
// COMPONENTE ITEM DETAIL MODAL
// ============================================
function ItemDetailModal({ item, onClose }: { item: MarketplaceItem; onClose: () => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-64 md:h-96">
          <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-t-2xl" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
          >
            <FiX size={20} />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 left-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition"
          >
            <FiHeart size={18} className={liked ? "text-red-500 fill-red-500" : "text-gray-500"} />
          </button>
          {item.featured && (
            <span className="absolute bottom-3 left-3 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
              Featured
            </span>
          )}
        </div>

        {/* Details */}
        <div className="p-6 space-y-5">
          {/* Title + Price */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{item.title}</h2>
              <p className="text-sm text-gray-400 mt-1 capitalize">{item.category}</p>
            </div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">{item.price}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>

          {/* Date */}
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <FiClock size={14} />
            <span>{item.date}</span>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <FiMapPin size={16} />
              Location: {item.location}
            </h3>
            <LocationMap lat={item.lat} lng={item.lng} location={item.location} />
          </div>

          {/* Contact */}
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
export default function MarketplacePage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const matchSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const featured = MOCK_ITEMS.filter((i) => i.featured && (activeCategory === "all" || i.category === activeCategory));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors">
      {/* Sidebar de Categorias */}
      <div className={`${sidebarOpen ? "w-56" : "w-0"} lg:w-56 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all overflow-hidden`}>
        <div className="p-4 space-y-1">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h2>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSidebarOpen(true); }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <cat.icon size={18} />
              {cat.label}
            </button>
          ))}
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
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.marketplace.title}</h1>
              <span className="text-sm text-gray-400">({filtered.length} items)</span>
            </div>

            {/* Search */}
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

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <FiShoppingBag size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">No items found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group cursor-pointer border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative h-48">
                    <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full capitalize">
                        {item.category}
                      </span>
                    </div>
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
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
