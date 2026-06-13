import { fetchJson } from "../utils/fetcher";
import { asNumber, isRecord } from "../utils/invariant";
import type { BuilderProfile } from "../types/builder";

const DATA_BASE_URL = "https://data-api.polymarket.com";

export interface DataApiOptions {
  fetch?: typeof fetch | undefined;
  dataBaseUrl?: string | undefined;
}

export interface LeaderboardParams {
  limit?: number | undefined;
  offset?: number | undefined;
  period?: "day" | "week" | "month" | "all" | undefined;
}

export interface TraderLeaderboardRow {
  rank: number;
  wallet: string;
  name?: string | null | undefined;
  volume?: number | null | undefined;
  profit?: number | null | undefined;
  raw?: unknown | undefined;
}

export async function getTraderLeaderboard(
  params: LeaderboardParams = {},
  options: DataApiOptions = {},
): Promise<TraderLeaderboardRow[]> {
  const data = await fetchJson<unknown[]>(
    `${options.dataBaseUrl ?? DATA_BASE_URL}/leaderboard`,
    {
      fetch: options.fetch,
      query: {
        limit: params.limit,
        offset: params.offset,
        period: params.period,
      },
    },
  );

  return data.map((row, index) => {
    const record = isRecord(row) ? row : {};
    return {
      rank: asNumber(record.rank) ?? index + 1,
      wallet: String(record.proxyWallet ?? record.address ?? record.wallet ?? ""),
      name:
        typeof record.name === "string"
          ? record.name
          : typeof record.pseudonym === "string"
            ? record.pseudonym
            : null,
      volume: asNumber(record.volume),
      profit: asNumber(record.profit),
      raw: row,
    };
  });
}

export async function getBuilderLeaderboard(
  options: DataApiOptions = {},
): Promise<BuilderProfile[]> {
  const data = await fetchJson<unknown[]>(
    `${options.dataBaseUrl ?? DATA_BASE_URL}/builders/leaderboard`,
    { fetch: options.fetch },
  );

  return data.map((row, index) => {
    const record = isRecord(row) ? row : {};
    const monthlyVolume =
      asNumber(record.monthlyVolume) ?? asNumber(record.volume30d) ?? undefined;

    return {
      name: String(record.name ?? record.projectName ?? "Builder"),
      handle:
        typeof record.handle === "string"
          ? record.handle
          : typeof record.xHandle === "string"
            ? record.xHandle
            : undefined,
      code: typeof record.builderCode === "string" ? record.builderCode : undefined,
      url: typeof record.url === "string" ? record.url : undefined,
      verified: Boolean(record.verified),
      monthlyVolume,
      rank: asNumber(record.rank) ?? index + 1,
    };
  });
}
