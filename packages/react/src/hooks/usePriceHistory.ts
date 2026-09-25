import type {
  MarketPricePoint,
  PriceHistoryParams,
} from "@polymarket-ui-kit/core";
import { useAsyncData, type AsyncDataOptions } from "./useAsyncData.js";
import { usePolymarketClient } from "../providers/PolymarketProvider.js";

export type UsePriceHistoryOptions = AsyncDataOptions<MarketPricePoint[]>;

export function usePriceHistory(
  params: PriceHistoryParams,
  input?: MarketPricePoint[] | null | UsePriceHistoryOptions,
) {
  const client = usePolymarketClient();
  const cacheKey = JSON.stringify(params);

  return useAsyncData(
    () => client.getPriceHistory(params),
    [client, cacheKey],
    input,
  );
}
