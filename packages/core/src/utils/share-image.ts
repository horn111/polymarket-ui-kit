import { formatCompactNumber } from "../format/currency.js";
import { clampProbability, formatProbability } from "../format/probability.js";
import type { PolymarketMarket, ShareCardSvgOptions } from "../types/market.js";

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

const themes = {
  dark: {
    page: "#0d1718",
    paper: "#1b302f",
    border: "#2c4140",
    accent: "#d0b779",
    text: "#e4eae3",
    muted: "#a5b4ad",
  },
  light: {
    page: "#e9ede7",
    paper: "#f5f7f1",
    border: "#cad5ca",
    accent: "#806021",
    text: "#1c302c",
    muted: "#53665f",
  },
};

function escapeSvg(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength
    ? `${value.slice(0, Math.max(0, maxLength - 3))}...`
    : value;
}

function splitText(value: string, maxLength: number, maxLines: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of value.split(/\s+/).filter(Boolean)) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const visible = lines.slice(0, maxLines);
    visible[maxLines - 1] = truncate(visible[maxLines - 1] ?? "", maxLength);
    return visible;
  }
  return lines;
}

export function createShareCardSvg(
  market: PolymarketMarket,
  options: ShareCardSvgOptions = {},
): string {
  const width = options.width ?? DEFAULT_WIDTH;
  const height = options.height ?? DEFAULT_HEIGHT;
  const theme = themes[options.theme ?? "dark"];
  const attribution = options.attribution ?? "polymarket-ui-kit";
  const statusLabel =
    options.statusLabel ??
    (market.status === "unknown"
      ? "Market"
      : `${market.status[0]!.toUpperCase()}${market.status.slice(1)} market`);
  const leadingOutcome = [...market.outcomes]
    .filter(
      (outcome) => typeof outcome.price === "number" && Number.isFinite(outcome.price),
    )
    .sort((a, b) => (b.price ?? -1) - (a.price ?? -1))[0];
  const probability =
    leadingOutcome?.price != null ? clampProbability(leadingOutcome.price) : null;
  const questionLines = splitText(market.question, 21, 4)
    .map(
      (line, index) =>
        `<text x="104" y="${245 + index * 62}" fill="${theme.text}" font-family="Instrument Sans, Arial, sans-serif" font-size="54" font-weight="500">${escapeSvg(line)}</text>`,
    )
    .join("\n  ");
  const volume = market.volume != null ? formatCompactNumber(market.volume) : "—";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}" role="img" aria-label="${escapeSvg(market.question)}">
  <rect width="1200" height="630" fill="${theme.page}"/>
  <text x="70" y="100" fill="${theme.text}" font-family="Instrument Sans, Arial, sans-serif" font-size="30" font-weight="700">Civic Forecast</text>
  <text x="1128" y="100" text-anchor="end" fill="${theme.muted}" font-family="Instrument Sans, Arial, sans-serif" font-size="22">${escapeSvg(truncate(statusLabel, 38))}</text>
  <path d="M70 119H1130" stroke="${theme.border}"/>
  <rect x="70" y="145" width="1060" height="370" rx="24" fill="${theme.paper}" stroke="${theme.border}"/>
  <text x="104" y="199" fill="${theme.muted}" font-family="Instrument Sans, Arial, sans-serif" font-size="22">${escapeSvg(truncate(market.category ?? "Prediction market", 36))}</text>
  ${questionLines}
  <rect x="780" y="161" width="334" height="338" rx="16" fill="#101c1e"/>
  <text x="810" y="208" fill="#a5b4ad" font-family="Instrument Sans, Arial, sans-serif" font-size="23">Market leader</text>
  <text x="810" y="385" fill="#e4eae3" font-family="Instrument Sans, Arial, sans-serif" font-size="102" font-weight="500">${escapeSvg(formatProbability(probability))}</text>
  <text x="810" y="448" fill="#e4eae3" font-family="Instrument Sans, Arial, sans-serif" font-size="31">${escapeSvg(truncate(leadingOutcome?.name ?? "No outcome", 18))}</text>
  <path d="M70 540H1130" stroke="${theme.border}"/>
  <text x="70" y="576" fill="${theme.muted}" font-family="Instrument Sans, Arial, sans-serif" font-size="21">Volume · ${escapeSvg(volume)}</text>
  <text x="1130" y="576" text-anchor="end" fill="${theme.accent}" font-family="Instrument Sans, Arial, sans-serif" font-size="21">${escapeSvg(truncate(attribution, 34))}</text>
</svg>`;
}
