import { UserPlus, Image, Compass, Heart, MessageCircle } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      {/* LADO ESQUERDO: Painel Informativo com Gradiente */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0052FF] via-[#6825FF] to-[#C100FF] p-8 md:p-16 flex flex-col justify-between relative overflow-hidden text-white min-h-[500px] md:min-h-screen">
        {/* Logo e Nome */}
        <div className="flex items-center gap-3 z-10">
          <span className="text-2xl font-bold">🦜 Macaw</span>
        </div>

        {/* Textos Principais e Recursos */}
        <div className="max-w-md my-auto z-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Connect.<br />Share.<br />Discover.
            </h1>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed">
              Join Macaw and connect with friends, share your moments and discover what&apos;s happening around you.
            </p>
          </div>

          {/* Lista de Recursos */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm mt-1">
                <UserPlus size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Connect with friends</h3>
                <p className="text-xs text-blue-200">Find people you know and make new connections.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm mt-1">
                <Image size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Share your moments</h3>
                <p className="text-xs text-blue-200">Post updates, photos and stories with your network.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm mt-1">
                <Compass size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Discover new things</h3>
                <p className="text-xs text-blue-200">Explore trending topics and what&apos;s happening.</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRID DE IMAGENS FLUTUANTES */}
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 w-72 rotate-[-6deg] pointer-events-none">
          {/* Card 1 */}
          <div className="relative bg-white p-2 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
            <img
              src="https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg"
              alt="Nature"
              className="rounded-xl w-full h-36 object-cover"
            />
            <div className="absolute right-[-15px] bottom-4 bg-white p-2 rounded-full shadow-md text-red-500">
              <Heart size={16} fill="currentColor" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white p-2 rounded-2xl shadow-xl transform translate-x-4">
            <img
              src="https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg"
              alt="Creative"
              className="rounded-xl w-full h-36 object-cover"
            />
            <div className="absolute left-[-20px] bottom-6 bg-white p-2 rounded-full shadow-md text-indigo-600">
              <UserPlus size={16} />
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white p-2 rounded-2xl shadow-xl transform -translate-x-2">
            <img
              src="https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg"
              alt="Architecture"
              className="rounded-xl w-full h-36 object-cover"
            />
            <div className="absolute right-6 bottom-[-15px] bg-white p-2 rounded-full shadow-md text-blue-500">
              <MessageCircle size={16} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Formulário */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 md:p-16">
        {children}
      </div>
    </div>
  );
}
