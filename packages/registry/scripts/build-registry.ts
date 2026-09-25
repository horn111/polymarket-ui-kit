import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { hydrateRegistry } from "./hydrate-registry.js";
import sourceRegistry from "../registry.json";

const root = fileURLToPath(new URL("..", import.meta.url));
const registry = await hydrateRegistry(root, sourceRegistry);

await mkdir(join(root, "dist", "r"), { recursive: true });

for (const item of registry.items) {
  await writeFile(
    join(root, "dist", "r", `${item.name}.json`),
    JSON.stringify(item, null, 2),
  );
}

await mkdir(dirname(join(root, "dist", "registry.json")), { recursive: true });
await writeFile(join(root, "dist", "registry.json"), JSON.stringify(registry, null, 2));
console.log(`Built ${registry.items.length} registry endpoints.`);
