import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBarFallback() {
  return (
    <div className="max-w-2xl mx-auto mb-8 lg:mb-12 px-4 lg:px-0">
      <div className="bg-white rounded-3xl p-4 lg:p-6 flex items-center justify-between">
        <div className="flex-1">
          <Input
            type="text"
            value="Nirvana"
            disabled
            placeholder="Buscar artista..."
            className="border-none bg-transparent text-black text-base lg:text-lg font-montserrat font-semibold focus-visible:ring-0 p-0"
          />
        </div>
        <Button
          disabled
          className="bg-[#d6f379] hover:bg-[#c4e368] text-black font-montserrat font-semibold rounded-2xl px-4 lg:px-8 disabled:opacity-50"
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
    </div>
  );
}