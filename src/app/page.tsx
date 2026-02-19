import { getSpotifyData } from "@/lib/spotify";
import { getWeather } from "@/lib/weather";
import BentoGrid from "@/components/BentoGrid";

export interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsResponse {
  contributions: Contribution[];
  total: Record<string, number>;
}

const GITHUB_USERNAME = "KANlKA";

async function fetchContributions(): Promise<ContributionsResponse> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch contributions");
  return res.json();
}

export default async function Home() {
  const [contributionsData, spotify, weather] = await Promise.all([
    fetchContributions(),
    getSpotifyData(),
    getWeather(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BentoGrid
        contributions={contributionsData.contributions}
        spotify={spotify}
        weather={weather}
      />

    </main>
  );
}
