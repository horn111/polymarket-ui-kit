import { getOrderbook, type OrderbookSnapshot } from "@polymarket-ui-kit/core";
import { useEffect, useState } from "react";

export function usePolymarketOrderbook(tokenId: string) {
  const [data, setData] = useState<OrderbookSnapshot | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    getOrderbook({ tokenId })
      .then((snapshot) => {
        if (mounted) {
          setData(snapshot);
          setError(null);
        }
      })
      .catch((reason: unknown) => {
        if (mounted) {
          setError(reason instanceof Error ? reason : new Error(String(reason)));
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [tokenId]);

  return { data, error, isLoading, isStale: Boolean(error && data) };
}

