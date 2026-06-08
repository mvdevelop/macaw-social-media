"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthRecoveryPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"processing" | "error">("processing");
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const handleRecovery = async () => {
      try {
        const supabase = createClient();

        // The Supabase browser client auto-detects the session from URL hash
        // Give it a moment to process, then check
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          // Session recovered successfully — redirect to reset password
          router.push("/reset-password");
        } else {
          // Check if hash exists but session wasn't created
          const hash = window.location.hash;
          if (hash && hash.includes("type=recovery")) {
            // Try to set session manually from the hash
            // The hash format is: #access_token=xxx&refresh_token=yyy&type=recovery&...
            const params = new URLSearchParams(hash.replace("#", "?"));
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");

            if (accessToken) {
              const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken || "",
              });

              if (!error) {
                router.push("/reset-password");
                return;
              }
            }
          }

          setStatus("error");
          setTimeout(() => router.push("/sign-in?error=recovery_failed"), 3000);
        }
      } catch {
        setStatus("error");
        setTimeout(() => router.push("/sign-in?error=recovery_failed"), 3000);
      }
    };

    handleRecovery();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A8CFF] via-[#7C5CFC] to-[#A855F7] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {status === "processing" ? (
          <>
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Processing your recovery link...
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Please wait a moment
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✕</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Invalid or expired link
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Redirecting to sign in...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
