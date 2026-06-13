import type { Meta, StoryObj } from "@storybook/react";
import {
  CommentList,
  LeaderboardTable,
  MarketCard,
  MobileTradeDrawer,
  OrderbookPanel,
  ProbabilityChart,
  ShareCard,
} from "@polymarket-ui-kit/react";
import type {
  MarketComment,
  MarketPricePoint,
  OrderbookSnapshot,
  PolymarketMarket,
  TraderLeaderboardRow,
} from "@polymarket-ui-kit/core";

const market: PolymarketMarket = {
  id: "sample-fed",
  slug: "fed-cut-2026",
  question: "Will the Fed cut rates at the next meeting?",
  description: "Storybook fixture.",
  category: "Macro",
  image: null,
  icon: null,
  status: "open",
  active: true,
  closed: false,
  archived: false,
  endDate: "2026-09-16T18:00:00Z",
  volume: 5800000,
  liquidity: 420000,
  commentCount: 321,
  outcomes: [
    { id: "yes", name: "Yes", price: 0.67, tokenId: "yes-token" },
    { id: "no", name: "No", price: 0.33, tokenId: "no-token" }
  ],
  clobTokenIds: ["yes-token", "no-token"]
};

const points: MarketPricePoint[] = [
  { timestamp: "2026-06-01", price: 0.52 },
  { timestamp: "2026-06-02", price: 0.55 },
  { timestamp: "2026-06-03", price: 0.61 },
  { timestamp: "2026-06-04", price: 0.58 },
  { timestamp: "2026-06-05", price: 0.67 }
];

const orderbook: OrderbookSnapshot = {
  tokenId: "yes-token",
  bids: [
    { price: 0.66, size: 1000, total: 1000 },
    { price: 0.65, size: 900, total: 1900 }
  ],
  asks: [
    { price: 0.68, size: 1100, total: 1100 },
    { price: 0.69, size: 700, total: 1800 }
  ],
  spread: 0.02,
  mid: 0.67,
  updatedAt: "2026-06-09T00:00:00Z"
};

const comments: MarketComment[] = [
  {
    id: "1",
    body: "The macro data makes this feel underpriced.",
    createdAt: "2026-06-08T12:00:00Z",
    profile: { name: "Research Desk" }
  },
  {
    id: "2",
    body: "Watching the next CPI print before sizing this.",
    createdAt: "2026-06-08T18:00:00Z",
    profile: { pseudonym: "macro-max" }
  }
];

const rows: TraderLeaderboardRow[] = [
  { rank: 1, wallet: "0x11111111111111111111", name: "Top Trader", volume: 1200000, profit: 82000 },
  { rank: 2, wallet: "0x22222222222222222222", name: "Event Arb", volume: 940000, profit: 54000 }
];

const meta: Meta = {
  title: "Polymarket UI Kit/MVP"
};

export default meta;

export const MarketCardStory: StoryObj = {
  name: "MarketCard",
  render: () => <MarketCard market={market} points={points} />
};

export const OrderbookStory: StoryObj = {
  name: "OrderbookPanel",
  render: () => <OrderbookPanel orderbook={orderbook} />
};

export const ShareCardStory: StoryObj = {
  name: "ShareCard",
  render: () => <ShareCard market={market} />
};

export const ProbabilityChartStory: StoryObj = {
  name: "ProbabilityChart",
  render: () => (
    <ProbabilityChart
      series={[
        { id: "yes", label: "Yes", color: "#0f766e", points },
        {
          id: "no",
          label: "No",
          color: "#b91c1c",
          points: points.map((point) => ({ ...point, price: 1 - point.price }))
        }
      ]}
    />
  )
};

export const CommentsStory: StoryObj = {
  name: "CommentList",
  render: () => <CommentList comments={comments} />
};

export const LeaderboardStory: StoryObj = {
  name: "LeaderboardTable",
  render: () => <LeaderboardTable rows={rows} />
};

export const TradeDrawerStory: StoryObj = {
  name: "MobileTradeDrawer",
  render: () => <MobileTradeDrawer market={market} builderFeeBps={25} />
};

