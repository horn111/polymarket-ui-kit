import type {
  ComboLegMarket,
  ComboSelectionLeg,
  MarketComment,
  MarketPricePoint,
  OrderbookSnapshot,
  PolymarketMarket,
  TraderLeaderboardRow,
} from "@polymarket-ui-kit/core";

export const fixtureMarket: PolymarketMarket = {
  id: "fixture-market",
  slug: "fixture-market",
  question: "Will Polymarket UI Kit reach 1,000 stars?",
  description: "Fixture market",
  category: "Open Source",
  image: null,
  icon: null,
  status: "open",
  active: true,
  closed: false,
  archived: false,
  endDate: "2026-12-31T23:59:59Z",
  volume: 100000,
  volume24hr: 12000,
  liquidity: 45000,
  openInterest: 30000,
  commentCount: 42,
  lastTradePrice: 0.64,
  bestBid: 0.63,
  bestAsk: 0.65,
  outcomes: [
    { id: "yes", name: "Yes", price: 0.64, tokenId: "yes-token" },
    { id: "no", name: "No", price: 0.36, tokenId: "no-token" }
  ],
  clobTokenIds: ["yes-token", "no-token"],
  tags: ["oss"],
  url: "https://polymarket.com/event/fixture-market"
};

export const fixturePoints: MarketPricePoint[] = [
  { timestamp: "2026-06-01", price: 0.5 },
  { timestamp: "2026-06-02", price: 0.55 },
  { timestamp: "2026-06-03", price: 0.64 }
];

export const fixtureOrderbook: OrderbookSnapshot = {
  tokenId: "yes-token",
  bids: [
    { price: 0.63, size: 100, total: 100 },
    { price: 0.62, size: 200, total: 300 }
  ],
  asks: [
    { price: 0.65, size: 120, total: 120 },
    { price: 0.66, size: 160, total: 280 }
  ],
  spread: 0.02,
  mid: 0.64,
  updatedAt: "2026-06-09T00:00:00Z"
};

export const fixtureComments: MarketComment[] = [
  {
    id: "comment-1",
    body: "This project has a very clear DX angle.",
    createdAt: "2026-06-08T00:00:00Z",
    profile: { name: "Builder" }
  }
];

export const fixtureRows: TraderLeaderboardRow[] = [
  {
    rank: 1,
    wallet: "0x1111111111111111111111111111111111111111",
    name: "Top Builder",
    volume: 1000000,
    profit: 55000
  }
];

export const fixtureComboMarkets: ComboLegMarket[] = [
  {
    id: "combo-crypto",
    conditionId: "condition-crypto",
    slug: "btc-and-eth-ath",
    title: "Will BTC and ETH both set new highs in 2026?",
    category: "Crypto",
    image: null,
    icon: null,
    volume: 2500000,
    liquidity: 500000,
    active: true,
    tags: ["crypto", "combo"],
    outcomes: [
      { id: "combo-crypto-yes", name: "Yes", price: 0.41, positionId: "position-yes" },
      { id: "combo-crypto-no", name: "No", price: 0.59, positionId: "position-no" },
    ],
  },
  {
    id: "combo-politics",
    conditionId: "condition-politics",
    slug: "election-and-turnout",
    title: "Will turnout and the winning party both clear the line?",
    category: "Politics",
    image: null,
    icon: null,
    volume: 900000,
    liquidity: 120000,
    active: true,
    tags: ["politics", "combo"],
    outcomes: [
      {
        id: "combo-politics-yes",
        name: "Yes",
        price: 0.34,
        positionId: "position-politics-yes",
      },
      {
        id: "combo-politics-no",
        name: "No",
        price: 0.66,
        positionId: "position-politics-no",
      },
    ],
  },
];

export const fixtureComboLegs: ComboSelectionLeg[] = [
  {
    market: fixtureComboMarkets[0]!,
    outcome: fixtureComboMarkets[0]!.outcomes[0]!,
  },
  {
    market: fixtureComboMarkets[1]!,
    outcome: fixtureComboMarkets[1]!.outcomes[0]!,
  },
];
