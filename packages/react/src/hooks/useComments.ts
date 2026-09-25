import type { ListCommentsParams, MarketComment } from "@polymarket-ui-kit/core";
import { useAsyncData, type AsyncDataOptions } from "./useAsyncData.js";
import { usePolymarketClient } from "../providers/PolymarketProvider.js";

export type UseCommentsOptions = AsyncDataOptions<MarketComment[]>;

export function useComments(
  params: ListCommentsParams,
  input?: MarketComment[] | null | UseCommentsOptions,
) {
  const client = usePolymarketClient();
  const cacheKey = JSON.stringify(params);
  return useAsyncData(() => client.listComments(params), [client, cacheKey], input);
}
