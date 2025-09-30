import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

export interface SpotifyTokens {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
}

export const verifySession = cache(async () => {
  const tokens = await getSpotifyTokens();

  if (!tokens?.access_token) {
    return false;
  }

  if (tokens.expires_at && Date.now() > tokens.expires_at) {
    return false;
  }

  return true;
});

export const getSpotifyUser = cache(async () => {
  const isValid = await verifySession();
  if (!isValid) return null;

  const tokens = await getSpotifyTokens();
  if (!tokens) return null;

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
});

export async function getSpotifyTokens(): Promise<SpotifyTokens | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value;
  const expiresAt = cookieStore.get("spotify_expires_at")?.value;

  if (!accessToken) {
    return null;
  }

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt ? parseInt(expiresAt) : 0,
  };
}

export async function setSpotifyTokens(tokens: {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + tokens.expires_in * 1000;
  const cookieExpires = new Date(expiresAt);

  cookieStore.set("spotify_access_token", tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: cookieExpires,
    sameSite: "lax",
    path: "/",
  });

  if (tokens.refresh_token) {
    cookieStore.set("spotify_refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      sameSite: "lax",
      path: "/",
    });
  }

  cookieStore.set("spotify_expires_at", expiresAt.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: cookieExpires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSpotifyTokens() {
  const cookieStore = await cookies();
  cookieStore.delete("spotify_access_token");
  cookieStore.delete("spotify_refresh_token");
  cookieStore.delete("spotify_expires_at");
}
