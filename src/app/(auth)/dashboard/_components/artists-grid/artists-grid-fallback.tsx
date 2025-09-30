import { Card, CardContent } from "@/components/ui/card";

export function ArtistsGridFallback() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12 px-4 lg:px-0">
      {Array.from({ length: 8 }).map((_, index) => (
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
      ))}
    </div>
  );
}
