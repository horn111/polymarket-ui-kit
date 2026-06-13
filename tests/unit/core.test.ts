import {
  formatCurrency,
  formatProbability,
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
      outcomes: "[\"Yes\",\"No\"]",
      outcomePrices: "[\"0.7\",\"0.3\"]",
      clobTokenIds: "[\"yes\",\"no\"]"
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
  it("calculates builder fees from basis points", () => {
    const preview = previewFees({ notional: 100, builderFeeBps: 25 });
    expect(preview.builderFee).toBe(0.25);
    expect(preview.totalCost).toBe(100.25);
  });
});

