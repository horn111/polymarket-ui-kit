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
import type { MarketOutcome, PolymarketMarket } from "../types/market";

const CLOB_BASE_URL = "https://clob.polymarket.com";

export type ClobV2OrderSide = "BUY" | "SELL";
export type ClobV2OrderType = "FOK" | "FAK" | "GTC" | "GTD";

export type ClobV2OrderDraftErrorCode =
  | "missing_builder_code"
  | "missing_token_id"
  | "invalid_notional"
  | "missing_price_guard";

export class ClobV2OrderDraftError extends Error {
  code: ClobV2OrderDraftErrorCode;

  constructor(code: ClobV2OrderDraftErrorCode, message: string) {
    super(message);
    this.name = "ClobV2OrderDraftError";
    this.code = code;
  }
}

export interface ClobV2MarketOrderDraftInput {
  market?: PolymarketMarket | undefined;
  outcome: MarketOutcome;
  notional: number;
  builderCode?: string | undefined;
  side?: ClobV2OrderSide | undefined;
  price?: number | null | undefined;
  tokenId?: string | undefined;
  orderType?: ClobV2OrderType | undefined;
}

export interface ClobV2MarketOrderDraftOptions {
  side?: ClobV2OrderSide | undefined;
  price?: number | null | undefined;
  orderType?: ClobV2OrderType | undefined;
}

export interface ClobV2MarketOrderDraft {
  tokenID: string;
  side: ClobV2OrderSide;
  amount: number;
  price: number;
  builderCode: string;
  orderType: ClobV2OrderType;
  marketId?: string | undefined;
  marketSlug?: string | undefined;
  outcomeId: string;
  outcomeName: string;
}

function assertOrderDraft(
  condition: unknown,
  code: ClobV2OrderDraftErrorCode,
  message: string,
): asserts condition {
  if (!condition) {
    throw new ClobV2OrderDraftError(code, message);
  }
}

export function buildClobV2MarketOrderDraft(
  input: ClobV2MarketOrderDraftInput,
  options: ClobV2MarketOrderDraftOptions = {},
): ClobV2MarketOrderDraft {
  const builderCode = input.builderCode?.trim();
  const tokenID = input.tokenId ?? input.outcome.tokenId;
  const amount = input.notional;
  const price = input.price ?? options.price ?? input.outcome.price;

  assertOrderDraft(
    builderCode,
    "missing_builder_code",
    "A Builder Code is required to create an attributed CLOB V2 order draft.",
  );
  assertOrderDraft(
    tokenID,
    "missing_token_id",
    "A CLOB token id is required to create a market order draft.",
  );
  assertOrderDraft(
    Number.isFinite(amount) && amount > 0,
    "invalid_notional",
    "Order notional must be a positive number.",
  );
  assertOrderDraft(
    typeof price === "number" && Number.isFinite(price) && price > 0 && price <= 1,
    "missing_price_guard",
    "A price guard between 0 and 1 is required for the CLOB V2 order draft.",
  );

  return {
    tokenID,
    side: input.side ?? options.side ?? "BUY",
    amount,
    price,
    builderCode,
    orderType: input.orderType ?? options.orderType ?? "FOK",
    marketId: input.market?.id,
    marketSlug: input.market?.slug,
    outcomeId: input.outcome.id,
    outcomeName: input.outcome.name,
  };
}

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
