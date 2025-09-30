import { setSpotifyTokens } from "@/lib/dal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is required" },
        { status: 400 }
      );
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json(
        { error: "Missing Spotify configuration" },
        { status: 500 }
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Spotify token error:", {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorData,
        requestDetails: {
          clientId: clientId?.substring(0, 8) + "...",
          redirectUri,
          codeLength: code.length,
          clientSecret: clientSecret ? "***set***" : "***missing***",
        },
      });
      return NextResponse.json(
        {
          error: "Failed to exchange code for token",
          details:
            errorData.error_description || errorData.error || "Unknown error",
          spotifyError: errorData,
        },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    // Store tokens in httpOnly cookies
    await setSpotifyTokens({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
    });

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Callback API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
