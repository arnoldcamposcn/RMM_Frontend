import { useState, useCallback } from "react";

export function useMutation<T, Args extends unknown[]>(
  mutationFn: (...args: Args) => Promise<T>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = useCallback(
    async (...args: Args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await mutationFn(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn]
  );

  return { mutate, data, loading, error };
}
