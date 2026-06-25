import {
  createShareCardSvg,
  formatCurrency,
  formatProbability,
  getBuilderFeeBps,
  getPriceHistory,
  normalizeMarket,
  normalizePriceHistory,
  previewFees,
  withQuery,
} from "@polymarket-ui-kit/core";
import { describe, expect, it, vi } from "vitest";

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

  it("normalizes CLOB price history points", () => {
    const points = normalizePriceHistory(
      {
        history: [
          { t: 1719878400, p: "0.64" },
          { timestamp: "2026-06-02T00:00:00Z", price: 0.66 },
        ],
      },
      "token-yes",
    );

    expect(points).toHaveLength(2);
    expect(points[0]).toMatchObject({
      outcomeId: "token-yes",
      price: 0.64,
      timestamp: "2024-07-02T00:00:00.000Z",
    });
  });

  it("fetches price history with public CLOB query parameters", async () => {
    const fetcher = vi.fn(async () =>
      new Response(JSON.stringify({ history: [{ t: 1719878400, p: 0.64 }] }), {
        headers: { "content-type": "application/json" },
        status: 200,
      }),
    );

    const points = await getPriceHistory(
      { tokenId: "token-yes", interval: "1h", fidelity: 5 },
      { clobBaseUrl: "https://example.com", fetch: fetcher as typeof fetch },
    );
    const requestedUrl = String(fetcher.mock.calls[0]?.[0]);

    expect(requestedUrl).toContain("https://example.com/prices-history");
    expect(requestedUrl).toContain("market=token-yes");
    expect(requestedUrl).toContain("interval=1h");
    expect(requestedUrl).toContain("fidelity=5");
    expect(points[0]?.price).toBe(0.64);
  });
});

describe("share image export", () => {
  it("creates escaped SVG share cards", () => {
    const market = normalizeMarket({
      id: "1",
      slug: "sample",
      question: 'Will <script>alert("x")</script> resolve?',
      active: true,
      outcomes: '["Yes","No"]',
      outcomePrices: '["0.7","0.3"]',
      volume: 1000,
    });
    const svg = createShareCardSvg(market, {
      attribution: "test-studio",
      statusLabel: "Fixture fallback",
      theme: "light",
    });

    expect(svg).toContain('role="img"');
    expect(svg).toContain("test-studio");
    expect(svg).toContain("Fixture fallback");
    expect(svg).toContain("#2dd4bf");
    expect(svg).not.toContain("#f59e0b");
    expect(svg).toContain("&lt;script&gt;");
    expect(svg).not.toContain("<script>");
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
