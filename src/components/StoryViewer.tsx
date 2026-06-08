"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
}

interface StoryItem {
  id: number;
  img: string;
  user: StoryUser;
}

interface StoryViewerProps {
  stories: StoryItem[];
  initialIndex: number;
  onClose: () => void;
}

const STORY_DURATION = 5000; // 5 segundos por story

export default function StoryViewer({ stories, initialIndex, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const progressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef(0);

  const current = stories[currentIndex];
  const hasNext = currentIndex < stories.length - 1;
  const hasPrev = currentIndex > 0;

  // Navegação
  const goNext = useCallback(() => {
    if (hasNext) {
      setLoaded(false);
      setProgress(0);
      progressRef.current = 0;
      pausedProgressRef.current = 0;
      setCurrentIndex((i) => i + 1);
    } else {
      onClose();
    }
  }, [hasNext, onClose]);

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setLoaded(false);
      setProgress(0);
      progressRef.current = 0;
      pausedProgressRef.current = 0;
      setCurrentIndex((i) => i - 1);
    }
  }, [hasPrev]);

  // Progresso animado
  useEffect(() => {
    if (paused || !loaded) return;

    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const totalElapsed = pausedProgressRef.current + elapsed;
      const pct = Math.min((totalElapsed / STORY_DURATION) * 100, 100);

      setProgress(pct);
      progressRef.current = totalElapsed;

      if (totalElapsed >= STORY_DURATION) {
        goNext();
        return;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [currentIndex, paused, loaded, goNext]);

  // Teclado: ESC fecha, setas navegam
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
        case " ":
          e.preventDefault();
          setPaused((p) => !p);
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  // Previne scroll do body enquanto aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const mid = rect.width / 3;

    if (x < mid && hasPrev) {
      goPrev();
    } else if (x > rect.width - mid && hasNext) {
      goNext();
    } else {
      // toggle pause no meio
      setPaused((p) => !p);
    }
  };

  if (!current || !current.img) {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition"
        aria-label="Close"
      >
        <FiX size={22} />
      </button>

      {/* Pause indicator */}
      {paused && (
        <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white">
          <FiPause size={18} />
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 px-2 pt-2">
        {stories.map((story, idx) => (
          <div
            key={story.id}
            className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
              style={{
                width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? "100%" : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* User info */}
      <div className="absolute top-6 left-4 z-20 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white ring-2 ring-blue-500 flex-shrink-0">
          {current.user.avatar ? (
            <Image
              src={current.user.avatar}
              alt={current.user.name}
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
              {current.user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        <span className="text-white text-sm font-semibold drop-shadow-lg">
          {current.user.name}
        </span>
      </div>

      {/* Story image */}
      <div
        className="relative w-full h-full max-w-[460px] max-h-[90vh] cursor-pointer select-none"
        onClick={handleClick}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={current.img}
          alt="Story"
          fill
          sizes="460px"
          className={`object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          priority
        />

        {/* Hints laterais */}
        {hasPrev && (
          <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-start pl-2 opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
              <FiChevronLeft size={18} className="text-white" />
            </div>
          </div>
        )}
        {hasNext && (
          <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
              <FiChevronRight size={18} className="text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Pause overlay — tap to resume */}
      {paused && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => setPaused(false)}
        />
      )}
    </div>
  );
}
