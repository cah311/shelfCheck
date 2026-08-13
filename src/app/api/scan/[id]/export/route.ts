import { NextResponse } from "next/server";
import { applySuggestedFixes, toSupplementalFeedRow } from "@/lib/audit";
import { getScan } from "@/lib/store";

function toCsv(rows: Record<string, string>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h] ?? "")).join(",")),
  ].join("\n");
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const scan = await getScan(id);
  if (!scan) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const url = new URL(req.url);
  const withFixes = url.searchParams.get("fixes") !== "0";

  const rows = scan.products.map((p) => {
    const product = withFixes ? applySuggestedFixes(p) : p.product;
    return toSupplementalFeedRow(product);
  });

  const csv = toCsv(rows);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="shelfcheck-${id}.csv"`,
    },
  });
}
