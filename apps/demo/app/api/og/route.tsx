import { ImageResponse } from "next/og";
import {
  clampProbability,
  createShareCardSvg,
  formatCompactNumber,
  probabilityToCents,
  type ShareImageFormat,
  type ShareImageTheme,
} from "@polymarket-ui-kit/core";
import { loadPublicMarket } from "../../../components/live-data";

export const runtime = "edge";
export const revalidate = 300;

const imageSize = {
  width: 1200,
  height: 630,
};

const themeTokens = {
  dark: {
    page: "#071523",
    card: "#0d2033",
    cardStroke: "#28425c",
    accent: "#6f9cff",
    accentSoft: "#183764",
    accentStroke: "#426da9",
    text: "#f3f7fc",
    muted: "#a9b9ca",
    surface: "#132940",
    surfaceStroke: "#28425c",
    barTrack: "#1a334d",
  },
  light: {
    page: "#f4f7fb",
    card: "#ffffff",
    cardStroke: "#d7e1ec",
    accent: "#1e63f3",
    accentSoft: "#e5edff",
    accentStroke: "#b8ccfa",
    text: "#0b1d33",
    muted: "#52657b",
    surface: "#f4f7fb",
    surfaceStroke: "#d7e1ec",
    barTrack: "#e3ebf5",
  },
};

function resolveTheme(value: string | null): ShareImageTheme {
  return value === "light" ? "light" : "dark";
}

function resolveFormat(value: string | null): ShareImageFormat {
  return value === "svg" ? "svg" : "png";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug =
    searchParams.get("slug") ?? "who-will-win-the-2028-us-presidential-election";
  const theme = resolveTheme(searchParams.get("theme"));
  const format = resolveFormat(searchParams.get("format"));
  const attribution = searchParams.get("attribution") ?? "polymarket-ui-kit";
  const { market, source } = await loadPublicMarket(slug);

  if (format === "svg") {
    const svg = createShareCardSvg(market, {
      attribution,
      statusLabel: source === "live" ? "Live market" : "Fixture fallback",
      theme,
    });

    return new Response(svg, {
      headers: {
        "content-type": "image/svg+xml; charset=utf-8",
        "cache-control": "public, max-age=300, stale-while-revalidate=3600",
      },
    });
  }

  const tokens = themeTokens[theme];
  const leadingOutcome = market.outcomes[0];
  const probability = leadingOutcome ? clampProbability(leadingOutcome.price ?? 0) : 0;
  const stats = [
    market.volume
      ? { label: "Volume", value: formatCompactNumber(market.volume) }
      : null,
    market.liquidity
      ? { label: "Liquidity", value: formatCompactNumber(market.liquidity) }
      : null,
    market.commentCount
      ? { label: "Comments", value: formatCompactNumber(market.commentCount) }
      : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));
  const visibleStats = stats.length
    ? stats.slice(0, 2)
    : [{ label: "Status", value: market.status }];

  const response = new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: tokens.page,
        display: "flex",
        fontFamily: "Instrument Sans, Arial, sans-serif",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          background: tokens.card,
          border: `1px solid ${tokens.cardStroke}`,
          borderRadius: 28,
          display: "flex",
          flexDirection: "column",
          height: 490,
          overflow: "hidden",
          padding: "38px 42px",
          position: "relative",
          width: 1060,
        }}
      >
        <div
          style={{
            background: tokens.accent,
            display: "flex",
            height: 8,
            left: 0,
            position: "absolute",
            top: 0,
            width: 1060,
          }}
        />
        <div
          style={{
            background: tokens.accent,
            display: "flex",
            height: 8,
            left: 210,
            position: "absolute",
            top: 0,
            width: 210,
          }}
        />
        <div
          style={{
            background: "#0f9f91",
            display: "flex",
            height: 8,
            left: 420,
            position: "absolute",
            top: 0,
            width: 210,
          }}
        />

        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 20 }}>
            <span
              style={{
                color: tokens.accent,
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              Polymarket
            </span>
            <span
              style={{
                background: tokens.accentSoft,
                border: `1px solid ${tokens.accentStroke}`,
                borderRadius: 999,
                color: tokens.accent,
                fontSize: 22,
                fontWeight: 700,
                padding: "9px 26px",
              }}
            >
              {source === "live" ? "Live market" : "Fixture fallback"}
            </span>
          </div>
          <span style={{ color: tokens.muted, fontSize: 22 }}>{attribution}</span>
        </div>

        <span
          style={{
            color: tokens.muted,
            fontSize: 22,
            marginTop: 34,
          }}
        >
          {market.category ?? "Prediction market"}
        </span>

        <div
          style={{
            color: tokens.text,
            display: "flex",
            flexDirection: "column",
            fontSize: 54,
            fontFamily: "Source Serif 4, Georgia, serif",
            fontWeight: 650,
            lineHeight: 1.08,
            marginTop: 20,
            maxWidth: 790,
            whiteSpace: "pre-wrap",
          }}
        >
          {market.question}
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: tokens.surface,
              border: `1px solid ${tokens.surfaceStroke}`,
              borderRadius: 12,
              display: "flex",
              height: 100,
              justifyContent: "space-between",
              padding: "0 30px",
              width: 520,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ color: tokens.muted, fontSize: 22 }}>Leading outcome</span>
              <strong style={{ color: tokens.text, fontSize: 30 }}>
                {leadingOutcome?.name ?? "Outcome"}
              </strong>
            </div>
            <strong style={{ color: tokens.text, fontSize: 76, fontWeight: 900 }}>
              {probabilityToCents(leadingOutcome?.price)}
            </strong>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: 28, width: 390 }}
          >
            <div
              style={{
                background: tokens.barTrack,
                borderRadius: 999,
                display: "flex",
                height: 18,
                overflow: "hidden",
                width: 330,
              }}
            >
              <span
                style={{
                  background: tokens.accent,
                  display: "flex",
                  width: `${Math.round(probability * 100)}%`,
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 46 }}>
              {visibleStats.map((stat) => (
                <div
                  key={stat.label}
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <span style={{ color: tokens.muted, fontSize: 22 }}>
                    {stat.label}
                  </span>
                  <strong style={{ color: tokens.text, fontSize: 38 }}>
                    {stat.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    imageSize,
  );

  response.headers.set(
    "cache-control",
    "public, max-age=300, stale-while-revalidate=3600",
  );
  return response;
}
