import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import {
  BuilderBadge,
  FeePill,
  MarketCard,
  ProbabilityChart,
} from "@polymarket-ui-kit/react";
import { InteractiveLab } from "./components/InteractiveLab";
import { sampleBuilder } from "../components/sample-builder";
import { samplePoints } from "../components/sample-data";

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
    color: "#0f766e",
    points: trendPoints,
  },
];

const routeLinks = [
  { label: "Market route", href: `/market/${market.slug}` },
  { label: "Embed route", href: `/embed/${market.slug}` },
  { label: "OG image", href: `/api/og?slug=${market.slug}` },
];

function OutcomeButton({
  active,
  disabled,
  label,
  price,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  price: string;
}) {
  return (
    <div
      className="demo-outcome"
      data-active={active ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
    >
      <span>{label}</span>
      <strong>{price}</strong>
    </div>
  );
}

export default function DemoHome() {
  return (
    <>
      <section
        className="demo-board demo-board--light"
        aria-label="Light theme system spec"
      >
        <header className="demo-board__header">
          <h1>POLYMARKET UI KIT</h1>
          <p>Headless React components, data hooks & shadcn-style registry items</p>
          <span>v1.0.0 / SYSTEM_SPEC</span>
        </header>

        <div className="demo-board__grid demo-board__grid--light">
          <article className="demo-panel demo-panel--intro">
            <p className="demo-kicker">01. DESIGN SYSTEM SPECIFICATION</p>
            <h2>Tailwind CSS - shadcn/ui - React components</h2>
            <p>
              A minimalist, type-safe registry designed to easily drop prediction market
              UI into any React application. Simple default styling with complete layout
              overrides via CSS variables.
            </p>
            <div className="demo-pill-row">
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
                  platformFeeRate: 0,
                }}
                label="Taker Fee"
              />
              <span className="demo-status-pill">Resolved</span>
            </div>
          </article>

          <article className="demo-panel demo-panel--market">
            <p className="demo-kicker">03. COMPONENT: MARKET_CARD</p>
            <MarketCard market={market} points={trendPoints} />
          </article>

          <article className="demo-panel demo-panel--code">
            <p className="demo-kicker">02. INTEGRATION SAMPLE</p>
            <pre>
              <code>{`import { MarketCard } from "@polymarket-ui-kit/react";

export default function App() {
  return (
    <MarketCard slug="btc-ath-2026" theme="light" />
  );
}`}</code>
            </pre>
          </article>

          <article className="demo-panel demo-panel--chart">
            <div className="demo-panel__topline">
              <p className="demo-kicker">04. COMPONENT: PROBABILITY_CHART</p>
              <strong>68% probability</strong>
            </div>
            <ProbabilityChart height={155} series={chartSeries} />
          </article>
        </div>
      </section>

      <h2 className="demo-theme-title">Dark Theme</h2>

      <section
        className="demo-board demo-board--dark"
        aria-label="Dark theme design system"
        data-pui-theme="dark"
      >
        <header className="demo-board__header">
          <h1>POLYMARKET UI KIT / DESIGN SYSTEM</h1>
          <p>Design token specification and interactive component states</p>
          <span>v1.0.0 / SYSTEM_SPEC</span>
        </header>

        <div className="demo-board__grid demo-board__grid--dark">
          <article className="demo-panel demo-panel--tokens">
            <p className="demo-kicker">01. DESIGN TOKENS</p>
            <h3>COLOR PALETTE</h3>
            <div className="demo-token-row">
              <span data-token="accent">--pui-accent</span>
              <span data-token="positive">--pui-positive</span>
              <span data-token="negative">--pui-negative</span>
            </div>
            <h3>TYPOGRAPHY SCALE</h3>
            <ul className="demo-token-list">
              <li>
                <code>xs: 12px</code> active status, categories
              </li>
              <li>
                <code>sm: 14px</code> volume, dates, small buttons
              </li>
              <li>
                <code>base: 16px</code> market titles, main labels
              </li>
              <li>
                <code>lg: 18px</code> headers, odds titles
              </li>
            </ul>
            <h3>SPACING SCALE</h3>
            <div className="demo-space-row">
              <span>space-1</span>
              <span>space-2</span>
              <span>space-3</span>
              <span>space-4</span>
            </div>
          </article>

          <article className="demo-panel demo-panel--variants">
            <p className="demo-kicker">03. COMPONENT VARIANTS: OUTCOME_BUTTON</p>
            <div className="demo-outcome-row">
              <OutcomeButton label="Yes" price="68c" />
              <OutcomeButton active label="Yes" price="68c" />
              <OutcomeButton disabled label="No" price="32c" />
            </div>
          </article>

          <article className="demo-panel demo-panel--dark-code">
            <p className="demo-kicker">02. REACT IMPLEMENTATION</p>
            <pre>
              <code>{`import { MarketCard } from "@polymarket-ui-kit/react";

<MarketCard slug="btc-ath-2026" theme="dark" />`}</code>
            </pre>
            <nav aria-label="Demo routes" className="demo-route-row">
              {routeLinks.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </article>

          <article className="demo-panel demo-panel--dark-market">
            <p className="demo-kicker">04. COMPONENT: MARKET_CARD (DARK THEME)</p>
            <MarketCard market={market} points={trendPoints} />
          </article>
        </div>
      </section>

      <InteractiveLab />
    </>
  );
}
