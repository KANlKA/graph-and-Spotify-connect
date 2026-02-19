import { getSpotifyData } from "./lib/spotify";
import { getWeather } from "./lib/weather";

// ─── GitHub types ─────────────────────────────────────────────────────────────

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

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

function groupByWeek(contributions: Contribution[]): Contribution[][] {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) weeks.push(contributions.slice(i, i + 7));
  return weeks;
}

function getMonthLabels(weeks: Contribution[][]): { label: string; col: number }[] {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const month = new Date(week[0].date).getMonth();
    if (month !== lastMonth) { labels.push({ label: MONTHS[month], col }); lastMonth = month; }
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [contributions, spotify, weather] = await Promise.all([
    fetchContributions(),
    getSpotifyData(),
    getWeather(),
  ]);

  const weeks = groupByWeek(contributions.contributions);
  const monthLabels = getMonthLabels(weeks);
  const totalThisYear = Object.values(contributions.total).reduce((a, b) => a + b, 0);

  // Resolve the one track we want to display
  const lastTrack =
    spotify.status === "playing"
      ? { name: spotify.item.track.name, artist: spotify.item.track.artists.map((a) => a.name).join(", "), time: "Now playing", url: spotify.item.track.external_urls.spotify }
      : spotify.status === "recent" && spotify.items[0]
      ? { name: spotify.items[0].track.name, artist: spotify.items[0].track.artists.map((a) => a.name).join(", "), time: new Date(spotify.items[0].played_at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }), url: spotify.items[0].track.external_urls.spotify }
      : null;

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
                    <div key={i} className="h-[11px] text-[10px] text-gray-500 dark:text-gray-400 leading-[11px] w-6 text-right pr-1">
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
                <div key={year} className="rounded-md border border-gray-200 dark:border-[#30363d] px-4 py-2 text-sm">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{year}</span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">{count.toLocaleString()} contributions</span>
                </div>
              ))}
          </div>
        </section>

        {/* ── Spotify Section ── */}
<section className="mt-8 w-full max-w-2xl mx-auto">
  <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">
    Last Played
  </h2>

  {spotify.status === "unconfigured" && (
    <p className="text-zinc-400 text-sm">Spotify not configured</p>
  )}
  {spotify.status === "error" && (
    <p className="text-zinc-400 text-sm">Could not load</p>
  )}

  {lastTrack && (
    <a
      href={lastTrack.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-5 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-300 shadow-sm hover:shadow-md px-6 py-5"
    >
      {/* Spotify green circle icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center shadow-md">
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.318c-.214.34-.67.444-1.01.23-2.765-1.69-6.246-2.073-10.35-1.135-.394.09-.79-.155-.88-.55-.09-.394.155-.79.55-.88 4.487-1.026 8.332-.585 11.44 1.315.34.214.444.67.23 1.02zm1.472-3.27c-.27.43-.845.564-1.274.294-3.164-1.944-7.986-2.508-11.73-1.372-.484.146-.995-.128-1.14-.612-.147-.484.127-.995.61-1.14 4.274-1.298 9.586-.668 13.24 1.566.43.27.564.846.294 1.274zm.127-3.408C15.36 8.498 9.7 8.3 6.327 9.33c-.582.176-1.196-.152-1.372-.734-.176-.583.152-1.196.734-1.372C9.574 6.08 15.87 6.31 19.524 8.57c.525.316.696 1 .38 1.524-.316.524-1 .695-1.524.38l.735-.434z" />
        </svg>
      </div>

      {/* Track info */}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
          {lastTrack.time}
        </span>
        <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-[#1DB954] transition-colors duration-200">
          {lastTrack.name}
        </span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
          {lastTrack.artist}
        </span>
      </div>

      {/* Chevron arrow */}
      <svg
        className="flex-shrink-0 w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-[#1DB954] group-hover:translate-x-0.5 transition-all duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  )}
</section>

        {/* ── Weather Section ── */}
        <section className="w-full max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">
            Weather
          </h2>

          {weather.status === "unconfigured" && (
            <p className="text-zinc-400 text-sm">
              Set <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">WEATHER_CITY</code> in <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">.env.local</code> to show weather.
            </p>
          )}

          {weather.status === "error" && (
            <p className="text-zinc-400 text-sm">Could not load weather.</p>
          )}

          {weather.status === "ok" && (
            <div className="flex items-center gap-5 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm px-6 py-5">
              {/* Emoji in circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-2xl">
                {weather.data.emoji}
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                  {weather.data.city}
                </span>
                <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {weather.data.temp}°C · {weather.data.label}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Feels like {weather.data.feelsLike}°C
                </span>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>

  );
}
