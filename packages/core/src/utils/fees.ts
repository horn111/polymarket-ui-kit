import type { FeePreview, FeePreviewInput } from "../types/builder";

export function calculatePlatformFee(input: FeePreviewInput): number {
  const rate = input.platformFeeRate ?? 0;
  const price = input.price ?? 0;

  if (rate <= 0 || price <= 0 || price >= 1) {
    return 0;
  }

  return input.notional * rate * price * (1 - price);
}

export function calculateBuilderFee(input: FeePreviewInput): number {
  const bps = input.builderFeeBps ?? 0;
  return input.notional * (bps / 10_000);
}

export function previewFees(input: FeePreviewInput): FeePreview {
  const notional =
    input.notional || (input.price ?? 0) * (input.size ?? 0);
  const normalizedInput = { ...input, notional };
  const platformFee = calculatePlatformFee(normalizedInput);
  const builderFee = calculateBuilderFee(normalizedInput);
  const totalFee = platformFee + builderFee;

  return {
    notional,
    platformFee,
    builderFee,
    totalFee,
    totalCost: notional + totalFee,
  };
}

