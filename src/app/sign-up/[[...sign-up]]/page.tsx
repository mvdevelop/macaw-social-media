"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Cria o registro do usuário no banco (tabela users do Supabase)
      try {
        const res = await fetch("/api/create-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: data.user.id,
            username,
            email: data.user.email,
          }),
        });

        if (!res.ok) {
          console.error("Falha ao criar registro de usuário");
        }
      } catch (err) {
        console.error("Erro ao criar usuário no banco:", err);
      }
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="h-[calc(100vh-96px)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">
          Sign Up
        </h1>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="text-sm text-gray-600">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourusername"
              required
              className="w-full p-2 rounded-lg bg-slate-100 outline-none mt-1"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full p-2 rounded-lg bg-slate-100 outline-none mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full p-2 rounded-lg bg-slate-100 outline-none mt-1"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
