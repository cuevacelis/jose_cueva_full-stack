"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { useSpotifyAuth } from "@/context/auth/spotify-auth-context";
import { LayoutProps } from "@/types/layout";

export default function AuthLayout({ children }: LayoutProps) {
  const { isAuthenticated, loading } = useSpotifyAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#222222] text-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#222222] text-white">
      <Navigation />
      {children}
    </div>
  );
}
