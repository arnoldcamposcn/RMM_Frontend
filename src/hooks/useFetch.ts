// src/hooks/useFetch.ts
import { useState, useEffect, useCallback } from "react";

export function useFetch<T>(fetchFn: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const memoizedFetchFn = useCallback(fetchFn, deps);

  useEffect(() => {
    setLoading(true);
    setError(false);
    
    memoizedFetchFn()
      .then((res) => setData(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [memoizedFetchFn]);

  return { data, loading, error };
}
