"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Language, Translations } from "@/lib/i18n";
import { getTranslations, languages } from "@/lib/i18n";

type LanguageContextType = {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  languages: typeof languages;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: getTranslations("en"),
  setLang: () => {},
  languages,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [t, setT] = useState<Translations>(getTranslations("en"));

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    setT(getTranslations(newLang));
    if (typeof window !== "undefined") {
      localStorage.setItem("macaw-lang", newLang);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("macaw-lang") as Language;
    if (saved && ["en", "pt", "es"].includes(saved)) {
      setLangState(saved);
      setT(getTranslations(saved));
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);
