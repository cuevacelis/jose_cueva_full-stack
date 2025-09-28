"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Plus, Minus } from "lucide-react";

// Mock data
const mockArtist = {
  id: 1,
  name: "Nirvana",
  followers: "15,234,567",
  monthlyListeners: "45,678,901",
  image: "https://via.placeholder.com/237x236",
  verified: true
};

const mockAlbums = [
  { id: 1, name: "Nevermind", releaseDate: "1991", image: "https://via.placeholder.com/272x241", saved: true },
  { id: 2, name: "In Utero", releaseDate: "1993", image: "https://via.placeholder.com/272x241", saved: false },
  { id: 3, name: "MTV Unplugged in New York", releaseDate: "1994", image: "https://via.placeholder.com/272x241", saved: false },
  { id: 4, name: "Bleach", releaseDate: "1989", image: "https://via.placeholder.com/272x241", saved: true },
  { id: 5, name: "Incesticide", releaseDate: "1992", image: "https://via.placeholder.com/272x241", saved: false },
  { id: 6, name: "From the Muddy Banks of the Wishkah", releaseDate: "1996", image: "https://via.placeholder.com/272x241", saved: true },
];

export default function ArtistDetailPage() {
  const [albums, setAlbums] = useState(mockAlbums);

  const toggleAlbum = (albumId: number) => {
    setAlbums(prev => prev.map(album =>
      album.id === albumId ? { ...album, saved: !album.saved } : album
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Artist Info Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start mb-8 lg:mb-12 space-y-6 lg:space-y-0 lg:space-x-12">
          <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden opacity-80 flex-shrink-0">
            <img
              src={mockArtist.image}
              alt={mockArtist.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
            {mockArtist.verified && (
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-[#d6f379]" />
                <span className="font-montserrat font-semibold text-white text-sm lg:text-base">
                  Artista certificado
                </span>
              </div>
            )}

            <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
              {mockArtist.name}
            </h1>

            <div className="space-y-1 lg:space-y-2">
              <p className="font-montserrat font-semibold text-white text-sm lg:text-base">
                Followers: {mockArtist.followers}
              </p>
              <p className="font-montserrat font-semibold text-white text-sm lg:text-base">
                Oyentes mensuales: {mockArtist.monthlyListeners}
              </p>
            </div>
          </div>
        </div>

        {/* Save Albums Section */}
        <div className="text-center mb-8 lg:mb-12 px-4 lg:px-0">
          <p className="font-montserrat text-base lg:text-lg text-gray-300">
            Guarda tus álbumes favoritos de {mockArtist.name}
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-0">
          {albums.map((album) => (
            <Card key={album.id} className="border-0 bg-transparent rounded-3xl">
              <CardContent className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                <div className="aspect-square rounded-xl overflow-hidden opacity-80">
                  <img
                    src={album.image}
                    alt={album.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-montserrat font-semibold text-xl lg:text-3xl text-white">
                  {album.name}
                </h3>

                <p className="font-montserrat font-semibold text-white text-sm lg:text-base">
                  Publicado: {album.releaseDate}
                </p>

                <Button
                  onClick={() => toggleAlbum(album.id)}
                  className={`w-full rounded-3xl font-montserrat font-semibold text-sm lg:text-base ${
                    album.saved
                      ? 'bg-[#e3513d] hover:bg-[#d4432f] text-white'
                      : 'bg-[#d6f379] hover:bg-[#c4e368] text-black'
                  }`}
                >
                  {album.saved ? (
                    <>
                      <Minus className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                      Remove album
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                      Add album
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
}