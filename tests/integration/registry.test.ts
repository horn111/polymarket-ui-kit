import registry from "../../packages/registry/registry.json";
import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import { hydrateRegistry } from "../../packages/registry/scripts/hydrate-registry";

describe("registry metadata", () => {
  it("contains launch registry items", () => {
    expect(registry.items.map((item) => item.name)).toEqual([
      "election-brief-card",
      "market-card",
      "orderbook-panel",
      "share-card",
      "combo-share-card",
      "embed-studio",
      "evidence-rail",
      "poll-market-comparison",
    ]);
  });

  it("ships source content and complete imports at installed paths", async () => {
    const root = resolve(process.cwd(), "packages/registry");
    const built = await hydrateRegistry(root, registry);
    for (const item of built.items) {
      for (const file of item.files) expect(file.content.length).toBeGreaterThan(0);
    }
    for (const name of [
      "market-card",
      "share-card",
      "orderbook-panel",
      "combo-share-card",
    ]) {
      const item = built.items.find((entry) => entry.name === name)!;
      expect(item.files[0]!.content).toContain('from "../../lib/polymarket-format"');
      expect(
        item.files.some((file) => file.target === "lib/polymarket-format.ts"),
      ).toBe(true);
    }
  });
});
