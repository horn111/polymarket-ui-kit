import { ImageResponse } from "next/og";
import {
  clampProbability,
  createShareCardSvg,
  formatCompactNumber,
  formatProbability,
  type ShareImageFormat,
  type ShareImageTheme,
} from "@polymarket-ui-kit/core";
import { loadPublicMarket } from "../../../components/live-data";

export const runtime = "edge";
export const revalidate = 300;

const imageSize = { width: 1200, height: 630 };
const themeTokens = {
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

function resolveTheme(value: string | null): ShareImageTheme {
  return value === "light" ? "light" : "dark";
}

function resolveFormat(value: string | null): ShareImageFormat {
  return value === "svg" ? "svg" : "png";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "sample";
  const theme = resolveTheme(searchParams.get("theme"));
  const format = resolveFormat(searchParams.get("format"));
  const attribution = searchParams.get("attribution") ?? "polymarket-ui-kit";
  const result = await loadPublicMarket(slug).catch(() => null);
  if (!result) {
    return Response.json(
      { error: "Market unavailable. Check the URL or try again." },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
  const { market, source } = result;
  const statusLabel =
    source === "fixture"
      ? "Sample data"
      : market.status === "unknown"
        ? "Public market"
        : `${market.status[0]!.toUpperCase()}${market.status.slice(1)} market`;

  if (format === "svg") {
    return new Response(
      createShareCardSvg(market, { attribution, statusLabel, theme }),
      {
        headers: {
          "content-type": "image/svg+xml; charset=utf-8",
          "cache-control": "public, max-age=300, stale-while-revalidate=3600",
        },
      },
    );
  }

  const tokens = themeTokens[theme];
  const leadingOutcome = [...market.outcomes]
    .filter(
      (outcome) => typeof outcome.price === "number" && Number.isFinite(outcome.price),
    )
    .sort((a, b) => (b.price ?? -1) - (a.price ?? -1))[0];
  const probability =
    leadingOutcome?.price != null ? clampProbability(leadingOutcome.price) : null;
  const fonts = await fetch(new URL("/fonts/instrument-sans-latin.ttf", request.url))
    .then(async (font) =>
      font.ok
        ? [
            {
              name: "Instrument Sans",
              data: await font.arrayBuffer(),
              style: "normal" as const,
              weight: 400 as const,
            },
          ]
        : undefined,
    )
    .catch(() => undefined);
  const response = new ImageResponse(
    <div
      style={{
        background: tokens.page,
        color: tokens.text,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Instrument Sans, Arial, sans-serif",
        height: "100%",
        padding: "70px 70px 54px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          borderBottom: `1px solid ${tokens.border}`,
          display: "flex",
          height: 50,
          justifyContent: "space-between",
          paddingBottom: 16,
        }}
      >
        <strong style={{ fontSize: 30 }}>Civic Forecast</strong>
        <span style={{ color: tokens.muted, fontSize: 22 }}>{statusLabel}</span>
      </div>
      <div
        style={{
          background: tokens.paper,
          border: `1px solid ${tokens.border}`,
          display: "flex",
          height: 370,
          borderRadius: 24,
          marginTop: 25,
          overflow: "hidden",
          width: 1060,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "34px",
            width: 710,
          }}
        >
          <span style={{ color: tokens.muted, fontSize: 22 }}>
            {market.category ?? "Prediction market"}
          </span>
          <strong
            style={{
              fontFamily: "Instrument Sans, Arial, sans-serif",
              fontSize: 54,
              fontWeight: 500,
              lineHeight: 1.12,
              marginTop: 34,
              overflow: "hidden",
            }}
          >
            {market.question}
          </strong>
        </div>
        <div
          style={{
            background: "#101c1e",
            borderRadius: 16,
            margin: 16,
            color: "#e4eae3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "35px 30px 52px",
            width: 318,
          }}
        >
          <span style={{ color: "#a5b4ad", fontSize: 23 }}>Market leader</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong
              style={{
                fontSize: 102,
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {formatProbability(probability)}
            </strong>
            <span style={{ fontSize: 31, marginTop: 18 }}>
              {leadingOutcome?.name ?? "No outcome"}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          borderTop: `1px solid ${tokens.border}`,
          display: "flex",
          justifyContent: "space-between",
          marginTop: 25,
          paddingTop: 24,
        }}
      >
        <span style={{ color: tokens.muted, fontSize: 21 }}>
          Volume · {market.volume != null ? formatCompactNumber(market.volume) : "—"}
        </span>
        <span style={{ color: tokens.accent, fontSize: 21 }}>{attribution}</span>
      </div>
    </div>,
    { ...imageSize, ...(fonts ? { fonts } : {}) },
  );
  response.headers.set(
    "cache-control",
    "public, max-age=300, stale-while-revalidate=3600",
  );
  return response;
}
