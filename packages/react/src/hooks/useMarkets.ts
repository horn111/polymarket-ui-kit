import type { ListMarketsParams, PolymarketMarket } from "@polymarket-ui-kit/core";
import { useAsyncData } from "./useAsyncData";
import { usePolymarketClient } from "../providers/PolymarketProvider";

export function useMarkets(
  params: ListMarketsParams = { active: true, limit: 12 },
  initialData?: PolymarketMarket[] | null,
) {
  const client = usePolymarketClient();
  const cacheKey = JSON.stringify(params);
  return useAsyncData(() => client.listMarkets(params), [client, cacheKey], initialData);
}

