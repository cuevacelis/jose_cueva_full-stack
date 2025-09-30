"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string; height: number; width: number }>;
  followers: {
    total: number;
  };
}

interface ArtistsGridProps {
  artists: Artist[];
  isLoading: boolean;
  searchTerm: string;
}

export function ArtistsGrid({
  artists,
  isLoading,
  searchTerm,
}: ArtistsGridProps) {
  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12 px-4 lg:px-0">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            className="border-0 rounded-3xl p-4 lg:p-6 bg-gray-800 animate-pulse"
          >
            <CardContent className="p-0 space-y-4 lg:space-y-6">
              <div className="aspect-square rounded-xl bg-gray-700" />
              <div className="h-6 bg-gray-700 rounded" />
              <div className="h-4 bg-gray-700 rounded w-2/3" />
            </CardContent>
          </Card>
        ))
      ) : artists.length > 0 ? (
        artists.map((artist) => (
          <Link key={artist.id} href={`/dashboard/artist/${artist.id}`}>
            <Card
              className={
                "font-montserrat border-0 rounded-3xl p-4 lg:p-6 cursor-pointer transition-all hover:scale-105 bg-transparent hover:bg-primary hover:!text-black"
              }
            >
              <CardContent className="p-0 space-y-4 lg:space-y-6">
                <Image
                  width={artist.images?.[0]?.width ?? 206}
                  height={artist.images?.[0]?.height ?? 206}
                  src={artist.images?.[0]?.url}
                  alt={artist.name}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square rounded-xl"
                />
                <h3 className="font-semibold text-xl lg:text-3xl">
                  {artist.name}
                </h3>
                <p className="font-semibold text-sm lg:text-base">
                  Followers: {formatFollowers(artist.followers.total)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : searchTerm && !isLoading ? (
        <div className="col-span-full text-center py-12">
          <p className="font-montserrat text-gray-300 text-lg">
            No se encontraron artistas para &quot;{searchTerm}&quot;
          </p>
        </div>
      ) : null}
    </div>
  );
}
