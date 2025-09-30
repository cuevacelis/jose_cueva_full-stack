"use client";

interface ResultsCountProps {
  isLoading: boolean;
  error: Error | null;
  currentCount: number;
  totalCount: number;
}

export function ResultsCount({
  isLoading,
  error,
  currentCount,
  totalCount,
}: ResultsCountProps) {
  return (
    <div className="font-montserrat mb-6 lg:mb-8 text-left">
      {error ? (
        <p className=" text-red-400 text-sm lg:text-base">
          Error al buscar artistas. Por favor, intenta de nuevo.
        </p>
      ) : (
        <p className="ext-gray-300 text-sm lg:text-base">
          {isLoading
            ? "Buscando..."
            : `Mostrando ${currentCount} resultados de ${totalCount.toLocaleString()}`}
        </p>
      )}
    </div>
  );
}
