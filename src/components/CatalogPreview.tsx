const rows = [
  { name: "Merino Base Layer", sku: "CL-MBL-M", score: 32, tag: "Missing GTIN", tone: "bad" as const },
  { name: "Ceramic Pour-Over", sku: "ACME-02", score: 78, tag: "Bad barcode", tone: "warn" as const },
  { name: "Walnut Serving Board", sku: "NG-BOARD", score: 100, tag: "Shopping ready", tone: "ok" as const },
];

export function CatalogPreview() {
  return (
    <div className="relative text-[#142019]">
      <div className="absolute -inset-6 rounded-[2rem] bg-[var(--gold)]/25 blur-2xl" aria-hidden />
      <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--cream)] shadow-[0_40px_80px_-24px_rgba(7,25,16,0.55)]">
        <div className="flex items-center justify-between border-b border-[var(--line)] bg-white px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#c23b22]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f4c15d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3d8f6a]" />
          </div>
          <p className="text-[11px] font-semibold tracking-wide text-[#142019]">
            Demo Fashion Co · live scan
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-white px-5 py-5">
          {[
            { label: "Health", value: "74", hint: "/100" },
            { label: "Critical", value: "8", hint: "blockers" },
            { label: "Ready", value: "2", hint: "SKUs" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border border-[var(--line)] bg-[var(--cream)] px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#142019]">
                {m.label}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-[var(--forest)]">
                {m.value}
                <span className="ml-1 text-xs font-sans font-medium text-[#142019]/70">{m.hint}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="px-5 pb-5">
          <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
            {rows.map((row, i) => (
              <div
                key={row.sku}
                className={`flex items-center justify-between gap-3 px-4 py-3 ${
                  i < rows.length - 1 ? "border-b border-[var(--line)]" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#142019]">{row.name}</p>
                  <p className="text-[11px] text-[#142019]/70">{row.sku}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      row.tone === "ok"
                        ? "bg-[var(--forest)]/10 text-[var(--forest)]"
                        : row.tone === "warn"
                          ? "bg-[var(--gold)]/35 text-[#8a5a12]"
                          : "bg-[var(--danger)]/10 text-[var(--danger)]"
                    }`}
                  >
                    {row.tag}
                  </span>
                  <span className="w-8 text-right font-display text-sm font-semibold text-[#142019]">
                    {row.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
