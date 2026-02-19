const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=8";

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; width: number; height: number }[];
  };
  external_urls: { spotify: string };
  duration_ms: number;
}

export interface NowPlaying {
  isPlaying: true;
  track: SpotifyTrack;
  progress_ms: number;
}

export interface RecentTrack {
  track: SpotifyTrack;
  played_at: string;
}

export type SpotifyData =
  | { status: "playing"; item: NowPlaying }
  | { status: "recent"; items: RecentTrack[] }
  | { status: "unconfigured" }
  | { status: "error" };

async function getAccessToken(): Promise<string> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN!,
    }),
    cache: "no-store",
  });

  const json = await res.json();
  return json.access_token as string;
}

export async function getSpotifyData(): Promise<SpotifyData> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return { status: "unconfigured" };
  }

  try {
    const accessToken = await getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    // Try currently playing first
    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers,
      cache: "no-store",
    });

    if (nowRes.status === 200) {
      const nowJson = await nowRes.json();
      if (nowJson?.is_playing && nowJson?.item) {
        return {
          status: "playing",
          item: {
            isPlaying: true,
            track: nowJson.item as SpotifyTrack,
            progress_ms: nowJson.progress_ms,
          },
        };
      }
    }

    // Fall back to recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers,
      cache: "no-store",
    });

    if (!recentRes.ok) return { status: "error" };

    const recentJson = await recentRes.json();
    return {
      status: "recent",
      items: recentJson.items as RecentTrack[],
    };
  } catch {
    return { status: "error" };
  }
}
