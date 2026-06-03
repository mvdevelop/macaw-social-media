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

    if (data.user) {
      try {
        await fetch("/api/create-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: data.user.id,
            username,
            email: data.user.email,
          }),
        });
      } catch (err) {
        console.error("Erro ao criar usuário:", err);
      }
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
      </section>

      {/* Sign Up */}
      <section className={styles.login}>
        <div className={styles.loginBox}>
          <h2>Create Account</h2>

          <p>Sign up to get started with Macaw</p>

          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
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
              minLength={6}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <span>
            Already have an account?
            <Link href="/sign-in"> Sign In</Link>
          </span>
        </div>
      </section>
    </div>
  );
}
