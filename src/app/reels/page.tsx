"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  FiHeart, FiMessageCircle, FiShare2, FiVolume2, FiVolumeX,
  FiChevronDown, FiMusic, FiSend, FiX, FiRefreshCw, FiUserPlus,
} from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";

// ============================================================
// POOL DE VÍDEOS GRATUITOS DA WEB (10 URLs únicas reutilizadas)
// ============================================================
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
  "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg",
  "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
  "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg",
  "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg",
  "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg",
  "https://images.pexels.com/photos/35459874/pexels-photo-35459874.jpeg",
  "https://images.pexels.com/photos/35487966/pexels-photo-35487966.jpeg",
  "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const touchStartY = useRef(0);

  // ── Comments state ──
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentReelId, setCommentReelId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [reelComments, setReelComments] = useState<Record<number, ReelComment[]>>({});
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Refresh / shuffle
  const handleRefresh = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);
    // Pausa todos os vídeos
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
      const el = document.getElementById("reel-0");
      if (el) el.scrollIntoView({ behavior: "instant" });
    }, 400);
  }, [refreshing]);

  // Touch para mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < reels.length - 1) scrollToReel(currentIndex + 1);
      else if (diff < 0 && currentIndex > 0) scrollToReel(currentIndex - 1);
    }
  };

  const scrollToReel = useCallback((index: number) => {
    const el = document.getElementById(`reel-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(index);
    }
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < reels.length - 1) {
      scrollToReel(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      scrollToReel(currentIndex - 1);
    }
  }, [currentIndex, reels.length, scrollToReel]);

  // IntersectionObserver
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

  // Play/pause
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

  // Preload próximo vídeo
  useEffect(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx < reels.length) {
      setLoadedVideos((prev) => new Set(prev).add(reels[nextIdx].id));
    }
  }, [currentIndex, reels]);

  // Scroll comments to bottom
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
    const shareData = {
      title: `Macaw Reel by ${reel.user.name}`,
      text: reel.description,
      url: window.location.href,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share(shareData); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(`${reel.description}\n\n${window.location.href}`);
      alert("Link copied!");
    } catch {}
  };

  const current = reels[currentIndex];

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
            {/* Vídeo */}
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              {isActive || loadedVideos.has(reel.id) ? (
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
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image src={reel.thumbnail} alt="" fill sizes="100vw" className="object-cover" />
              )}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.back()}
                  className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition"
                >
                  <FiChevronDown size={20} className="rotate-180" />
                </button>
                {/* Refresh button */}
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition disabled:opacity-50"
                  title="Refresh reels"
                >
                  <FiRefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                </button>
              </div>
              <span className="text-white/60 text-xs font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {index + 1} / {reels.length}
              </span>
            </div>

            {/* Right side actions */}
            <div className="absolute right-3 bottom-28 z-10 flex flex-col items-center gap-6">
              {/* Like */}
              <button onClick={() => handleLike(reel.id)} className="flex flex-col items-center gap-1 text-white">
                <div className={`p-2 rounded-full bg-black/20 backdrop-blur-sm transition-all ${isLiked ? "scale-110" : "hover:scale-110"}`}>
                  <FiHeart size={26} className={`drop-shadow-lg transition-colors ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`} />
                </div>
                <span className="text-xs font-semibold drop-shadow-lg">{formatCount(displayLikes)}</span>
              </button>

              {/* Comment */}
              <button onClick={() => handleOpenComments(reel.id)} className="flex flex-col items-center gap-1 text-white">
                <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:scale-110 transition">
                  <FiMessageCircle size={26} className="drop-shadow-lg" />
                </div>
                <span className="text-xs font-semibold drop-shadow-lg">{formatCount(displayComments)}</span>
              </button>

              {/* Share */}
              <button onClick={() => handleShare(reel)} className="flex flex-col items-center gap-1 text-white">
                <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:scale-110 transition">
                  <FiShare2 size={24} className="drop-shadow-lg" />
                </div>
                <span className="text-xs font-semibold drop-shadow-lg">Share</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-6 left-4 right-16 z-10">
              <Link href={`/profile/${reel.user.id}`} className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shrink-0">
                  <Image src={reel.user.avatar} alt={reel.user.name} width={40} height={40} className="object-cover w-full h-full" />
                </div>
                <span className="text-white font-semibold text-sm drop-shadow-lg">
                  @{reel.user.name.toLowerCase().replace(/\s/g, "")}
                </span>
                <span className="ml-2 px-3 py-1 rounded-full border border-white/40 text-white text-xs font-semibold hover:bg-white/20 transition cursor-pointer inline-flex items-center gap-1">
                  <FiUserPlus size={12} /> Follow
                </span>
              </Link>
              <p className="text-white text-sm drop-shadow-lg line-clamp-2">{reel.description}</p>
              {reel.song && (
                <div className="flex items-center gap-2 mt-2 text-white/70 text-xs">
                  <FiMusic size={12} />
                  <span className="drop-shadow-lg">{reel.song}</span>
                </div>
              )}
            </div>

            {/* Sound toggle */}
            <button
              onClick={() => setMuted(!muted)}
              className="absolute top-16 right-4 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition"
            >
              {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
            </button>
          </div>
        );
      })}

      {/* ── Comments Modal ── */}
      {commentsOpen && commentReelId !== null && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCommentsOpen(false)} />

          {/* Panel */}
          <div className="relative w-full md:max-w-sm md:rounded-2xl bg-gray-900 md:bg-gray-900 rounded-t-2xl shadow-2xl max-h-[70vh] md:max-h-[80vh] flex flex-col overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 shrink-0">
              <h3 className="text-white font-semibold text-sm">
                Comments ({formatCount(commentCounts[commentReelId] ?? reels.find((r) => r.id === commentReelId)!.comments)})
              </h3>
              <button onClick={() => setCommentsOpen(false)} className="p-1 hover:bg-gray-700 rounded-lg transition">
                <FiX size={18} className="text-gray-400" />
              </button>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(reelComments[commentReelId] ?? []).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <FiMessageCircle size={36} className="mb-2 opacity-50" />
                  <p className="text-sm">No comments yet. Be the first!</p>
                </div>
              ) : (
                reelComments[commentReelId]!.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A8CFF] to-[#A855F7] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {c.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white text-xs font-semibold">{c.username}</span>
                        <span className="text-gray-500 text-[10px]">
                          {Math.floor((Date.now() - c.timestamp) / 60000)}m ago
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={commentsEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-700 p-3 shrink-0">
              <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendComment(); } }}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500"
                  autoFocus
                />
                <button
                  onClick={handleSendComment}
                  disabled={!commentText.trim()}
                  className="text-blue-400 hover:text-blue-300 disabled:opacity-40 transition p-1"
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
