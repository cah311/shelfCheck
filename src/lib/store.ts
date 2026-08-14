import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { sql } from "./db";
import type { ScanResult, SubscriptionRecord, WaitlistEntry } from "./types";

// Vercel serverless is read-only except /tmp (ephemeral, per-instance).
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "shelfcheck-data")
  : path.join(process.cwd(), "data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    await ensureDir();
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  try {
    await ensureDir();
    await fs.writeFile(
      path.join(DATA_DIR, file),
      JSON.stringify(data, null, 2),
      "utf8"
    );
  } catch (err) {
    console.error(`store write failed (${file})`, err);
  }
}

type WaitlistRow = {
  id: string;
  email: string;
  store_url: string | null;
  sku_count: string | null;
  intent: WaitlistEntry["intent"];
  source: string | null;
  created_at: string | Date;
};

function mapWaitlist(row: WaitlistRow): WaitlistEntry {
  return {
    id: row.id,
    email: row.email,
    storeUrl: row.store_url ?? undefined,
    skuCount: row.sku_count ?? undefined,
    intent: row.intent,
    source: row.source ?? undefined,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : row.created_at,
  };
}

export async function addWaitlistEntry(
  entry: Omit<WaitlistEntry, "id" | "createdAt">
): Promise<WaitlistEntry> {
  const db = sql();
  const rows = (await db`
    INSERT INTO waitlist (email, store_url, sku_count, intent, source)
    VALUES (
      ${entry.email},
      ${entry.storeUrl ?? null},
      ${entry.skuCount ?? null},
      ${entry.intent},
      ${entry.source ?? null}
    )
    ON CONFLICT (email) DO UPDATE SET
      intent = CASE
        WHEN EXCLUDED.intent = 'founding' THEN 'founding'
        ELSE waitlist.intent
      END,
      store_url = COALESCE(EXCLUDED.store_url, waitlist.store_url),
      sku_count = COALESCE(EXCLUDED.sku_count, waitlist.sku_count)
    RETURNING id, email, store_url, sku_count, intent, source, created_at
  `) as WaitlistRow[];
  return mapWaitlist(rows[0]);
}

export async function listWaitlist(): Promise<WaitlistEntry[]> {
  const db = sql();
  const rows = (await db`
    SELECT id, email, store_url, sku_count, intent, source, created_at
    FROM waitlist
    ORDER BY created_at DESC
  `) as WaitlistRow[];
  return rows.map(mapWaitlist);
}

export async function saveScan(scan: ScanResult): Promise<void> {
  const scans = await readJson<ScanResult[]>("scans.json", []);
  scans.unshift(scan);
  await writeJson("scans.json", scans.slice(0, 50));
}

export async function getScan(id: string): Promise<ScanResult | undefined> {
  const scans = await readJson<ScanResult[]>("scans.json", []);
  return scans.find((s) => s.id === id);
}

export async function upsertSubscription(
  partial: Omit<SubscriptionRecord, "id" | "createdAt"> & { id?: string }
): Promise<SubscriptionRecord> {
  const list = await readJson<SubscriptionRecord[]>("subscriptions.json", []);
  const idx = list.findIndex(
    (s) => s.email.toLowerCase() === partial.email.toLowerCase()
  );
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...partial, id: list[idx].id };
    await writeJson("subscriptions.json", list);
    return list[idx];
  }
  const row: SubscriptionRecord = {
    id: partial.id ?? randomUUID(),
    email: partial.email,
    plan: partial.plan,
    stripeCustomerId: partial.stripeCustomerId,
    stripeSubscriptionId: partial.stripeSubscriptionId,
    status: partial.status,
    createdAt: new Date().toISOString(),
  };
  list.push(row);
  await writeJson("subscriptions.json", list);
  return row;
}

export async function getSubscriptionByEmail(
  email: string
): Promise<SubscriptionRecord | undefined> {
  const list = await readJson<SubscriptionRecord[]>("subscriptions.json", []);
  return list.find((s) => s.email.toLowerCase() === email.toLowerCase());
}
