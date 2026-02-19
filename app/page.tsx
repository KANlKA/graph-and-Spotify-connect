import Image from "next/image";
import { getSpotifyData, type SpotifyTrack, type RecentTrack } from "./lib/spotify";

// ─── GitHub types ────────────────────────────────────────────────────────────

export interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionsResponse {
  contributions: Contribution[];
  total: Record<string, number>;
}

// ─── GitHub helpers ───────────────────────────────────────────────────────────

const LEVEL_COLORS = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

function groupByWeek(contributions: Contribution[]): Contribution[][] {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

function getMonthLabels(weeks: Contribution[][]): { label: string; col: number }[] {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const month = new Date(week[0].date).getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], col });
      lastMonth = month;
    }
  });
  return labels;
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

// ─── Spotify sub-components ───────────────────────────────────────────────────

function TrackCard({ track, meta }: { track: SpotifyTrack; meta?: React.ReactNode }) {
  const art = track.album.images[0]?.url;
  const artists = track.artists.map((a) => a.name).join(", ");

  return (
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-[#161b22] transition-colors group"
    >
      {art && (
        <Image
          src={art}
          alt={track.album.name}
          width={48}
          height={48}
          className="rounded-md shrink-0 shadow-sm"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#1DB954]">
          {track.name}
        </p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{artists}</p>
        {meta && <div className="mt-0.5">{meta}</div>}
      </div>
    </a>
  );
}

function NowPlayingBars() {
  return (
    <span className="inline-flex items-end gap-[2px] h-3">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * 0.15}s` }}
          className="inline-block w-[3px] bg-[#1DB954] rounded-sm animate-bounce"
          aria-hidden
        />
      ))}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [contributions, spotify] = await Promise.all([
    fetchContributions(),
    getSpotifyData(),
  ]);

  const weeks = groupByWeek(contributions.contributions);
  const monthLabels = getMonthLabels(weeks);
  const totalThisYear = Object.values(contributions.total).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl space-y-12">

        {/* ── GitHub Section ── */}
        <section>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              KANlKA&apos;s GitHub Contributions
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {totalThisYear.toLocaleString()} contributions in the last year
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-[#30363d] p-6 overflow-x-auto">
            <div className="inline-flex flex-col gap-1 min-w-max">
              {/* Month labels */}
              <div className="flex gap-[3px] ml-8 mb-1">
                {weeks.map((_, col) => {
                  const label = monthLabels.find((m) => m.col === col);
                  return (
                    <div key={col} className="w-[11px] text-[10px] text-gray-500 dark:text-gray-400">
                      {label?.label ?? ""}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-1">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] mr-1">
                  {DAYS.map((day, i) => (
                    <div
                      key={i}
                      className="h-[11px] text-[10px] text-gray-500 dark:text-gray-400 leading-[11px] w-6 text-right pr-1"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Weeks */}
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                        className={`w-[11px] h-[11px] rounded-sm ${LEVEL_COLORS[day.level]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1 mt-4 justify-end">
              <span className="text-[11px] text-gray-500 dark:text-gray-400 mr-1">Less</span>
              {LEVEL_COLORS.map((cls, i) => (
                <div key={i} className={`w-[11px] h-[11px] rounded-sm ${cls}`} />
              ))}
              <span className="text-[11px] text-gray-500 dark:text-gray-400 ml-1">More</span>
            </div>
          </div>

          {/* Per-year totals */}
          <div className="mt-4 flex flex-wrap gap-3">
            {Object.entries(contributions.total)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([year, count]) => (
                <div
                  key={year}
                  className="rounded-md border border-gray-200 dark:border-[#30363d] px-4 py-2 text-sm"
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100">{year}</span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">
                    {count.toLocaleString()} contributions
                  </span>
                </div>
              ))}
          </div>
        </section>

        {/* ── Spotify Section ── */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            {/* Spotify logo mark */}
            <svg viewBox="0 0 168 168" width="20" height="20" aria-hidden>
              <path
                fill="#1DB954"
                d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.6 121.1c-1.5 2.5-4.8 3.3-7.3 1.8-20-12.2-45.2-15-74.9-8.2-2.9.7-5.7-1.1-6.4-4-.7-2.9 1.1-5.7 4-6.4 32.5-7.4 60.4-4.2 82.9 9.5 2.5 1.5 3.3 4.8 1.7 7.3zm10.3-22.9c-1.9 3.1-6 4.1-9.1 2.2-22.9-14.1-57.8-18.2-84.9-9.9-3.4 1-7-1-8-4.4-1-3.4 1-7 4.4-8 30.9-9.4 69.3-4.9 95.5 11.3 3.1 1.9 4.1 6 2.1 9.1v-.3zm.9-23.8C112 60.2 71.1 58.8 44.5 67c-4 1.2-8.2-1-9.4-5.1-1.2-4 1-8.2 5.1-9.4 30.5-9.3 81.2-7.5 113.1 11.1 3.7 2.1 4.9 6.8 2.7 10.5-2.1 3.6-6.8 4.9-10.5 2.7l.3.5z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {spotify.status === "playing" ? "Now Playing" : "Recently Played"}
            </h2>
            {spotify.status === "playing" && <NowPlayingBars />}
          </div>

          {spotify.status === "unconfigured" && (
            <div className="rounded-lg border border-dashed border-gray-300 dark:border-[#30363d] p-6 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Spotify not configured</p>
              <p>
                Add <code className="bg-gray-100 dark:bg-[#161b22] px-1 rounded">SPOTIFY_CLIENT_ID</code>,{" "}
                <code className="bg-gray-100 dark:bg-[#161b22] px-1 rounded">SPOTIFY_CLIENT_SECRET</code>, and{" "}
                <code className="bg-gray-100 dark:bg-[#161b22] px-1 rounded">SPOTIFY_REFRESH_TOKEN</code> to{" "}
                <code className="bg-gray-100 dark:bg-[#161b22] px-1 rounded">.env.local</code>, then visit{" "}
                <code className="bg-gray-100 dark:bg-[#161b22] px-1 rounded">/api/spotify/login</code> to authorize.
              </p>
            </div>
          )}

          {spotify.status === "error" && (
            <p className="text-sm text-red-500">Could not load Spotify data.</p>
          )}

          {spotify.status === "playing" && (
            <div className="rounded-lg border border-gray-200 dark:border-[#30363d] divide-y divide-gray-100 dark:divide-[#21262d]">
              <TrackCard
                track={spotify.item.track}
                meta={
                  <span className="text-[10px] font-medium text-[#1DB954]">PLAYING NOW</span>
                }
              />
            </div>
          )}

          {spotify.status === "recent" && (
            <div className="rounded-lg border border-gray-200 dark:border-[#30363d] divide-y divide-gray-100 dark:divide-[#21262d]">
              {spotify.items.map((item: RecentTrack) => (
                <TrackCard
                  key={`${item.track.id}-${item.played_at}`}
                  track={item.track}
                  meta={
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {new Date(item.played_at).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  }
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
