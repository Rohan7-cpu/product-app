import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid value changes (e.g. search inputs).
 * Prevents unnecessary API calls while the user is typing.
 * 
 * @param {any} value Input value to debounce
 * @param {number} delay Delay in milliseconds (default: 400ms)
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
