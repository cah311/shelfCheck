import { NextResponse } from "next/server";
import { scanToCsv } from "@/lib/audit";
import { getScan } from "@/lib/store";

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
  const csv = scanToCsv(scan, withFixes);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="shelfcheck-${id}.csv"`,
    },
  });
}
