import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-montserrat">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="space-y-4">
          <div className="text-8xl lg:text-9xl font-bold text-primary">404</div>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="font-montserrat font-bold text-3xl lg:text-4xl">
            Página no encontrada
          </h1>
          <p className="font-montserrat text-gray-300 text-lg leading-relaxed">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida. Verifica la URL o navega a una de nuestras páginas
            principales.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="bg-gray-800/50 rounded-2xl p-6 space-y-4">
          <div className="flex justify-center">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <p className="font-montserrat text-gray-300">
            ¿Buscabas algo específico? Intenta buscar tus artistas favoritos
            desde el dashboard.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-primary hover:bg-[#c4e368] text-black font-semibold rounded-2xl px-6 py-3">
              <Home className="w-4 h-4" />
              Ir al inicio
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800 font-semibold rounded-2xl px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
