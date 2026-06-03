"use client";

import { useTranslation } from "@/context/LanguageProvider";
import { useState, useRef, useEffect } from "react";
import { FiGlobe, FiCheck } from "react-icons/fi";

export default function LanguageSwitch() {
  const { lang, setLang, languages } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = languages.find((l) => l.code === lang);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition flex items-center gap-1"
      >
        <FiGlobe size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-gray-50 dark:hover:bg-gray-700 ${
                lang === l.code
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <span>{l.flag}</span>
              <span className="flex-1 text-left">{l.name}</span>
              {lang === l.code && <FiCheck size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
