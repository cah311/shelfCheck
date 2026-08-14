import { NextResponse } from "next/server";
import { z } from "zod";
import { addWaitlistEntry, listWaitlist } from "@/lib/store";
import { normalizeStoreUrl } from "@/lib/urls";

const schema = z.object({
  email: z.string().email(),
  storeUrl: z.preprocess(
    (v) => (typeof v === "string" ? normalizeStoreUrl(v) : ""),
    z.union([z.literal(""), z.string().url()])
  ),
  skuCount: z.string().optional(),
  intent: z.enum(["waitlist", "founding"]).default("waitlist"),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);
    const entry = await addWaitlistEntry({
      email: parsed.email.toLowerCase().trim(),
      storeUrl: parsed.storeUrl || undefined,
      skuCount: parsed.skuCount,
      intent: parsed.intent,
      source: parsed.source,
    });
    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  const adminKey = process.env.ADMIN_KEY;
  if (adminKey && key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const list = await listWaitlist();
  return NextResponse.json({
    count: list.length,
    founding: list.filter((e) => e.intent === "founding").length,
    entries: list,
  });
}
