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

      {/* Placeholder content to test scroll */}
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground">Projects</h2>
        <p className="mt-4 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="mt-4 text-muted-foreground">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="mt-4 text-muted-foreground">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </section>
    </main>
  );
}
