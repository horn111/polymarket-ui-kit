import { readFile } from "node:fs/promises";
import { join, posix } from "node:path";

interface RegistryFile {
  path: string;
  type: string;
  target: string;
}
interface RegistryItem {
  name: string;
  files: RegistryFile[];
}

/** Embed source and rebase local imports to the files' installed locations. */
export async function hydrateRegistry<T extends { items: RegistryItem[] }>(
  root: string,
  registry: T,
) {
  const items = await Promise.all(
    registry.items.map(async (item) => ({
      ...item,
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      files: await Promise.all(
        item.files.map(async (file) => {
          const source = await readFile(join(root, file.path), "utf8");
          const content = source.replace(
            /((?:from\s+|import\s*)["'])(\.{1,2}\/[^"']+)(["'])/g,
            (_match, prefix: string, specifier: string, quote: string) => {
              const resolved = posix.normalize(
                posix.join(posix.dirname(file.path), specifier),
              );
              const dependency = item.files.find(
                (candidate) =>
                  candidate.path === resolved ||
                  candidate.path.replace(/\.tsx?$/, "") === resolved,
              );
              if (!dependency)
                throw new Error(`${item.name}: missing registry file for ${specifier}`);
              const relative = posix
                .relative(posix.dirname(file.target), dependency.target)
                .replace(/\.tsx?$/, "");
              return `${prefix}${relative.startsWith(".") ? relative : `./${relative}`}${quote}`;
            },
          );
          return { ...file, content };
        }),
      ),
    })),
  );
  return { ...registry, items };
}
