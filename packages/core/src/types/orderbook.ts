export type OrderbookSide = "bid" | "ask";

export interface OrderbookLevel {
  price: number;
  size: number;
  total?: number | undefined;
}

export interface OrderbookSnapshot {
  marketSlug?: string | undefined;
  tokenId: string;
  bids: OrderbookLevel[];
  asks: OrderbookLevel[];
  spread?: number | null | undefined;
  mid?: number | null | undefined;
  updatedAt: string;
  raw?: unknown | undefined;
}

export interface OrderbookAdapterOptions {
  fetch?: typeof fetch | undefined;
  clobBaseUrl?: string | undefined;
}

export interface OrderbookParams {
  tokenId: string;
}
