"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaUsers, FaImages, FaCompass } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import styles from "../login.module.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.logo}>
          🦜 <span>Macaw</span>
        </div>

        <div className={styles.content}>
          <h1>
            Connect.
            <br />
            Share.
            <br />
            Discover.
          </h1>

          <p>
            Join Macaw and connect with friends,
            share your moments and discover
            what&apos;s happening around you.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <FaUsers />
              <div>
                <h4>Connect with friends</h4>
                <span>
                  Find people you know and create new
                  connections.
                </span>
              </div>
            </div>

            <div className={styles.feature}>
              <FaImages />
              <div>
                <h4>Share your moments</h4>
                <span>
                  Post photos, stories and updates.
                </span>
              </div>
            </div>

            <div className={styles.feature}>
              <FaCompass />
              <div>
                <h4>Discover new things</h4>
                <span>
                  Explore trends and communities.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating cards */}
        <div className={styles.cards}>
          <div className={`${styles.card} ${styles.card1}`}>
            <Image
              src="https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg"
              alt=""
              fill
              sizes="240px"
            />
          </div>

          <div className={`${styles.card} ${styles.card2}`}>
            <Image
              src="https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg"
              alt=""
              fill
              sizes="240px"
            />
          </div>

          <div className={`${styles.card} ${styles.card3}`}>
            <Image
              src="https://images.pexels.com/photos/35350413/pexels-photo-35350413.jpeg"
              alt=""
              fill
              sizes="240px"
            />
          </div>
        </div>
      </section>

      {/* Login */}
      <section className={styles.login}>
        <div className={styles.loginBox}>
          <h2>Welcome to Macaw</h2>

          <p>Sign in to continue to your account</p>

          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <span>
            Don&apos;t have an account?
            <Link href="/sign-up"> Sign Up</Link>
          </span>
        </div>
      </section>
    </div>
  );
}
