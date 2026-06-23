import { formatCompactNumber } from "../format/currency";
import { clampProbability, probabilityToCents } from "../format/probability";
import type { PolymarketMarket, ShareCardSvgOptions } from "../types/market";

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

const themes = {
  dark: {
    page: "#f6f8fa",
    card: "#0d131a",
    cardStroke: "#263241",
    accent: "#2dd4bf",
    accentSoft: "#123332",
    accentStroke: "#245c55",
    text: "#f8fafc",
    muted: "#a7b4c2",
    surface: "#1a2430",
    surfaceStroke: "#344253",
    barTrack: "#334155",
  },
  light: {
    page: "#f7f8f5",
    card: "#ffffff",
    cardStroke: "#dce3e8",
    accent: "#0f766e",
    accentSoft: "#dff9ef",
    accentStroke: "#b7ead7",
    text: "#0f172a",
    muted: "#667085",
    surface: "#f8fafc",
    surfaceStroke: "#d8e0e7",
    barTrack: "#dbe5ea",
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
  return value.length > maxLength ? `${value.slice(0, Math.max(0, maxLength - 3))}...` : value;
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

  if (current) {
    lines.push(current);
  }

  if (lines.length > maxLines) {
    const visible = lines.slice(0, maxLines);
    visible[maxLines - 1] = truncate(visible[maxLines - 1] ?? "", maxLength);
    return visible;
  }

  return lines;
}

function statValue(label: string, value: number | null | undefined) {
  return value ? { label, value: formatCompactNumber(value) } : null;
}

export function createShareCardSvg(
  market: PolymarketMarket,
  options: ShareCardSvgOptions = {},
): string {
  const width = options.width ?? DEFAULT_WIDTH;
  const height = options.height ?? DEFAULT_HEIGHT;
  const theme = themes[options.theme ?? "dark"];
  const attribution = options.attribution ?? "polymarket-ui-kit";
  const leadingOutcome = market.outcomes[0];
  const probability = leadingOutcome ? clampProbability(leadingOutcome.price ?? 0) : 0;
  const probabilityWidth = Math.round(330 * probability);
  const questionLines = splitText(market.question, 34, 3)
    .map(
      (line, index) =>
        `<text x="112" y="${228 + index * 64}" fill="${theme.text}" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="850">${escapeSvg(line)}</text>`,
    )
    .join("\n  ");
  const stats = [
    statValue("Volume", market.volume),
    statValue("Liquidity", market.liquidity),
    statValue("Comments", market.commentCount),
  ].filter((item): item is { label: string; value: string } => Boolean(item));
  const visibleStats = stats.length
    ? stats.slice(0, 2)
    : [{ label: "Status", value: market.status }];
  const statsSvg = visibleStats
    .map((stat, index) => {
      const x = 688 + index * 172;
      return `<text x="${x}" y="470" fill="${theme.muted}" font-family="Inter, Arial, sans-serif" font-size="22">${escapeSvg(stat.label)}</text>
  <text x="${x}" y="510" fill="${theme.text}" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="850">${escapeSvg(stat.value)}</text>`;
    })
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${DEFAULT_WIDTH} ${DEFAULT_HEIGHT}" role="img" aria-label="${escapeSvg(market.question)}">
  <rect width="1200" height="630" fill="${theme.page}"/>
  <rect x="70" y="70" width="1060" height="490" rx="28" fill="${theme.card}" stroke="${theme.cardStroke}"/>
  <rect x="70" y="70" width="1060" height="8" rx="4" fill="${theme.accent}"/>
  <rect x="280" y="70" width="210" height="8" fill="#f59e0b"/>
  <rect x="490" y="70" width="210" height="8" fill="#60a5fa"/>
  <text x="112" y="142" fill="${theme.accent}" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="800">Polymarket</text>
  <rect x="320" y="108" width="158" height="44" rx="22" fill="${theme.accentSoft}" stroke="${theme.accentStroke}"/>
  <text x="350" y="138" fill="${theme.accent}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700">Live market</text>
  <text x="936" y="138" fill="${theme.muted}" font-family="Inter, Arial, sans-serif" font-size="22">${escapeSvg(truncate(attribution, 24))}</text>
  <text x="112" y="192" fill="${theme.muted}" font-family="Inter, Arial, sans-serif" font-size="22">${escapeSvg(market.category ?? "Prediction market")}</text>
  ${questionLines}
  <rect x="112" y="398" width="520" height="100" rx="12" fill="${theme.surface}" stroke="${theme.surfaceStroke}"/>
  <text x="142" y="438" fill="${theme.muted}" font-family="Inter, Arial, sans-serif" font-size="22">Leading outcome</text>
  <text x="142" y="472" fill="${theme.text}" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="750">${escapeSvg(leadingOutcome?.name ?? "Outcome")}</text>
  <text x="470" y="476" fill="${theme.text}" font-family="Inter, Arial, sans-serif" font-size="76" font-weight="900">${escapeSvg(probabilityToCents(leadingOutcome?.price))}</text>
  <rect x="688" y="408" width="330" height="18" rx="9" fill="${theme.barTrack}"/>
  <rect x="688" y="408" width="${probabilityWidth}" height="18" rx="9" fill="${theme.accent}"/>
  ${statsSvg}
</svg>`;
}
