import { useEffect } from "react";

export function usePolling(callback: () => void, delay: number) {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);

    return () => clearInterval(intervalId); // limpiar al desmontar
  }, [callback, delay]);
}
