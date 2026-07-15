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
        <span>Interactive specification</span>
        <h1>Components built like instruments.</h1>
        <p>
          Anatomy, data density, responsive behavior, and states are governed by the
          same Mechanical Probability system.
        </p>
      </header>
      <article className="docs-component-row">
        <div>
          <code>MarketCard</code>
          <p>
            Compact market identity, outcomes, metadata, and optional price history.
          </p>
          <span className="docs-spec">Default / long copy / mobile</span>
        </div>
        <MarketCard market={sampleMarket} points={samplePoints} />
      </article>
      <article className="docs-component-row docs-component-row--wide">
        <div>
          <code>PollMarketComparison</code>
          <p>
            Responsive comparison for illustrative external polls and market pricing.
          </p>
          <span className="docs-spec">Table → stacked rows / null-safe</span>
        </div>
        <PollMarketComparison rows={samplePollRows} />
      </article>
      <article className="docs-component-row docs-component-row--wide">
        <div>
          <code>EvidenceRail</code>
          <p>Official records, models, polls, and reporting beside the market.</p>
          <span className="docs-spec">Linked / unlinked / overflow rail</span>
        </div>
        <EvidenceRail items={sampleEvidence} />
      </article>
      <article className="docs-component-row">
        <div>
          <code>OrderbookPanel</code>
          <p>Public CLOB depth with readable bid, ask, and spread context.</p>
          <span className="docs-spec">Depth / empty / narrow viewport</span>
        </div>
        <OrderbookPanel orderbook={sampleOrderbook} />
      </article>
      <article className="docs-component-row">
        <div>
          <code>ShareCard</code>
          <p>A distribution-ready surface for screenshots, embeds, and OG routes.</p>
          <span className="docs-spec">1200×630 / light / dark</span>
        </div>
        <ShareCard market={sampleMarket} attribution="pui-kit/docs" />
      </article>
    </section>
  );
}
