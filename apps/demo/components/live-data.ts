import {
  getMarketBySlug,
  getOrderbook,
  getPriceHistory,
  type MarketPricePoint,
  type OrderbookSnapshot,
  type PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { sampleMarket, sampleOrderbook, samplePoints } from "./sample-data";

const PUBLIC_FETCH_TIMEOUT_MS = 3500;

export interface PublicMarketBundle {
  market: PolymarketMarket;
  points: MarketPricePoint[];
  orderbook: OrderbookSnapshot;
  source: "live" | "fixture" | "partial";
}

const timeoutFetch: typeof fetch = async (input, init) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PUBLIC_FETCH_TIMEOUT_MS);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

export function getPrimaryTokenId(market: PolymarketMarket): string | undefined {
  return market.clobTokenIds[0] ?? market.outcomes[0]?.tokenId;
}

function withFallbackSlug(slug: string): PolymarketMarket {
  return {
    ...sampleMarket,
    slug,
    url: `https://polymarket.com/event/${slug}`,
  };
}

function fallbackPoints(tokenId?: string | undefined): MarketPricePoint[] {
  return samplePoints.map((point) => {
    if (!tokenId) {
      return point;
    }

    return { ...point, outcomeId: tokenId };
  });
}

function fallbackOrderbook(tokenId?: string | undefined): OrderbookSnapshot {
  return {
    ...sampleOrderbook,
    tokenId: tokenId ?? sampleOrderbook.tokenId,
    updatedAt: new Date().toISOString(),
  };
}

export async function loadPublicMarket(slug: string): Promise<{
  market: PolymarketMarket;
  source: "live" | "fixture";
}> {
  try {
    return {
      market: await getMarketBySlug(slug, { fetch: timeoutFetch }),
      source: "live",
    };
  } catch {
    return {
      market: withFallbackSlug(slug),
      source: "fixture",
    };
  }
}

export async function loadPublicMarketBundle(slug: string): Promise<PublicMarketBundle> {
  const { market, source } = await loadPublicMarket(slug);
  const tokenId = getPrimaryTokenId(market);

  if (!tokenId) {
    return {
      market,
      points: fallbackPoints(),
      orderbook: fallbackOrderbook(),
      source: source === "live" ? "partial" : "fixture",
    };
  }

  const [pointsResult, orderbookResult] = await Promise.allSettled([
    getPriceHistory(
      { tokenId, interval: "1w", fidelity: 60 },
      { fetch: timeoutFetch },
    ),
    getOrderbook({ tokenId }, { fetch: timeoutFetch }),
  ]);
  const points =
    pointsResult.status === "fulfilled" && pointsResult.value.length
      ? pointsResult.value
      : fallbackPoints(tokenId);
  const orderbook =
    orderbookResult.status === "fulfilled"
      ? orderbookResult.value
      : fallbackOrderbook(tokenId);
  const hasFallback =
    pointsResult.status !== "fulfilled" ||
    !pointsResult.value.length ||
    orderbookResult.status !== "fulfilled";

  return {
    market,
    points,
    orderbook,
    source: source === "fixture" ? "fixture" : hasFallback ? "partial" : "live",
  };
}
