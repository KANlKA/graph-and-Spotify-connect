import { getSpotifyData } from "./lib/spotify";
import { getWeather } from "./lib/weather";

// Icons
const Location = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const X = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Figma = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zM4 20a4 4 0 0 1 4-4h4v4a4 4 0 1 1-8 0zM12 2v8h4a4 4 0 1 0 0-8h-4zM4 4a4 4 0 0 0 4 4h4V2H8a4 4 0 0 0-4 4zM4 12a4 4 0 0 0 4 4h4V8H8a4 4 0 0 0-4 4z" />
  </svg>
);

const Medium = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

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
    if (!week[0]) return;
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [contributions, spotify] = await Promise.all([
    fetchContributions().catch(() => null),
    getSpotifyData(),
  ]);

  const weeks = contributions ? groupByWeek(contributions.contributions) : [];
  const monthLabels = contributions ? getMonthLabels(weeks) : [];
  const totalThisYear = contributions 
    ? Object.values(contributions.total).reduce((a, b) => a + b, 0) 
    : 336; // Default from image

  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }) + ` · GMT+5:30`;

  const socialMedias = [
    { icon: X, href: 'https://x.com/0xtaufeeq' },
    { icon: Figma, href: 'https://www.figma.com/@taufeeq' },
    { icon: Medium, href: 'https://medium.com/@taufeeqriyaz' }
  ];

  return (
    <>
      <style>{`
        #bento {
          --card-border: #3f3f46;
          --card-background: #09090b;
          scroll-margin: 3rem;
        }

        #bento:hover .card::after {
          opacity: 1;
        }

        .card {
          background-color: #18181b;
          display: flex;
          flex-direction: column;
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
        }

        .card:hover::before {
          opacity: 1;
        }

        .card::before,
        .card::after {
          border-radius: inherit;
          content: '';
          height: 100%;
          left: 0px;
          opacity: 0;
          position: absolute;
          top: 0px;
          transition: opacity 500ms;
          width: 100%;
          pointer-events: none;
        }

        .card::before {
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.06),
            transparent 40%
          );
          z-index: 3;
        }

        .card::after {
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            var(--card-border),
            transparent 50%
          );
          z-index: 1;
        }

        .card > .card-content {
          background-color: var(--card-background);
          border-radius: inherit;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          inset: 1px;
          z-index: 2;
          position: relative;
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('astro:page-load', () => {
              const bento = document.getElementById('bento');
              if (!bento) return;
              bento.onmousemove = (e) => {
                for (const card of document.getElementsByClassName('card')) {
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  card.style.setProperty('--mouse-x', x + 'px');
                  card.style.setProperty('--mouse-y', y + 'px');
                }
              };
            });
          `,
        }}
      />

      <div className="min-h-screen bg-black p-4 md:p-8">
        <section
          id="bento"
          className="grid auto-rows-[minmax(0,1fr)] grid-cols-[repeat(36,_minmax(0,_1fr))] gap-4 max-lg:grid-cols-6 max-md:flex max-md:flex-col max-w-7xl mx-auto"
        >
          {/* Location Card */}
          <div className="relative col-start-1 col-end-11 row-start-1 row-end-[8] aspect-square max-lg:col-end-3 max-lg:row-end-3">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-zinc-400">
              <Location />
              <span>Location</span>
            </div>
            
            <div className="card h-full w-full">
              <div className="card-content">
                <div className="p-6 h-full flex flex-col justify-center">
                  <div className="space-y-1 text-sm">
                    <div className="text-zinc-100">HEBBAL</div>
                    <div className="pl-4 text-zinc-400">SULTHANPALY</div>
                    <div className="pl-4 text-zinc-400">RT NAGAR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="col-start-1 col-end-11 row-start-[7] row-end-[9] max-lg:col-end-4 max-lg:row-start-3 max-lg:row-end-4 h-full">
            <div className="grid grid-cols-3 gap-4 h-full">
              {socialMedias.map(({ icon: Icon, href }, i) => (
                <div key={i} className="card aspect-square">
                  <div className="card-content">
                    <a
                      href={href}
                      aria-label="Social media"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-full items-center justify-center rounded-3xl text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                      <Icon />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DevSphere Card */}
          <div className="card col-start-11 col-end-[24] row-start-1 row-end-[7] max-lg:col-start-3 max-lg:col-end-7 max-lg:row-end-3">
            <div className="card-content">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-zinc-800 rounded-lg">
                    <span className="text-xs font-medium text-zinc-400">DevSphere</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm text-zinc-300">Open Source and Web 3.0 Club at RV University</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-zinc-100">DevSphere</p>
                    <p className="text-xs text-zinc-500">Welcome to the community!</p>
                  </div>
                  <div className="text-xs text-zinc-600">Membership request...</div>
                </div>
              </div>
            </div>
          </div>

          {/* Spotify Card */}
          <div className="card col-start-11 col-end-[24] row-start-[7] row-end-[9] max-lg:col-start-4 max-lg:col-end-7 max-lg:row-start-3 max-lg:row-end-4">
            <div className="card-content">
              <div className="p-6 h-full flex items-center">
                <div className="flex items-center gap-3 w-full">
                  <div className="text-emerald-500">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.318c-.214.34-.67.444-1.01.23-2.765-1.69-6.246-2.073-10.35-1.135-.394.09-.79-.155-.88-.55-.09-.394.155-.79.55-.88 4.487-1.026 8.332-.585 11.44 1.315.34.214.444.67.23 1.02zm1.472-3.27c-.27.43-.845.564-1.274.294-3.164-1.944-7.986-2.508-11.73-1.372-.484.146-.995-.128-1.14-.612-.147-.484.127-.995.61-1.14 4.274-1.298 9.586-.668 13.24 1.566.43.27.564.846.294 1.274z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-100">Not listening</p>
                    <p className="text-xs text-zinc-500">Not listening to music</p>
                  </div>
                  <span className="text-xs font-medium text-zinc-600">SPOTIFY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Local Time Card */}
          <div className="card col-start-[24] col-end-[37] row-start-1 row-end-4 max-lg:col-start-1 max-lg:col-end-4 max-lg:row-start-4 max-lg:row-end-6">
            <div className="card-content">
              <div className="p-6 h-full flex flex-col justify-center">
                <p className="text-4xl font-light text-zinc-100 mb-2">{formattedTime}</p>
                <p className="text-sm text-zinc-500">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* GitHub Activity Card */}
          <div className="card col-start-[24] col-end-[37] row-start-4 row-end-[9] max-lg:col-start-4 max-lg:col-end-7 max-lg:row-start-4 max-lg:row-end-6">
            <div className="card-content">
              <div className="p-6 h-full flex flex-col">
                <p className="text-sm font-medium text-zinc-100 mb-2">GitHub activity</p>
                <p className="text-3xl font-light text-zinc-100 mb-1">{totalThisYear}</p>
                <p className="text-xs text-zinc-500">contributions in the last year</p>
                
                <div className="mt-4 overflow-x-auto">
                  <div className="inline-flex flex-col gap-1 min-w-max">
                    {/* Month labels */}
                    <div className="flex gap-[3px] ml-8 mb-1 text-[10px] font-mono text-zinc-600">
                      {weeks.slice(0, 12).map((_, col) => {
                        const label = monthLabels.find((m) => m.col === col);
                        return (
                          <div key={col} className="w-[11px] text-center">
                            {label?.label ?? ""}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-1">
                      {/* Day labels */}
                      <div className="flex flex-col gap-[3px] mr-2 text-[10px] font-mono text-zinc-600">
                        {DAYS.map((day, i) => (
                          <div key={i} className="h-[11px] leading-[11px] w-6 text-right">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Weeks */}
                      {weeks.slice(0, 12).map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((day) => (
                            <div
                              key={day.date}
                              className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[day.level]}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 mt-4">Last pushed on Thursday, February 5th 2026</p>
              </div>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="card col-start-1 col-end-[19] row-start-9 row-end-[15] max-lg:col-start-1 max-lg:col-end-4 max-lg:row-start-6 max-lg:row-end-9">
            <div className="card-content">
              <div className="p-6 h-full flex flex-col">
                <p className="text-sm font-medium text-zinc-100 mb-4">Tech stack</p>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl text-zinc-100">JS</span>
                  <span className="text-zinc-400">Techstack</span>
                  <span className="text-2xl text-zinc-100">N</span>
                  <span className="text-2xl text-zinc-100">S</span>
                  <span className="text-2xl text-zinc-100">B</span>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-zinc-300 mb-4">Technologies I work with</p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Designing and building reliable solutions across frontend, backend, and cloud.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}