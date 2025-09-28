import { Loader2 } from "lucide-react";

export function ProcessingState() {
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