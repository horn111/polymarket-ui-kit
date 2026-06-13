import type { ListCommentsParams, MarketComment } from "@polymarket-ui-kit/core";
import { useAsyncData } from "./useAsyncData";
import { usePolymarketClient } from "../providers/PolymarketProvider";

export function useComments(
  params: ListCommentsParams,
  initialData?: MarketComment[] | null,
) {
  const client = usePolymarketClient();
  const cacheKey = JSON.stringify(params);
  return useAsyncData(() => client.listComments(params), [client, cacheKey], initialData);
}

