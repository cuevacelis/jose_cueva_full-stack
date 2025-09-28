import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function useQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const updateQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, value);
      });
      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString, updateQueryString };
}