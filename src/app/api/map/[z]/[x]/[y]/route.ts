import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ z: string; x: string; y: string }> }
) {
  const { z, x, y } = await params;
  const url = `https://a.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}@2x.png`;

  const res = await fetch(url, {
    headers: { "User-Agent": "personal-dashboard/1.0" },
    next: { revalidate: 86400 },
  });

  if (!res.ok) return new NextResponse(null, { status: res.status });

  const buf = await res.arrayBuffer();
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
