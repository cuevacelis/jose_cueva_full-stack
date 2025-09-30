"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Music } from "lucide-react";
import Link from "next/link";

interface DashboardErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardErrorPage({
  error,
  reset,
}: DashboardErrorPageProps) {
  const isSpotifyError =
    error.message.includes("401") ||
    error.message.includes("403") ||
    error.message.includes("spotify");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
            {isSpotifyError ? (
              <Music className="w-12 h-12 text-red-400" />
            ) : (
              <AlertTriangle className="w-12 h-12 text-red-400" />
            )}
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="font-montserrat font-bold text-4xl lg:text-5xl">
            {isSpotifyError ? "Error de Spotify" : "Error del Dashboard"}
          </h1>

          {isSpotifyError ? (
            <div className="space-y-3">
              <p className="font-montserrat text-gray-300 text-lg">
                Hubo un problema al conectar con Spotify. Esto puede deberse a:
              </p>
              <ul className="text-left space-y-2 text-gray-300 bg-gray-800/50 rounded-lg p-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Sesión expirada
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Permisos de Spotify revocados
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Problemas de conectividad
                </li>
              </ul>
            </div>
          ) : (
            <p className="font-montserrat text-gray-300 text-lg">
              Ha ocurrido un error inesperado en el dashboard. Por favor,
              intenta de nuevo.
            </p>
          )}

          {/* Error Details for Development */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
              <summary className="cursor-pointer font-semibold text-red-400 mb-2">
                Detalles del error (desarrollo)
              </summary>
              <pre className="text-xs text-gray-300 whitespace-pre-wrap break-words">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {isSpotifyError ? (
            <>
              <Link href="/" className="w-full">
                <Button className="w-full bg-primary hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-6 py-3">
                  <Music className="w-4 h-4 mr-2" />
                  Reconectar con Spotify
                </Button>
              </Link>

              <Button
                onClick={reset}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 font-montserrat font-semibold rounded-2xl px-6 py-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Intentar de nuevo
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={reset}
                className="w-full bg-primary hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-6 py-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Intentar de nuevo
              </Button>

              <Link href="/dashboard" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800 font-montserrat font-semibold rounded-2xl px-6 py-3"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ir al Dashboard
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
