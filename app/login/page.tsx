"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        // Show the server's actual error message rather than a generic one.
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linen px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-ink">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate">
          Sign in to manage sermons, events, and announcements.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-ink outline-none focus:border-ember focus:ring-2 focus:ring-ember/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-ink outline-none focus:border-ember focus:ring-2 focus:ring-ember/30"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-ember px-5 py-2.5 font-medium text-ink hover:bg-ember-dim disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

      </div>
    </main>
  );
}
