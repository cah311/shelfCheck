import { NextResponse } from "next/server";

/** OAuth callback placeholder — exchange code for offline token when credentials exist. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  const code = url.searchParams.get("code");
  if (!shop || !code) {
    return NextResponse.redirect(new URL("/app?shopify=error", url.origin));
  }
  // Token exchange + session persistence lands here in Partner setup.
  return NextResponse.redirect(
    new URL(`/app?shop=${encodeURIComponent(shop)}&shopify=connected`, url.origin)
  );
}
