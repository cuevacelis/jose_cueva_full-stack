import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function useSpotifyCallback() {
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [error, setError] = useState("");
  const [hasProcessed, setHasProcessed] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (hasProcessed) return;

    const handleCallback = async () => {
      setHasProcessed(true);
      const code = searchParams.get("code");
      const errorParam = searchParams.get("error");

      console.log("Callback URL params:", {
        code: code ? `${code.substring(0, 10)}...` : null,
        error: errorParam,
        fullUrl: window.location.href,
      });

      if (errorParam) {
        setStatus("error");
        setError(
          errorParam === "access_denied"
            ? "Acceso denegado por el usuario"
            : `Error: ${errorParam}`
        );
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
            errorData,
          });
          throw new Error(
            errorData.details ||
              errorData.error ||
              "Error al procesar autenticación"
          );
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

  return { status, error };
}