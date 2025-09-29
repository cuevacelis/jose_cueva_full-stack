"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSpotifyAuth } from "@/context/auth/spotify-auth-context";
import NotAuthHeader from "./_layout/not-auth-header";
import NotAuthMain from "./_layout/not-auth-main";

export default function NotAuthLayout({ children }: LayoutProps<"/">) {
  const { isAuthenticated, loading } = useSpotifyAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <NotAuthHeader />
      <NotAuthMain>{children}</NotAuthMain>
    </>
  );
}
