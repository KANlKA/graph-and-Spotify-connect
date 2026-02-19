import { redirect } from "next/navigation";

// One-time route: visit /api/spotify/login to start the OAuth flow.
// After authorizing, Spotify redirects to /api/spotify/callback which prints your refresh token.
export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return new Response("SPOTIFY_CLIENT_ID is not set in .env.local", { status: 500 });
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: [
      "user-read-currently-playing",
      "user-read-recently-played",
    ].join(" "),
    redirect_uri: "http://127.0.0.1:3000/api/spotify/callback",
  });

  redirect(`https://accounts.spotify.com/authorize?${params}`);
}
