"use client";

import { useEffect, useState } from "react";
import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import {
  BuilderBadge,
  BuilderFeeDisclosure,
  FeePill,
  MarketCard,
  OrderbookPanel,
  ProbabilityChart,
  ShareCard,
} from "@polymarket-ui-kit/react";
import { InteractiveLab } from "./components/InteractiveLab";
import { sampleBuilder } from "../components/sample-builder";
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

function getRouteLinks(theme: DemoTheme) {
  return [
    { label: "MARKET ROUTE", href: `/market/${market.slug}` },
    { label: "EMBED ROUTE", href: `/embed/${market.slug}` },
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
  const [theme, setTheme] = useState<DemoTheme>("light");
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
          <SpecCell label="COMPONENTS" value="12" />
          <SpecCell label="DATA MODE" value="PUBLIC" />
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
        </div>
      </section>

      <InteractiveLab theme={theme} />
    </>
  );
}
