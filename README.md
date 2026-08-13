# ShelfCheck

**Fix disapproved and limited Google Shopping products on Shopify.**

ShelfCheck audits a merchant catalog against Google Merchant Center rules and surfaces the gaps that silently kill Shopping / free-listing traffic — missing GTINs, brand/MPN, apparel attributes, and sync failures.

Built by [Skuform](https://github.com/cah311).

## What works today

- Landing page + waitlist + founding offer ($19/mo locked 12 months)
- Demo catalog health scan at `/app` (score + prioritized fix queue)
- Rule-based audit engine (`src/lib/audit.ts`)
- Supplemental feed CSV export
- Stripe checkout (live when keys are set)
- Shopify OAuth install/callback stubs (no real product pull yet)
- SEO pages under `/fix/*`

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Stripe

Local JSON storage (`data/waitlist.json`, `data/scans.json`) — no database yet.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

| URL | What |
|---|---|
| http://localhost:3000 | Landing + waitlist + founding offer |
| http://localhost:3000/app | Demo catalog scan |

```bash
npm run test:audit   # audit engine self-test
npm run build
```

## Environment

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical site URL (`http://localhost:3000` locally) |
| `ADMIN_KEY` | yes | Auth for `GET /api/waitlist?key=` |
| `STRIPE_SECRET_KEY` | for billing | Stripe secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | for billing | Stripe publishable |
| `STRIPE_WEBHOOK_SECRET` | for billing | Stripe webhook |
| `SHOPIFY_API_KEY` / `SHOPIFY_API_SECRET` | later | Partner app credentials (OAuth still stubbed) |
| `SHOPIFY_SCOPES` | optional | Default `read_products,write_products` |

List waitlist entries:

```bash
curl -s "http://localhost:3000/api/waitlist?key=$ADMIN_KEY"
```

## Project layout

```
src/app/           pages + API routes
src/app/api/       waitlist, scan, checkout, Shopify OAuth stubs
src/app/fix/       SEO landing pages for GMC error queries
src/lib/audit.ts   catalog rules + scoring
src/lib/store.ts   JSON file persistence
src/components/    UI
scripts/           audit self-test
```

## Deploy (Vercel)

This repo **is** the Next.js app — Root Directory stays empty / `.`

1. Import [cah311/shelfCheck](https://github.com/cah311/shelfCheck) into Vercel
2. Set the env vars above (`NEXT_PUBLIC_SITE_URL` = your `*.vercel.app` URL, then the real domain)
3. Deploy

**Storage caveat:** waitlist and scans write to the local filesystem. On Vercel that disk is ephemeral, so signups can disappear across deploys and instances. Fine for a smoke test; use durable storage before sending real validation traffic.

## Pricing (Phase A)

| Plan | Price |
|---|---|
| Free | 25-SKU scan |
| Founding | $19/mo locked 12 months |
| Pro | $29/mo |
| Growth | $49/mo |

## Status

Pre-launch MVP. Shopify product pull is stubbed; use the demo scan until Partner credentials are wired.
