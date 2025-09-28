"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useQueryString } from "@/hooks/use-query-string";

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearchChange, isLoading = false }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateQueryString } = useQueryString();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("q") || "Nirvana"
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const currentQuery = searchParams.get("q") || "Nirvana";

    if (debouncedSearchTerm !== currentQuery) {
      const queryString = updateQueryString({
        q: debouncedSearchTerm,
        page: "1",
      });
      router.push(`?${queryString}`);
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, router, updateQueryString, searchParams, onSearchChange]);

  return (
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
  );
}