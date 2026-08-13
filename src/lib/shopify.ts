/**
 * Shopify Admin integration stubs.
 * Wire these once Partner app credentials exist (Phase 2).
 */

export const SHOPIFY_SCOPES =
  process.env.SHOPIFY_SCOPES || "read_products,write_products";

export function shopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_API_KEY && process.env.SHOPIFY_API_SECRET);
}

export function buildInstallUrl(shop: string): string {
  const key = process.env.SHOPIFY_API_KEY;
  if (!key) {
    throw new Error("SHOPIFY_API_KEY not set");
  }
  const clean = shop.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const redirect = `${process.env.NEXT_PUBLIC_SITE_URL}/api/shopify/callback`;
  const params = new URLSearchParams({
    client_id: key,
    scope: SHOPIFY_SCOPES,
    redirect_uri: redirect,
    state: crypto.randomUUID(),
  });
  return `https://${clean}/admin/oauth/authorize?${params.toString()}`;
}

/** Map Shopify REST/GraphQL product nodes → ProductInput (implemented at OAuth time). */
export function mapShopifyProduct(raw: {
  id: number | string;
  title: string;
  vendor?: string;
  product_type?: string;
  body_html?: string;
  image?: { src?: string } | null;
  tags?: string;
  variants?: Array<{
    id: number | string;
    title: string;
    sku?: string;
    barcode?: string;
    price: string;
    inventory_quantity?: number;
  }>;
}) {
  return {
    id: String(raw.id),
    title: raw.title,
    vendor: raw.vendor,
    productType: raw.product_type,
    description: raw.body_html,
    imageUrl: raw.image?.src,
    tags: raw.tags ? raw.tags.split(",").map((t) => t.trim()) : [],
    publishedToGoogle: true,
    variants: (raw.variants || []).map((v) => ({
      id: String(v.id),
      title: v.title,
      sku: v.sku,
      barcode: v.barcode,
      price: v.price,
      inventoryQuantity: v.inventory_quantity,
    })),
  };
}
