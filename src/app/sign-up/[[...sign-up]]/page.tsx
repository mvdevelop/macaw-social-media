"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUsers, FaImages, FaCompass } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import styles from "../login.module.css";

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
        data: { username },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user?.identities?.length === 0) {
      setError("This email is already registered. Please sign in.");
      setLoading(false);
      return;
    }

    // Trigger cuidará de criar o perfil automaticamente
    router.push("/");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.logo}>🦜 <span>Macaw</span></div>
        <div className={styles.content}>
          <h1>Connect.<br />Share.<br />Discover.</h1>
          <p>Join Macaw and connect with friends, share your moments and discover what&apos;s happening around you.</p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <FaUsers />
              <div>
                <h4>Connect with friends</h4>
                <span>Find people you know and create new connections.</span>
              </div>
            </div>
            <div className={styles.feature}>
              <FaImages />
              <div>
                <h4>Share your moments</h4>
                <span>Post photos, stories and updates.</span>
              </div>
            </div>
            <div className={styles.feature}>
              <FaCompass />
              <div>
                <h4>Discover new things</h4>
                <span>Explore trends and communities.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.login}>
        <div className={styles.loginBox}>
          <h2>Create Account</h2>
          <p>Sign up to get started with Macaw</p>

          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSignUp}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            <button type="submit" disabled={loading}>{loading ? "Creating account..." : "Sign Up"}</button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <button type="button" onClick={handleGoogleLogin} className={styles.googleBtn}>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          <span>Already have an account? <Link href="/sign-in">Sign In</Link></span>
        </div>
      </section>
    </div>
  );
}
