import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/context/tanstack/tanstack-provider";
import { SpotifyAuthProvider } from "@/context/auth/spotify-auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Music App - Spotify Album Manager",
  description: "Discover artists and save your favorite albums",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          min-w-full min-h-screen bg-neutral-800 text-white ${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased leading-relaxed
        `}
      >
        <TanstackProvider>
          <SpotifyAuthProvider>{children}</SpotifyAuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
