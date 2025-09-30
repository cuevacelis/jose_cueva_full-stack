"use client";

import Link from "next/link";
import { LogOut, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/dashboard/_actions/logout-action";
import { Separator } from "@/components/ui/separator";

export function AuthHeader() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <header className="font-montserrat flex items-center justify-between px-6 py-6 md:px-10 lg:px-20">
      <Link
        href="/dashboard"
        className="text-xl lg:text-2xl font-bold text-[#d6f379] hover:text-white transition-colors"
      >
        ♪ MUSIC
      </Link>
      <div className="flex justify-center items-center gap-10">
        <Link
          href="/dashboard"
          className="font-semibold transition-colors text-white hover:text-[#d6f379]"
        >
          Buscar
        </Link>
        <Link
          href="/dashboard/albums"
          className="font-semibold transition-colors text-white hover:text-[#d6f379]"
        >
          Mis albumes
        </Link>
        <Separator
          orientation="vertical"
          className="w-6"
        />
        <Button
          onClick={handleLogout}
          variant="link"
          className="font-semibold text-white hover:text-[#d6f379] transition-colors flex items-center p-0 h-auto"
        >
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}
