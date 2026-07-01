import { getMarketBySlug, type PolymarketMarket } from "@polymarket-ui-kit/core";
import { BuilderFlowClient } from "./components/BuilderFlowClient";

export const dynamic = "force-dynamic";

const fallbackMarket: PolymarketMarket = {
  id: "btc-ath-2026",
  slug: "btc-ath-2026",
  question: "Will Bitcoin set a new All-Time High in 2026?",
  description: "Fallback market for the verifiable Builder Code flow example.",
  category: "Crypto",
  image: null,
  icon: null,
  status: "open",
  active: true,
  closed: false,
  archived: false,
  endDate: "2026-12-31T23:59:59Z",
  volume: 15400000,
  liquidity: 1240000,
  commentCount: 842,
  lastTradePrice: 0.68,
  bestBid: 0.67,
  bestAsk: 0.69,
  outcomes: [
    { id: "yes", name: "Yes", price: 0.68, tokenId: "replace-with-real-clob-token-id" },
    { id: "no", name: "No", price: 0.32, tokenId: "replace-with-real-no-token-id" },
  ],
  clobTokenIds: ["replace-with-real-clob-token-id", "replace-with-real-no-token-id"],
  tags: ["crypto", "bitcoin"],
  url: "https://polymarket.com",
};

async function loadMarket(): Promise<PolymarketMarket> {
  const slug =
    process.env.POLY_EXAMPLE_MARKET_SLUG ??
    "will-bitcoin-set-a-new-all-time-high-in-2026";

  try {
    return await getMarketBySlug(slug);
  } catch {
    return fallbackMarket;
  }
}

export default async function Page() {
  const market = await loadMarket();
  const liveEnabled = process.env.POLY_ENABLE_LIVE_ORDERS === "true";
  const builderCode =
    process.env.POLY_BUILDER_CODE ??
    "0x00000000000000000000000000000000000000000000000000000000000000f5";

  return (
    <BuilderFlowClient
      builderCode={builderCode}
      liveEnabled={liveEnabled}
      market={market}
    />
  );
}
