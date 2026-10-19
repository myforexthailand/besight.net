import { NextRequest, NextResponse } from "next/server";
import { readSpdrSeries } from "@/lib/server/spdr/snapshot";

export const dynamic = "force-dynamic";

/** Public: SPDR holdings + gold for the long chart ranges (3Y / 5Y / MAX). */
export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("range");
  const range = param === "3y" || param === "5y" || param === "max" ? param : null;
  if (!range) return NextResponse.json({ ok: false, error: "range must be 3y, 5y or max" }, { status: 400 });
  try {
    const points = await readSpdrSeries(range);
    return NextResponse.json({ ok: true, points }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } });
  } catch {
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
}
