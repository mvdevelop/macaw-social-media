"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/context/LanguageProvider";

/**
 * Componente de anúncio com suporte a:
 * 1. Google AdSense (Auto Ads via script no layout)
 * 2. Fallback para anúncios casuais/images quando AdSense não está configurado
 * 3. Diferentes tamanhos (sm, md, lg)
 */
const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Alturas baseadas no tamanho
  const heightMap = { sm: "h-24", md: "h-36", lg: "h-48" };

  // Tenta carregar AdSense (só funciona se o script estiver no layout)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasAdsense = !!document.querySelector('script[src*="googlesyndication"]');
    if (!hasAdsense || !adRef.current) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silencioso — AdSense pode não estar configurado
    }
  }, []);

  /**
   * Pool de anúncios simulados (fallback quando AdSense não está configurado).
   * Use imagens reais e links reais de afiliados se quiser monetizar manualmente.
   */
  const fallbackAds = [
    {
      image: "https://images.pexels.com/photos/35538741/pexels-photo-35538741.jpeg",
      logo: "/lists.png",
      title: "BigChef Rio de Janeiro",
      description: "Restaurante premiado com a melhor culinária da cidade. Venha conhecer!",
      link: "https://example.com/bigchef",
    },
    {
      image: "https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg",
      logo: "/lists.png",
      title: "TechHub Coworking",
      description: "O melhor espaço de coworking para devs criativos. Wifi gigabit + café artesanal.",
      link: "https://example.com/techhub",
    },
    {
      image: "https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg",
      logo: "/lists.png",
      title: "Flow Academy",
      description: "Cursos online de fotografia, design e programação. Comece grátis!",
      link: "https://example.com/flow",
    },
    {
      image: "https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg",
      logo: "/lists.png",
      title: "GreenLife Suplementos",
      description: "Suplementos naturais para sua melhor versão. 20% off na primeira compra.",
      link: "https://example.com/greenlife",
    },
  ];

  // Rotaciona o anúncio baseado no size + data para não repetir sempre
  const today = new Date().toDateString();
  const adIndex = (today.length + size.length + (size === "sm" ? 0 : size === "md" ? 2 : 4)) % fallbackAds.length;
  const ad = fallbackAds[adIndex];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 font-medium mb-3">
        <span>{t.common.sponsored}</span>
        <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 transition">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </div>
      </div>

      {/* Google AdSense (se configurado) — ins ad automático */}
      {process.env.NEXT_PUBLIC_ADSENSE_ID && (
        <div className="adsense-container">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            data-ad-slot={size === "sm" ? "1234567890" : "9876543210"}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}

      {/* Fallback visual ad — sempre visível */}
      <div className={`flex flex-col gap-3`}>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener sponsored nofollow"
          className={`relative w-full ${heightMap[size]} rounded-lg overflow-hidden block group`}
        >
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        <a
          href={ad.link}
          target="_blank"
          rel="noopener sponsored nofollow"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <img src={ad.logo} alt="" width={24} height={24} className="rounded-full w-6 h-6 object-cover bg-gray-100" />
          <span className="text-blue-500 font-medium text-sm">{ad.title}</span>
        </a>

        <p className={`text-gray-500 dark:text-gray-400 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          {ad.description}
        </p>

        <a
          href={ad.link}
          target="_blank"
          rel="noopener sponsored nofollow"
          className="block w-full text-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-2 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {t.common.learnMore}
        </a>
      </div>
    </div>
  );
};

export default Ad;
