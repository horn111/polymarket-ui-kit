import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as core from "../packages/core/dist/index.js";
import * as react from "../packages/react/dist/index.js";

assert.equal(core.formatProbability(0.42), "42%");
assert.equal(typeof react.MarketCard, "function");
assert.equal(typeof react.ElectionBriefCard, "function");
assert.equal(typeof react.ProbabilityChart, "function");
const registry = JSON.parse(
  await readFile(
    new URL("../packages/registry/dist/registry.json", import.meta.url),
    "utf8",
  ),
);
assert.equal(registry.items.length, 8);
for (const item of registry.items) {
  for (const file of item.files)
    assert.ok(file.content, `${item.name}: missing ${file.path}`);
}
const cli = fileURLToPath(new URL("../packages/cli/dist/index.js", import.meta.url));
assert.ok(execFileSync(process.execPath, [cli, "doctor"], { encoding: "utf8" }).length);
console.log(
  "Built core and React ESM imports, CLI entrypoint, and all 8 registry payloads passed.",
);
