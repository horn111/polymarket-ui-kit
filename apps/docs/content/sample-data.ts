import type {
  MarketPricePoint,
  OrderbookSnapshot,
  PolymarketMarket,
} from "@polymarket-ui-kit/core";

export const sampleMarket: PolymarketMarket = {
  id: "sample-president-2028",
  slug: "who-will-win-the-2028-us-presidential-election",
  question: "Who will win the 2028 US presidential election?",
  description: "Sample market data used for local demos.",
  category: "Politics",
  image: null,
  icon: null,
  status: "open",
  active: true,
  closed: false,
  archived: false,
  endDate: "2028-11-07T23:59:59Z",
  volume: 12800000,
  volume24hr: 420000,
  liquidity: 870000,
  openInterest: 3100000,
  commentCount: 1842,
  lastTradePrice: 0.42,
  bestBid: 0.41,
  bestAsk: 0.43,
  outcomes: [
    { id: "yes", name: "Candidate A", price: 0.42, tokenId: "token-yes" },
    { id: "no", name: "Field", price: 0.58, tokenId: "token-no" }
  ],
  clobTokenIds: ["token-yes", "token-no"],
  tags: ["politics"],
  url: "https://polymarket.com/event/who-will-win-the-2028-us-presidential-election"
};

export const samplePoints: MarketPricePoint[] = [
  { timestamp: "2026-06-01T00:00:00Z", price: 0.34 },
  { timestamp: "2026-06-02T00:00:00Z", price: 0.36 },
  { timestamp: "2026-06-03T00:00:00Z", price: 0.33 },
  { timestamp: "2026-06-04T00:00:00Z", price: 0.39 },
  { timestamp: "2026-06-05T00:00:00Z", price: 0.42 }
];

export const sampleOrderbook: OrderbookSnapshot = {
  tokenId: "token-yes",
  bids: [
    { price: 0.41, size: 1200, total: 1200 },
    { price: 0.4, size: 900, total: 2100 },
    { price: 0.39, size: 600, total: 2700 }
  ],
  asks: [
    { price: 0.43, size: 1100, total: 1100 },
    { price: 0.44, size: 700, total: 1800 },
    { price: 0.45, size: 500, total: 2300 }
  ],
  spread: 0.02,
  mid: 0.42,
  updatedAt: "2026-06-09T00:00:00Z"
};

