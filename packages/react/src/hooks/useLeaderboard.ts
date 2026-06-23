import {
  getTraderLeaderboard,
  type LeaderboardParams,
  type TraderLeaderboardRow,
} from "@polymarket-ui-kit/core";
import { useAsyncData, type AsyncDataOptions } from "./useAsyncData";

export type UseLeaderboardOptions = AsyncDataOptions<TraderLeaderboardRow[]>;

export function useLeaderboard(
  params: LeaderboardParams = { limit: 10, period: "month" },
  input?: TraderLeaderboardRow[] | null | UseLeaderboardOptions,
) {
  const cacheKey = JSON.stringify(params);
  return useAsyncData(
    () => getTraderLeaderboard(params),
    [cacheKey],
    input,
  );
}
