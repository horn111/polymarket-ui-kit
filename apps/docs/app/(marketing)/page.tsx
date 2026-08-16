import {
  EvidenceRail,
  MarketCard,
  PollMarketComparison,
  ProbabilityChart,
  ShareCard,
} from "@polymarket-ui-kit/react";
import {
  sampleEvidence,
  sampleMarket,
  samplePoints,
  samplePollRows,
} from "../../content/sample-data";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" height="14" viewBox="0 0 16 16" width="14">
      <path
        d="M5 11 11 5M6 5h5v5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function HomePage() {
  const chartSeries = [
    {
      id: "yes",
      label: "Yes 67%",
      color: "var(--pui-series-1)",
      points: samplePoints,
    },
  ];

  return (
    <>
      <section className="docs-hero">
        <div className="docs-hero__intro">
          <h1>Make uncertainty legible.</h1>
          <div
            className="docs-hero__number"
            aria-label="Illustrative probability 67 percent"
          >
            <strong>67</strong>
            <span>%</span>
          </div>
          <p>Public data, typed React, export-ready.</p>
          <div className="docs-actions">
            <a
              className="docs-button"
              href="https://polymarket-ui-kit-demo.vercel.app/studio"
            >
              Try Studio
            </a>
            <a className="docs-link" href="/components">
              Explore components <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="docs-market" aria-label="Illustrative live market">
          <header className="docs-market__status">
            <span>
              <i /> Live market / illustrative
            </span>
            <span>4 sources · updated 2m ago</span>
          </header>
          <h2>{sampleMarket.question}</h2>
          <div className="docs-market__body">
            <div className="docs-market__outcomes">
              <div data-outcome="yes">
                <span>Yes</span>
                <strong>67%</strong>
                <small>↑ 4% · 24h</small>
              </div>
              <div data-outcome="no">
                <span>No</span>
                <strong>33%</strong>
                <small>↓ 4% · 24h</small>
              </div>
            </div>
            <div className="docs-market__chart">
              <nav aria-label="Chart period">
                <strong>24H</strong>
                <span>7D</span>
                <span>30D</span>
                <span>All</span>
              </nav>
              <ProbabilityChart height={220} series={chartSeries} />
            </div>
          </div>
          <EvidenceRail
            className="docs-market__evidence"
            items={sampleEvidence}
            maxVisible={3}
            title="Evidence behind the number"
          />
        </div>
      </section>

      <section className="docs-system-strip" aria-label="System capabilities">
        <div>
          <strong>Primary</strong>
          <span>Blue-led actions</span>
        </div>
        <div>
          <strong>Verified</strong>
          <span>Sources stay attached</span>
        </div>
        <div>
          <strong>Typed</strong>
          <span>React 19 + TypeScript</span>
        </div>
        <div>
          <strong>Portable</strong>
          <span>React · iframe · PNG · SVG</span>
        </div>
      </section>

      <section className="docs-install">
        <span>Install</span>
        <code>pnpm add @polymarket-ui-kit/react</code>
        <a href="https://github.com/horn111/polymarket-ui-kit">
          View source <ArrowIcon />
        </a>
      </section>

      <section className="docs-section">
        <header>
          <h2>One probability system. Every surface.</h2>
          <p>
            Components inherit the same blue hierarchy, evidence structure, and data
            rhythm across product, embeds, social cards, and documentation.
          </p>
        </header>
        <div className="docs-feature-grid">
          <MarketCard market={sampleMarket} points={samplePoints} />
          <PollMarketComparison rows={samplePollRows} />
          <ShareCard market={sampleMarket} attribution="pui-kit/docs" />
        </div>
      </section>
    </>
  );
}
