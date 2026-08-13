"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-[var(--cream)] ${
        scrolled ? "border-[var(--line)] shadow-[0_10px_30px_-18px_rgba(11,61,46,0.45)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)]"
        >
          <Logo />
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-2">
          <Link
            href="/fix/missing-gtin-shopify"
            className="hidden rounded-full px-3 py-2 text-[var(--ink)]/70 hover:bg-white hover:text-[var(--ink)] sm:inline"
          >
            Fix guides
          </Link>
          <Link
            href="/#pricing"
            className="rounded-full px-3 py-2 text-[var(--ink)]/70 hover:bg-white hover:text-[var(--ink)]"
          >
            Pricing
          </Link>
          <Link href="/app" className="btn-primary !px-4 !py-2">
            Open app
          </Link>
        </nav>
      </div>
    </header>
  );
}
