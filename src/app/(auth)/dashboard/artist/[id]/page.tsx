"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Plus, Minus, Loader2 } from "lucide-react";
import { useArtistQuery } from "../_services/use-artist.query";
import { useArtistAlbumsQuery } from "../_services/use-artist-albums.query";
import { useCheckSavedAlbumsQuery } from "../../albums/_services/use-check-saved-albums.query";
import { useSaveAlbumMutation } from "../../albums/_services/use-save-album.mutation";
import { useRemoveAlbumMutation } from "../../albums/_services/use-remove-album.mutation";
import Image from "next/image";

export default function ArtistDetailPage() {
  const params = useParams();
  const artistId = params.id as string;

  const { data: artist, isLoading: artistLoading } = useArtistQuery({
    params: { artistId },
    config: {
      enabled: !!artistId,
      staleTime: 10 * 60 * 1000,
    },
  });
  const { data: albumsData, isLoading: albumsLoading } = useArtistAlbumsQuery({
    params: { artistId, limit: 20, offset: 0 },
    config: {
      enabled: !!artistId,
      staleTime: 10 * 60 * 1000,
    },
  });
  const saveAlbumMutation = useSaveAlbumMutation();
  const removeAlbumMutation = useRemoveAlbumMutation();

  const albums = albumsData?.items || [];
  const albumIds = albums.map((album) => album.id);
  const { data: savedStatus } = useCheckSavedAlbumsQuery({
    params: { albumIds },
    config: {
      enabled: albumIds.length > 0,
      staleTime: 1 * 60 * 1000,
    },
  });

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getArtistImage = (
    images: Array<{ url: string; height: number; width: number }>
  ) => {
    return (
      images.find((img) => img.height >= 300)?.url ||
      images[0]?.url ||
      "https://via.placeholder.com/237x236"
    );
  };

  const getAlbumImage = (
    images: Array<{ url: string; height: number; width: number }>
  ) => {
    return (
      images.find((img) => img.height >= 300)?.url ||
      images[0]?.url ||
      "https://via.placeholder.com/272x241"
    );
  };

  const handleToggleAlbum = async (albumId: string, isSaved: boolean) => {
    try {
      if (isSaved) {
        await removeAlbumMutation.mutateAsync({ albumId });
      } else {
        await saveAlbumMutation.mutateAsync({ albumId });
      }
    } catch (error) {
      console.error("Error toggling album:", error);
    }
  };

  const isLoading = artistLoading || albumsLoading;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#d6f379]" />
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="text-center">
          <p className="font-montserrat text-gray-300 text-lg">
            No se pudo encontrar información del artista.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
      {/* Artist Info Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start mb-8 lg:mb-12 space-y-6 lg:space-y-0 lg:space-x-12">
        <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden opacity-80 flex-shrink-0">
          <Image
            width={artist.images[0]?.width}
            height={artist.images[0]?.height}
            src={getArtistImage(artist.images)}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
          {artist.popularity > 70 && (
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-[#d6f379]" />
              <span className="font-montserrat font-semibold text-white text-sm lg:text-base">
                Artista certificado
              </span>
            </div>
          )}

          <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
            {artist.name}
          </h1>

          <div className="space-y-1 lg:space-y-2">
            <p className="font-montserrat font-semibold text-white text-sm lg:text-base">
              Followers: {formatFollowers(artist.followers.total)}
            </p>
            <p className="font-montserrat font-semibold text-white text-sm lg:text-base">
              Popularidad: {artist.popularity}/100
            </p>
          </div>
        </div>
      </div>

      {/* Save Albums Section */}
      <div className="text-center mb-8 lg:mb-12 px-4 lg:px-0">
        <p className="font-montserrat text-base lg:text-lg text-gray-300">
          Guarda tus álbumes favoritos de {artist.name}
        </p>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-0">
        {albums.length > 0 ? (
          albums.map((album, index) => {
            const isSaved = savedStatus?.[index] || false;
            const isProcessing =
              saveAlbumMutation.isPending || removeAlbumMutation.isPending;

            return (
              <Card
                key={album.id}
                className="border-0 bg-transparent rounded-3xl"
              >
                <CardContent className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                  <div className="aspect-square rounded-xl overflow-hidden opacity-80">
                    <Image
                      width={album.images[0]?.width}
                      height={album.images[0]?.height}
                      src={getAlbumImage(album.images)}
                      alt={album.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-montserrat font-semibold text-xl lg:text-3xl text-white">
                    {album.name}
                  </h3>

                  <p className="font-montserrat font-semibold text-white text-sm lg:text-base">
                    Publicado: {new Date(album.release_date).getFullYear()}
                  </p>

                  <Button
                    onClick={() => handleToggleAlbum(album.id, isSaved)}
                    disabled={isProcessing}
                    className={`w-full rounded-3xl font-montserrat font-semibold text-sm lg:text-base ${
                      isSaved
                        ? "bg-[#e3513d] hover:bg-[#d4432f] text-white"
                        : "bg-[#d6f379] hover:bg-[#c4e368] text-black"
                    } disabled:opacity-50`}
                  >
                    {isProcessing ? (
                      <Loader2 className="mr-2 h-3 w-3 lg:h-4 lg:w-4 animate-spin" />
                    ) : isSaved ? (
                      <Minus className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                    ) : (
                      <Plus className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                    )}
                    {isProcessing
                      ? "Procesando..."
                      : isSaved
                      ? "Remove album"
                      : "Add album"}
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="font-montserrat text-gray-300 text-lg">
              No se encontraron álbumes para este artista.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
