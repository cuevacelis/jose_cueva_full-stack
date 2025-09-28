"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Search, Loader2 } from "lucide-react";
import { useSearchArtistsQuery } from "./_services/use-search-artists.query";
import { useDebounce } from "@/hooks/use-debounce";
import { useQueryString } from "@/hooks/use-query-string";
import Image from "next/image";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateQueryString } = useQueryString();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("q") || "Nirvana"
  );
  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page")) || 1
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const currentQuery = searchParams.get("q") || "Nirvana";

    if (debouncedSearchTerm !== currentQuery) {
      const queryString = updateQueryString({
        q: debouncedSearchTerm,
        page: "1",
      });
      router.push(`?${queryString}`);
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, router, updateQueryString, searchParams]);

  useEffect(() => {
    const currentPageParam = Number(searchParams.get("page")) || 1;

    if (
      currentPage !== currentPageParam &&
      debouncedSearchTerm === (searchParams.get("q") || "Nirvana")
    ) {
      const queryString = updateQueryString({
        q: debouncedSearchTerm,
        page: currentPage.toString(),
      });
      router.push(`?${queryString}`);
    }
  }, [
    currentPage,
    router,
    updateQueryString,
    searchParams,
    debouncedSearchTerm,
  ]);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchArtistsQuery({
    params: {
      query: debouncedSearchTerm,
      limit,
      offset,
    },
    config: {
      enabled: debouncedSearchTerm.length > 0,
      staleTime: 5 * 60 * 1000,
    },
  });

  const artists = searchResults?.artists?.items || [];
  const totalResults = searchResults?.artists?.total || 0;
  const totalPages = Math.ceil(totalResults / limit);

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
      "https://via.placeholder.com/272x241"
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
      {/* Title Section */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6">
          Busca tus <span className="text-[#d6f379]">artistas</span>
        </h1>
        <p className="font-montserrat text-base lg:text-lg max-w-md mx-auto text-gray-300 leading-6 lg:leading-8 px-4 lg:px-0">
          Encuentra tus artistas favoritos gracias a nuestro buscador y guarda
          tus álbumes favoritos
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8 lg:mb-12 px-4 lg:px-0">
        <div className="bg-white rounded-3xl p-4 lg:p-6 flex items-center justify-between">
          <div className="flex-1">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar artista..."
              className="border-none bg-transparent text-black text-base lg:text-lg font-montserrat font-semibold focus-visible:ring-0 p-0"
            />
          </div>
          <Button
            disabled={isLoading}
            className="bg-[#d6f379] hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-4 lg:px-8 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            <span className="hidden sm:inline">
              {isLoading ? "Buscando..." : "Search"}
            </span>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 lg:mb-8">
        {error ? (
          <p className="font-montserrat text-center text-red-400 text-sm lg:text-base">
            Error al buscar artistas. Por favor, intenta de nuevo.
          </p>
        ) : (
          <p className="font-montserrat text-center text-gray-300 text-sm lg:text-base">
            {isLoading
              ? "Buscando..."
              : `Mostrando ${
                  artists.length
                } resultados de ${totalResults.toLocaleString()}`}
          </p>
        )}
      </div>

      {/* Artists Grid */}
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
          artists.map((artist, index) => (
            <Link key={artist.id} href={`/dashboard/artist/${artist.id}`}>
              <Card
                className={`border-0 rounded-3xl p-4 lg:p-6 cursor-pointer transition-all hover:scale-105 ${
                  index === 1
                    ? "bg-[#d6f379]"
                    : "bg-transparent hover:bg-gray-800"
                }`}
              >
                <CardContent className="p-0 space-y-4 lg:space-y-6">
                  <div className="aspect-square rounded-xl overflow-hidden opacity-80">
                    <Image
                      width={artist.images[0]?.width}
                      height={artist.images[0]?.height}
                      src={getArtistImage(artist.images)}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3
                    className={`font-montserrat font-semibold text-xl lg:text-3xl ${
                      index === 1 ? "text-black" : "text-white"
                    }`}
                  >
                    {artist.name}
                  </h3>
                  <p
                    className={`font-montserrat font-semibold text-sm lg:text-base ${
                      index === 1 ? "text-black" : "text-white"
                    }`}
                  >
                    Followers: {formatFollowers(artist.followers.total)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : debouncedSearchTerm && !isLoading ? (
          <div className="col-span-full text-center py-12">
            <p className="font-montserrat text-gray-300 text-lg">
              No se encontraron artistas para &quot;{debouncedSearchTerm}&quot;
            </p>
          </div>
        ) : null}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={`text-white hover:text-[#d6f379] hover:bg-gray-800 cursor-pointer ${
                    currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
              </PaginationItem>

              {currentPage > 2 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(1)}
                      className="text-white hover:text-[#d6f379] hover:bg-gray-800 cursor-pointer"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis className="text-white" />
                    </PaginationItem>
                  )}
                </>
              )}

              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="text-white hover:text-[#d6f379] hover:bg-gray-800 cursor-pointer"
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  isActive
                  className="bg-[#d6f379] text-black hover:bg-[#c4e368]"
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="text-white hover:text-[#d6f379] hover:bg-gray-800 cursor-pointer"
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis className="text-white" />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(totalPages)}
                      className="text-white hover:text-[#d6f379] hover:bg-gray-800 cursor-pointer"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  className={`text-white hover:text-[#d6f379] hover:bg-gray-800 cursor-pointer ${
                    currentPage === totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
