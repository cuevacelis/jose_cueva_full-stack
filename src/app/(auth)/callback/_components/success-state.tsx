import { CheckCircle } from "lucide-react";

export function SuccessState() {
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