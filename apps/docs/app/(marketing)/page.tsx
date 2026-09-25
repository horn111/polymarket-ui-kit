import {
  ElectionBriefCard,
  PollMarketComparison,
  ShareCard,
} from "@polymarket-ui-kit/react";
import { DirectionArrow } from "../../../shared/DirectionArrow";
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
              Try Studio <DirectionArrow diagonal />
            </a>
          </div>
          <pre className="docs-code">
            <code>{`# From a clone of this repository
pnpm install
pnpm build
pnpm demo:dev`}</code>
          </pre>
          <p className="docs-install-note">
            Work from source or use the hosted registry. The first npm prerelease is
            being prepared.
          </p>
        </div>
        <div className="docs-hero__preview">
          <ElectionBriefCard
            market={sampleMarket}
            points={samplePoints}
            polls={samplePollRows}
            evidence={sampleEvidence}
            sourceLabel="Illustrative market · sample data"
            resolutionSummary="Illustrative rule: a certified election result settles this example."
          />
        </div>
      </section>

      <section className="docs-section">
        <header>
          <h2>Probability with context.</h2>
        </header>
        <div className="docs-feature-stack">
          <PollMarketComparison
            rows={samplePollRows}
            contextLabel="Illustrative external context"
          />
          <ShareCard
            market={sampleMarket}
            attribution="pui-kit/docs"
            statusLabel="Sample data"
          />
        </div>
      </section>
    </>
  );
}
