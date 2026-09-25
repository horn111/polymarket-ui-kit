"use client";

import { useEffect, useState } from "react";
import type {
  EvidenceItem,
  MarketPricePoint,
  OrderbookSnapshot,
  PollMarketComparisonRow,
  PolymarketMarket,
} from "@polymarket-ui-kit/core";
import {
  ElectionBriefCard,
  MarketCard,
  OrderbookPanel,
  PollMarketComparison,
  ShareCard,
} from "@polymarket-ui-kit/react";
import { InteractiveLab } from "./InteractiveLab";
import { BrandMark } from "../../../shared/BrandMark";
import { DirectionArrow } from "../../../shared/DirectionArrow";

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

export function CivicDemoClient({ bundle }: CivicDemoClientProps) {
  const [theme, setTheme] = useState<DemoTheme>("dark");
  const market = bundle.market;
  const points = bundle.points;
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
        <a className="civic-brand" href="#top" aria-label="Civic Forecast home">
          <BrandMark />
          <strong>Civic Forecast</strong>
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
              aria-pressed={theme === item}
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

      <section className="civic-hero" id="top" aria-labelledby="home-title">
        <div className="civic-hero__copy">
          <h1 id="home-title">
            Market prices.
            <br />
            <em>Public context.</em>
          </h1>
          <div className="civic-hero__intro">
            <p>
              React components for civic reporting. Put market prices, polling, sources
              and settlement rules on the same page.
            </p>
            <div className="civic-actions">
              <a className="civic-button" href="/studio">
                Open Studio <DirectionArrow />
              </a>
              <a className="civic-text-link" href="#lab">
                Explore the components
              </a>
            </div>
          </div>
        </div>

        <ElectionBriefCard
          className="civic-hero__market"
          market={market}
          points={points}
          polls={bundle.source === "fixture" ? pollRows : []}
          evidence={bundle.source === "fixture" ? evidence : []}
          resolutionSummary={
            bundle.source === "fixture"
              ? "Illustrative rule: a certified election result settles this example."
              : undefined
          }
          sourceLabel={
            bundle.source === "fixture"
              ? "Illustrative market · sample data"
              : bundle.source === "partial"
                ? "Live market · some data unavailable"
                : "Live public market"
          }
        />

        <p className="civic-hero__note">
          An illustrative briefing. Outside context is supplied by the publisher; a
          market price is not a poll.
        </p>
      </section>

      <section className="civic-section" id="components">
        <header className="civic-section__heading">
          <div>
            <h2>
              A different format
              <br />
              for each reading.
            </h2>
          </div>
          <p>
            A compact market, a side-by-side comparison, a card to publish. The same
            typed data, arranged for the question at hand.
          </p>
        </header>
        <div className="civic-showcase">
          <article className="civic-showcase__market">
            <div className="civic-showcase__description">
              <h3>The market, at a glance.</h3>
              <p>
                Ranked outcomes, price movement and a resolution date. A compact view
                for a feed or article.
              </p>
            </div>
            <MarketCard
              market={market}
              points={points}
              sourceLabel={bundle.source === "fixture" ? "Sample data" : market.status}
            />
          </article>
          <article className="civic-showcase__comparison">
            <div className="civic-showcase__description">
              <h3>
                Two measures.
                <br />
                Different meanings.
              </h3>
              <p>
                Keep vote share and winning probability separate, with the sample and
                margin of error in view.
              </p>
            </div>
            <PollMarketComparison
              rows={pollRows}
              contextLabel="Illustrative external context"
            />
          </article>
          <article className="civic-showcase__share">
            <div className="civic-showcase__description">
              <h3>Ready for the page.</h3>
              <p>
                A portable market summary with attribution. Publish as an embed, PNG or
                SVG.
              </p>
            </div>
            <ShareCard
              market={market}
              attribution="pui-kit/civic"
              statusLabel={
                bundle.source === "fixture" ? "Sample data" : "Public market"
              }
            />
          </article>
          <article className="civic-showcase__book">
            <div className="civic-showcase__description">
              <h3>Behind the price.</h3>
              <p>
                Public bids, asks and available depth. Inspect the market behind a
                quoted probability.
              </p>
            </div>
            <OrderbookPanel orderbook={bundle.orderbook} />
          </article>
        </div>
      </section>

      <section className="civic-developer">
        <div>
          <h2>
            Your data.
            <br />
            Your editorial judgment.
          </h2>
          <p>
            Use public market data, add your own verified context, then distribute the
            same surface as React, iframe, PNG, or SVG.
          </p>
        </div>
        <pre>
          <code>{`import { ElectionBriefCard } from "@polymarket-ui-kit/react";

<ElectionBriefCard
  market={market}
  points={priceHistory}
  polls={editorialPolls}
  evidence={verifiedSources}
  resolutionSummary={verifiedRule}
/>`}</code>
        </pre>
        <nav aria-label="Distribution routes">
          {routeLinks.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
              <DirectionArrow diagonal />
            </a>
          ))}
        </nav>
      </section>

      <div id="lab">
        <InteractiveLab theme={theme} />
      </div>

      <section className="civic-distribution">
        <div>
          <h2>
            From a market URL
            <br />
            to your publication.
          </h2>
          <p>
            22 React components, 8 copy-in registry items and public data hooks. Use the
            pieces independently. Host apps retain control of signing and trading.
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
            href="https://github.com/horn111/polymarket-ui-kit/blob/main/docs/release.md"
            rel="noreferrer"
          >
            <strong>Release guide</strong>
            <span>Review checks and publication steps.</span>
          </a>
        </div>
      </section>

      <footer className="civic-footer">
        <strong>Polymarket UI Kit</strong>
        <p>
          Independent open-source frontend tooling. Not affiliated with Polymarket. Demo
          polls and evidence are illustrative, not current political reporting.
        </p>
        <nav aria-label="Footer">
          <a href="https://github.com/horn111/polymarket-ui-kit">GitHub</a>
          <a href="/studio">Studio</a>
          <a href="/registry.json">Registry</a>
        </nav>
      </footer>
    </>
  );
}
