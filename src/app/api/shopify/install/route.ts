import { NextResponse } from "next/server";
import { buildInstallUrl, shopifyConfigured } from "@/lib/shopify";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  if (!shop) {
    return NextResponse.json({ error: "Missing shop param" }, { status: 400 });
  }
  if (!shopifyConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Shopify Partner credentials not configured. Use /app demo scan until SHOPIFY_API_KEY/SECRET are set.",
        demoUrl: "/app",
      },
      { status: 503 }
    );
  }
  try {
    return NextResponse.redirect(buildInstallUrl(shop));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Install failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
