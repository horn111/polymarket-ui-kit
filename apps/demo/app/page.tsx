"use client";

import { useEffect, useState } from "react";
import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import {
  BuilderBadge,
  BuilderFeeDisclosure,
  ComboBuilderCard,
  ComboShareCard,
  FeePill,
  MarketCard,
  OrderbookPanel,
  ProbabilityChart,
  ShareCard,
} from "@polymarket-ui-kit/react";
import { InteractiveLab } from "./components/InteractiveLab";
import { sampleBuilder } from "../components/sample-builder";
import { sampleComboLegs, sampleComboMarkets } from "../components/sample-combos";
import { sampleOrderbook, samplePoints } from "../components/sample-data";

const market: PolymarketMarket = {
  id: "btc-ath-2026",
  slug: "btc-ath-2026",
  question: "Will Bitcoin set a new All-Time High in 2026?",
  description: "Demo market used for the public preview.",
  category: "Crypto",
  image: null,
  icon: null,
  status: "open",
  active: true,
  closed: false,
  archived: false,
  endDate: "2026-12-31T23:59:59Z",
  volume: 15400000,
  liquidity: 1240000,
  commentCount: 842,
  lastTradePrice: 0.68,
  bestBid: 0.67,
  bestAsk: 0.69,
  outcomes: [
    { id: "yes", name: "Yes", price: 0.68, tokenId: "yes-token" },
    { id: "no", name: "No", price: 0.32, tokenId: "no-token" },
  ],
  clobTokenIds: ["yes-token", "no-token"],
  tags: ["crypto", "bitcoin"],
  url: "https://polymarket.com",
};

const trendPoints = samplePoints.map((point, index) => ({
  ...point,
  price: [0.38, 0.43, 0.52, 0.56, 0.68][index] ?? point.price,
}));

const chartSeries = [
  {
    id: "yes",
    label: "Yes",
    color: "#2dd4bf",
    points: trendPoints,
  },
];

const grantStats = [
  { label: "Components", value: "18" },
  { label: "Trading", value: "None" },
  { label: "Builder UX", value: "Visible" },
  { label: "Combos", value: "Intent" },
];

const grantUseCases = [
  {
    label: "BLOG EMBED",
    title: "Turn a market link into a live context block.",
    text: "Readable odds, metadata, price history, and share surface for editorial pages.",
  },
  {
    label: "DASHBOARD WIDGET",
    title: "Drop public market primitives into research tools.",
    text: "Cards, orderbooks, comments, leaderboards, and fallback states without auth.",
  },
  {
    label: "SOCIAL CARD",
    title: "Export market-native visuals for distribution.",
    text: "PNG/SVG cards for X posts, newsletters, reports, and embeds.",
  },
];

function getRouteLinks(theme: DemoTheme) {
  return [
    { label: "MARKET ROUTE", href: `/market/${market.slug}?theme=${theme}` },
    { label: "EMBED ROUTE", href: `/embed/${market.slug}?theme=${theme}` },
    { label: "OG PNG", href: `/api/og?slug=${market.slug}&theme=${theme}&format=png` },
    { label: "OG SVG", href: `/api/og?slug=${market.slug}&theme=${theme}&format=svg` },
  ];
}

type DemoTheme = "light" | "dark";

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="demo-spec-cell">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function DemoHome() {
  const [theme, setTheme] = useState<DemoTheme>("dark");
  const routeLinks = getRouteLinks(theme);

  useEffect(() => {
    document.documentElement.dataset.demoTheme = theme;
    return () => {
      delete document.documentElement.dataset.demoTheme;
    };
  }, [theme]);

  return (
    <>
      <section className="demo-industrial" aria-label="Polymarket UI Kit system sheet">
        <header className="demo-industrial__masthead">
          <span>POLYMARKET UI KIT</span>
          <span>PUBLIC BUILD / REV 0.4</span>
          <span>READ-FIRST INTERFACE</span>
          <a
            className="demo-star-link"
            href="https://github.com/horn111/polymarket-ui-kit"
            rel="noreferrer"
            target="_blank"
          >
            Star Repo
          </a>
          <div className="demo-theme-toggle" role="group" aria-label="Demo theme">
            {(["light", "dark"] as DemoTheme[]).map((item) => (
              <button
                data-active={theme === item ? "true" : undefined}
                key={item}
                onClick={() => setTheme(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <div className="demo-industrial__hero">
          <div className="demo-hero-copy">
            <p className="demo-kicker">01 / INDUSTRIAL MARKET INTERFACE</p>
            <h1>PUBLIC MARKET UI LAYER</h1>
            <p>
              React primitives, data hooks, builder-code disclosure, and share export
              surfaces for Polymarket-native products.
            </p>
          </div>
          <div className="demo-hero-index" aria-hidden="true">
            01
          </div>
        </div>

        <div className="demo-spec-grid" aria-label="System capabilities">
          <SpecCell label="COMPONENTS" value="18" />
          <SpecCell label="COMBOS" value="INTENT" />
          <SpecCell label="EXPORT" value="PNG/SVG" />
          <SpecCell label="ORDERS" value="NONE" />
        </div>

        <div className="demo-industrial__grid">
          <article className="demo-module demo-module--market">
            <div className="demo-module__label">
              <span>02</span>
              <strong>MARKET CARD</strong>
            </div>
            <MarketCard market={market} points={trendPoints} />
          </article>

          <article className="demo-module demo-module--code">
            <div className="demo-module__label">
              <span>03</span>
              <strong>INTEGRATION SAMPLE</strong>
            </div>
            <pre>
              <code>{`import { MarketCard } from "@polymarket-ui-kit/react";

export function Surface({ market, points }) {
  return <MarketCard market={market} points={points} />;
}`}</code>
            </pre>
            <nav aria-label="Demo routes" className="demo-route-row">
              {routeLinks.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </article>

          <article className="demo-module demo-module--chart">
            <div className="demo-module__label">
              <span>04</span>
              <strong>PRICE HISTORY</strong>
            </div>
            <ProbabilityChart height={210} series={chartSeries} />
          </article>

          <article className="demo-module demo-module--share">
            <div className="demo-module__label">
              <span>05</span>
              <strong>SHARE EXPORT</strong>
            </div>
            <ShareCard market={market} attribution="pui-kit/demo" />
          </article>

          <article className="demo-module demo-module--builder">
            <div className="demo-module__label">
              <span>06</span>
              <strong>BUILDER DISCLOSURE</strong>
            </div>
            <BuilderFeeDisclosure
              builder={sampleBuilder}
              notional={100}
              price={market.outcomes[0]?.price ?? undefined}
              side="taker"
            />
            <div className="demo-builder-inline">
              <BuilderBadge
                builder={sampleBuilder}
                feeBps={sampleBuilder.takerFeeBps}
                feeSide="taker"
                showCode
              />
              <FeePill
                input={{
                  builderFeeSide: "taker",
                  builderTakerFeeBps: sampleBuilder.takerFeeBps,
                  notional: 100,
                  price: market.outcomes[0]?.price ?? undefined,
                }}
                label="Estimated builder fee"
              />
            </div>
          </article>

          <article className="demo-module demo-module--book">
            <div className="demo-module__label">
              <span>07</span>
              <strong>ORDERBOOK SNAPSHOT</strong>
            </div>
            <OrderbookPanel orderbook={sampleOrderbook} />
          </article>

          <article className="demo-module demo-module--combo">
            <div className="demo-module__label">
              <span>08</span>
              <strong>COMBO-AWARE SURFACE</strong>
            </div>
            <div className="demo-combo-showcase">
              <ComboShareCard
                legs={sampleComboLegs}
                title="BTC ATH + Fed cut combo"
                attribution="pui-kit/demo"
              />
              <ComboBuilderCard
                builderCode={sampleBuilder.code}
                initialLegs={sampleComboLegs}
                markets={sampleComboMarkets}
                onComboIntent={() => undefined}
                size={25}
              />
            </div>
          </article>
        </div>
      </section>

      <section className="demo-grant" aria-labelledby="grant-builders-title">
        <div className="demo-grant__hero">
          <div>
            <p className="demo-kicker">09 / GRANT READY BUILD</p>
            <h2 id="grant-builders-title">DISTRIBUTION UI LAYER</h2>
            <p>
              Polymarket UI Kit helps builders bring markets into blogs,
              dashboards, embeds, media tools, and social surfaces without
              rebuilding the same frontend layer.
            </p>
          </div>
          <div className="demo-grant__stamp" aria-hidden="true">
            BUILDERS
          </div>
        </div>

        <div className="demo-grant__stats" aria-label="Grant readiness status">
          {grantStats.map((item) => (
            <SpecCell key={item.label} label={item.label} value={item.value} />
          ))}
        </div>

        <div className="demo-grant__grid">
          <article className="demo-grant__panel demo-grant__panel--wide">
            <div className="demo-module__label">
              <span>10</span>
              <strong>BUILT FOR DISTRIBUTION</strong>
            </div>
            <p>
              The kit is read-first by default: public hooks, SSR-friendly props,
              graceful fallback states, share export, Builder-Code-aware
              attribution, and Combo-aware intent payloads. Host apps keep
              control of signing, RFQ, and order placement.
            </p>
            <div className="demo-grant__links">
              <a href="https://github.com/horn111/polymarket-ui-kit" rel="noreferrer" target="_blank">
                Repo
              </a>
              <a
                href="https://github.com/horn111/polymarket-ui-kit/blob/main/docs/grant-application.md"
                rel="noreferrer"
                target="_blank"
              >
                Grant Draft
              </a>
              <a
                href="https://github.com/horn111/polymarket-ui-kit/blob/main/docs/demo-script.md"
                rel="noreferrer"
                target="_blank"
              >
                Demo Script
              </a>
            </div>
          </article>

          {grantUseCases.map((item, index) => (
            <article className="demo-grant__panel" key={item.label}>
              <div className="demo-module__label">
                <span>{String(index + 11).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <InteractiveLab theme={theme} />
    </>
  );
}
