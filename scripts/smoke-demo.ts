import { access } from "node:fs/promises";
import { join } from "node:path";

const required = [
  "README.md",
  "packages/core/src/index.ts",
  "packages/react/src/index.ts",
  "packages/registry/registry.json",
  "apps/docs/app/(marketing)/page.tsx",
  "apps/demo/app/page.tsx",
  "storybook/stories/components.stories.tsx"
];

for (const file of required) {
  await access(join(process.cwd(), file));
}

console.log(`Smoke check passed for ${required.length} key files.`);

