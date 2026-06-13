import { fetchJson } from "../utils/fetcher";
import { asNumber, isRecord } from "../utils/invariant";
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
