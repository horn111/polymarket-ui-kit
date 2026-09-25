import type { ListMarketsParams, PolymarketMarket } from "@polymarket-ui-kit/core";
import { useAsyncData, type AsyncDataOptions } from "./useAsyncData.js";
import { usePolymarketClient } from "../providers/PolymarketProvider.js";

export type UseMarketsOptions = AsyncDataOptions<PolymarketMarket[]>;

export function useMarkets(
  params: ListMarketsParams = { active: true, limit: 12 },
  input?: PolymarketMarket[] | null | UseMarketsOptions,
) {
  const client = usePolymarketClient();
  const cacheKey = JSON.stringify(params);
  return useAsyncData(() => client.listMarkets(params), [client, cacheKey], input);
}
