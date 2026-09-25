import {
  ElectionBriefCard,
  EvidenceRail,
  MarketCard,
  OrderbookPanel,
  PollMarketComparison,
  ShareCard,
} from "@polymarket-ui-kit/react";
import {
  sampleEvidence,
  sampleMarket,
  sampleOrderbook,
  samplePoints,
  samplePollRows,
} from "../../content/sample-data";

export default function ComponentsPage() {
  return (
    <section className="docs-catalog">
      <header className="docs-page-heading">
        <h1>Real states, not placeholder cards.</h1>
        <p>
          Every primitive accepts typed host data and inherits the Civic Forecast token
          system.
        </p>
      </header>
      <article className="docs-component-row docs-component-row--wide">
        <div>
          <code>ElectionBriefCard</code>
          <p>
            A focused election briefing. It keeps market odds, supplied polling,
            settlement criteria, and source records in one readable surface. Poll share
            is labeled separately from chance of winning.
          </p>
        </div>
        <ElectionBriefCard
          market={sampleMarket}
          polls={samplePollRows}
          evidence={sampleEvidence}
          sourceLabel="Illustrative market · sample data"
          resolutionSummary="Illustrative rule: a certified election result settles this example."
        />
      </article>
      <article className="docs-component-row">
        <div>
          <code>MarketCard</code>
          <p>
            A ranked outcome sheet with market probabilities and a measured change over
            the supplied history.
          </p>
        </div>
        <MarketCard
          market={sampleMarket}
          points={samplePoints}
          sourceLabel="Sample data"
        />
      </article>
      <article className="docs-component-row docs-component-row--wide">
        <div>
          <code>PollMarketComparison</code>
          <p>
            Responsive comparison for illustrative external polls and market pricing.
          </p>
        </div>
        <PollMarketComparison
          rows={samplePollRows}
          contextLabel="Illustrative external context"
        />
      </article>
      <article className="docs-component-row docs-component-row--wide">
        <div>
          <code>EvidenceRail</code>
          <p>Official records, models, polls, and reporting beside the market.</p>
        </div>
        <EvidenceRail items={sampleEvidence} />
      </article>
      <article className="docs-component-row">
        <div>
          <code>OrderbookPanel</code>
          <p>Public CLOB depth with readable bid, ask, and spread context.</p>
        </div>
        <OrderbookPanel orderbook={sampleOrderbook} />
      </article>
      <article className="docs-component-row">
        <div>
          <code>ShareCard</code>
          <p>A distribution-ready surface for screenshots, embeds, and OG routes.</p>
        </div>
        <ShareCard
          market={sampleMarket}
          attribution="pui-kit/docs"
          statusLabel="Sample data"
        />
      </article>
    </section>
  );
}
