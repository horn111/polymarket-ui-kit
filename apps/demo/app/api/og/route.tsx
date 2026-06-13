import { sampleMarket } from "../../../components/sample-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? sampleMarket.slug;
  const market = { ...sampleMarket, slug };
  const probability = Math.round((market.outcomes[0]?.price ?? 0) * 100);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f141b"/>
  <rect x="72" y="72" width="1056" height="486" rx="32" fill="#151c25" stroke="#28313d"/>
  <text x="112" y="142" fill="#2dd4bf" font-family="Inter, Arial" font-size="32" font-weight="700">Polymarket UI Kit</text>
  <text x="112" y="244" fill="#f4f7fb" font-family="Inter, Arial" font-size="58" font-weight="800">${market.question}</text>
  <text x="112" y="392" fill="#b6c2cf" font-family="Inter, Arial" font-size="34">${market.outcomes[0]?.name ?? "Outcome"}</text>
  <text x="112" y="500" fill="#f4f7fb" font-family="Inter, Arial" font-size="118" font-weight="900">${probability}c</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=3600"
    }
  });
}

