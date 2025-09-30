"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchArtistsQuery } from "./_services/use-search-artists.query";
import { useQueryString } from "@/hooks/use-query-string";
import { SearchBar } from "./_components/search-bar/search-bar";
import { SearchBarFallback } from "./_components/search-bar/search-bar-fallback";
import { ResultsCount } from "./_components/results-count/results-count";
import { ResultsCountFallback } from "./_components/results-count/results-count-fallback";
import { ArtistsGrid } from "./_components/artists-grid/artists-grid";
import { ArtistsGridFallback } from "./_components/artists-grid/artists-grid-fallback";
import { ArtistsPagination } from "./_components/artists-pagination/artists-pagination";
import { ArtistsPaginationFallback } from "./_components/artists-pagination/artists-pagination-fallback";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateQueryString } = useQueryString();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("q") || "Nirvana"
  );
  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page")) || 1
  );

  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  useEffect(() => {
    const currentPageParam = Number(searchParams.get("page")) || 1;

    if (
      currentPage !== currentPageParam &&
      searchTerm === (searchParams.get("q") || "Nirvana")
    ) {
      const queryString = updateQueryString({
        q: searchTerm,
        page: currentPage.toString(),
      });
      router.push(`?${queryString}`);
    }
  }, [currentPage, router, updateQueryString, searchParams, searchTerm]);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchArtistsQuery({
    params: {
      query: searchTerm,
      limit,
      offset,
    },
    config: {
      enabled: searchTerm.length > 0,
      staleTime: 5 * 60 * 1000,
    },
  });

  const artists = searchResults?.artists?.items || [];
  const totalResults = searchResults?.artists?.total || 0;
  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 font-montserrat">
      {/* Title Section */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6">
          Busca tus <span className="text-primary">artistas</span>
        </h1>
        <p className="text-base lg:text-lg max-w-md mx-auto text-gray-300 leading-6 lg:leading-8 px-4 lg:px-0">
          Encuentra tus artistas favoritos graciaas a nuestro buscador y guarda
          tus álbumes favoritos
        </p>
      </div>

      <Suspense fallback={<SearchBarFallback />}>
        <SearchBar onSearchChange={handleSearchChange} isLoading={isLoading} />
      </Suspense>

      <Suspense fallback={<ResultsCountFallback />}>
        <ResultsCount
          isLoading={isLoading}
          error={error}
          currentCount={artists.length}
          totalCount={totalResults}
        />
      </Suspense>

      <Suspense fallback={<ArtistsGridFallback />}>
        <ArtistsGrid
          artists={artists}
          isLoading={isLoading}
          searchTerm={searchTerm}
        />
      </Suspense>

      <Suspense fallback={<ArtistsPaginationFallback />}>
        <ArtistsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Suspense>
    </div>
  );
}
