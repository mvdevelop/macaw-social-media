import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Side - Gradient Panel */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0052FF] via-[#4340FF] via-[#6825FF] via-[#8500FF] to-[#C100FF] p-8 md:p-16 flex flex-col justify-between relative overflow-hidden text-white min-h-[500px] md:min-h-screen">
        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <span className="text-2xl font-bold">🦜 Macaw</span>
        </div>

        {/* Content */}
        <div className="max-w-md my-auto z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Connect.<br />Share.<br />Discover.
            </h1>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              Join Macaw and connect with friends, share your moments and discover what&apos;s happening around you.
            </p>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 w-72 rotate-[-6deg] pointer-events-none opacity-40">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <p className="text-white text-sm">✉️ Connect with friends</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 translate-x-6">
            <p className="text-white text-sm">📸 Share your moments</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <p className="text-white text-sm">🌍 Discover new things</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 md:p-16">
        {children}
      </div>
    </div>
  );
}
