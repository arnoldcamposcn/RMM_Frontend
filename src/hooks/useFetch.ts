// src/hooks/useFetch.ts
import { useState, useEffect, useCallback } from "react";

export function useFetch<T>(fetchFn: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const memoizedFetchFn = useCallback(fetchFn, deps);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    
    try {
      const result = await memoizedFetchFn();
      setData(result);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [memoizedFetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}
