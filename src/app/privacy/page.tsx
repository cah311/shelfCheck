import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Skuform Commerce collects, uses, and protects data in ShelfCheck.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-semibold text-[#142019]">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-[#142019]/80">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--forest)]">
        Skuform Commerce
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-[#142019]">Privacy Policy</h1>
      <p className="mt-3 text-sm text-[#142019]/55">
        Effective date: August 12, 2026 · Last updated: August 12, 2026
      </p>
      <p className="mt-6 text-sm leading-7 text-[#142019]/80">
        This Privacy Policy describes how Skuform Commerce (“Skuform,” “we,” “us,” or “our”) collects,
        uses, and shares information when you use ShelfCheck at{" "}
        <a className="underline" href="https://shelfcheck.io">
          shelfcheck.io
        </a>{" "}
        and related services (the “Service”). ShelfCheck is a catalog-health tool for Shopify merchants
        running Google Shopping / Google Merchant Center.
      </p>
      <p className="mt-3 text-sm leading-7 text-[#142019]/80">
        Questions:{" "}
        <a className="underline" href="mailto:hello@shelfcheck.io">
          hello@shelfcheck.io
        </a>
        .
      </p>

      <Section title="1. Who we are">
        <p>
          Operator: Skuform Commerce. Product: ShelfCheck. We operate under a company brand. Contact
          for privacy requests: hello@shelfcheck.io.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <p>We collect only what we need to run audits, accounts, and billing:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Account data:</strong> work email, store URL, approximate SKU count, waitlist or
            founding-customer intent.
          </li>
          <li>
            <strong>Store / catalog data:</strong> product titles, variants, SKUs, barcodes/GTINs,
            brand/vendor, descriptions, images, channel availability, and related metafields required
            to score Google Merchant Center readiness.
          </li>
          <li>
            <strong>Usage data:</strong> scan timestamps, issue counts, feature use (e.g. CSV export,
            autofix), and basic diagnostics (IP address, browser type) for security and reliability.
          </li>
          <li>
            <strong>Payment data:</strong> processed by Stripe. We do not store full card numbers.
            Stripe may provide us with billing email, last four digits, and subscription status.
          </li>
        </ul>
        <p>
          We do not intentionally collect government IDs, precise geolocation, or payment card PAN/CVC.
        </p>
      </Section>

      <Section title="3. How we use information">
        <ul className="list-disc space-y-1 pl-5">
          <li>Provide catalog health scans, fix queues, autofix suggestions, and feed exports.</li>
          <li>Create and manage waitlist, founding, and paid accounts.</li>
          <li>Send transactional email (invites, receipts, scan digests you opt into).</li>
          <li>Prevent abuse, debug outages, and improve the rule engine.</li>
          <li>Comply with law and enforce our Terms of Service.</li>
        </ul>
        <p>We do not sell personal information. We do not use catalog data to train public AI models.</p>
      </Section>

      <Section title="4. Legal bases (where applicable)">
        <p>
          If you are in the EEA/UK, we process data to perform a contract with you, with your consent
          (waitlist signup), and for legitimate interests such as securing the Service. Canadian users
          are covered under PIPEDA-style consent: by using the Service or submitting the waitlist form,
          you consent to this policy.
        </p>
      </Section>

      <Section title="5. Sharing">
        <p>We share information only with:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Processors</strong> that host or operate the Service (for example Vercel for
            hosting, Stripe for payments, email delivery providers, and Shopify if you connect a store).
          </li>
          <li>
            <strong>Authorities</strong> when required by law, or to protect the rights, safety, or
            property of Skuform or others.
          </li>
        </ul>
        <p>
          Shopify and Google remain independent controllers of data in your Shopify admin and Merchant
          Center. Connecting those platforms is optional until you install the app.
        </p>
      </Section>

      <Section title="6. Retention">
        <p>
          Waitlist records are kept until you ask us to delete them or we shut down the waitlist.
          Scan results and store catalog snapshots are kept while your account is active and for up
          to 90 days after cancellation unless you request earlier deletion. Billing records may be
          retained as required by tax law.
        </p>
      </Section>

      <Section title="7. Security">
        <p>
          We use HTTPS, access controls, and least-privilege keys. No method of transmission or
          storage is 100% secure. Do not send passwords or card numbers to hello@shelfcheck.io.
        </p>
      </Section>

      <Section title="8. Your rights">
        <p>
          You may request access, correction, or deletion of personal information we hold, or withdraw
          waitlist consent, by emailing hello@shelfcheck.io. We will respond within 30 days. You may
          also have rights under PIPEDA, GDPR, or CCPA depending on where you live, including the
          right to lodge a complaint with a supervisory authority.
        </p>
      </Section>

      <Section title="9. Children">
        <p>
          The Service is for businesses. It is not directed to children under 16. We do not knowingly
          collect data from children.
        </p>
      </Section>

      <Section title="10. International transfers">
        <p>
          We may process data in Canada, the United States, and other countries where our processors
          operate. By using the Service you understand that your information may be transferred to
          those locations.
        </p>
      </Section>

      <Section title="11. Changes">
        <p>
          We may update this policy. The “Last updated” date will change. Material changes will be
          noted on this page or by email to the address on your account.
        </p>
      </Section>

      <Section title="12. Contact">
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
          <Link className="underline" href="/terms">
            Terms of Service
          </Link>
          .
        </p>
      </Section>
    </article>
  );
}
