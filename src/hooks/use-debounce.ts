import { useState, useCallback, useEffect } from 'react';
import { debounce } from '@tanstack/react-pacer';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debouncedSetValue = useCallback(
    debounce(setDebouncedValue, { wait: delay }),
    [delay]
  );

  useEffect(() => {
    debouncedSetValue(value);
  }, [value, debouncedSetValue]);

  return debouncedValue;
}