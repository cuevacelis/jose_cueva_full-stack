import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#222222] text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="space-y-4">
          <div className="text-8xl lg:text-9xl font-bold text-[#d6f379] font-montserrat">
            404
          </div>
          <div className="w-32 h-1 bg-[#d6f379] mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="font-montserrat font-bold text-3xl lg:text-4xl">
            Página no encontrada
          </h1>
          <p className="font-montserrat text-gray-300 text-lg leading-relaxed">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
            Verifica la URL o navega a una de nuestras páginas principales.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="bg-gray-800/50 rounded-2xl p-6 space-y-4">
          <div className="flex justify-center">
            <Search className="w-8 h-8 text-[#d6f379]" />
          </div>
          <p className="font-montserrat text-gray-300">
            ¿Buscabas algo específico? Intenta buscar tus artistas favoritos desde el dashboard.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#d6f379] hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-6 py-3">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800 font-montserrat font-semibold rounded-2xl px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <p className="font-montserrat text-gray-400 text-sm">Enlaces rápidos:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/dashboard"
              className="text-[#d6f379] hover:text-[#c4e368] font-montserrat text-sm underline decoration-dotted"
            >
              Dashboard
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/dashboard/albums"
              className="text-[#d6f379] hover:text-[#c4e368] font-montserrat text-sm underline decoration-dotted"
            >
              Mis Álbumes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}