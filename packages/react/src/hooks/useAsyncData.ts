import { useEffect, useState } from "react";

export interface AsyncDataOptions<T> {
  initialData?: T | null | undefined;
  enabled?: boolean | undefined;
  refetchIntervalMs?: number | undefined;
  refetchOnMount?: boolean | undefined;
}

export interface AsyncDataState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isStale: boolean;
  refresh: () => void;
}

const asyncOptionKeys = new Set([
  "initialData",
  "enabled",
  "refetchIntervalMs",
  "refetchOnMount",
]);

export function normalizeAsyncDataOptions<T>(
  value?: T | null | AsyncDataOptions<T>,
): AsyncDataOptions<T> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    const isOptionsObject = Object.keys(record).some((key) => asyncOptionKeys.has(key));

    if (isOptionsObject) {
      return value as AsyncDataOptions<T>;
    }
  }

  return { initialData: value as T | null | undefined };
}

export function useAsyncData<T>(
  load: () => Promise<T>,
  deps: readonly unknown[],
  input?: T | null | AsyncDataOptions<T>,
): AsyncDataState<T> {
  const options = normalizeAsyncDataOptions(input);
  const enabled = options.enabled ?? true;
  const hasInitialData = options.initialData !== undefined;
  const [data, setData] = useState<T | null>(options.initialData ?? null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(
    enabled && (!hasInitialData || options.refetchOnMount !== false),
  );
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    if (refreshKey === 0 && hasInitialData && options.refetchOnMount === false) {
      setIsLoading(false);
      return;
    }

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
  }, [...deps, enabled, hasInitialData, options.refetchOnMount, refreshKey]);

  useEffect(() => {
    if (!enabled || !options.refetchIntervalMs || options.refetchIntervalMs <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setRefreshKey((key) => key + 1);
    }, options.refetchIntervalMs);

    return () => window.clearInterval(interval);
  }, [...deps, enabled, options.refetchIntervalMs]);

  return {
    data,
    error,
    isLoading,
    isStale: Boolean(error && data),
    refresh: () => setRefreshKey((key) => key + 1),
  };
}
