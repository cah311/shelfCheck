"use client";

import { useState } from "react";

type Intent = "waitlist" | "founding";

export function WaitlistForm({
  intent = "waitlist",
  source = "landing",
  cta,
  tone = "light",
}: {
  intent?: Intent;
  source?: string;
  cta?: string;
  tone?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [skuCount, setSkuCount] = useState("100-500");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      if (intent === "founding") {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, plan: "pro", founding: true }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Checkout failed");
        await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, storeUrl, skuCount, intent, source }),
        });
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        window.location.href = data.redirectUrl || `/app?email=${encodeURIComponent(email)}&welcome=1`;
        return;
      }

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, storeUrl, skuCount, intent, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setStatus("done");
      setMessage("You are on the list. We will email when your scan invite is ready.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div className="card p-6">
        <p className="font-display text-xl font-semibold text-[var(--forest)]">You are in.</p>
        <p className="mt-1 text-sm text-[var(--ink)]/70">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden rounded-3xl border p-6 shadow-[0_24px_60px_-28px_rgba(7,25,16,0.45)] ${
        dark
          ? "border-white/10 bg-white/[0.07] backdrop-blur"
          : "border-[var(--line)] bg-white"
      }`}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="h-1.5 w-8 rounded-full bg-[var(--gold)]" />
        <p
          className={`text-xs font-semibold uppercase tracking-[0.16em] ${
            dark ? "text-white/55" : "text-[var(--ink)]/45"
          }`}
        >
          {intent === "founding" ? "Founding offer" : "Early access"}
        </p>
      </div>
      <div>
        <label
          className={`text-xs font-semibold uppercase tracking-wide ${
            dark ? "text-white/55" : "text-[var(--ink)]/55"
          }`}
        >
          Work email
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@brand.com"
          className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)] ${
            dark
              ? "border-white/15 bg-white/95"
              : "border-[var(--line)]"
          }`}
        />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label
            className={`text-xs font-semibold uppercase tracking-wide ${
              dark ? "text-white/55" : "text-[var(--ink)]/55"
            }`}
          >
            Store URL
          </label>
          <input
            type="url"
            value={storeUrl}
            onChange={(e) => setStoreUrl(e.target.value)}
            placeholder="yourstore.myshopify.com"
            className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)] ${
              dark ? "border-white/15 bg-white/95" : "border-[var(--line)]"
            }`}
          />
        </div>
        <div>
          <label
            className={`text-xs font-semibold uppercase tracking-wide ${
              dark ? "text-white/55" : "text-[var(--ink)]/55"
            }`}
          >
            SKU count
          </label>
          <select
            value={skuCount}
            onChange={(e) => setSkuCount(e.target.value)}
            className={`mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)] ${
              dark ? "border-white/15 bg-white/95" : "border-[var(--line)]"
            }`}
          >
            <option>1-99</option>
            <option>100-500</option>
            <option>500-2000</option>
            <option>2000+</option>
          </select>
        </div>
      </div>
      <button className="btn-primary mt-5 w-full !bg-[var(--gold)] !text-[var(--ink)] hover:!bg-[#e8b24a]" disabled={status === "loading"} type="submit">
        {status === "loading"
          ? "Working…"
          : cta || (intent === "founding" ? "Lock founding price — $19/mo" : "Join the waitlist")}
      </button>
      {status === "error" && <p className="mt-2 text-sm text-[var(--danger)]">{message}</p>}
      <p className={`mt-3 text-xs ${dark ? "text-white/40" : "text-[var(--ink)]/45"}`}>
        Built by Skuform Commerce. No spam. Company brand only.
      </p>
    </form>
  );
}
