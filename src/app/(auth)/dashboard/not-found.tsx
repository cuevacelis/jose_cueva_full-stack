import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, Music2 } from "lucide-react";
import Link from "next/link";

export default function DashboardNotFoundPage() {
  return (
    <div className="min-h-screen bg-[#222222] text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* 404 Illustration with Music Theme */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-7xl lg:text-8xl font-bold text-[#d6f379] font-montserrat">
                404
              </div>
              <Music2 className="absolute -top-2 -right-2 w-8 h-8 text-[#d6f379] transform rotate-12" />
            </div>
          </div>
          <div className="w-32 h-1 bg-[#d6f379] mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="font-montserrat font-bold text-3xl lg:text-4xl">
            Página no encontrada
          </h1>
          <p className="font-montserrat text-gray-300 text-lg leading-relaxed">
            La página que buscas en el dashboard no existe. Puede que el artista
            no esté disponible o la URL sea incorrecta.
          </p>
        </div>

        {/* Dashboard Suggestions */}
        <div className="bg-gray-800/50 rounded-2xl p-6 space-y-4">
          <div className="flex justify-center">
            <Search className="w-8 h-8 text-[#d6f379]" />
          </div>
          <div className="space-y-3">
            <p className="font-montserrat text-gray-300 font-semibold">
              ¿Qué puedes hacer?
            </p>
            <ul className="text-left space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-[#d6f379] mr-2">•</span>
                Buscar artistas desde el dashboard principal
              </li>
              <li className="flex items-start">
                <span className="text-[#d6f379] mr-2">•</span>
                Revisar tus álbumes guardados
              </li>
              <li className="flex items-start">
                <span className="text-[#d6f379] mr-2">•</span>
                Explorar nuevos artistas y música
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button className="w-full sm:w-auto bg-[#d6f379] hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-6 py-3">
              <Search className="w-4 h-4 mr-2" />
              Buscar artistas
            </Button>
          </Link>

          <Link href="/dashboard/albums">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800 font-montserrat font-semibold rounded-2xl px-6 py-3"
            >
              <Music2 className="w-4 h-4 mr-2" />
              Mis álbumes
            </Button>
          </Link>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            className="text-gray-400 hover:text-white font-montserrat text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver atrás
          </Button>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 pt-4 border-t border-gray-700">
          <p className="font-montserrat text-gray-400 text-sm">
            Enlaces rápidos del dashboard:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/dashboard"
              className="text-[#d6f379] hover:text-[#c4e368] font-montserrat text-sm underline decoration-dotted"
            >
              Buscar música
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/dashboard/albums"
              className="text-[#d6f379] hover:text-[#c4e368] font-montserrat text-sm underline decoration-dotted"
            >
              Álbumes guardados
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/"
              className="text-[#d6f379] hover:text-[#c4e368] font-montserrat text-sm underline decoration-dotted"
            >
              Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
