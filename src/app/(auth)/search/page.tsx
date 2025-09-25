"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Search } from "lucide-react";

// Mock data
const mockArtists = [
  { id: 1, name: "Nirvana", followers: "15,234,567", image: "https://via.placeholder.com/272x241" },
  { id: 2, name: "Pearl Jam", followers: "12,456,789", image: "https://via.placeholder.com/272x241" },
  { id: 3, name: "Soundgarden", followers: "8,567,234", image: "https://via.placeholder.com/272x241" },
  { id: 4, name: "Alice in Chains", followers: "6,789,012", image: "https://via.placeholder.com/272x241" },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("Nirvana");
  const [currentPage, setCurrentPage] = useState(12);
  const pathname = usePathname();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Title Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6">
            Busca tus <span className="text-[#d6f379]">artistas</span>
          </h1>
          <p className="font-montserrat text-base lg:text-lg max-w-md mx-auto text-gray-300 leading-6 lg:leading-8 px-4 lg:px-0">
            Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos
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
            <Button className="bg-[#d6f379] hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-4 lg:px-8">
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>

        {/* Artist detail info for mobile - shown when viewing artist albums */}
        {pathname.includes('/artist/') && (
          <div className="lg:hidden mb-8 px-4">
            <p className="font-montserrat text-gray-300 text-center">
              Guarda tus álbumes favoritos de {mockArtists[0]?.name}
            </p>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 lg:mb-8">
          <p className="font-montserrat text-center text-gray-300 text-sm lg:text-base">
            Mostrando 4 resultados de {20 + currentPage * 4}
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12 px-4 lg:px-0">
          {mockArtists.map((artist, index) => (
            <Link key={artist.id} href={`/artist/${artist.id}`}>
              <Card className={`border-0 rounded-3xl p-4 lg:p-6 cursor-pointer transition-all hover:scale-105 ${
                index === 1 ? 'bg-[#d6f379]' : 'bg-transparent hover:bg-gray-800'
              }`}>
                <CardContent className="p-0 space-y-4 lg:space-y-6">
                  <div className="aspect-square rounded-xl overflow-hidden opacity-80">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className={`font-montserrat font-semibold text-xl lg:text-3xl ${
                    index === 1 ? 'text-black' : 'text-white'
                  }`}>
                    {artist.name}
                  </h3>
                  <p className={`font-montserrat font-semibold text-sm lg:text-base ${
                    index === 1 ? 'text-black' : 'text-white'
                  }`}>
                    Followers: {artist.followers}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="text-white hover:text-[#d6f379] hover:bg-gray-800"
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis className="text-white" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-white hover:text-[#d6f379] hover:bg-gray-800"
                >
                  10
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="bg-[#d6f379] text-black hover:bg-[#c4e368]"
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-white hover:text-[#d6f379] hover:bg-gray-800"
                >
                  13
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-white hover:text-[#d6f379] hover:bg-gray-800"
                >
                  14
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis className="text-white" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-white hover:text-[#d6f379] hover:bg-gray-800"
                >
                  20
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="text-white hover:text-[#d6f379] hover:bg-gray-800"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
  );
}