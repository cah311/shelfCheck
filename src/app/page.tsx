import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { CatalogPreview } from "@/components/CatalogPreview";

const steps = [
  {
    n: "01",
    t: "Scan",
    d: "Rule engine checks brand, GTIN check-digits, MPN, apparel attributes, titles, images, and channel publish.",
  },
  {
    n: "02",
    t: "Prioritize",
    d: "Critical vs warning queue sorted by Shopping impact — fix what blocks revenue first.",
  },
  {
    n: "03",
    t: "Heal",
    d: "Apply suggested metafields and vendor fixes, then download a GMC supplemental feed.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[var(--forest)] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 80% -10%, rgba(244,193,93,0.28), transparent 55%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(255,255,255,0.08), transparent 50%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--gold)]">
              Shopify × Google Merchant Center
            </p>
            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Your products look fine in Shopify.{" "}
              <span className="text-[var(--gold)]">Google disagrees.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              ShelfCheck audits every SKU against Merchant Center catalog rules — missing GTIN, bad
              barcodes, apparel gaps, channel publish misses — and gives you a fix queue before
              Shopping ads quietly die.
            </p>
            <ul className="mt-7 space-y-2.5 text-sm text-white/80">
              {[
                "See “limited performance” issues Shopify admin never shows",
                "One-click autofix for brand, MPN, identifier_exists",
                "Export a supplemental feed CSV for GMC in seconds",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[11px] font-bold text-[var(--forest)]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/app" className="btn-primary !bg-[var(--gold)] !px-6 !text-[var(--ink)] hover:!bg-[#e8b24a]">
                Run free demo scan
              </Link>
              <a
                href="#founding"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Founding — $19/mo
              </a>
            </div>
          </div>
          <CatalogPreview />
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4">
        <div className="grid gap-8 rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-6 shadow-[0_30px_80px_-40px_rgba(11,61,46,0.45)] md:grid-cols-[1fr_minmax(0,22rem)] md:p-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--forest)]">
              Join the waitlist
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold">
              Get a catalog health invite before App Store launch.
            </h2>
            <p className="mt-3 text-sm text-[var(--ink)]/65">
              Built for merchants already spending on Shopping / PMax who cannot see why SKUs vanish.
            </p>
          </div>
          <WaitlistForm intent="waitlist" source="hero" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--forest)]">
          One workflow
        </p>
        <h2 className="mt-2 font-display text-4xl font-semibold">Scan. Rank. Fix.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((x) => (
            <div key={x.t} className="card relative overflow-hidden p-6">
              <p className="font-display text-4xl font-semibold text-[var(--gold)]">{x.n}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-[var(--forest)]">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/70">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--cream-2)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-display text-4xl font-semibold">Built for the complaint we kept reading</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <blockquote className="card p-6 text-[15px] leading-relaxed text-[var(--ink)]/80">
              <span className="font-display text-4xl leading-none text-[var(--gold)]">“</span>
              Have roughly 5,000 products on Shopify but after installing the Google & Youtube App,
              only 2,400 items will sync… I cannot see ANY differences.
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink)]/45">
                Shopify Community merchant
              </footer>
            </blockquote>
            <blockquote className="card p-6 text-[15px] leading-relaxed text-[var(--ink)]/80">
              <span className="font-display text-4xl leading-none text-[var(--gold)]">“</span>
              Missing GTIN doesn’t always disapprove — it throttles. The flag lives exclusively in
              Merchant Center Diagnostics, invisible from Shopify admin.
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink)]/45">
                Feed engineering write-up, 2026
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-4xl font-semibold">Simple pricing</h2>
        <p className="mt-2 text-[var(--ink)]/65">Self-serve. Cancel anytime. No sales call.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="card p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)]/50">Free scan</h3>
            <p className="mt-3 font-display text-4xl font-semibold">$0</p>
            <p className="mt-3 text-sm text-[var(--ink)]/65">Demo catalog or first 25 SKUs.</p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--ink)]/75">
              <li>Health score + issue queue</li>
              <li>CSV export of findings</li>
            </ul>
          </div>
          <div className="card relative border-[var(--forest)] p-7 ring-2 ring-[var(--forest)]">
            <p className="absolute -top-3 left-6 rounded-full bg-[var(--gold)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]">
              Most stores
            </p>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--forest)]">Pro</h3>
            <p className="mt-3 font-display text-4xl font-semibold">
              $29<span className="text-base font-sans font-medium text-[var(--ink)]/45">/mo</span>
            </p>
            <p className="mt-3 text-sm text-[var(--ink)]/65">
              Unlimited scans, autofix, weekly digest, CSV export.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--ink)]/75">
              <li>Autofix brand / MPN / identifier_exists</li>
              <li>Supplemental feed download</li>
              <li>Weekly catalog digest</li>
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--ink)]/50">Growth</h3>
            <p className="mt-3 font-display text-4xl font-semibold">
              $49<span className="text-base font-sans font-medium text-[var(--ink)]/45">/mo</span>
            </p>
            <p className="mt-3 text-sm text-[var(--ink)]/65">3 stores, Slack alerts, priority support.</p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--ink)]/75">
              <li>Everything in Pro</li>
              <li>Multi-store</li>
              <li>Priority email support</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="founding" className="border-t border-[var(--line)] bg-[var(--forest)] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold)]">
              Founding customers
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Lock $19/mo for 12 months</h2>
            <p className="mt-4 text-white/70">
              Normally $29. We onboard you manually, your catalog shapes the roadmap, and you get a
              direct line to Skuform support — company brand, not a personal influencer account.
            </p>
            <p className="mt-4 text-sm text-white/45">
              Go/no-go gate: 15 waitlist signups or 3 founding pre-orders from ~200 targeted visitors.
            </p>
          </div>
          <WaitlistForm
            intent="founding"
            source="founding"
            tone="dark"
            cta="Become a founding customer — $19/mo"
          />
        </div>
      </section>
    </div>
  );
}
