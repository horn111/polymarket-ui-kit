import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

interface RegistryFile {
  path: string;
  type: string;
  target: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: RegistryFile[];
}

interface Registry {
  name: string;
  items: RegistryItem[];
}

const root = fileURLToPath(new URL("..", import.meta.url));
const registryPath = join(root, "registry.json");
const registry = JSON.parse(await readFile(registryPath, "utf8")) as Registry;

if (registry.name !== "polymarket-ui-kit") {
  throw new Error("Registry name must be polymarket-ui-kit.");
}

if (!Array.isArray(registry.items) || registry.items.length === 0) {
  throw new Error("Registry must include at least one item.");
}

for (const item of registry.items) {
  if (!item.name || !item.title || !item.description) {
    throw new Error(`Registry item ${item.name} is missing metadata.`);
  }

  for (const file of item.files) {
    await access(join(root, file.path));
    if (!file.target.startsWith("components/") && !file.target.startsWith("hooks/") && !file.target.startsWith("lib/")) {
      throw new Error(`Unexpected target for ${file.path}: ${file.target}`);
    }
  }
}

console.log(`Validated ${registry.items.length} registry items.`);
