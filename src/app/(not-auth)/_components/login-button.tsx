"use client";

import { Button } from "@/components/ui/button";
import { startSpotifyLogin } from "../_actions/login-action";
import { useState } from "react";
import { cn } from "@/lib/utils/class-utils";

interface LoginButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function LoginButton({ children, className }: LoginButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await startSpotifyLogin();
    } catch {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleLogin}
      disabled={loading}
      className={cn(
        "!p-0 mt-10 md:mt-[108px] inline-flex justify-start items-center gap-6",
        className
      )}
    >
      {loading ? "Conectando..." : children}
    </Button>
  );
}
