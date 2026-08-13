import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
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

export async function addWaitlistEntry(
  entry: Omit<WaitlistEntry, "id" | "createdAt">
): Promise<WaitlistEntry> {
  const list = await readJson<WaitlistEntry[]>("waitlist.json", []);
  const existing = list.find(
    (e) => e.email.toLowerCase() === entry.email.toLowerCase()
  );
  if (existing) {
    if (entry.intent === "founding" && existing.intent !== "founding") {
      existing.intent = "founding";
      existing.storeUrl = entry.storeUrl ?? existing.storeUrl;
      existing.skuCount = entry.skuCount ?? existing.skuCount;
      await writeJson("waitlist.json", list);
    }
    return existing;
  }
  const row: WaitlistEntry = {
    ...entry,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  list.push(row);
  await writeJson("waitlist.json", list);
  return row;
}

export async function listWaitlist(): Promise<WaitlistEntry[]> {
  return readJson<WaitlistEntry[]>("waitlist.json", []);
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
