import type { SpotifyData } from "@/lib/spotify";

interface Props { spotify: SpotifyData }

export default function SpotifyCard({ spotify }: Props) {
  const track =
    spotify.status === "playing"
      ? {
          name: spotify.item.track.name,
          artist: spotify.item.track.artists.map((a) => a.name).join(", "),
          label: "Now playing",
          image: spotify.item.track.album.images[0]?.url ?? null,
        }
      : spotify.status === "recent" && spotify.items[0]
      ? {
          name: spotify.items[0].track.name,
          artist: spotify.items[0].track.artists.map((a) => a.name).join(", "),
          label: "Last played",
          image: spotify.items[0].track.album.images[0]?.url ?? null,
        }
      : null;

  return (
    <div className="spotify-card bento-card h-full flex items-center gap-4">
      {/* Album art */}
      <div className="h-14 w-14 rounded-lg bg-secondary flex-shrink-0 overflow-hidden flex items-center justify-center">
        {track?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={track.image} alt="Album art" className="h-full w-full object-cover" />
        ) : (
          <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
          </svg>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{track ? track.label : "Not listening"}</p>
        <p className="text-sm font-bold text-foreground leading-tight mt-0.5 line-clamp-1">
          {track?.name ?? "Not listening to music"}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate uppercase tracking-widest">
          {track?.artist ?? "SPOTIFY"}
        </p>
      </div>

      {/* Spotify logo */}
      <div className="self-start flex-shrink-0">
        <div className="spotify-logo-icon h-8 w-8 rounded-full bg-black flex items-center justify-center text-white transition-colors duration-200">
          <svg viewBox="0 0 168 168" width="18" height="18" aria-hidden className="fill-current">
            <path d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.6 121.1c-1.5 2.5-4.8 3.3-7.3 1.8-20-12.2-45.2-15-74.9-8.2-2.9.7-5.7-1.1-6.4-4-.7-2.9 1.1-5.7 4-6.4 32.5-7.4 60.4-4.2 82.9 9.5 2.5 1.5 3.3 4.8 1.7 7.3zm10.3-22.9c-1.9 3.1-6 4.1-9.1 2.2-22.9-14.1-57.8-18.2-84.9-9.9-3.4 1-7-1-8-4.4-1-3.4 1-7 4.4-8 30.9-9.4 69.3-4.9 95.5 11.3 3.1 1.9 4.1 6 2.1 9.1v-.3zm.9-23.8C112 60.2 71.1 58.8 44.5 67c-4 1.2-8.2-1-9.4-5.1-1.2-4 1-8.2 5.1-9.4 30.5-9.3 81.2-7.5 113.1 11.1 3.7 2.1 4.9 6.8 2.7 10.5-2.1 3.6-6.8 4.9-10.5 2.7l.3.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
