import type { ComboMarketsPage, ListComboMarketsParams } from "@polymarket-ui-kit/core";
import { useAsyncData, type AsyncDataOptions } from "./useAsyncData.js";
import { usePolymarketClient } from "../providers/PolymarketProvider.js";

export type UseComboMarketsOptions = AsyncDataOptions<ComboMarketsPage>;

export function useComboMarkets(
  params: ListComboMarketsParams = { limit: 12 },
  input?: ComboMarketsPage | null | UseComboMarketsOptions,
) {
  const client = usePolymarketClient();
  const cacheKey = JSON.stringify(params);
  return useAsyncData(
    () => client.listComboMarkets(params),
    [client, cacheKey],
    input,
  );
}
