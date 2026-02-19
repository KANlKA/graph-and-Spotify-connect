import type { SpotifyData } from "@/lib/spotify";

interface Props { spotify: SpotifyData }

export default function SpotifyCard({ spotify }: Props) {
  const track =
    spotify.status === "playing"
      ? {
          name: spotify.item.track.name,
          artist: spotify.item.track.artists.map((a) => a.name).join(", "),
          label: "Now playing",
          isPlaying: true,
        }
      : spotify.status === "recent" && spotify.items[0]
      ? {
          name: spotify.items[0].track.name,
          artist: spotify.items[0].track.artists.map((a) => a.name).join(", "),
          label: new Date(spotify.items[0].played_at).toLocaleString("en-US", {
            month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
          }),
          isPlaying: false,
        }
      : null;

  return (
    <div className="bento-card h-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 168 168" width="16" height="16" aria-hidden>
          <path fill="#1DB954" d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.6 121.1c-1.5 2.5-4.8 3.3-7.3 1.8-20-12.2-45.2-15-74.9-8.2-2.9.7-5.7-1.1-6.4-4-.7-2.9 1.1-5.7 4-6.4 32.5-7.4 60.4-4.2 82.9 9.5 2.5 1.5 3.3 4.8 1.7 7.3zm10.3-22.9c-1.9 3.1-6 4.1-9.1 2.2-22.9-14.1-57.8-18.2-84.9-9.9-3.4 1-7-1-8-4.4-1-3.4 1-7 4.4-8 30.9-9.4 69.3-4.9 95.5 11.3 3.1 1.9 4.1 6 2.1 9.1v-.3zm.9-23.8C112 60.2 71.1 58.8 44.5 67c-4 1.2-8.2-1-9.4-5.1-1.2-4 1-8.2 5.1-9.4 30.5-9.3 81.2-7.5 113.1 11.1 3.7 2.1 4.9 6.8 2.7 10.5-2.1 3.6-6.8 4.9-10.5 2.7l.3.5z" />
        </svg>
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Spotify</span>
        {track?.isPlaying && (
          <span className="ml-auto flex items-end gap-[2px] h-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="inline-block w-[3px] rounded-sm bg-[#1DB954] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s`, height: "100%" }} />
            ))}
          </span>
        )}
      </div>

      {track ? (
        <div className="flex-1 flex flex-col justify-end gap-0.5">
          <p className="text-base font-semibold text-foreground leading-snug line-clamp-2">{track.name}</p>
          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          <p className="text-[11px] text-muted-foreground/60 mt-1">{track.label}</p>
        </div>
      ) : (
        <div className="flex-1 flex items-center">
          <p className="text-sm text-muted-foreground">Nothing playing</p>
        </div>
      )}
    </div>
  );
}
