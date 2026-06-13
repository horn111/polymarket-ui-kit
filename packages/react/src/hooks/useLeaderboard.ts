import {
  getTraderLeaderboard,
  type LeaderboardParams,
  type TraderLeaderboardRow,
} from "@polymarket-ui-kit/core";
import { useAsyncData } from "./useAsyncData";

export function useLeaderboard(
  params: LeaderboardParams = { limit: 10, period: "month" },
  initialData?: TraderLeaderboardRow[] | null,
) {
  const cacheKey = JSON.stringify(params);
  return useAsyncData(
    () => getTraderLeaderboard(params),
    [cacheKey],
    initialData,
  );
}

