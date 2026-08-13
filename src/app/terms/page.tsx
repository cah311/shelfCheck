import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of ShelfCheck by Skuform Commerce.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-semibold text-[#142019]">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-[#142019]/80">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--forest)]">
        Skuform Commerce
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-[#142019]">Terms of Service</h1>
      <p className="mt-3 text-sm text-[#142019]/55">
        Effective date: August 12, 2026 · Last updated: August 12, 2026
      </p>
      <p className="mt-6 text-sm leading-7 text-[#142019]/80">
        These Terms of Service (“Terms”) are an agreement between you and Skuform Commerce (“Skuform,”
        “we,” “us”) for use of ShelfCheck at{" "}
        <a className="underline" href="https://shelfcheck.io">
          shelfcheck.io
        </a>{" "}
        and related software, including any Shopify app listing (the “Service”). By accessing the
        Service, joining the waitlist, or paying for a plan, you agree to these Terms.
      </p>
      <p className="mt-3 text-sm leading-7 text-[#142019]/80">
        If you do not agree, do not use the Service. Contact{" "}
        <a className="underline" href="mailto:hello@shelfcheck.io">
          hello@shelfcheck.io
        </a>
        .
      </p>

      <Section title="1. The Service">
        <p>
          ShelfCheck audits Shopify product catalogs against Google Merchant Center / Google Shopping
          catalog rules, ranks issues, suggests fixes, and can export a supplemental feed. It is a
          diagnostic and workflow tool. It is not Google Merchant Center, Google Ads, or Shopify.
        </p>
      </Section>

      <Section title="2. Eligibility and accounts">
        <p>
          You must be able to form a contract (typically 18+) and use the Service for a business. You
          are responsible for the accuracy of information you submit and for activity under your
          email or connected store. You may not share login credentials or attempt to access another
          merchant’s catalog.
        </p>
      </Section>

      <Section title="3. Plans, founding pricing, and billing">
        <ul className="list-disc space-y-1 pl-5">
          <li>Free scan covers the demo catalog or a limited SKU sample as described on the site.</li>
          <li>Paid plans (including Pro and Growth) bill monthly in advance via Stripe unless stated otherwise.</li>
          <li>
            Founding pricing ($19/month locked for 12 months) is limited to early customers who
            complete checkout while the offer is shown. After 12 months, the then-current Pro rate
            applies unless we agree otherwise in writing.
          </li>
          <li>Subscriptions renew until you cancel. Cancel anytime; access continues through the paid period.</li>
          <li>Fees are generally non-refundable except where required by law.</li>
        </ul>
      </Section>

      <Section title="4. No guarantee of Google or Shopify outcomes">
        <p>
          Google LLC and Shopify Inc. control approval, disapproval, “limited performance,” sync,
          ads, and account standing. We do not guarantee that any product will be approved, that
          impressions or revenue will increase, that a suspension will be lifted, or that a
          supplemental feed will be accepted. Suggested fixes are based on published catalog rules
          and may be incomplete or become outdated when Google or Shopify change policies.
        </p>
      </Section>

      <Section title="5. Your content and store access">
        <p>
          You retain rights to your catalog data. You grant Skuform a limited license to process that
          data solely to provide the Service (scan, score, suggest fixes, export, write-back if you
          enable it). You represent that you have authority to connect the store and that submitting
          product data does not violate third-party rights or Shopify/Google terms.
        </p>
      </Section>

      <Section title="6. Acceptable use">
        <p>You may not:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Submit fake GTINs or other identifiers intended to deceive Google or shoppers.</li>
          <li>Probe, scrape, overload, or reverse engineer the Service except as allowed by law.</li>
          <li>Use the Service for unlawful goods, or to violate Google or Shopify policies.</li>
          <li>Resell the Service without our written consent.</li>
        </ul>
      </Section>

      <Section title="7. Intellectual property">
        <p>
          The Service, including the ShelfCheck name, Skuform name, logos, rule engine, and site
          design, is owned by Skuform Commerce. You may not copy, frame, or brand the Service as your
          own.
        </p>
      </Section>

      <Section title="8. Third-party services">
        <p>
          Shopify, Google, Stripe, and hosting providers have their own terms. Your use of those
          services is solely between you and them. Outages or API changes at those providers may
          interrupt ShelfCheck.
        </p>
      </Section>

      <Section title="9. Disclaimer of warranties">
        <p>
          THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW,
          SKUFORM DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR
          A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT SCANS ARE ERROR-FREE OR
          THAT THE SERVICE WILL BE UNINTERRUPTED.
        </p>
      </Section>

      <Section title="10. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, SKUFORM AND ITS OPERATORS WILL NOT BE LIABLE FOR
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR LOST-PROFITS DAMAGES, OR FOR LOST ADS,
          SUSPENDED MERCHANT CENTER ACCOUNTS, OR LOST REVENUE. OUR TOTAL LIABILITY FOR ANY CLAIM
          RELATING TO THE SERVICE WILL NOT EXCEED THE AMOUNTS YOU PAID US IN THE THREE MONTHS BEFORE
          THE CLAIM (OR CAD $100 IF YOU ARE ON A FREE PLAN).
        </p>
      </Section>

      <Section title="11. Indemnity">
        <p>
          You will defend and indemnify Skuform against claims arising from your catalog data, your
          stores, your ads, or your misuse of the Service.
        </p>
      </Section>

      <Section title="12. Termination">
        <p>
          We may suspend or terminate access if you breach these Terms or if we discontinue the
          Service. You may stop using the Service at any time. Sections that should survive
          (including 4, 7, 9–11, 13) will survive termination.
        </p>
      </Section>

      <Section title="13. Governing law">
        <p>
          These Terms are governed by the laws of Canada and the province or territory in which
        Skuform Commerce is established, without regard to conflict-of-law rules. Courts in that
        province or territory have exclusive jurisdiction, except that we may seek injunctive relief
        anywhere.
        </p>
      </Section>

      <Section title="14. Changes">
        <p>
          We may update these Terms. Continued use after the “Last updated” date constitutes
          acceptance. If you do not agree, cancel and stop using the Service.
        </p>
      </Section>

      <Section title="15. Contact">
        <p>
          Skuform Commerce · ShelfCheck
          <br />
          Email:{" "}
          <a className="underline" href="mailto:hello@shelfcheck.io">
            hello@shelfcheck.io
          </a>
        </p>
        <p>
          Related:{" "}
          <Link className="underline" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </Section>
    </article>
  );
}
