import Stripe from "stripe";

export const PLANS = {
  pro: {
    id: "pro",
    name: "Pro",
    priceUsd: 29,
    description: "Unlimited scans, autofix, weekly digest, supplemental feed export",
    foundingPriceUsd: 19,
  },
  growth: {
    id: "growth",
    name: "Growth",
    priceUsd: 49,
    description: "Everything in Pro + multi-store (3) + Slack alerts + priority support",
  },
} as const;

/** Stripe tax code: SaaS — business use (Managed Payments eligible). */
export const STRIPE_TAX_CODE = "txcd_10103001";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function pricingConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}
