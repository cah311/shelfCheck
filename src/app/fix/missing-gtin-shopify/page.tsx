import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "How to fix missing GTIN on Shopify for Google Merchant Center",
  description:
    "Missing GTIN on Shopify often causes limited performance or disapproval in Google Shopping. Learn the brand+MPN and identifier_exists fixes — and automate the audit with ShelfCheck.",
};

export default function MissingGtinPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <p className="inline-flex rounded-full bg-[var(--gold)]/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
        Fix guide
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight">
        How to fix missing GTIN on Shopify (Google Merchant Center)
      </h1>
      <p className="mt-4 text-lg text-[var(--ink)]/75">
        If Merchant Center shows missing/incorrect GTIN or “insufficient product identifiers,” your
        listings can be disapproved — or worse, stay “Active” in Shopify while Google quietly limits
        impressions.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">What Google wants</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--ink)]/80">
        <li>Valid GTIN (UPC/EAN/ISBN) in the variant barcode field, or</li>
        <li>Brand + MPN together, or</li>
        <li>
          <code>identifier_exists = false</code> for handmade, custom, vintage, or truly unique goods
        </li>
      </ol>

      <h2 className="mt-10 font-display text-2xl font-semibold">Manual fix in Shopify</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--ink)]/80">
        <li>Products → variant → Barcode: paste a real GTIN (validate check digit).</li>
        <li>Organization → Vendor: real brand (not “N/A” / “Generic”).</li>
        <li>Metafield <code>google.mpn</code>: manufacturer part number (SKU often works).</li>
        <li>
          Metafield <code>google.identifier_exists</code>: <code>false</code> when no identifier
          exists.
        </li>
        <li>Re-sync Google & YouTube channel; wait 24–72h; check GMC Needs attention.</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold">Faster: audit the whole catalog</h2>
      <p className="mt-3 text-[var(--ink)]/80">
        ShelfCheck scans every product for invalid barcodes, missing brand/MPN, apparel gaps, and
        channel publish misses — then exports a supplemental feed.{" "}
        <Link className="underline" href="/app">
          Run the free demo scan
        </Link>
        .
      </p>

      <div className="mt-10">
        <WaitlistForm source="seo-missing-gtin" />
      </div>

      <p className="mt-10 text-sm text-[var(--ink)]/55">
        Related:{" "}
        <Link href="/fix/insufficient-product-identifiers" className="underline">
          insufficient product identifiers
        </Link>
        ,{" "}
        <Link href="/fix/google-shopping-products-not-syncing" className="underline">
          products not syncing to GMC
        </Link>
        .
      </p>
    </article>
  );
}
