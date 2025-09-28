"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSpotifyAuth } from "@/context/auth/spotify-auth-context";
import { LayoutProps } from "@/types/layout";

export default function NotAuthLayout({ children }: LayoutProps) {
  const { isAuthenticated, loading } = useSpotifyAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#222222] text-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#222222] text-white">
      <main className="flex items-center justify-center min-h-screen">
        {children}
      </main>
    </div>
  );
}
