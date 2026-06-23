import type { ListMarketsParams, PolymarketMarket } from "@polymarket-ui-kit/core";
import { useAsyncData, type AsyncDataOptions } from "./useAsyncData";
import { usePolymarketClient } from "../providers/PolymarketProvider";

export type UseMarketsOptions = AsyncDataOptions<PolymarketMarket[]>;

export function useMarkets(
  params: ListMarketsParams = { active: true, limit: 12 },
  input?: PolymarketMarket[] | null | UseMarketsOptions,
) {
  const client = usePolymarketClient();
  const cacheKey = JSON.stringify(params);
  return useAsyncData(() => client.listMarkets(params), [client, cacheKey], input);
}
