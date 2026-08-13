"use client";

import { useMemo, useState } from "react";
import { ReviewPrompt } from "@/components/ReviewPrompt";
import { scanToCsv } from "@/lib/audit";
import type { ScanResult } from "@/lib/types";

export default function AppPage() {
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fixedIds, setFixedIds] = useState<string[]>([]);
  const [storeName, setStoreName] = useState("Demo Fashion Co");

  const autoFixable = useMemo(
    () => scan?.products.filter((p) => Object.keys(p.suggestedFixes).length > 0) ?? [],
    [scan]
  );

  async function runDemoScan() {
    setLoading(true);
    setError("");
    setFixedIds([]);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "demo", storeName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scan failed");
      setScan(data.scan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
    } finally {
      setLoading(false);
    }
  }

  function applyAllFixes() {
    if (!scan) return;
    const ids = autoFixable.map((p) => p.product.id);
    setFixedIds(ids);
  }

  function downloadFeed() {
    if (!scan) return;
    const csv = scanToCsv(scan, true);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shelfcheck-${scan.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-5 rounded-3xl bg-[var(--forest)] px-6 py-8 text-white sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--gold)]">
            Catalog health
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold">Scan → prioritize → heal</h1>
          <p className="mt-2 max-w-lg text-sm text-white/65">
            Shopify OAuth ships next. The demo catalog proves the engine on GTIN, apparel, brand, and
            channel issues.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="rounded-full border border-white/15 bg-white px-4 py-2.5 text-sm text-[var(--ink)]"
            placeholder="Store name"
          />
          <button className="btn-primary !bg-[var(--gold)] !text-[var(--ink)]" type="button" onClick={runDemoScan} disabled={loading}>
            {loading ? "Scanning…" : "Run demo scan"}
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-[var(--danger)]">{error}</p>}

      {scan && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Products", value: scan.productsScanned, accent: false },
              { label: "Health score", value: `${scan.averageScore}/100`, accent: true },
              { label: "Critical", value: scan.criticalCount, accent: false },
              { label: "Warnings", value: scan.warningCount, accent: false },
            ].map((m) => (
              <div key={m.label} className={`card p-5 ${m.accent ? "border-[var(--gold)]" : ""}`}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--ink)]/45">{m.label}</p>
                <p className="mt-1 font-display text-3xl font-semibold text-[var(--forest)]">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={applyAllFixes}
              disabled={!autoFixable.length}
            >
              Apply {autoFixable.length} autofixes
            </button>
            <button type="button" className="btn-secondary" onClick={downloadFeed}>
              Download supplemental feed CSV
            </button>
          </div>

          {fixedIds.length > 0 && (
            <div className="mt-4 rounded-2xl border border-[var(--forest)] bg-[var(--forest)]/5 p-4 text-sm">
              Applied suggested fixes for {fixedIds.length} products (brand / MPN / identifier_exists /
              title). Export the CSV and upload as a GMC supplemental feed, or connect Shopify to write
              metafields directly.
            </div>
          )}

          <div className="card mt-8 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--cream-2)] text-[11px] uppercase tracking-[0.12em] text-[var(--ink)]/50">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Issues</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {scan.products.map((p) => {
                  const fixed = fixedIds.includes(p.product.id);
                  return (
                    <tr key={p.product.id} className="border-t border-[var(--line)] align-top hover:bg-white">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{p.product.title}</div>
                        <div className="text-xs text-[var(--ink)]/45">
                          {p.product.vendor || "No vendor"} · {p.product.variants[0]?.sku || "No SKU"}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-display text-lg font-semibold">
                        {fixed ? Math.min(100, p.score + 30) : p.score}
                      </td>
                      <td className="px-4 py-3">
                        <ul className="space-y-2">
                          {p.issues.map((issue) => (
                            <li key={issue.code}>
                              <span className={`badge-${issue.severity}`}>{issue.severity}</span>{" "}
                              <span className="text-[var(--ink)]/80">{issue.message}</span>
                              <div className="text-xs text-[var(--ink)]/45">Fix: {issue.fix}</div>
                            </li>
                          ))}
                          {!p.issues.length && (
                            <li className="font-medium text-[var(--forest)]">Clean — Shopping ready</li>
                          )}
                        </ul>
                      </td>
                      <td className="px-4 py-3">
                        {fixed ? (
                          <span className="rounded-full bg-[var(--forest)]/10 px-2 py-1 text-xs font-semibold text-[var(--forest)]">
                            Autofixed
                          </span>
                        ) : Object.keys(p.suggestedFixes).length ? (
                          <span className="rounded-full bg-[var(--gold)]/30 px-2 py-1 text-xs font-semibold text-[#8a5a12]">
                            Autofix available
                          </span>
                        ) : p.issues.length ? (
                          <span className="text-xs text-[var(--ink)]/50">Manual</span>
                        ) : (
                          <span className="text-[var(--ink)]/30">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ReviewPrompt fixedCount={fixedIds.length} />
        </>
      )}

      {!scan && !loading && (
        <div className="card mt-10 px-8 py-16 text-center">
          <p className="font-display text-3xl font-semibold">No scan yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--ink)]/60">
            Run the demo catalog to see critical GTIN, apparel, channel, and brand issues ranked the
            way a merchant would.
          </p>
        </div>
      )}
    </div>
  );
}
