import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  const router = useRouter();

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