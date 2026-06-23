import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import { useAsyncData, type AsyncDataOptions } from "./useAsyncData";
import { usePolymarketClient } from "../providers/PolymarketProvider";

export type UseMarketOptions = AsyncDataOptions<PolymarketMarket>;

export function useMarket(
  slug: string,
  input?: PolymarketMarket | null | UseMarketOptions,
) {
  const client = usePolymarketClient();
  return useAsyncData(() => client.getMarketBySlug(slug), [client, slug], input);
}
