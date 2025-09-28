"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Loader2 } from "lucide-react";
import { useSavedAlbumsQuery } from "./_services/use-saved-albums.query";
import { useRemoveAlbumMutation } from "./_services/use-remove-album.mutation";

export default function MyAlbumsPage() {
  const { data: savedAlbumsData, isLoading, error } = useSavedAlbumsQuery({
    params: { limit: 50, offset: 0 },
    config: {
      staleTime: 2 * 60 * 1000
    }
  });
  const removeAlbumMutation = useRemoveAlbumMutation();

  const savedAlbums = savedAlbumsData?.items || [];

  // Group albums by artist
  const albumsByArtist = savedAlbums.reduce(
    (acc, savedAlbum) => {
      const album = savedAlbum.album;
      const artistName = album.artists[0]?.name || "Unknown Artist";

      if (!acc[artistName]) {
        acc[artistName] = [];
      }

      acc[artistName].push({
        id: album.id,
        name: album.name,
        releaseDate: album.release_date,
        images: album.images,
        addedAt: savedAlbum.added_at,
      });

      return acc;
    },
    {} as Record<
      string,
      Array<{
        id: string;
        name: string;
        releaseDate: string;
        images: Array<{ url: string; height: number; width: number }>;
        addedAt: string;
      }>
    >
  );

  const getAlbumImage = (
    images: Array<{ url: string; height: number; width: number }>
  ) => {
    return (
      images.find((img) => img.height >= 300)?.url ||
      images[0]?.url ||
      "https://via.placeholder.com/272x241"
    );
  };

  const handleRemoveAlbum = async (albumId: string) => {
    try {
      await removeAlbumMutation.mutateAsync({ albumId });
    } catch (error) {
      console.error("Error removing album:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#d6f379]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="text-center">
          <p className="font-montserrat text-red-400 text-lg">
            Error al cargar los álbumes guardados. Por favor, intenta de nuevo.
          </p>
        </div>
      </div>
    );
  }

  if (savedAlbums.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Title Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6">
            Mis albumes <span className="text-[#d6f379]">guardados</span>
          </h1>
          <p className="font-montserrat text-base lg:text-lg max-w-md mx-auto text-gray-300 leading-6 lg:leading-8 px-4 lg:px-0">
            Disfruta de tu música a un solo click y descube que discos has
            guardado dentro de &quot;mis álbumes&quot;
          </p>
        </div>

        <div className="text-center py-12">
          <p className="font-montserrat text-gray-300 text-lg">
            No tienes álbumes guardados aún. ¡Explora artistas y guarda tus
            álbumes favoritos!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
      {/* Title Section */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6">
          Mis albumes <span className="text-[#d6f379]">guardados</span>
        </h1>
        <p className="font-montserrat text-base lg:text-lg max-w-md mx-auto text-gray-300 leading-6 lg:leading-8 px-4 lg:px-0">
          Disfruta de tu música a un solo click y descube que discos has
          guardado dentro de &quot;mis álbumes&quot;
        </p>
      </div>

      {/* Albums by Artist */}
      <div className="space-y-12 lg:space-y-16">
        {Object.entries(albumsByArtist).map(([artistName, albums]) => (
          <div key={artistName} className="space-y-6 lg:space-y-8">
            {/* Artist Name */}
            <h2 className="font-montserrat font-bold text-2xl lg:text-4xl text-white px-4 lg:px-0">
              {artistName}
            </h2>

            {/* Albums Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-0">
              {albums.map((album) => (
                <Card
                  key={album.id}
                  className="border-0 bg-transparent rounded-3xl"
                >
                  <CardContent className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                    <div className="aspect-square rounded-xl overflow-hidden opacity-80">
                      <img
                        src={getAlbumImage(album.images)}
                        alt={album.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/272x241";
                        }}
                      />
                    </div>

                    <h3 className="font-montserrat font-semibold text-xl lg:text-3xl text-white">
                      {album.name}
                    </h3>

                    <p className="font-montserrat font-semibold text-white text-sm lg:text-base">
                      Publicado: {new Date(album.releaseDate).getFullYear()}
                    </p>

                    <Button
                      onClick={() => handleRemoveAlbum(album.id)}
                      disabled={removeAlbumMutation.isPending}
                      className="w-full bg-[#e3513d] hover:bg-[#d4432f] text-white rounded-3xl font-montserrat font-semibold text-sm lg:text-base disabled:opacity-50"
                    >
                      {removeAlbumMutation.isPending ? (
                        <Loader2 className="mr-2 h-3 w-3 lg:h-4 lg:w-4 animate-spin" />
                      ) : (
                        <Minus className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                      )}
                      {removeAlbumMutation.isPending
                        ? "Eliminando..."
                        : "Remove album"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
