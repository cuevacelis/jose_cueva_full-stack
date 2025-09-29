"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSpotifyAuth } from "@/context/auth/spotify-auth-context";
import IconArrowLogin from "./_components/icon-arrow-login";

export default function Home() {
  const { login, loading } = useSpotifyAuth();

  return (
    <section className="w-full mt-[62px] md:mt-[148px] flex flex-col md:flex-row items-center justify-center gap-7 md:gap-[150px]">
      <IconArrowLogin className="size-[222px] md:size-[464px]" />

      <div>
        <h1 className="w-full md:w-[597px] flex flex-col gap-3 text-white text-4xl sm:text-6xl font-bold">
          Disfruta de la <span className="text-lime-300">mejor música</span>
        </h1>
        <p className="w-80 text-white text-base font-normal mt-9">
          Accede a tu cuenta para guardar tus albumes favoritos.
        </p>
        <Button
          variant="link"
          onClick={login}
          disabled={loading}
          className="!p-0 mt-10 md:mt-[108px] inline-flex justify-start items-center gap-6"
        >
          <div className="justify-start text-white text-base font-semibold">
            {loading ? "Conectando..." : "Log in con Spotify"}
          </div>
          <ArrowRight className="size-6 text-white" />
        </Button>
      </div>
    </section>
  );
}
