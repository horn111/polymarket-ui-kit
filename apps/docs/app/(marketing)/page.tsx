import {
  EvidenceRail,
  MarketCard,
  PollMarketComparison,
  ShareCard,
} from "@polymarket-ui-kit/react";
import {
  sampleEvidence,
  sampleMarket,
  samplePoints,
  samplePollRows,
} from "../../content/sample-data";

export default function HomePage() {
  return (
    <>
      <section className="docs-hero">
        <div className="docs-hero__copy">
          <span className="docs-edition">
            <i /> Civic Forecast documentation
          </span>
          <h1>Build credible market interfaces.</h1>
          <p>
            Typed React components, public data hooks, source-aware context, and
            distribution tooling for Polymarket builders.
          </p>
          <div className="docs-actions">
            <a className="docs-button" href="/components">
              Browse components
            </a>
            <a
              className="docs-link"
              href="https://polymarket-ui-kit-demo-fkan-chi.vercel.app/studio"
            >
              Try Studio ↗
            </a>
          </div>
          <pre className="docs-code">
            <code>{`pnpm add @polymarket-ui-kit/react
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/evidence-rail.json`}</code>
          </pre>
        </div>
        <div className="docs-hero__preview">
          <MarketCard market={sampleMarket} points={samplePoints} />
          <EvidenceRail items={sampleEvidence} maxVisible={2} />
        </div>
      </section>

      <section className="docs-section">
        <header>
          <span>Politics-first release</span>
          <h2>Probability with context.</h2>
        </header>
        <div className="docs-feature-stack">
          <PollMarketComparison rows={samplePollRows} />
          <ShareCard market={sampleMarket} attribution="pui-kit/docs" />
        </div>
      </section>
    </>
  );
}
