import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insufficient product identifiers — Shopify fix",
  description:
    "What Google’s insufficient product identifiers warning means for Shopify merchants and how to restore Shopping eligibility.",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 prose-like">
      <p className="inline-flex rounded-full bg-[var(--gold)]/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
        Fix guide
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight">
        Insufficient product identifiers on Shopify
      </h1>
      <p className="mt-4 text-lg text-[var(--ink)]/75">
        Google can’t uniquely match your SKU in its product graph. You keep the listing, but you lose
        comparison-shopping style visibility — often a 40–60% traffic haircut versus identified
        products.
      </p>
      <h2 className="mt-8 font-display text-2xl font-semibold">Fix order</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--ink)]/80">
        <li>Add GTIN + brand when the product is mass-produced.</li>
        <li>Else add brand + MPN.</li>
        <li>Else set identifier_exists=false for unique/handmade goods.</li>
        <li>Never submit fake GTINs — that creates conflicting identifier errors.</li>
      </ol>
      <p className="mt-8">
        <Link href="/app" className="btn-primary">
          Scan your catalog with ShelfCheck
        </Link>
      </p>
    </article>
  );
}
