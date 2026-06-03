import en from "./en";
import pt from "./pt";
import es from "./es";
import type { Translations } from "./en";

export type Language = "en" | "pt" | "es";

const translations: Record<Language, Translations> = { en, pt, es };

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export type { Translations };
