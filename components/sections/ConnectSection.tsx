"use client";

import { useState } from "react";

export default function ConnectSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  const inputClasses =
    "mt-1.5 w-full rounded-xl border border-ink/10 bg-linen/60 px-4 py-3 text-ink outline-none transition focus:border-ember focus:bg-white focus:ring-4 focus:ring-ember/10";

  return (
    <section id="connect" className="scroll-mt-24 bg-charcoal px-6 py-20 md:px-12">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs uppercase tracking-wide text-ember">Get in touch</p>
        <h2 className="font-display mt-2 text-4xl text-bone sm:text-5xl">Connect with us</h2>
        <p className="mx-auto mt-3 max-w-md text-bone/70">
          Send a message, a prayer request, or a question — we&rsquo;d love to
          hear from you.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-linen p-8 shadow-xl sm:p-10">
        {status === "done" ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ember/15 text-ember">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-4 text-lg font-medium text-ink">Message received</p>
            <p className="mt-1 text-sm text-slate">We&rsquo;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-slate">
                  Name <span className="normal-case text-slate/60">(optional)</span>
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-slate">
                  Email <span className="normal-case text-slate/60">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-slate">
                Message
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className={inputClasses}
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-ember px-6 py-3.5 font-medium text-bone shadow-md transition hover:bg-ember-dim hover:shadow-lg disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
