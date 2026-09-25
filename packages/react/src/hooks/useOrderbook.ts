import type { OrderbookSnapshot } from "@polymarket-ui-kit/core";
import { useAsyncData, type AsyncDataOptions } from "./useAsyncData.js";
import { usePolymarketClient } from "../providers/PolymarketProvider.js";

export type UseOrderbookOptions = AsyncDataOptions<OrderbookSnapshot>;

export function useOrderbook(
  tokenId: string,
  input?: OrderbookSnapshot | null | UseOrderbookOptions,
) {
  const client = usePolymarketClient();
  return useAsyncData(() => client.getOrderbook({ tokenId }), [client, tokenId], input);
}
