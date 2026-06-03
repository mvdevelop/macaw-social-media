"use client";

import { useAuth } from "@/context/AuthProvider";
import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";
import Image from "next/image";
import Link from "next/link";

const Homepage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-400 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // ========== USUÁRIO NÃO AUTENTICADO ==========
  // Landing page 100% baseada no protótipo login-banner.png
  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section - Full width com a imagem de banner */}
        <section className="relative w-full h-screen md:h-[600px]">
          <Image
            src="/login-banner.png"
            alt="Macaw Social Media"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay escuro para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Conteúdo do Hero */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 md:px-16 lg:px-24 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Macaw
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-2 font-light">
                Connect. Share. Discover.
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg">
                Join the conversation and share your moments with the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/sign-up"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-center transition text-lg"
                >
                  Get Started
                </Link>
                <Link
                  href="/sign-in"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold text-center backdrop-blur-sm transition border border-white/30 text-lg"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 md:px-16 lg:px-24 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Everything you need to stay connected
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Connect</h3>
                <p className="text-gray-500 leading-relaxed">
                  Find friends, join groups, and build your community. Stay in touch with the people who matter most.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Share</h3>
                <p className="text-gray-500 leading-relaxed">
                  Share photos, videos, and stories. Express yourself and let your creativity shine.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Discover</h3>
                <p className="text-gray-500 leading-relaxed">
                  Explore trending content, events near you, and new communities that match your interests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Preview / Social Proof Section */}
        <section className="py-16 px-6 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              What&apos;s happening on Macaw
            </h2>
            <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
              Join thousands of people already sharing their stories.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-800">John Doe</p>
                    <span className="text-xs text-gray-400">• 2h ago</span>
                  </div>
                  <p className="text-gray-600">
                    Just joined Macaw! Looking forward to connecting with everyone. This platform is amazing! 🎉
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  SS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-800">Sarah Smith</p>
                    <span className="text-xs text-gray-400">• 5h ago</span>
                  </div>
                  <p className="text-gray-600">
                    Beautiful sunset today! 🌅 Can&apos;t wait to share more photos with everyone. The colors were incredible!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  MK
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-800">Maria Kim</p>
                    <span className="text-xs text-gray-400">• 1d ago</span>
                  </div>
                  <p className="text-gray-600">
                    Just posted my first album! Check out my travel photos from Japan. 🗾📸
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 bg-blue-500">
          <div className="text-center px-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to join?
            </h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">
              Create your account and start connecting with friends and the world around you.
            </p>
            <Link
              href="/sign-up"
              className="inline-block bg-white text-blue-500 px-10 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
            >
              Create Your Account
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-gray-900 text-gray-400 text-sm">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-bold text-white text-lg">Macaw</p>
            <p>&copy; 2026 Macaw Social Media. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // ========== USUÁRIO AUTENTICADO ==========
  return (
    <div className="flex gap-6 pt-6">
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
  );
};

export default Homepage;
