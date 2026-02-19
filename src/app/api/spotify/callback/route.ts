import { NextRequest } from "next/server";

// One-time route: Spotify redirects here after you authorize.
// Copy the SPOTIFY_REFRESH_TOKEN value shown on screen into your .env.local.
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response("Missing code parameter from Spotify", { status: 400 });
  }

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return new Response("SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET not set", { status: 500 });
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://127.0.0.1:3000/api/spotify/callback",
    }),
    cache: "no-store",
  });

  const json = await res.json();

  if (!json.refresh_token) {
    return new Response(`Spotify error: ${JSON.stringify(json)}`, { status: 500 });
  }

  return new Response(
    `
<!DOCTYPE html>
<html>
  <head><title>Spotify token</title></head>
  <body style="font-family:monospace;padding:2rem;max-width:640px">
    <h2>✅ Got your refresh token!</h2>
    <p>Add this to your <code>.env.local</code>:</p>
    <pre style="background:#f4f4f4;padding:1rem;border-radius:6px;word-break:break-all">SPOTIFY_REFRESH_TOKEN=${json.refresh_token}</pre>
    <p>Then restart the dev server.</p>
  </body>
</html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
