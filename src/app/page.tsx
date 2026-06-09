"use client";

import { useAuth } from "@/context/AuthProvider";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";
import Link from "next/link";
import { FiUsers, FiCamera, FiCompass } from "react-icons/fi";
import MacawIcon from "@/components/MacawIcon";
import { isProfileComplete } from "@/lib/onboarding";

const Homepage = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  // Redireciona novos usuários para o onboarding
  useEffect(() => {
    if (loading) return;
    if (!user) {
      setCheckingOnboarding(false);
      return;
    }
    isProfileComplete().then(({ needsOnboarding }) => {
      if (needsOnboarding) {
        router.push("/onboarding");
      } else {
        setCheckingOnboarding(false);
      }
    }).catch(() => setCheckingOnboarding(false));
  }, [user, loading, router]);

  if (loading || checkingOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4A8CFF] via-[#7C5CFC] to-[#A855F7] flex items-center justify-center">
        <div className="text-white text-center">
          <MacawIcon size={56} className="mx-auto mb-4 text-white" />
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // ===== NÃO LOGADO =====
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4A8CFF] via-[#7C5CFC] to-[#A855F7] flex flex-col">
        <nav className="flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-3">
            <MacawIcon size={36} className="text-white" />
            <span className="text-white text-2xl font-bold">{t.landing.title}</span>
          </div>
          <div className="flex gap-4">
            <Link href="/sign-in" className="text-white/80 hover:text-white transition px-4 py-2">
              {t.landing.signIn}
            </Link>
            <Link href="/sign-up" className="bg-white text-blue-600 px-5 py-2 rounded-xl font-semibold hover:bg-blue-50 transition">
              {t.landing.getStarted}
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center px-6 pb-16">
          <div className="max-w-4xl text-center text-white">
            <MacawIcon size={96} className="text-white mx-auto mb-6" />
            <h1 className="text-6xl md:text-8xl font-bold mb-4">{t.landing.title}</h1>
            <p className="text-2xl md:text-3xl font-light mb-3">{t.landing.subtitle}</p>
            <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.landing.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/sign-up" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-lg">
                {t.landing.getStarted}
              </Link>
              <Link href="/sign-in" className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition">
                {t.landing.signIn}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <FiUsers className="text-3xl mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t.features.connect}</h3>
                <p className="text-blue-100 text-sm">{t.features.connectDesc}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <FiCamera className="text-3xl mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t.features.share}</h3>
                <p className="text-blue-100 text-sm">{t.features.shareDesc}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <FiCompass className="text-3xl mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t.features.discover}</h3>
                <p className="text-blue-100 text-sm">{t.features.discoverDesc}</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center py-6 text-blue-200 text-sm border-t border-white/10">
          &copy; 2026 Macaw. {t.common.rights}
        </footer>
      </div>
    );
  }

  // ===== LOGADO =====
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex gap-6 pt-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="hidden xl:block w-[20%]">
          <LeftMenu type="home" />
        </div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <div className="flex flex-col gap-6">
            <Stories />
            <AddPost />
            <Feed />
          </div>
        </div>
        <div className="hidden lg:block w-[30%]">
          <RightMenu />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
