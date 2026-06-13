import { sampleMarket } from "../../../components/sample-data";

function escapeSvg(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function splitText(value: string, maxLength: number): string[] {
  const lines: string[] = [];
  let current = "";

  for (const word of value.split(" ")) {
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

  return lines.slice(0, 3);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? sampleMarket.slug;
  const market = { ...sampleMarket, slug };
  const outcome = market.outcomes[0];
  const probability = Math.round(Math.min(1, Math.max(0, outcome?.price ?? 0)) * 100);
  const questionLines = splitText(market.question, 34)
    .map(
      (line, index) =>
        `<text x="112" y="${222 + index * 64}" fill="#f8fafc" font-family="Inter, Arial" font-size="54" font-weight="850">${escapeSvg(line)}</text>`,
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f8fa"/>
  <rect x="70" y="70" width="1060" height="490" rx="28" fill="#0d131a" stroke="#263241"/>
  <rect x="70" y="70" width="1060" height="8" rx="4" fill="#2dd4bf"/>
  <rect x="280" y="70" width="210" height="8" fill="#f59e0b"/>
  <rect x="490" y="70" width="210" height="8" fill="#60a5fa"/>
  <text x="112" y="142" fill="#5eead4" font-family="Inter, Arial" font-size="32" font-weight="800">Polymarket</text>
  <rect x="320" y="108" width="158" height="44" rx="22" fill="#123332" stroke="#245c55"/>
  <text x="350" y="138" fill="#ccfbf1" font-family="Inter, Arial" font-size="22" font-weight="700">Live market</text>
  <text x="936" y="138" fill="#a7b4c2" font-family="Inter, Arial" font-size="22">polymarket-ui-kit</text>
  <text x="112" y="192" fill="#a7b4c2" font-family="Inter, Arial" font-size="22">${escapeSvg(market.category ?? "Prediction market")}</text>
  ${questionLines}
  <rect x="112" y="398" width="520" height="100" rx="12" fill="#1a2430" stroke="#344253"/>
  <text x="142" y="438" fill="#a7b4c2" font-family="Inter, Arial" font-size="22">Leading outcome</text>
  <text x="142" y="472" fill="#f8fafc" font-family="Inter, Arial" font-size="30" font-weight="750">${escapeSvg(outcome?.name ?? "Outcome")}</text>
  <text x="470" y="476" fill="#ffffff" font-family="Inter, Arial" font-size="76" font-weight="900">${probability}c</text>
  <rect x="688" y="408" width="330" height="18" rx="9" fill="#334155"/>
  <rect x="688" y="408" width="${Math.round(330 * (probability / 100))}" height="18" rx="9" fill="#2dd4bf"/>
  <text x="688" y="470" fill="#a7b4c2" font-family="Inter, Arial" font-size="22">Volume</text>
  <text x="688" y="508" fill="#f8fafc" font-family="Inter, Arial" font-size="36" font-weight="850">$12.8M</text>
  <text x="850" y="470" fill="#a7b4c2" font-family="Inter, Arial" font-size="22">Liquidity</text>
  <text x="850" y="508" fill="#f8fafc" font-family="Inter, Arial" font-size="36" font-weight="850">$870K</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=3600",
    },
  });
}
