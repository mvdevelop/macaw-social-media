"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { FiHeart, FiMessageCircle, FiShare2, FiVolume2, FiVolumeX, FiChevronDown, FiMusic } from "react-icons/fi";
import { useTranslation } from "@/context/LanguageProvider";

// ============================================================
// POOL DE VÍDEOS GRATUITOS DA WEB
// Fontes: Pexels Free Stock Videos, Coverr, Mixkit
// NENHUM desses vídeos usa storage do Supabase
// ============================================================
const REEL_VIDEOS = [
  {
    id: 1,
    videoUrl: "https://player.vimeo.com/external/476697255.sd.mp4?s=da2e2d202020654c4693a7a30a0f8d92d01a5ec4&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg",
    user: { id: "v1", name: "Travel Vibes", surname: "", avatar: "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg" },
    description: "Morning timelapse in the city 🌅",
    likes: 1240,
    comments: 48,
    song: "City Lights — Ambient Mix",
  },
  {
    id: 2,
    videoUrl: "https://player.vimeo.com/external/505554239.sd.mp4?s=f58a85f96611f7a9866a395eacfeb2aea3855739&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg",
    user: { id: "v2", name: "Nature Is Art", surname: "", avatar: "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg" },
    description: "The most relaxing waterfall you'll see today 🍃",
    likes: 3420,
    comments: 127,
    song: "Water Sounds — Nature Recordings",
  },
  {
    id: 3,
    videoUrl: "https://player.vimeo.com/external/517615022.sd.mp4?s=8c5aa3ed1b5ce020a0a2cba5e0b7e390ba7f6c2a&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg",
    user: { id: "v3", name: "Tech Future", surname: "", avatar: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg" },
    description: "Building the future, one line of code at a time 💻✨",
    likes: 892,
    comments: 34,
    song: "Lo-Fi Coding Beats",
  },
  {
    id: 4,
    videoUrl: "https://player.vimeo.com/external/543780806.sd.mp4?s=60dd8d6d35e17b5f9e2b2aafb4bc03e7f54e2096&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg",
    user: { id: "v4", name: "Ocean Explorer", surname: "", avatar: "https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg" },
    description: "Drone footage of the coastline 🏖️",
    likes: 5670,
    comments: 213,
    song: "Ocean Waves — Chill Soundscape",
  },
  {
    id: 5,
    videoUrl: "https://player.vimeo.com/external/552481870.sd.mp4?s=c6e3f67022c20e70ebe6007ec4188010bb575ab6&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/18289481/pexels-photo-18289481.jpeg",
    user: { id: "v5", name: "Art Daily", surname: "", avatar: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg" },
    description: "Speed painting a sunset landscape 🎨",
    likes: 2340,
    comments: 89,
    song: "Creative Flow — Instrumental",
  },
  {
    id: 6,
    videoUrl: "https://player.vimeo.com/external/571313891.sd.mp4?s=ba59597b11cd7e58cf4bae1cbe8d42a32ece01c4&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg",
    user: { id: "v6", name: "Street Food", surname: "", avatar: "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg" },
    description: "Making the perfect ramen from scratch 🍜",
    likes: 7890,
    comments: 345,
    song: "Street Eats — Vlog Beats",
  },
  {
    id: 7,
    videoUrl: "https://player.vimeo.com/external/320879520.sd.mp4?s=691f4586dd521bdeb229fbb62449417490e6b545&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg",
    user: { id: "v7", name: "Fitness Daily", surname: "", avatar: "https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg" },
    description: "10 min morning stretch routine 🧘‍♂️",
    likes: 4560,
    comments: 178,
    song: "Energetic Morning — Workout Mix",
  },
  {
    id: 8,
    videoUrl: "https://player.vimeo.com/external/449799674.sd.mp4?s=1953a62ac53ebe99a4d1013ced1b4c12bf9ba0aa&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/2504709/pexels-photo-2504709.jpeg",
    user: { id: "v8", name: "Space Lover", surname: "", avatar: "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg" },
    description: "Time-lapse of the night sky ✨🌌",
    likes: 12340,
    comments: 567,
    song: "Space Odyssey — Ambient Piano",
  },
  {
    id: 9,
    videoUrl: "https://player.vimeo.com/external/446932740.sd.mp4?s=6bb0eec6eab3125603df91a8a002e68b082ea4dc&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/35538741/pexels-photo-35538741.jpeg",
    user: { id: "v9", name: "Architecture", surname: "", avatar: "https://images.pexels.com/photos/35459874/pexels-photo-35459874.jpeg" },
    description: "Incredible modern architecture tour 🏛️",
    likes: 3210,
    comments: 98,
    song: "Urban Explorer — Electronic",
  },
  {
    id: 10,
    videoUrl: "https://player.vimeo.com/external/485379263.sd.mp4?s=4e3a6b8035ae474d7568145cac0c7735665b12d7&profile_id=165&oauth2_token_id=57447761",
    thumbnail: "https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg",
    user: { id: "v10", name: "Pet Paradise", surname: "", avatar: "https://images.pexels.com/photos/35487966/pexels-photo-35487966.jpeg" },
    description: "Dogs being dogs — the best compilation 🐕❤️",
    likes: 15670,
    comments: 890,
    song: "Happy Tunes — Upbeat Pop",
  },
];

function formatCount(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function ReelsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [reels] = useState(REEL_VIDEOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [likedSet, setLikedSet] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const touchStartY = useRef(0);

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

  // Wheel event
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

  // Play/pause vídeos baseado no currentIndex
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

  const handleLike = (reelId: number) => {
    setLikedSet((prev) => {
      const next = new Set(prev);
      if (next.has(reelId)) {
        next.delete(reelId);
        setLikeCounts((c) => ({ ...c, [reelId]: (c[reelId] || REEL_VIDEOS.find((r) => r.id === reelId)!.likes) - 1 }));
      } else {
        next.add(reelId);
        setLikeCounts((c) => ({ ...c, [reelId]: (c[reelId] || REEL_VIDEOS.find((r) => r.id === reelId)!.likes) + 1 }));
      }
      return next;
    });
  };

  const handleShare = async (reel: typeof REEL_VIDEOS[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: reel.description, url: window.location.href });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
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
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={reel.thumbnail}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              )}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition"
              >
                <FiChevronDown size={20} className="rotate-180" />
              </button>
              <span className="text-white/60 text-xs font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {index + 1} / {reels.length}
              </span>
            </div>

            {/* Right side actions */}
            <div className="absolute right-3 bottom-28 z-10 flex flex-col items-center gap-6">
              {/* Like */}
              <button
                onClick={() => handleLike(reel.id)}
                className="flex flex-col items-center gap-1 text-white"
              >
                <div className={`p-2 rounded-full bg-black/20 backdrop-blur-sm transition-all ${
                  isLiked ? "scale-110" : "hover:scale-110"
                }`}>
                  <FiHeart
                    size={26}
                    className={`drop-shadow-lg transition-colors ${
                      isLiked ? "text-red-500 fill-red-500" : "text-white"
                    }`}
                  />
                </div>
                <span className="text-xs font-semibold drop-shadow-lg">{formatCount(displayLikes)}</span>
              </button>

              {/* Comment */}
              <button className="flex flex-col items-center gap-1 text-white">
                <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:scale-110 transition">
                  <FiMessageCircle size={26} className="drop-shadow-lg" />
                </div>
                <span className="text-xs font-semibold drop-shadow-lg">{formatCount(reel.comments)}</span>
              </button>

              {/* Share */}
              <button
                onClick={() => handleShare(reel)}
                className="flex flex-col items-center gap-1 text-white"
              >
                <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:scale-110 transition">
                  <FiShare2 size={24} className="drop-shadow-lg" />
                </div>
                <span className="text-xs font-semibold drop-shadow-lg">Share</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-6 left-4 right-16 z-10">
              <Link
                href={`/profile/${reel.user.id}`}
                className="flex items-center gap-3 mb-2"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shrink-0">
                  <Image
                    src={reel.user.avatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"}
                    alt={reel.user.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-white font-semibold text-sm drop-shadow-lg">
                  @{reel.user.name.toLowerCase().replace(/\s/g, "")}
                </span>
                <button className="ml-2 px-3 py-1 rounded-full border border-white/40 text-white text-xs font-semibold hover:bg-white/20 transition">
                  Follow
                </button>
              </Link>
              <p className="text-white text-sm drop-shadow-lg line-clamp-2">
                {reel.description}
              </p>
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

            {/* Navigation hint (seta para baixo) */}
            {index < reels.length - 1 && (
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 cursor-pointer animate-bounce"
                onClick={() => scrollToReel(index + 1)}
              >
                <FiChevronDown size={20} className="text-white/40" />
              </div>
            )}

            {/* Tap zones: left/right to navigate (só visível no hover) */}
            {index > 0 && (
              <div
                className="absolute left-0 top-0 bottom-24 w-1/3 z-10 cursor-pointer hidden md:block"
                onClick={() => scrollToReel(index - 1)}
              />
            )}
            {index < reels.length - 1 && (
              <div
                className="absolute right-0 top-0 bottom-24 w-1/3 z-10 cursor-pointer hidden md:block"
                onClick={() => scrollToReel(index + 1)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
