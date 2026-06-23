import { fetchJson } from "../utils/fetcher";
import { asNumber, isRecord } from "../utils/invariant";
import type {
  MarketPricePoint,
  PriceHistoryParams,
} from "../types/market";
import type {
  OrderbookAdapterOptions,
  OrderbookLevel,
  OrderbookParams,
  OrderbookSnapshot,
} from "../types/orderbook";

const CLOB_BASE_URL = "https://clob.polymarket.com";

function normalizeLevels(value: unknown): OrderbookLevel[] {
  if (!Array.isArray(value)) {
    return [];
  }

  let total = 0;

  const levels: Array<OrderbookLevel | null> = value.map((level) => {
    const record = isRecord(level) ? level : {};
    const price = asNumber(record.price ?? record.p);
    const size = asNumber(record.size ?? record.s);

    if (price === null || size === null) {
      return null;
    }

    total += size;
    return { price, size, total };
  });

  return levels.filter((level): level is OrderbookLevel => level !== null);
}

function toIsoTimestamp(value: unknown): string | null {
  const numeric = asNumber(value);

  if (numeric !== null) {
    const milliseconds = numeric < 1_000_000_000_000 ? numeric * 1000 : numeric;
    const date = new Date(milliseconds);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  if (typeof value === "string" && value.trim() !== "") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toISOString();
  }

  return null;
}

export function normalizePriceHistory(
  value: unknown,
  outcomeId?: string | undefined,
): MarketPricePoint[] {
  const payload = isRecord(value)
    ? value.history ?? value.prices ?? value.data
    : value;

  if (!Array.isArray(payload)) {
    return [];
  }

  const points = payload.map((item): MarketPricePoint | null => {
    const record = isRecord(item) ? item : {};
    const timestamp = toIsoTimestamp(
      record.t ?? record.timestamp ?? record.time ?? record.date,
    );
    const price = asNumber(record.p ?? record.price ?? record.value);

    if (!timestamp || price === null) {
      return null;
    }

    const point: MarketPricePoint = { timestamp, price };

    if (outcomeId !== undefined) {
      point.outcomeId = outcomeId;
    }

    return point;
  });

  return points.filter((point): point is MarketPricePoint => point !== null);
}

export async function getOrderbook(
  params: OrderbookParams,
  options: OrderbookAdapterOptions = {},
): Promise<OrderbookSnapshot> {
  const data = await fetchJson<unknown>(
    `${options.clobBaseUrl ?? CLOB_BASE_URL}/book`,
    {
      fetch: options.fetch,
      query: { token_id: params.tokenId },
    },
  );
  const record = isRecord(data) ? data : {};
  const bids = normalizeLevels(record.bids);
  const asks = normalizeLevels(record.asks);
  const bestBid = bids[0]?.price;
  const bestAsk = asks[0]?.price;
  const spread =
    bestBid !== undefined && bestAsk !== undefined ? bestAsk - bestBid : null;
  const mid =
    bestBid !== undefined && bestAsk !== undefined ? (bestAsk + bestBid) / 2 : null;

  return {
    tokenId: params.tokenId,
    bids,
    asks,
    spread,
    mid,
    updatedAt: new Date().toISOString(),
    raw: data,
  };
}

export async function getMidpoint(
  tokenId: string,
  options: OrderbookAdapterOptions = {},
): Promise<number | null> {
  const data = await fetchJson<unknown>(
    `${options.clobBaseUrl ?? CLOB_BASE_URL}/midpoint`,
    {
      fetch: options.fetch,
      query: { token_id: tokenId },
    },
  );

  return isRecord(data) ? asNumber(data.mid ?? data.midpoint) : null;
}

export async function getPriceHistory(
  params: PriceHistoryParams,
  options: OrderbookAdapterOptions = {},
): Promise<MarketPricePoint[]> {
  const data = await fetchJson<unknown>(
    `${options.clobBaseUrl ?? CLOB_BASE_URL}/prices-history`,
    {
      fetch: options.fetch,
      query: {
        market: params.tokenId,
        startTs: params.startTs,
        endTs: params.endTs,
        interval: params.interval,
        fidelity: params.fidelity,
      },
    },
  );

  return normalizePriceHistory(data, params.tokenId);
}
