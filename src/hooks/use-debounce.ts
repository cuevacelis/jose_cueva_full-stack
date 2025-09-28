import { useState, useCallback, useEffect } from "react";
import { debounce } from "@tanstack/react-pacer";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = useCallback(
    debounce(setDebouncedValue, { wait: delay }),
    [delay]
  );

  useEffect(() => {
    debouncedSetValue(value);
  }, [value, debouncedSetValue]);

  return debouncedValue;
}
