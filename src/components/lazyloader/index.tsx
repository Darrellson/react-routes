import { useState, useEffect, useCallback } from 'react';

const useLazyLoader = <T,>(fetchFunction: () => Promise<T>, enabled: boolean = false) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchFunction();
      setData(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    fetchData().then(() => {
      if (!isMounted) return;
      // Data fetching completed
    });

    return () => {
      isMounted = false;
    };
  }, [enabled, fetchData]);

  return { data, isLoading, error };
};

export default useLazyLoader;
