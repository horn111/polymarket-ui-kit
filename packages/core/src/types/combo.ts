export type ComboOutcomeSide = "YES" | "NO";
export type ComboIntentDirection = "BUY" | "SELL";

export interface ComboLegOutcome {
  id: string;
  name: string;
  price: number | null;
  positionId: string;
}

export interface ComboLegMarket {
  id: string;
  conditionId: string;
  slug: string;
  title: string;
  description?: string | null | undefined;
  category?: string | null | undefined;
  image?: string | null | undefined;
  icon?: string | null | undefined;
  volume?: number | null | undefined;
  liquidity?: number | null | undefined;
  active?: boolean | undefined;
  tags: string[];
  outcomes: ComboLegOutcome[];
  raw?: unknown | undefined;
}

export interface ComboMarketsPage {
  markets: ComboLegMarket[];
  cursor?: string | null | undefined;
  nextCursor?: string | null | undefined;
  raw?: unknown | undefined;
}

export interface ListComboMarketsParams {
  limit?: number | undefined;
  cursor?: string | undefined;
  exclude?: string | string[] | undefined;
}

export interface ComboMarketAdapterOptions {
  fetch?: typeof fetch | undefined;
  combosBaseUrl?: string | undefined;
}

export interface ComboSelectionLeg {
  market: ComboLegMarket;
  outcome: ComboLegOutcome;
}

export interface ComboIntentLeg {
  marketId: string;
  conditionId: string;
  slug: string;
  title: string;
  outcomeId: string;
  outcomeName: string;
  positionId: string;
  price: number | null;
}

export interface ComboIntent {
  legs: ComboIntentLeg[];
  direction: ComboIntentDirection;
  side: ComboOutcomeSide;
  size?: number | undefined;
  builderCode?: string | undefined;
  source: "ui-kit";
}

export interface BuildComboIntentInput {
  legs: ComboSelectionLeg[];
  direction?: ComboIntentDirection | undefined;
  side?: ComboOutcomeSide | undefined;
  size?: number | undefined;
  builderCode?: string | undefined;
}
