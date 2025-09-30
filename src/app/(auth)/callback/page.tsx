"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProcessingState } from "./_components/processing-state";
import { SuccessState } from "./_components/success-state";
import { ErrorState } from "./_components/error-state";

const getUrlParams = () => {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
};

export default function SpotifyCallbackPage() {
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [error, setError] = useState("");
  const [hasProcessed, setHasProcessed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (hasProcessed) return;

    const handleCallback = async () => {
      setHasProcessed(true);
      const urlParams = getUrlParams();
      const code = urlParams.get("code");
      const errorParam = urlParams.get("error");

      console.log("Callback URL params:", {
        code: code ? `${code.substring(0, 10)}...` : null,
        error: errorParam,
        fullUrl: window.location.href,
      });

      // Handle OAuth errors
      if (errorParam) {
        setStatus("error");
        setError(
          errorParam === "access_denied"
            ? "Acceso denegado por el usuario"
            : `Error: ${errorParam}`
        );
        return;
      }

      // Validate authorization code
      if (!code) {
        setStatus("error");
        setError("No se recibió código de autorización");
        return;
      }

      try {
        // Call the API to exchange code for tokens
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
            errorData,
          });
          throw new Error(
            errorData.details ||
              errorData.error ||
              "Error al procesar autenticación"
          );
        }

        const data = await response.json();
        console.log("Authentication successful:", data);

        setStatus("success");

        // Clean URL to prevent code reuse
        window.history.replaceState({}, document.title, "/callback");

        // Redirect to dashboard after success
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (error) {
        console.error("Callback error:", error);
        setStatus("error");
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    };

    handleCallback();
  }, [router, hasProcessed]);

  if (status === "processing") {
    return <ProcessingState />;
  }

  if (status === "success") {
    return <SuccessState />;
  }

  return <ErrorState error={error} />;
}
