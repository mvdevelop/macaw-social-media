"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { completeOnboarding, isProfileComplete } from "@/lib/onboarding";
import MacawIcon from "@/components/MacawIcon";
import { FiCamera, FiCheck, FiArrowRight, FiUser, FiAtSign } from "react-icons/fi";

type Step = "welcome" | "profile" | "photo" | "done";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Form data
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const check = async () => {
      const { complete, needsOnboarding } = await isProfileComplete();
      if (!needsOnboarding || complete) {
        router.push("/");
        return;
      }
      setLoading(false);
    };
    check();
  }, [router]);

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Digite seu nome");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("surname", surname.trim());
      formData.append("username", username.trim() || name.trim().toLowerCase());
      formData.append("description", description.trim());
      if (avatarFile) formData.append("avatar", avatarFile);

      await completeOnboarding(formData);
      setStep("done");

      // Redireciona após um momento
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4A8CFF] via-[#7C5CFC] to-[#A855F7] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A8CFF] via-[#7C5CFC] to-[#A855F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <MacawIcon size={48} className="text-white mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-white">Macaw</h1>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {(["welcome", "profile", "photo", "done"] as Step[]).map((s, i) => {
              const stepNum = i + 1;
              const isActive = step === s || (step === "done" && i <= 3);
              const isCurrent = step === s;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] text-white scale-110 shadow-lg"
                        : isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                    }`}
                  >
                    {isActive && step === "done" ? <FiCheck size={16} /> : stepNum}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-8 h-0.5 rounded transition-colors ${
                        isActive ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Welcome Step */}
          {step === "welcome" && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mx-auto mb-6">
                <MacawIcon size={40} className="text-[#4A8CFF]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Bem-vindo ao Macaw! 🎉
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Antes de começar, vamos personalizar seu perfil. Você precisará de:
              </p>

              <div className="text-left space-y-3 mb-8">
                {[
                  { icon: "👤", text: "Seu nome e sobrenome" },
                  { icon: "📸", text: "Uma foto de perfil" },
                  { icon: "✏️", text: "Uma breve bio sobre você" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep("profile")}
                className="w-full bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Vamos começar
                <FiArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Profile Step */}
          {step === "profile" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                Seu perfil
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Como você quer ser conhecido no Macaw?
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Seu sobrenome"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <FiAtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.replace(/[^a-z0-9_]/g, ""))}
                      placeholder={name ? name.toLowerCase().replace(/\s/g, "_") : "username"}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Fale um pouco sobre você..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-3">{error}</p>
              )}

              <button
                onClick={() => setStep("photo")}
                disabled={!name.trim()}
                className="w-full bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition active:scale-[0.98] mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continuar
                <FiArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Photo Step */}
          {step === "photo" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                Sua foto de perfil
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Adicione uma foto para as pessoas te reconhecerem
              </p>

              <div className="flex flex-col items-center gap-6">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group ring-4 ring-gray-100 dark:ring-gray-700"
                >
                  {avatarPreview ? (
                    <Image src={avatarPreview} alt="Preview" fill sizes="128px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                      <FiUser size={48} className="text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <FiCamera size={28} className="text-white" />
                  </div>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                  className="hidden"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    {avatarPreview ? "Trocar foto" : "Escolher foto"}
                  </button>
                  {!avatarPreview && (
                    <button
                      onClick={() => setStep("done")}
                      className="px-6 py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition font-medium"
                    >
                      Pular
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#4A8CFF] to-[#A855F7] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition active:scale-[0.98] mt-8 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    Finalizar
                    <FiCheck size={18} />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Done Step */}
          {step === "done" && (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 animate-bounce">
                <FiCheck size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Tudo pronto! 🚀
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Seu perfil foi criado. Bem-vindo ao Macaw!
              </p>
              <div className="w-8 h-8 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 mt-3">Redirecionando...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
