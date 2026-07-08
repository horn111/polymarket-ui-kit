import registry from "../../packages/registry/registry.json";
import { describe, expect, it } from "vitest";

describe("registry metadata", () => {
  it("contains launch registry items", () => {
    expect(registry.items.map((item) => item.name)).toEqual([
      "market-card",
      "orderbook-panel",
      "share-card",
      "combo-share-card",
      "embed-studio",
    ]);
  });
});
