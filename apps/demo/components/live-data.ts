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
  orderbook: OrderbookSnapshot | null;
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

export async function loadPublicMarket(slug: string): Promise<{
  market: PolymarketMarket;
  source: "live" | "fixture";
}> {
  if (slug === "sample") {
    return {
      market: { ...sampleMarket, slug: "sample", url: undefined },
      source: "fixture",
    };
  }
  return {
    market: await getMarketBySlug(slug, { fetch: timeoutFetch }),
    source: "live",
  };
}

export async function loadPublicMarketBundle(
  slug: string,
): Promise<PublicMarketBundle> {
  const { market, source } = await loadPublicMarket(slug);
  if (source === "fixture") {
    return { market, points: samplePoints, orderbook: sampleOrderbook, source };
  }
  const tokenId = getPrimaryTokenId(market);

  if (!tokenId) {
    return {
      market,
      points: [],
      orderbook: null,
      source: "partial",
    };
  }

  const [pointsResult, orderbookResult] = await Promise.allSettled([
    getPriceHistory({ tokenId, interval: "1w", fidelity: 60 }, { fetch: timeoutFetch }),
    getOrderbook({ tokenId }, { fetch: timeoutFetch }),
  ]);
  const points =
    pointsResult.status === "fulfilled" && pointsResult.value.length
      ? pointsResult.value
      : [];
  const orderbook =
    orderbookResult.status === "fulfilled" ? orderbookResult.value : null;
  const hasFallback =
    pointsResult.status !== "fulfilled" ||
    !pointsResult.value.length ||
    orderbookResult.status !== "fulfilled";

  return {
    market,
    points,
    orderbook,
    source: hasFallback ? "partial" : "live",
  };
}
