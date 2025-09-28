"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpotifyCallbackPage() {
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [error, setError] = useState("");
  const [hasProcessed, setHasProcessed] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (hasProcessed) return; // Prevent multiple executions

    const handleCallback = async () => {
      setHasProcessed(true);
      const code = searchParams.get("code");
      const errorParam = searchParams.get("error");

      console.log("Callback URL params:", {
        code: code ? `${code.substring(0, 10)}...` : null,
        error: errorParam,
        fullUrl: window.location.href
      });

      if (errorParam) {
        setStatus("error");
        setError(errorParam === "access_denied" ? "Acceso denegado por el usuario" : `Error: ${errorParam}`);
        return;
      }

      if (!code) {
        setStatus("error");
        setError("No se recibió código de autorización");
        return;
      }

      try {
        const response = await fetch("/api/auth/spotify/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Callback API error:", {
            status: response.status,
            statusText: response.statusText,
            errorData
          });
          throw new Error(errorData.details || errorData.error || "Error al procesar autenticación");
        }

        const data = await response.json();

        // Store tokens
        localStorage.setItem("spotify_access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("spotify_refresh_token", data.refresh_token);
        }

        setStatus("success");

        // Clean URL to prevent code reuse
        window.history.replaceState({}, document.title, "/callback");

        // Redirect to dashboard after success
        setTimeout(() => {
          window.location.href = "/dashboard"; // Direct navigation to avoid reload loop
        }, 2000);

      } catch (error) {
        console.error("Callback error:", error);
        setStatus("error");
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    };

    handleCallback();
  }, [searchParams, router, hasProcessed]);

  // Processing state
  if (status === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#d6f379] mb-4 mx-auto" />
          <h2 className="font-montserrat font-bold text-2xl lg:text-3xl text-white mb-2">
            Procesando autenticación...
          </h2>
          <p className="font-montserrat text-gray-300">
            Por favor espera mientras configuramos tu acceso a Spotify
          </p>
        </div>
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-[#d6f379] mb-4 mx-auto" />
          <h2 className="font-montserrat font-bold text-2xl lg:text-3xl text-white mb-2">
            ¡Autenticación exitosa!
          </h2>
          <p className="font-montserrat text-gray-300">
            Redirigiendo al dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center max-w-md px-4">
        <XCircle className="h-12 w-12 text-red-400 mb-4 mx-auto" />
        <h2 className="font-montserrat font-bold text-2xl lg:text-3xl text-white mb-4">
          Error de autenticación
        </h2>
        <p className="font-montserrat text-red-400 mb-6">
          {error || "Hubo un problema al procesar la autenticación"}
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-[#d6f379] hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-6"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}