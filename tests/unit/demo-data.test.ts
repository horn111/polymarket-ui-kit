import { afterEach, describe, expect, it, vi } from "vitest";
import {
  loadPublicMarket,
  loadPublicMarketBundle,
} from "../../apps/demo/components/live-data";

afterEach(() => vi.unstubAllGlobals());

describe("demo data provenance", () => {
  it("serves the explicit sample without requesting public prices", async () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    const result = await loadPublicMarketBundle("sample");
    expect(result.source).toBe("fixture");
    expect(result.market.slug).toBe("sample");
    expect(result.market.url).toBeUndefined();
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("never relabels an unrelated fixture as a requested market", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Offline")));
    await expect(loadPublicMarket("real-market")).rejects.toThrow("Offline");
  });

  it("leaves missing history and depth empty for a live market", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: "real",
            slug: "real-market",
            question: "Real market?",
            active: true,
            outcomes: '["Yes","No"]',
            outcomePrices: '["0.7","0.3"]',
            clobTokenIds: '["real-token","no-token"]',
          }),
        ),
      )
      .mockRejectedValue(new Error("Depth unavailable"));
    vi.stubGlobal("fetch", fetcher);
    const result = await loadPublicMarketBundle("real-market");
    expect(result.market.question).toBe("Real market?");
    expect(result.source).toBe("partial");
    expect(result.points).toEqual([]);
    expect(result.orderbook).toBeNull();
  });
});
