export interface BuilderProfile {
  name: string;
  handle?: string | undefined;
  code?: string | undefined;
  url?: string | undefined;
  verified?: boolean | undefined;
  monthlyVolume?: number | undefined;
  rank?: number | undefined;
}

export interface BuilderConfig extends BuilderProfile {
  makerFeeBps?: number | undefined;
  takerFeeBps?: number | undefined;
}

export type BuilderFeeSide = "maker" | "taker";

export interface FeePreviewInput {
  notional: number;
  price?: number | undefined;
  size?: number | undefined;
  platformFeeRate?: number | undefined;
  builderFeeBps?: number | undefined;
  builderFeeSide?: BuilderFeeSide | undefined;
  builderMakerFeeBps?: number | undefined;
  builderTakerFeeBps?: number | undefined;
}

export interface FeePreview {
  notional: number;
  platformFee: number;
  builderFee: number;
  totalFee: number;
  totalCost: number;
  builderFeeBps: number;
  builderFeeSide: BuilderFeeSide;
}
