"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/dashboard/_actions/logout-action";
import { Separator } from "@/components/ui/separator";

export function AuthHeader() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <header className="font-montserrat text-base flex items-center justify-between px-6 py-6 md:px-10 lg:px-20">
      <Link
        href="/dashboard"
        className="text-xl lg:text-2xl font-bold text-primary hover:text-foreground transition-colors"
      >
        ♪ MUSIC
      </Link>
      <div className="flex justify-center items-center gap-10">
        <Link
          href="/dashboard"
          className="text-base font-semibold transition-colors hover:text-primary"
        >
          Buscar
        </Link>
        <Link
          href="/dashboard/albums"
          className="text-base font-semibold transition-colors hover:text-primary"
        >
          Mis albumes
        </Link>
        <Separator orientation="vertical" className="!h-6 bg-foreground" />
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-base font-semibold hover:text-primary transition-colors flex items-center p-0 h-auto"
        >
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}
