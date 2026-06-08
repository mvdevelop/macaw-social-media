"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/context/LanguageProvider";
import MacawIcon from "@/components/MacawIcon";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verifica se tem o hash de recovery na URL (enviado pelo Supabase)
    const hash = window.location.hash;
    if (!hash || !hash.includes("type=recovery")) {
      setError(t.resetPassword.invalidLink);
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError(t.resetPassword.validation);
      return;
    }
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/sign-in"), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A8CFF] via-[#7C5CFC] to-[#A855F7] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <MacawIcon size={48} className="block mx-auto" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{t.resetPassword.title}</h1>
        </div>

        {success ? (
          <div className="text-center">
            <p className="text-green-500 font-semibold mb-2">{t.resetPassword.success}</p>
            <p className="text-sm text-gray-400">{t.resetPassword.redirecting}</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {error && (
              <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg">{error}</p>
            )}
            <input
              type="password"
              placeholder={t.resetPassword.newPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? t.resetPassword.updating : t.resetPassword.updatePassword}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
