import {
  buildComboIntent,
  buildClobV2MarketOrderDraft,
  ClobV2OrderDraftError,
  createShareCardSvg,
  formatCurrency,
  formatProbability,
  getBuilderFeeBps,
  listComboMarkets,
  getPriceHistory,
  normalizeComboMarket,
  normalizeComboMarketsPage,
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

  it("builds CLOB V2 market order drafts with builder attribution", () => {
    const market = normalizeMarket({
      id: "1",
      slug: "sample",
      question: "Will it work?",
      active: true,
      outcomes: '["Yes","No"]',
      outcomePrices: '["0.7","0.3"]',
      clobTokenIds: '["yes-token","no-token"]',
    });
    const draft = buildClobV2MarketOrderDraft({
      market,
      outcome: market.outcomes[0]!,
      notional: 25,
      builderCode:
        "0x00000000000000000000000000000000000000000000000000000000000000f5",
    });

    expect(draft).toMatchObject({
      amount: 25,
      builderCode:
        "0x00000000000000000000000000000000000000000000000000000000000000f5",
      marketSlug: "sample",
      orderType: "FOK",
      outcomeId: "0",
      price: 0.7,
      side: "BUY",
      tokenID: "yes-token",
    });
  });

  it("rejects CLOB V2 market order drafts without builder code", () => {
    const market = normalizeMarket({
      id: "1",
      question: "Will it work?",
      active: true,
      outcomes: '["Yes","No"]',
      outcomePrices: '["0.7","0.3"]',
      clobTokenIds: '["yes-token","no-token"]',
    });

    expect(() =>
      buildClobV2MarketOrderDraft({
        market,
        outcome: market.outcomes[0]!,
        notional: 25,
      }),
    ).toThrowError(ClobV2OrderDraftError);
  });

  it("rejects CLOB V2 market order drafts without token id", () => {
    expect(() =>
      buildClobV2MarketOrderDraft({
        builderCode:
          "0x00000000000000000000000000000000000000000000000000000000000000f5",
        notional: 25,
        outcome: { id: "yes", name: "Yes", price: 0.7 },
      }),
    ).toThrowError(ClobV2OrderDraftError);
  });

  it("rejects CLOB V2 market order drafts with invalid notional", () => {
    expect(() =>
      buildClobV2MarketOrderDraft({
        builderCode:
          "0x00000000000000000000000000000000000000000000000000000000000000f5",
        notional: 0,
        outcome: { id: "yes", name: "Yes", price: 0.7, tokenId: "yes-token" },
      }),
    ).toThrowError(ClobV2OrderDraftError);
  });

  it("rejects CLOB V2 market order drafts without price guard", () => {
    expect(() =>
      buildClobV2MarketOrderDraft({
        builderCode:
          "0x00000000000000000000000000000000000000000000000000000000000000f5",
        notional: 25,
        outcome: { id: "yes", name: "Yes", price: null, tokenId: "yes-token" },
      }),
    ).toThrowError(ClobV2OrderDraftError);
  });
});

describe("combo-aware core", () => {
  const rawComboMarket = {
    id: "combo-market-1",
    condition_id: "condition-1",
    slug: "will-btc-and-eth-rally",
    question: "Will BTC and ETH both rally this month?",
    category: "Crypto",
    volume: "1500000",
    tags: [{ label: "crypto" }, "combo"],
    position_ids: ["position-yes", "position-no"],
    outcomes: ["Yes", "No"],
    outcome_prices: ["0.41", "0.59"],
  };

  it("normalizes combo market legs by shared array index", () => {
    const combo = normalizeComboMarket(rawComboMarket);

    expect(combo.conditionId).toBe("condition-1");
    expect(combo.title).toBe("Will BTC and ETH both rally this month?");
    expect(combo.tags).toEqual(["crypto", "combo"]);
    expect(combo.outcomes[0]).toMatchObject({
      name: "Yes",
      positionId: "position-yes",
      price: 0.41,
    });
    expect(combo.outcomes[1]).toMatchObject({
      name: "No",
      positionId: "position-no",
      price: 0.59,
    });
  });

  it("normalizes combo market pages from public API shapes", () => {
    const page = normalizeComboMarketsPage({
      data: [rawComboMarket],
      next_cursor: "next-page",
    });

    expect(page.markets).toHaveLength(1);
    expect(page.nextCursor).toBe("next-page");
  });

  it("fetches combo markets from the public RFQ catalog endpoint", async () => {
    const fetcher = vi.fn(async () =>
      new Response(JSON.stringify({ data: [rawComboMarket] }), {
        headers: { "content-type": "application/json" },
        status: 200,
      }),
    );

    const page = await listComboMarkets(
      { cursor: "abc", exclude: ["one", "two"], limit: 5 },
      { combosBaseUrl: "https://example.com", fetch: fetcher as typeof fetch },
    );
    const requestedUrl = String(fetcher.mock.calls[0]?.[0]);

    expect(requestedUrl).toContain("https://example.com/v1/rfq/combo-markets");
    expect(requestedUrl).toContain("limit=5");
    expect(requestedUrl).toContain("cursor=abc");
    expect(requestedUrl).toContain("exclude=one%2Ctwo");
    expect(page.markets[0]?.outcomes[0]?.positionId).toBe("position-yes");
  });

  it("builds combo intents for host-side RFQ flows", () => {
    const market = normalizeComboMarket(rawComboMarket);
    const intent = buildComboIntent({
      builderCode: "0xabc",
      legs: [{ market, outcome: market.outcomes[0]! }],
      size: 25,
    });

    expect(intent).toMatchObject({
      builderCode: "0xabc",
      direction: "BUY",
      side: "YES",
      size: 25,
      source: "ui-kit",
    });
    expect(intent.legs[0]).toMatchObject({
      conditionId: "condition-1",
      positionId: "position-yes",
      price: 0.41,
    });
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
