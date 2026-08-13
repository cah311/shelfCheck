import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shopify products not syncing to Google Merchant Center",
  description:
    "Why only some Shopify products appear in Google Merchant Center and how to diagnose channel, identifier, and apparel attribute blockers.",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <p className="inline-flex rounded-full bg-[var(--gold)]/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--forest)]">
        Fix guide
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight">
        Shopify products not syncing to Google Merchant Center
      </h1>
      <p className="mt-4 text-lg text-[var(--ink)]/75">
        Merchants routinely report catalogs where half the SKUs never appear in GMC — with no error
        in Shopify. Common causes: not published to the Google & YouTube channel, invalid barcodes,
        missing required apparel attributes, or dual data sources (Content API + website crawl)
        fighting over IDs.
      </p>
      <h2 className="mt-8 font-display text-2xl font-semibold">Checklist</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--ink)]/80">
        <li>Filter products by Google & YouTube availability.</li>
        <li>Validate barcodes (check digit) and brand/MPN pairs.</li>
        <li>For clothing/shoes: gender, age_group, color, size.</li>
        <li>Confirm a single primary data source in Merchant Center.</li>
      </ul>
      <p className="mt-8 text-[var(--ink)]/80">
        ShelfCheck flags channel publish misses and attribute gaps in one pass.{" "}
        <Link href="/app" className="underline">
          Run the demo scan
        </Link>
        .
      </p>
    </article>
  );
}
