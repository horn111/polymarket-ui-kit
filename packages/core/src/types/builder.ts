export interface BuilderProfile {
  name: string;
  handle?: string | undefined;
  code?: string | undefined;
  url?: string | undefined;
  verified?: boolean | undefined;
  monthlyVolume?: number | undefined;
  rank?: number | undefined;
}

export interface FeePreviewInput {
  notional: number;
  price?: number;
  size?: number;
  platformFeeRate?: number;
  builderFeeBps?: number;
}

export interface FeePreview {
  notional: number;
  platformFee: number;
  builderFee: number;
  totalFee: number;
  totalCost: number;
}
