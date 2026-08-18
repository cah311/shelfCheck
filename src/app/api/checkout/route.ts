import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, PLANS, pricingConfigured, STRIPE_TAX_CODE } from "@/lib/stripe";
import { upsertSubscription } from "@/lib/store";

const schema = z.object({
  email: z.string().email(),
  plan: z.enum(["pro", "growth"]).default("pro"),
  founding: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const parsed = schema.parse(await req.json());
    const origin = new URL(req.url).origin;

    if (!pricingConfigured()) {
      // Dev / Phase A fallback: simulate founding checkout without Stripe keys
      await upsertSubscription({
        email: parsed.email.toLowerCase(),
        plan: parsed.plan,
        status: "trialing",
      });
      return NextResponse.json({
        ok: true,
        simulated: true,
        message:
          "Stripe keys not configured. Founding seat reserved locally — add STRIPE_SECRET_KEY to go live.",
        redirectUrl: `${origin}/app?email=${encodeURIComponent(parsed.email)}&welcome=1`,
      });
    }

    const stripe = getStripe()!;
    const plan = PLANS[parsed.plan];
    const founding =
      parsed.founding && parsed.plan === "pro"
        ? PLANS.pro.foundingPriceUsd
        : plan.priceUsd;
    const unitAmount = founding * 100;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: parsed.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            recurring: { interval: "month" },
            product_data: {
              name: `ShelfCheck ${plan.name}`,
              description: plan.description,
              tax_code: STRIPE_TAX_CODE,
            },
          },
        },
      ],
      success_url: `${origin}/app?email=${encodeURIComponent(parsed.email)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      metadata: {
        plan: parsed.plan,
        founding: parsed.founding ? "1" : "0",
        product: "shelfcheck",
      },
    });

    await upsertSubscription({
      email: parsed.email.toLowerCase(),
      plan: parsed.plan,
      status: "trialing",
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
