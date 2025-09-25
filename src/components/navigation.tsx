"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Sun, Menu } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/search") {
      return pathname === "/search" || pathname.startsWith("/artist/");
    }
    return pathname === path;
  };

  return (
    <header className="h-[87px] flex items-center justify-between px-6 lg:px-20 py-6">
      <div className="flex items-center">
        <Link href="/" className="text-xl lg:text-2xl font-bold text-[#d6f379] hover:text-white transition-colors">
          ♪ Music App
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-10">
        <Link
          href="/search"
          className={`font-montserrat font-semibold transition-colors ${
            isActive("/search")
              ? "text-[#d6f379]"
              : "text-white hover:text-[#d6f379]"
          }`}
        >
          Buscar
        </Link>
        <Link
          href="/albums"
          className={`font-montserrat font-semibold transition-colors ${
            isActive("/albums")
              ? "text-[#d6f379]"
              : "text-white hover:text-[#d6f379]"
          }`}
        >
          Mis albumes
        </Link>
        <div className="w-px h-6 bg-gray-600" />
        <Link
          href="/"
          className="font-montserrat font-semibold text-white hover:text-[#d6f379] transition-colors flex items-center"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden items-center space-x-3">
        <Link
          href="/search"
          className={`font-montserrat font-semibold transition-colors text-sm ${
            isActive("/search")
              ? "text-[#d6f379]"
              : "text-white hover:text-[#d6f379]"
          }`}
        >
          Buscar
        </Link>
        <Link
          href="/albums"
          className={`font-montserrat font-semibold transition-colors text-sm ${
            isActive("/albums")
              ? "text-[#d6f379]"
              : "text-white hover:text-[#d6f379]"
          }`}
        >
          My albums
        </Link>
        <div className="w-px h-4 bg-gray-600" />
        <Link
          href="/"
          className="font-montserrat font-semibold text-white hover:text-[#d6f379] transition-colors"
        >
          <LogOut className="h-4 w-4" />
        </Link>
        <div className="w-px h-4 bg-gray-600" />
        <Sun className="h-4 w-4 text-white" />
      </div>
    </header>
  );
}