import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function ArtistsPaginationFallback() {
  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              aria-disabled
              className="text-white opacity-50 cursor-not-allowed"
            />
          </PaginationItem>

          {[1, 2, 3].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === 1}>{page}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              aria-disabled={false}
              className="text-white hover:text-primary hover:bg-gray-800 cursor-pointer transition-all"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
