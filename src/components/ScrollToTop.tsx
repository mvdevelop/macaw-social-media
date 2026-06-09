"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 md:bottom-24 right-6 z-40 w-10 h-10 bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition active:scale-90 animate-fadeIn"
      aria-label="Scroll to top"
    >
      <FiArrowUp size={20} />
    </button>
  );
}
