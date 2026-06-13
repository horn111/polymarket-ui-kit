export type MarketStatus = "open" | "closed" | "resolved" | "archived" | "unknown";

export interface MarketOutcome {
  id: string;
  name: string;
  price: number | null;
  tokenId?: string | undefined;
  color?: string | undefined;
}

export interface MarketPricePoint {
  timestamp: string;
  price: number;
  outcomeId?: string;
}

export interface PolymarketMarket {
  id: string;
  slug: string;
  question: string;
  description?: string | null | undefined;
  category?: string | null | undefined;
  image?: string | null | undefined;
  icon?: string | null | undefined;
  status: MarketStatus;
  active: boolean;
  closed: boolean;
  archived: boolean;
  endDate?: string | null | undefined;
  volume?: number | null | undefined;
  volume24hr?: number | null | undefined;
  liquidity?: number | null | undefined;
  openInterest?: number | null | undefined;
  commentCount?: number | null | undefined;
  lastTradePrice?: number | null | undefined;
  bestBid?: number | null | undefined;
  bestAsk?: number | null | undefined;
  outcomes: MarketOutcome[];
  clobTokenIds: string[];
  tags?: string[] | undefined;
  url?: string | undefined;
  raw?: unknown | undefined;
}

export interface ListMarketsParams {
  limit?: number | undefined;
  offset?: number | undefined;
  active?: boolean | undefined;
  closed?: boolean | undefined;
  archived?: boolean | undefined;
  order?: string | undefined;
  ascending?: boolean | undefined;
  tagId?: string | number | undefined;
}

export interface SearchMarketsParams {
  q?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  categories?: string[] | undefined;
}

export interface MarketAdapterOptions {
  fetch?: typeof fetch | undefined;
  gammaBaseUrl?: string | undefined;
}
