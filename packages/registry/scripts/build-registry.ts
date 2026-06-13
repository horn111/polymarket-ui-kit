import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const registry = JSON.parse(
  await readFile(join(root, "registry.json"), "utf8"),
) as { items: Array<{ name: string }> };

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
