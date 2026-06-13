import { useEffect, useState } from "react";

export interface AsyncDataState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isStale: boolean;
  refresh: () => void;
}

export function useAsyncData<T>(
  load: () => Promise<T>,
  deps: readonly unknown[],
  initialData?: T | null,
): AsyncDataState<T> {
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(initialData === undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    load()
      .then((nextData) => {
        if (isMounted) {
          setData(nextData);
          setError(null);
        }
      })
      .catch((reason: unknown) => {
        if (isMounted) {
          setError(reason instanceof Error ? reason : new Error(String(reason)));
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [...deps, refreshKey]);

  return {
    data,
    error,
    isLoading,
    isStale: Boolean(error && data),
    refresh: () => setRefreshKey((key) => key + 1),
  };
}

