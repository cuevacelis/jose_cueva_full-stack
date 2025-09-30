"use server";

import { redirect } from "next/navigation";

export async function startSpotifyLogin() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error("Missing Spotify configuration");
  }

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.append("client_id", clientId);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("redirect_uri", redirectUri);
  authUrl.searchParams.append(
    "scope",
    "user-read-private user-read-email user-library-read user-library-modify"
  );
  authUrl.searchParams.append("show_dialog", "true");

  redirect(authUrl.toString());
}
