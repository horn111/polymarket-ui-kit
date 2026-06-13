import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import { useAsyncData } from "./useAsyncData";
import { usePolymarketClient } from "../providers/PolymarketProvider";

export function useMarket(slug: string, initialData?: PolymarketMarket | null) {
  const client = usePolymarketClient();
  return useAsyncData(() => client.getMarketBySlug(slug), [client, slug], initialData);
}

