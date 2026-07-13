import {
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
        <span>Component catalog</span>
        <h1>Real states, not placeholder cards.</h1>
        <p>
          Every primitive accepts typed host data and inherits the Civic Forecast token
          system.
        </p>
      </header>
      <article className="docs-component-row">
        <div>
          <code>MarketCard</code>
          <p>
            Compact market identity, outcomes, metadata, and optional price history.
          </p>
        </div>
        <MarketCard market={sampleMarket} points={samplePoints} />
      </article>
      <article className="docs-component-row docs-component-row--wide">
        <div>
          <code>PollMarketComparison</code>
          <p>
            Responsive comparison for illustrative external polls and market pricing.
          </p>
        </div>
        <PollMarketComparison rows={samplePollRows} />
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
        <ShareCard market={sampleMarket} attribution="pui-kit/docs" />
      </article>
    </section>
  );
}
