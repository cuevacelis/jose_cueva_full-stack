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

  useEffect(() => {
    checkAuthStatus();
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
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scopes = "user-read-private user-read-email user-library-read user-library-modify";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri || ""
    )}&scope=${encodeURIComponent(scopes)}`;

    window.location.href = authUrl;
  };

  const logout = () => {
    localStorage.removeItem("spotify_access_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: SpotifyAuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <SpotifyAuthContext.Provider value={value}>{children}</SpotifyAuthContext.Provider>;
};