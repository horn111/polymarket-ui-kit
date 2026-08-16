import type {
  EvidenceItem,
  MarketPricePoint,
  OrderbookSnapshot,
  PolymarketMarket,
  PollMarketComparisonRow,
} from "@polymarket-ui-kit/core";

export const sampleMarket: PolymarketMarket = {
  id: "sample-turnout-2028",
  slug: "will-voter-turnout-exceed-2022",
  question: "Will voter turnout exceed 2022?",
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
  lastTradePrice: 0.67,
  bestBid: 0.66,
  bestAsk: 0.68,
  outcomes: [
    { id: "yes", name: "Yes", price: 0.67, tokenId: "token-yes" },
    { id: "no", name: "No", price: 0.33, tokenId: "token-no" },
  ],
  clobTokenIds: ["token-yes", "token-no"],
  tags: ["politics"],
  url: "https://polymarket.com",
};

export const sampleEvidence: EvidenceItem[] = [
  {
    id: "calendar",
    title: "Election certification calendar",
    publisher: "Sample state election board",
    kind: "official",
  },
  {
    id: "survey",
    title: "Illustrative registered-voter survey",
    publisher: "Demo research desk",
    kind: "poll",
  },
  {
    id: "methodology",
    title: "Turnout baseline methodology",
    publisher: "Civic model lab",
    kind: "model",
  },
];

export const samplePollRows: PollMarketComparisonRow[] = [
  {
    id: "yes",
    label: "Yes",
    pollShare: 0.62,
    marketProbability: 0.67,
    sampleSize: 1287,
    marginOfErrorPoints: 2.8,
    asOf: "Illustrative data",
  },
  {
    id: "no",
    label: "No",
    pollShare: 0.38,
    marketProbability: 0.33,
    sampleSize: 1287,
    marginOfErrorPoints: 2.8,
    asOf: "Illustrative data",
  },
];

export const samplePoints: MarketPricePoint[] = [
  { timestamp: "2026-06-01T00:00:00Z", price: 0.56 },
  { timestamp: "2026-06-02T00:00:00Z", price: 0.6 },
  { timestamp: "2026-06-03T00:00:00Z", price: 0.58 },
  { timestamp: "2026-06-04T00:00:00Z", price: 0.64 },
  { timestamp: "2026-06-05T00:00:00Z", price: 0.67 },
];

export const sampleOrderbook: OrderbookSnapshot = {
  tokenId: "token-yes",
  bids: [
    { price: 0.41, size: 1200, total: 1200 },
    { price: 0.4, size: 900, total: 2100 },
    { price: 0.39, size: 600, total: 2700 },
  ],
  asks: [
    { price: 0.43, size: 1100, total: 1100 },
    { price: 0.44, size: 700, total: 1800 },
    { price: 0.45, size: 500, total: 2300 },
  ],
  spread: 0.02,
  mid: 0.42,
  updatedAt: "2026-06-09T00:00:00Z",
};
