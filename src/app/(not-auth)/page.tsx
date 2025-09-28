"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Music } from "lucide-react";
import { useSpotifyAuth } from "@/context/auth/spotify-auth-context";

export default function Home() {
  const { login, loading } = useSpotifyAuth();

  return (
    <div className="min-h-screen bg-[#222222] relative">
      {/* Mobile header - only shown on small screens */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[87px] flex items-center px-6">
        <div className="text-xl font-bold text-[#d6f379]">♪ Music App</div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pt-16 lg:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Circular graphic */}
          <div className="flex items-center justify-center order-1 lg:order-1">
            <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-[#d6f379] to-[#a3c953] flex items-center justify-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222222]">
                ♪
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left space-y-4 lg:space-y-6 order-2 lg:order-2 px-4">
            <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Disfruta de la{" "}
              <span className="text-[#d6f379]">mejor música</span>
            </h1>

            <p className="font-montserrat font-normal text-white text-base lg:text-lg max-w-md mx-auto lg:mx-0">
              Accede a tu cuenta para guardar tus albumes favoritos.
            </p>

            <div className="pt-4">
              <Button
                onClick={login}
                disabled={loading}
                className="bg-[#d6f379] text-[#222222] font-montserrat font-semibold hover:bg-[#c4e368] px-6 lg:px-8 py-4 lg:py-6 text-base lg:text-lg rounded-full flex items-center justify-center disabled:opacity-50 transition-all duration-200"
              >
                <Music className="mr-2 lg:mr-3 h-4 w-4 lg:h-5 lg:w-5" />
                {loading ? "Conectando..." : "Log in con Spotify"}
                {!loading && <ArrowRight className="ml-2 lg:ml-3 h-4 w-4 lg:h-5 lg:w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
