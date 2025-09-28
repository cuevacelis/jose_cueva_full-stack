"use client";

import Link from "next/link";
import { LogOut, Sun } from "lucide-react";
import { useSpotifyAuth } from "@/context/auth/spotify-auth-context";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const { logout } = useSpotifyAuth();

  return (
    <header className="h-[87px] flex items-center justify-between px-6 lg:px-20 py-6">
      <div className="flex items-center">
        <Link
          href="/dashboard"
          className="text-xl lg:text-2xl font-bold text-[#d6f379] hover:text-white transition-colors"
        >
          ♪ Music App
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-10">
        <Link
          href="/dashboard"
          className="font-montserrat font-semibold transition-colors text-white hover:text-[#d6f379]"
        >
          Buscar
        </Link>
        <Link
          href="/dashboard/albums"
          className="font-montserrat font-semibold transition-colors text-white hover:text-[#d6f379]"
        >
          Mis albumes
        </Link>
        <div className="w-px h-6 bg-gray-600" />
        <Button
          onClick={logout}
          variant="ghost"
          className="font-montserrat font-semibold text-white hover:text-[#d6f379] transition-colors flex items-center p-0 h-auto"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden items-center space-x-3">
        <Link
          href="/dashboard"
          className="font-montserrat font-semibold transition-colors text-sm text-white hover:text-[#d6f379]"
        >
          Buscar
        </Link>
        <Link
          href="/dashboard/albums"
          className="font-montserrat font-semibold transition-colors text-sm text-white hover:text-[#d6f379]"
        >
          My albums
        </Link>
        <div className="w-px h-4 bg-gray-600" />
        <Button
          onClick={logout}
          variant="ghost"
          className="font-montserrat font-semibold text-white hover:text-[#d6f379] transition-colors p-0 h-auto"
        >
          <LogOut className="h-4 w-4" />
        </Button>
        <div className="w-px h-4 bg-gray-600" />
        <Sun className="h-4 w-4 text-white" />
      </div>
    </header>
  );
}
