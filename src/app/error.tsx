"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#222222] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="font-montserrat font-bold text-4xl lg:text-5xl">
            ¡Oops! Algo salió mal
          </h1>
          <p className="font-montserrat text-gray-300 text-lg">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo o vuelve al inicio.
          </p>

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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-[#d6f379] hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-6 py-3"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800 font-montserrat font-semibold rounded-2xl px-6 py-3"
            >
              <Home className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        {/* Support Information */}
        <div className="text-sm text-gray-400">
          <p>Si el problema persiste, por favor contacta al soporte técnico.</p>
        </div>
      </div>
    </div>
  );
}