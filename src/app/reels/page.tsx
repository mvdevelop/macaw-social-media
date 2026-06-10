"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiHeart, FiMessageCircle, FiShare2, FiVolume2, FiVolumeX,
  FiChevronDown, FiMusic, FiSend, FiX, FiRefreshCw, FiUserPlus,
} from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";

// ─── Pools ──────────────────────────────────────────────────────
const VIDEO_URLS = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
];

const THUMBNAIL_POOL = [
  "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
  "https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg",
  "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
  "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
  "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
  "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
  "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
  "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
  "https://images.pexels.com/photos/35538741/pexels-photo-35538741.jpeg",
  "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg",
];

const AVATAR_POOL = [
  "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
  "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
  "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg",
  "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
  "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg",
  "https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg",
  "https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg",
  "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
  "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
  "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
];

const REEL_USERS = [
  { id: "v1", name: "Travel Vibes", avatar: AVATAR_POOL[0] },
  { id: "v2", name: "Nature Is Art", avatar: AVATAR_POOL[1] },
  { id: "v3", name: "Tech Future", avatar: AVATAR_POOL[2] },
  { id: "v4", name: "Ocean Explorer", avatar: AVATAR_POOL[3] },
  { id: "v5", name: "Art Daily", avatar: AVATAR_POOL[4] },
  { id: "v6", name: "Street Food", avatar: AVATAR_POOL[5] },
  { id: "v7", name: "Fitness Daily", avatar: AVATAR_POOL[6] },
  { id: "v8", name: "Space Lover", avatar: AVATAR_POOL[7] },
  { id: "v9", name: "Architecture", avatar: AVATAR_POOL[8] },
  { id: "v10", name: "Pet Paradise", avatar: AVATAR_POOL[9] },
  { id: "v11", name: "Cooking Master", avatar: AVATAR_POOL[1] },
  { id: "v12", name: "Music Producer", avatar: AVATAR_POOL[2] },
  { id: "v13", name: "Dance Studio", avatar: AVATAR_POOL[3] },
  { id: "v14", name: "Wildlife Pro", avatar: AVATAR_POOL[4] },
  { id: "v15", name: "Urban Explorer", avatar: AVATAR_POOL[5] },
  { id: "v16", name: "Yoga Life", avatar: AVATAR_POOL[6] },
  { id: "v17", name: "Car Lover", avatar: AVATAR_POOL[7] },
  { id: "v18", name: "Digital Artist", avatar: AVATAR_POOL[8] },
  { id: "v19", name: "World Foodie", avatar: AVATAR_POOL[9] },
  { id: "v20", name: "Adventure Time", avatar: AVATAR_POOL[0] },
];

const REEL_DESCRIPTIONS = [
  "Morning timelapse in the city 🌅","The most relaxing waterfall you'll see today 🍃","Building the future, one line of code at a time 💻✨",
  "Drone footage of the coastline 🏖️","Speed painting a sunset landscape 🎨","Making the perfect ramen from scratch 🍜",
  "10 min morning stretch routine 🧘‍♂️","Time-lapse of the night sky ✨🌌","Incredible modern architecture tour 🏛️",
  "Dogs being dogs — the best compilation 🐕❤️","Golden hour magic captured on video 🌇","Epic mountain biking downhill run 🚵‍♂️",
  "Smooth jazz playing in the background 🎷","Behind the scenes of a fashion shoot 📸","Street art tour in Berlin 🎨",
  "Baking sourdough bread from scratch 🥖","Calm ocean waves for relaxation 🌊","Epic gaming montage — clutch moments 🎮",
  "Driving through the Scottish Highlands 🏔️","Cute puppy compilation to brighten your day 🐶","Sunset kayaking adventure 🛶",
  "Making latte art like a pro ☕","Night photography tips and tricks 📷","Skateboard tricks compilation 🛹",
  "Acoustic guitar session by the fire 🎸","Hot air balloon ride over Cappadocia 🎈","Underwater coral reef exploration 🤿",
  "Epic thunderstorm timelapse ⛈️","Street food tour in Bangkok 🍜","Aerial views of the Amalfi Coast 🏖️",
  "Parkour flow through the city 🏃","Handmade pottery wheel tutorial 🏺","Snowboarding in fresh powder 🏂",
  "Sunrise hike to the summit 🌄","Vinyl record collection tour 🎵","Urban gardening harvest day 🥬",
  "Classic car restoration progress 🚗","Paragliding over the coastline 🪂","Rainy day jazz bar ambience 🌧️",
  "Fermentation station —making kimchi 🥬","Candle making workshop 🕯️","Building a PC from scratch 💻",
  "Kyoto temple walk in autumn 🍁","Wild horses in the valley 🐎","Bouldering session at the gym 🧗",
  "Coffee roasting process explained ☕","Tattoo time-lapse from start to finish 🖋️","Foraging wild mushrooms in the forest 🍄",
  "DIY terrarium building workshop 🌱","Midnight city drive playlist 🚙","Studio session recording new vocals 🎤",
  "Bonsai tree trimming and care 🌳","Beach clean-up volunteer day 🌍","Making fresh pasta from scratch 🍝",
  "Drone racing through the forest 🚁","Watercolor painting relaxing session 🎨","Bbq masterclass — perfect brisket 🥩",
  "Sneaker customization step by step 👟","Vintage camera collection 📷","Indoor rock climbing techniques 🧗‍♂️",
  "Making sushi roll art 🍣","Desert camping under the stars ⭐","Paddleboarding at sunrise 🏄",
  "Lego architecture build timelapse 🧱","Hand lettering calligraphy practice ✍️","Espresso extraction slow motion ☕",
  "Fire spinning performance at night 🔥","Kite surfing on the ocean 🌊","Bread baking ASMR — crusty loaf 🍞",
  "Film photography developing process 🎞️","Wood carving a spoon from scratch 🥄","Horseback riding through the meadow 🐴",
  "Ceramic glazing techniques 🏺","Making mochi from scratch Japanese style 🍡","Choir performance in the cathedral 🎵",
  "Campfire cooking — cast iron recipes 🔥","Paper marbling art technique 📜","Train journey through the alps 🚂",
  "Muay Thai training session 🥊","Bubble tea making at home 🧋","Crossfit competition highlights 💪",
  "Sand sculpting masterclass 🏖️","Indoor hydroponic garden tour 🌿","Knife sharpening skills 🔪",
  "Djembe drum circle rhythm 🥁","Mushroom foraging in the Pacific Northwest 🍄","Abstract fluid art painting 🎨",
  "Wine tasting notes and pairing 🍷","Ice skating freestyle routine ⛸️","Bookbinding handmade journal 📓",
  "Bird watching in the wetlands 🐦","Leather wallet making from scratch 👝","Capoeira roda performance 🇧🇷",
  "Aurora borealis timelapse in Norway 🌌","Falconry experience with a hawk 🦅","Flower arrangement ikebana style 🌸",
  "Indoor climbing competition highlights 🧗","Beekeeping harvest day 🍯","Hammock camping in the rainforest 🏕️",
  "Poi spinning flow arts 🔮","Metal detecting beach finds 🏴‍☠️","Medieval reenactment battle ⚔️",
];

const REEL_SONGS = [
  "City Lights — Ambient Mix","Water Sounds — Nature Recordings","Lo-Fi Coding Beats",
  "Ocean Waves — Chill Soundscape","Creative Flow — Instrumental","Street Eats — Vlog Beats",
  "Energetic Morning — Workout Mix","Space Odyssey — Ambient Piano","Urban Explorer — Electronic",
  "Happy Tunes — Upbeat Pop","Sunset Drive — Deep House","Forest Whisper — Acoustic",
  "Neon Nights — Synthwave","Tropical Breeze — Reggaeton","Midnight Jazz — Smooth Sax",
  "Electric Dreams — Techno","Mountain High — Folk Rock","Rainy Day — Lo-Fi Hip Hop",
  "Starlight — Classical Piano","Summer Vibes — Tropical House",
];

interface ReelComment {
  id: number;
  username: string;
  text: string;
  timestamp: number;
}

function generateReels() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    videoUrl: VIDEO_URLS[i % VIDEO_URLS.length],
    thumbnail: THUMBNAIL_POOL[i % THUMBNAIL_POOL.length],
    user: { id: REEL_USERS[i % REEL_USERS.length].id, name: REEL_USERS[i % REEL_USERS.length].name, avatar: REEL_USERS[i % REEL_USERS.length].avatar },
    description: REEL_DESCRIPTIONS[i % REEL_DESCRIPTIONS.length],
    likes: Math.floor(Math.random() * 15000) + 500,
    comments: Math.floor(Math.random() * 800) + 20,
    song: REEL_SONGS[i % REEL_SONGS.length],
  }));
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function ReelsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [reels, setReels] = useState(generateReels);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [likedSet, setLikedSet] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const [refreshing, setRefreshing] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const touchStartY = useRef(0);

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentReelId, setCommentReelId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [reelComments, setReelComments] = useState<Record<number, ReelComment[]>>({});
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Auto-hide nav
  const resetNavTimeout = useCallback(() => {
    setShowNav(true);
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => setShowNav(false), 3000);
  }, []);

  useEffect(() => {
    resetNavTimeout();
    return () => { if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current); };
  }, [currentIndex, resetNavTimeout]);

  const handleRefresh = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);
    videoRefs.current.forEach((video) => video.pause());
    setReels(generateReels());
    setLikedSet(new Set());
    setLikeCounts({});
    setLoadedVideos(new Set());
    setCurrentIndex(0);
    setReelComments({});
    setCommentCounts({});
    setTimeout(() => {
      setRefreshing(false);
      document.getElementById("reel-0")?.scrollIntoView({ behavior: "instant" });
    }, 400);
  }, [refreshing]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < reels.length - 1) scrollToReel(currentIndex + 1);
      else if (diff < 0 && currentIndex > 0) scrollToReel(currentIndex - 1);
    }
  };

  const scrollToReel = useCallback((index: number) => {
    document.getElementById(`reel-${index}`)?.scrollIntoView({ behavior: "smooth" });
    setCurrentIndex(index);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < reels.length - 1) scrollToReel(currentIndex + 1);
    else if (e.deltaY < 0 && currentIndex > 0) scrollToReel(currentIndex - 1);
  }, [currentIndex, reels.length, scrollToReel]);

  useEffect(() => {
    if (!containerRef.current || reels.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) setCurrentIndex(idx);
          }
        }
      },
      { threshold: 0.6 }
    );
    const els = containerRef.current.querySelectorAll("[data-reel]");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reels.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, id) => {
      const reelIndex = reels.findIndex((r) => r.id === id);
      if (reelIndex === currentIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, reels]);

  useEffect(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < reels.length) {
      setLoadedVideos((prev) => new Set(prev).add(reels[nextIdx].id));
    }
  }, [currentIndex, reels]);

  useEffect(() => {
    if (commentsOpen) commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commentsOpen, reelComments]);

  const handleLike = (reelId: number) => {
    setLikedSet((prev) => {
      const next = new Set(prev);
      if (next.has(reelId)) {
        next.delete(reelId);
        setLikeCounts((c) => ({ ...c, [reelId]: Math.max(0, (c[reelId] ?? reels.find((r) => r.id === reelId)!.likes) - 1) }));
      } else {
        next.add(reelId);
        setLikeCounts((c) => ({ ...c, [reelId]: (c[reelId] ?? reels.find((r) => r.id === reelId)!.likes) + 1 }));
      }
      return next;
    });
  };

  const handleOpenComments = (reelId: number) => {
    setCommentReelId(reelId);
    setCommentText("");
    setCommentsOpen(true);
  };

  const handleSendComment = () => {
    if (!commentText.trim() || commentReelId === null) return;
    const newComment: ReelComment = {
      id: Date.now(),
      username: "You",
      text: commentText.trim(),
      timestamp: Date.now(),
    };
    setReelComments((prev) => ({
      ...prev,
      [commentReelId]: [...(prev[commentReelId] || []), newComment],
    }));
    setCommentCounts((prev) => ({
      ...prev,
      [commentReelId]: (prev[commentReelId] ?? reels.find((r) => r.id === commentReelId)!.comments) + 1,
    }));
    setCommentText("");
    setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleShare = async (reel: (typeof reels)[0]) => {
    const shareData = { title: `Macaw Reel by ${reel.user.name}`, text: reel.description, url: window.location.href };
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share(shareData); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(`${reel.description}\n\n${window.location.href}`);
      alert("Link copied!");
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={resetNavTimeout}
    >
      {reels.map((reel, index) => {
        const isActive = index === currentIndex;
        const isLiked = likedSet.has(reel.id);
        const displayLikes = likeCounts[reel.id] ?? reel.likes;
        const displayComments = commentCounts[reel.id] ?? reel.comments;

        return (
          <div
            key={reel.id}
            id={`reel-${index}`}
            data-reel
            data-index={index}
            className="h-screen snap-start snap-always relative flex items-center justify-center bg-black"
          >
            {/* ─── VÍDEO ──────────────────────────────────────── */}
            <div className="absolute inset-0">
              {(isActive || loadedVideos.has(reel.id)) ? (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current.set(reel.id, el);
                    else videoRefs.current.delete(reel.id);
                  }}
                  src={reel.videoUrl}
                  poster={reel.thumbnail}
                  loop
                  playsInline
                  muted={muted}
                  preload={isActive ? "auto" : "none"}
                  className="w-full h-full object-cover scale-[1.02]"
                />
              ) : (
                <Image src={reel.thumbnail} alt="" fill sizes="100vw" className="object-cover" />
              )}
            </div>

            {/* ─── OVERLAY GRADIENTE SUAVE ────────────────────── */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent via-[40%] to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent via-[60%] to-black/10 pointer-events-none" />

            {/* ─── TOP BAR ────────────────────────────────────── */}
            <div
              className={`absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/40 to-transparent transition-opacity duration-500 ${
                showNav ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition active:scale-90"
                  >
                    <FiChevronDown size={20} className="rotate-180" />
                  </button>
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition disabled:opacity-40 active:scale-90"
                    title="Refresh reels"
                  >
                    <FiRefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                  </button>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                  <span className="text-white text-xs font-semibold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/40 text-xs">/</span>
                  <span className="text-white/60 text-xs tabular-nums">
                    {String(reels.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* ─── SOUND TOGGLE ───────────────────────────────── */}
            <button
              onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
              className={`absolute top-20 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition active:scale-90 ${
                showNav ? "opacity-100" : "opacity-0 pointer-events-none"
              } transition-opacity duration-500`}
            >
              {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
            </button>

            {/* ─── AÇÕES LATERAIS ─────────────────────────────── */}
            <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-5">
              {/* Like */}
              <button
                onClick={(e) => { e.stopPropagation(); handleLike(reel.id); }}
                className="flex flex-col items-center gap-1 text-white group"
              >
                <div
                  className={`p-3 rounded-full backdrop-blur-md border transition-all duration-200 active:scale-90 ${
                    isLiked
                      ? "bg-red-500/20 border-red-400/40 scale-110"
                      : "bg-white/10 border-white/20 group-hover:bg-white/20"
                  }`}
                >
                  <FiHeart
                    size={26}
                    className={`transition-all duration-200 ${
                      isLiked ? "text-red-400 fill-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-white"
                    }`}
                  />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-lg">
                  {formatCount(displayLikes)}
                </span>
              </button>

              {/* Comment */}
              <button
                onClick={(e) => { e.stopPropagation(); handleOpenComments(reel.id); }}
                className="flex flex-col items-center gap-1 text-white group"
              >
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-200 active:scale-90">
                  <FiMessageCircle size={26} className="text-white" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-lg">
                  {formatCount(displayComments)}
                </span>
              </button>

              {/* Share */}
              <button
                onClick={(e) => { e.stopPropagation(); handleShare(reel); }}
                className="flex flex-col items-center gap-1 text-white group"
              >
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-200 active:scale-90">
                  <FiShare2 size={24} className="text-white" />
                </div>
                <span className="text-[11px] font-bold text-white drop-shadow-lg">Share</span>
              </button>
            </div>

            {/* ─── INFO INFERIOR ──────────────────────────────── */}
            <div className="absolute bottom-6 left-4 right-20 z-20">
              {/* User */}
              <Link
                href={`/profile/${reel.user.id}`}
                className="inline-flex items-center gap-3 mb-2 group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/60 ring-2 ring-black/20">
                    <Image
                      src={reel.user.avatar}
                      alt={reel.user.name}
                      width={44}
                      height={44}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-black" />
                </div>
                <div>
                  <span className="text-white font-bold text-sm drop-shadow-lg group-hover:text-blue-300 transition-colors">
                    @{reel.user.name.toLowerCase().replace(/\s/g, "")}
                  </span>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="ml-2 px-3 py-0.5 rounded-full bg-blue-500/60 backdrop-blur-sm border border-blue-400/40 text-white text-[10px] font-semibold hover:bg-blue-500/80 transition active:scale-90"
                  >
                    <FiUserPlus size={10} className="inline mr-0.5" /> Follow
                  </button>
                </div>
              </Link>

              {/* Description */}
              <p className="text-white/90 text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] line-clamp-2 mb-1">
                {reel.description}
              </p>

              {/* Song */}
              {reel.song && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                    <FiMusic size={10} className="text-white/70" />
                  </div>
                  <span className="text-white/50 text-xs drop-shadow-lg">{reel.song}</span>
                </div>
              )}
            </div>

            {/* ─── PROGRESS BAR ────────────────────────────────── */}
            <div className="absolute top-0 left-0 right-0 z-30 flex gap-0.5 px-2 pt-1.5">
              {reels.slice(0, 10).map((_, idx) => (
                <div key={idx} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-linear"
                    style={{
                      width: idx === index ? "100%" : idx < index ? "100%" : "0%",
                      backgroundColor: idx === index ? "#fff" : idx < index ? "rgba(255,255,255,0.5)" : "transparent",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* ─── SCROLL HINTS ────────────────────────────────── */}
            {index > 0 && (
              <div
                className="absolute left-0 top-0 bottom-28 w-1/3 z-10 cursor-pointer hidden md:block"
                onClick={() => scrollToReel(index - 1)}
              />
            )}
            {index < reels.length - 1 && (
              <div
                className="absolute right-0 top-0 bottom-28 w-1/3 z-10 cursor-pointer hidden md:block"
                onClick={() => scrollToReel(index + 1)}
              />
            )}
          </div>
        );
      })}

      {/* ─── COMMENTS MODAL ──────────────────────────────────── */}
      {commentsOpen && commentReelId !== null && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCommentsOpen(false)} />

          <div className="relative w-full md:max-w-sm md:rounded-2xl bg-gray-900/95 backdrop-blur-xl rounded-t-2xl shadow-2xl max-h-[75vh] md:max-h-[80vh] flex flex-col overflow-hidden animate-slideUp border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <h3 className="text-white font-semibold text-sm tracking-wide">
                Comments <span className="text-white/40 font-normal">({formatCount(commentCounts[commentReelId] ?? reels.find((r) => r.id === commentReelId)!.comments)})</span>
              </h3>
              <button
                onClick={() => setCommentsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition active:scale-90"
              >
                <FiX size={16} className="text-white/60" />
              </button>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {(reelComments[commentReelId] ?? []).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-white/30">
                  <FiMessageCircle size={44} className="mb-3" />
                  <p className="text-sm font-medium">No comments yet</p>
                  <p className="text-xs text-white/20 mt-1">Be the first to share your thoughts</p>
                </div>
              ) : (
                reelComments[commentReelId]!.map((c) => (
                  <div key={c.id} className="flex gap-3 group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ring-white/10">
                      {c.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white text-xs font-semibold">{c.username}</span>
                        <span className="text-white/30 text-[10px]">
                          {Math.floor((Date.now() - c.timestamp) / 60000)}m ago
                        </span>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={commentsEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-4 shrink-0">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/10 focus-within:border-blue-400/40 transition-all">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendComment(); } }}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/30"
                  autoFocus
                />
                <button
                  onClick={handleSendComment}
                  disabled={!commentText.trim()}
                  className="text-blue-400 hover:text-blue-300 disabled:opacity-30 transition-all p-1.5 active:scale-90"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
