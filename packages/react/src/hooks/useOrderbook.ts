import type { OrderbookSnapshot } from "@polymarket-ui-kit/core";
import { useAsyncData } from "./useAsyncData";
import { usePolymarketClient } from "../providers/PolymarketProvider";

export function useOrderbook(
  tokenId: string,
  initialData?: OrderbookSnapshot | null,
) {
  const client = usePolymarketClient();
  return useAsyncData(() => client.getOrderbook({ tokenId }), [client, tokenId], initialData);
}

