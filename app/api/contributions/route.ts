import { NextResponse } from "next/server";

export interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionsResponse {
  contributions: Contribution[];
  total: Record<string, number>;
}

const USERNAME = "KANlKA";

export async function GET() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 502 }
    );
  }

  const data: ContributionsResponse = await res.json();
  return NextResponse.json(data);
}
