"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
}

interface SpotifyAuthContextType {
  isAuthenticated: boolean;
  user: SpotifyUser | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
  hasRedirectUriError: boolean;
}

const SpotifyAuthContext = createContext<SpotifyAuthContextType | undefined>(undefined);

export const useSpotifyAuth = () => {
  const context = useContext(SpotifyAuthContext);
  if (context === undefined) {
    throw new Error("useSpotifyAuth must be used within a SpotifyAuthProvider");
  }
  return context;
};

interface SpotifyAuthProviderProps {
  children: ReactNode;
}

export const SpotifyAuthProvider = ({ children }: SpotifyAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasRedirectUriError, setHasRedirectUriError] = useState(false);

  useEffect(() => {
    checkAuthStatus();

    // Check if we're coming back from a redirect URI error
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error === 'redirect_uri_mismatch' || window.location.href.includes('INVALID_CLIENT')) {
      setHasRedirectUriError(true);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("spotify_access_token");
      if (token) {
        // Verificar si el token es válido haciendo una llamada a la API de Spotify
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token inválido, limpiarlo
          localStorage.removeItem("spotify_access_token");
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || `${window.location.origin}/callback`;
    const scopes = "user-read-private user-read-email user-library-read user-library-modify";

    if (!clientId) {
      console.error("Spotify Client ID not configured. Please check your .env file and ensure NEXT_PUBLIC_SPOTIFY_CLIENT_ID is set.");
      alert("Error de configuración: Spotify Client ID no está configurado. Por favor, revisa el archivo .env y reinicia el servidor.");
      return;
    }

    console.log("Initiating Spotify login with:", { clientId: clientId.substring(0, 8) + "...", redirectUri });

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}&show_dialog=true`;

    window.location.href = authUrl;
  };

  const logout = () => {
    // Clear all Spotify-related data from localStorage
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");

    // Reset auth state
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);

    // Redirect to home page
    window.location.href = "/";
  };

  const value: SpotifyAuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    hasRedirectUriError,
  };

  return <SpotifyAuthContext.Provider value={value}>{children}</SpotifyAuthContext.Provider>;
};