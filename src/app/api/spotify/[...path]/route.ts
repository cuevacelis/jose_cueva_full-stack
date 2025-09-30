import { getSpotifyTokens } from "@/lib/dal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleSpotifyRequest(request, await params, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleSpotifyRequest(request, await params, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleSpotifyRequest(request, await params, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleSpotifyRequest(request, await params, "DELETE");
}

async function handleSpotifyRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    const tokens = await getSpotifyTokens();

    if (!tokens?.access_token) {
      return NextResponse.json(
        { error: "Unauthorized - No access token" },
        { status: 401 }
      );
    }

    // Check if token is expired
    if (tokens.expires_at && Date.now() > tokens.expires_at) {
      return NextResponse.json(
        { error: "Unauthorized - Token expired" },
        { status: 401 }
      );
    }

    // Build Spotify API URL
    const spotifyPath = params.path.join("/");
    const searchParams = request.nextUrl.searchParams.toString();
    const spotifyUrl = `https://api.spotify.com/v1/${spotifyPath}${
      searchParams ? `?${searchParams}` : ""
    }`;

    // Prepare request options
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json",
      },
    };

    // Add body for POST, PUT, DELETE requests
    if (method === "POST" || method === "PUT" || method === "DELETE") {
      const body = await request.text();
      if (body) {
        options.body = body;
      }
    }

    // Make request to Spotify API
    const response = await fetch(spotifyUrl, options);

    // Handle empty responses (like 204 No Content)
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Spotify API proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
