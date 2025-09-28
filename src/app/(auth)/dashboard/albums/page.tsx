"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus } from "lucide-react";

// Mock data organized by artist
const mockSavedAlbums = {
  "Nirvana": [
    { id: 1, name: "Nevermind", releaseDate: "1991", image: "https://via.placeholder.com/272x241" },
    { id: 2, name: "Bleach", releaseDate: "1989", image: "https://via.placeholder.com/272x241" },
  ],
  "Pearl Jam": [
    { id: 3, name: "Ten", releaseDate: "1991", image: "https://via.placeholder.com/272x241" },
    { id: 4, name: "Vs.", releaseDate: "1993", image: "https://via.placeholder.com/272x241" },
    { id: 5, name: "Vitalogy", releaseDate: "1994", image: "https://via.placeholder.com/272x241" },
    { id: 6, name: "No Code", releaseDate: "1996", image: "https://via.placeholder.com/272x241" },
  ],
  "Queen": [
    { id: 7, name: "A Night at the Opera", releaseDate: "1975", image: "https://via.placeholder.com/272x241" },
    { id: 8, name: "Bohemian Rhapsody", releaseDate: "1975", image: "https://via.placeholder.com/272x241" },
    { id: 9, name: "The Game", releaseDate: "1980", image: "https://via.placeholder.com/272x241" },
    { id: 10, name: "Innuendo", releaseDate: "1991", image: "https://via.placeholder.com/272x241" },
  ]
};

export default function MyAlbumsPage() {
  const [savedAlbums, setSavedAlbums] = useState(mockSavedAlbums);

  const removeAlbum = (artistName: string, albumId: number) => {
    setSavedAlbums(prev => ({
      ...prev,
      [artistName]: prev[artistName].filter(album => album.id !== albumId)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Title Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 lg:mb-6">
            Mis albumes <span className="text-[#d6f379]">guardados</span>
          </h1>
          <p className="font-montserrat text-base lg:text-lg max-w-md mx-auto text-gray-300 leading-6 lg:leading-8 px-4 lg:px-0">
            Disfruta de tu música a un solo click y descube que discos has guardado dentro de "mis álbumes"
          </p>
        </div>

        {/* Albums by Artist */}
        <div className="space-y-12 lg:space-y-16">
          {Object.entries(savedAlbums).map(([artistName, albums]) => (
            <div key={artistName} className="space-y-6 lg:space-y-8">
              {/* Artist Name */}
              <h2 className="font-montserrat font-bold text-2xl lg:text-4xl text-white px-4 lg:px-0">
                {artistName}
              </h2>

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
                        onClick={() => removeAlbum(artistName, album.id)}
                        className="w-full bg-[#e3513d] hover:bg-[#d4432f] text-white rounded-3xl font-montserrat font-semibold text-sm lg:text-base"
                      >
                        <Minus className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                        Remove album
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