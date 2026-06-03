"use client";

import { useTranslation } from "@/context/LanguageProvider";
import { languages } from "@/lib/i18n";
import { useState, useRef, useEffect } from "react";
import { FiGlobe, FiCheck } from "react-icons/fi";
import { Heart, MessageCircle, Users, Camera, Compass } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      {/* LADO ESQUERDO: Painel Informativo com Gradiente */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0052FF] via-[#6825FF] to-[#C100FF] p-8 md:p-16 flex flex-col justify-between relative overflow-hidden text-white min-h-[500px] md:min-h-screen">
        {/* Logo e Language Switcher */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">🦜 Macaw</span>
          </div>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/90 px-3 py-2 rounded-lg transition text-sm"
            >
              <FiGlobe size={16} />
              <span>{languages.find((l) => l.code === lang)?.flag}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-gray-50 ${
                      lang === l.code
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
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
        </div>

        {/* Textos Principais */}
        <div className="max-w-md my-auto z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {t.landing.subtitle}
            </h1>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              {t.landing.description}
            </p>
          </div>

          {/* Lista de Recursos */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm mt-1">
                <Users size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{t.features.connect}</h3>
                <p className="text-xs text-blue-200">{t.features.connectDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm mt-1">
                <Camera size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{t.features.share}</h3>
                <p className="text-xs text-blue-200">{t.features.shareDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm mt-1">
                <Compass size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{t.features.discover}</h3>
                <p className="text-xs text-blue-200">{t.features.discoverDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRID DE IMAGENS FLUTUANTES */}
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 w-72 rotate-[-6deg] pointer-events-none">
          <div className="relative bg-white p-2 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
            <img src="https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg" alt="" className="rounded-xl w-full h-36 object-cover" />
            <div className="absolute right-[-15px] bottom-4 bg-white p-2 rounded-full shadow-md text-red-500">
              <Heart size={16} fill="currentColor" />
            </div>
          </div>
          <div className="relative bg-white p-2 rounded-2xl shadow-xl transform translate-x-4">
            <img src="https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg" alt="" className="rounded-xl w-full h-36 object-cover" />
            <div className="absolute left-[-20px] bottom-6 bg-white p-2 rounded-full shadow-md text-indigo-600">
              <Users size={16} />
            </div>
          </div>
          <div className="relative bg-white p-2 rounded-2xl shadow-xl transform -translate-x-2">
            <img src="https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg" alt="" className="rounded-xl w-full h-36 object-cover" />
            <div className="absolute right-6 bottom-[-15px] bg-white p-2 rounded-full shadow-md text-blue-500">
              <MessageCircle size={16} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Formulário */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 flex flex-col justify-center items-center p-8 md:p-16 transition-colors">
        {children}
      </div>
    </div>
  );
}
