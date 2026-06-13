import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = join(process.cwd(), "apps", "docs", "public", "og");
await mkdir(outDir, { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0f141b"/>
  <text x="80" y="140" fill="#2dd4bf" font-family="Arial" font-size="42" font-weight="700">Polymarket UI Kit</text>
  <text x="80" y="260" fill="#f4f7fb" font-family="Arial" font-size="72" font-weight="900">Live market cards</text>
  <text x="80" y="360" fill="#b6c2cf" font-family="Arial" font-size="34">React components for prediction market interfaces</text>
</svg>`;

await writeFile(join(outDir, "launch.svg"), svg);
console.log("Generated apps/docs/public/og/launch.svg");

