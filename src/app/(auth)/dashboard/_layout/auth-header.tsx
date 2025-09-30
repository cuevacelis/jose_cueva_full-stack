"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/dashboard/_actions/logout-action";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import LogoMobile from "../_components/ui/logo-mobile";
import { ThemeModeToggle } from "@/components/theme-toggle/theme-mode-toggle";
import { cn } from "@/lib/utils/class-utils";

export function AuthHeader() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <header className="font-montserrat text-base flex items-center justify-between px-6 py-6 md:px-10 lg:px-20">
      <Link
        href="/dashboard"
        className="text-xl lg:text-2xl font-bold text-primary"
      >
        <LogoMobile className="text-primary inline md:hidden" />
        <span className="text-primary hidden md:inline">♪ MUSIC</span>
      </Link>
      <div className="flex justify-center items-center gap-2.5 lg:gap-10">
        <Link
          href="/dashboard"
          className={cn(
            "text-base font-semibold transition-colors hover:text-primary",
            {
              "text-primary": pathname === "/dashboard",
            }
          )}
        >
          Buscar
        </Link>
        <Link
          href="/dashboard/albums"
          className={cn(
            "text-base font-semibold transition-colors hover:text-primary",
            {
              "text-primary": pathname === "/dashboard/albums",
            }
          )}
        >
          Mis albumes
        </Link>
        <Separator orientation="vertical" className="!h-6 bg-foreground" />
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-base font-semibold hover:text-primary transition-colors flex items-center !p-0 h-auto"
        >
          <LogOut className="inline lg:hidden" />
          <span className="hidden lg:inline">Cerrar sesión</span>
        </Button>
        <Separator
          orientation="vertical"
          className="!h-6 bg-foreground inline md:hidden"
        />
        <ThemeModeToggle className="inline md:hidden" />
      </div>
    </header>
  );
}
