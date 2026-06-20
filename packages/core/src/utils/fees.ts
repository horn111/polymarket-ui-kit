import type { BuilderFeeSide, FeePreview, FeePreviewInput } from "../types/builder";

export const BUILDER_TAKER_FEE_BPS_MAX = 100;
export const BUILDER_MAKER_FEE_BPS_MAX = 50;

export function getBuilderFeeBps(input: FeePreviewInput): number {
  if (typeof input.builderFeeBps === "number") {
    return input.builderFeeBps;
  }

  const side: BuilderFeeSide = input.builderFeeSide ?? "taker";

  if (side === "maker") {
    return input.builderMakerFeeBps ?? 0;
  }

  return input.builderTakerFeeBps ?? 0;
}

export function calculatePlatformFee(input: FeePreviewInput): number {
  const rate = input.platformFeeRate ?? 0;
  const price = input.price ?? 0;

  if (rate <= 0 || price <= 0 || price >= 1) {
    return 0;
  }

  return input.notional * rate * price * (1 - price);
}

export function calculateBuilderFee(input: FeePreviewInput): number {
  const bps = getBuilderFeeBps(input);
  return input.notional * (bps / 10_000);
}

export function previewFees(input: FeePreviewInput): FeePreview {
  const notional = input.notional || (input.price ?? 0) * (input.size ?? 0);
  const normalizedInput = { ...input, notional };
  const builderFeeBps = getBuilderFeeBps(normalizedInput);
  const builderFeeSide = normalizedInput.builderFeeSide ?? "taker";
  const platformFee = calculatePlatformFee(normalizedInput);
  const builderFee = calculateBuilderFee(normalizedInput);
  const totalFee = platformFee + builderFee;

  return {
    notional,
    platformFee,
    builderFee,
    totalFee,
    totalCost: notional + totalFee,
    builderFeeBps,
    builderFeeSide,
  };
}
