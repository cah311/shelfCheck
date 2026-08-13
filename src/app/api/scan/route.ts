import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { runScan } from "@/lib/audit";
import { DEMO_CATALOG } from "@/lib/demo-catalog";
import { saveScan } from "@/lib/store";
import type { ProductInput } from "@/lib/types";

const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  vendor: z.string().optional(),
  productType: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  publishedToGoogle: z.boolean().optional(),
  metafields: z.record(z.string(), z.string()).optional(),
  variants: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      sku: z.string().optional(),
      barcode: z.string().optional(),
      price: z.string(),
      inventoryQuantity: z.number().optional(),
    })
  ),
});

const bodySchema = z.object({
  storeName: z.string().default("Demo Store"),
  mode: z.enum(["demo", "custom"]).default("demo"),
  products: z.array(productSchema).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = bodySchema.parse(json);
    const products: ProductInput[] =
      parsed.mode === "custom" && parsed.products?.length
        ? parsed.products
        : DEMO_CATALOG;

    const scan = runScan(products, parsed.storeName, randomUUID());
    await saveScan(scan);

    return NextResponse.json({
      ok: true,
      scan: {
        ...scan,
        // Keep payload lighter for list UI; full issues included
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Scan failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
