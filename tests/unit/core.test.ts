import {
  formatCurrency,
  formatProbability,
  getBuilderFeeBps,
  normalizeMarket,
  previewFees,
  withQuery,
} from "@polymarket-ui-kit/core";
import { describe, expect, it } from "vitest";

describe("core formatters", () => {
  it("formats probability values", () => {
    expect(formatProbability(0.642)).toBe("64%");
  });

  it("formats currency values", () => {
    expect(formatCurrency(1234, { compact: true })).toContain("$");
  });
});

describe("core adapters", () => {
  it("normalizes Gamma-style market payloads", () => {
    const market = normalizeMarket({
      id: "1",
      slug: "sample",
      question: "Will it work?",
      active: true,
      outcomes: '["Yes","No"]',
      outcomePrices: '["0.7","0.3"]',
      clobTokenIds: '["yes","no"]',
    });

    expect(market.status).toBe("open");
    expect(market.outcomes[0]?.price).toBe(0.7);
  });

  it("builds URLs with query params", () => {
    expect(withQuery("https://example.com/path", { limit: 10 })).toBe(
      "https://example.com/path?limit=10",
    );
  });
});

describe("fee preview", () => {
  it("calculates legacy builder fees from basis points", () => {
    const preview = previewFees({ notional: 100, builderFeeBps: 25 });
    expect(preview.builderFee).toBe(0.25);
    expect(preview.builderFeeBps).toBe(25);
    expect(preview.totalCost).toBe(100.25);
  });

  it("selects taker builder fees from side-specific inputs", () => {
    const preview = previewFees({
      notional: 100,
      builderFeeSide: "taker",
      builderTakerFeeBps: 40,
      builderMakerFeeBps: 10,
    });

    expect(getBuilderFeeBps(preview)).toBe(40);
    expect(preview.builderFee).toBe(0.4);
    expect(preview.builderFeeSide).toBe("taker");
  });

  it("selects maker builder fees from side-specific inputs", () => {
    const preview = previewFees({
      notional: 100,
      builderFeeSide: "maker",
      builderTakerFeeBps: 40,
      builderMakerFeeBps: 10,
    });

    expect(preview.builderFee).toBe(0.1);
    expect(preview.builderFeeBps).toBe(10);
    expect(preview.builderFeeSide).toBe("maker");
  });

  it("does not charge builder fees when no rate is provided", () => {
    const preview = previewFees({ notional: 100 });
    expect(preview.builderFee).toBe(0);
    expect(preview.builderFeeBps).toBe(0);
  });
});
