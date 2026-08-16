"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  EvidenceItem,
  MarketPricePoint,
  OrderbookSnapshot,
  PollMarketComparisonRow,
  PolymarketMarket,
} from "@polymarket-ui-kit/core";
import {
  EvidenceRail,
  MarketCard,
  OrderbookPanel,
  PollMarketComparison,
  ProbabilityChart,
  ShareCard,
} from "@polymarket-ui-kit/react";
import { InteractiveLab } from "./InteractiveLab";

type DemoTheme = "light" | "dark";

interface CivicDemoClientProps {
  bundle: {
    market: PolymarketMarket;
    orderbook: OrderbookSnapshot | null;
    points: MarketPricePoint[];
    source: "live" | "fixture" | "partial";
  };
}

const evidence: EvidenceItem[] = [
  {
    id: "calendar",
    title: "Election certification calendar",
    publisher: "Sample state election board",
    kind: "official",
  },
  {
    id: "survey",
    title: "Illustrative registered-voter survey",
    publisher: "Demo research desk",
    kind: "poll",
  },
  {
    id: "methodology",
    title: "Turnout baseline methodology",
    publisher: "Civic model lab",
    kind: "model",
  },
  {
    id: "reporting",
    title: "How market resolution works",
    publisher: "Sample newsroom guide",
    kind: "news",
  },
];

const pollRows: PollMarketComparisonRow[] = [
  {
    id: "candidate-a",
    label: "Candidate A",
    pollShare: 0.39,
    marketProbability: 0.42,
    sampleSize: 1287,
    marginOfErrorPoints: 2.8,
    asOf: "Illustrative data",
  },
  {
    id: "field",
    label: "Field",
    pollShare: 0.61,
    marketProbability: 0.58,
    sampleSize: 1287,
    marginOfErrorPoints: 2.8,
    asOf: "Illustrative data",
  },
];

const proof = [
  ["21", "typed React components"],
  ["public", "no-auth data defaults"],
  ["PNG + SVG", "share export"],
  ["7", "copy-in registry items"],
] as const;

const principles = [
  ["Neutral by design", "No party-coded defaults."],
  ["Source-aware", "Context travels with the number."],
  ["Composable", "Typed parts, not a locked shell."],
] as const;

function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg aria-hidden="true" height="14" viewBox="0 0 16 16" width="14">
      <path
        d={external ? "M5 11 11 5M6 5h5v5" : "M3 8h10M9 4l4 4-4 4"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function CivicDemoClient({ bundle }: CivicDemoClientProps) {
  const [theme, setTheme] = useState<DemoTheme>("light");
  const market = bundle.market;
  const points = bundle.points;
  const leadingProbability = Math.round((market.outcomes[0]?.price ?? 0) * 100);
  const chartSeries = useMemo(
    () => [
      {
        id: "leading",
        label: market.outcomes[0]?.name ?? "Leading outcome",
        color: "var(--pui-series-1)",
        points,
      },
    ],
    [market.outcomes, points],
  );

  useEffect(() => {
    document.documentElement.dataset.demoTheme = theme;
    document.documentElement.dataset.puiTheme = theme;
  }, [theme]);

  const routeLinks = [
    ["Market route", `/market/${market.slug}?theme=${theme}`],
    ["Embed route", `/embed/${market.slug}?theme=${theme}`],
    ["OG PNG", `/api/og?slug=${market.slug}&theme=${theme}&format=png`],
    ["OG SVG", `/api/og?slug=${market.slug}&theme=${theme}&format=svg`],
  ] as const;

  return (
    <>
      <header className="civic-nav">
        <a className="civic-brand" href="#top" aria-label="Polymarket UI Kit home">
          <span aria-hidden="true" className="civic-brand__mark">
            <i />
            <i />
          </span>
          <strong>Polymarket UI Kit</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#components">Components</a>
          <a href="#lab">Lab</a>
          <a href="/studio">Studio</a>
          <a href="https://github.com/horn111/polymarket-ui-kit" rel="noreferrer">
            GitHub
          </a>
        </nav>
        <div className="civic-scheme" role="group" aria-label="Color scheme">
          {(["light", "dark"] as DemoTheme[]).map((item) => (
            <button
              data-active={theme === item || undefined}
              key={item}
              onClick={() => setTheme(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <section className="civic-hero" id="top">
        <div className="civic-hero__copy">
          <h1>Make uncertainty legible.</h1>
          <div
            className="civic-hero__metric"
            aria-label={`${leadingProbability} percent`}
          >
            <strong>{leadingProbability}</strong>
            <span>%</span>
          </div>
          <p>
            Public data, typed React, verified context, and distribution-ready
            interfaces.
          </p>
          <div className="civic-actions">
            <a className="civic-button" href="/studio">
              Try Studio <ArrowIcon />
            </a>
            <a
              className="civic-text-link"
              href="https://github.com/horn111/polymarket-ui-kit"
              rel="noreferrer"
            >
              View on GitHub <ArrowIcon external />
            </a>
          </div>
          <ul
            className="civic-principles civic-principles--intro"
            aria-label="Product principles"
          >
            {principles.map(([title, description]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="civic-hero__stage">
          <article
            className="civic-hero__market"
            data-source={bundle.source}
            aria-label="Featured political market"
          >
            <div className="civic-market-topline">
              <span>
                <i />{" "}
                {bundle.source === "live"
                  ? "Live public market"
                  : "Fallback market fixture"}
              </span>
              <span>{market.category ?? "Politics"}</span>
            </div>
            <h2>{market.question}</h2>
            <div className="civic-market-quote">
              <div>
                <span>{market.outcomes[0]?.name ?? "Leading outcome"}</span>
                <strong>{leadingProbability}%</strong>
              </div>
              <div>
                <span>Resolution</span>
                <strong>
                  {market.endDate
                    ? new Date(market.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Market rules"}
                </strong>
              </div>
            </div>
            <ProbabilityChart height={230} series={chartSeries} />
            <EvidenceRail
              className="civic-hero__evidence"
              items={evidence}
              maxVisible={3}
              title="Sample evidence context"
            />
          </article>
        </div>
        <ul
          className="civic-principles civic-principles--after"
          aria-label="Product principles"
        >
          {principles.map(([title, description]) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="civic-proof" aria-label="Project capabilities">
        {proof.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="civic-section" id="components">
        <header className="civic-section__heading">
          <div>
            <span>Component system</span>
            <h2>Interfaces engineered for attention.</h2>
          </div>
          <p>
            Politics is the first edition. The system remains category-neutral for
            future crypto and sports surfaces.
          </p>
        </header>
        <div className="civic-showcase">
          <article className="civic-showcase__market">
            <span className="civic-caption">Election market card</span>
            <MarketCard market={market} points={points} />
          </article>
          <article className="civic-showcase__comparison">
            <PollMarketComparison rows={pollRows} />
          </article>
          <article className="civic-showcase__share">
            <span className="civic-caption">Distribution-ready share surface</span>
            <ShareCard market={market} attribution="pui-kit/civic" />
          </article>
          <article className="civic-showcase__book">
            <span className="civic-caption">Public CLOB context</span>
            <OrderbookPanel orderbook={bundle.orderbook} />
          </article>
        </div>
      </section>

      <section className="civic-developer">
        <div>
          <span>Developer quickstart</span>
          <h2>One system. Every output.</h2>
          <p>
            Use public market data, add your own verified context, then distribute the
            same surface as React, iframe, PNG, or SVG.
          </p>
        </div>
        <pre>
          <code>{`import { EvidenceRail, MarketCard } from "@polymarket-ui-kit/react";

<MarketCard market={market} points={history} />
<EvidenceRail items={verifiedSources} />`}</code>
        </pre>
        <nav aria-label="Distribution routes">
          {routeLinks.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
              <ArrowIcon external />
            </a>
          ))}
        </nav>
      </section>

      <div id="lab">
        <InteractiveLab theme={theme} />
      </div>

      <section className="civic-distribution">
        <div>
          <h2>Built to travel without losing its identity.</h2>
          <p>
            Public hooks, SSR-friendly props, graceful fallbacks, builder attribution,
            Combo intents, and verifiable dry-run examples. Host apps retain control of
            signing and trading.
          </p>
        </div>
        <div className="civic-distribution__links">
          <a href="/studio">
            <strong>Studio</strong>
            <span>Turn a market URL into a surface.</span>
          </a>
          <a href="/registry.json">
            <strong>Registry</strong>
            <span>Copy components into your stack.</span>
          </a>
          <a
            href="https://github.com/horn111/polymarket-ui-kit/tree/main/examples/clob-v2-builder-flow"
            rel="noreferrer"
          >
            <strong>Builder flow</strong>
            <span>Review the verifiable dry-run integration.</span>
          </a>
        </div>
      </section>

      <footer className="civic-footer">
        <strong>Polymarket UI Kit</strong>
        <p>
          Independent open-source frontend tooling. Not affiliated with Polymarket. Demo
          polls and evidence are illustrative, not current political reporting.
        </p>
        <nav>
          <a href="https://github.com/horn111/polymarket-ui-kit">GitHub</a>
          <a href="/studio">Studio</a>
          <a href="/registry.json">Registry</a>
        </nav>
      </footer>
    </>
  );
}
