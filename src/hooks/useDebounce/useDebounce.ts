import { useEffect, useState } from 'react';

interface DebounceProps<T> {
  value: T;
  delay: number;
}

const useDebounce = <T>(props: DebounceProps<T>): T => {
  const { value, delay } = props;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
