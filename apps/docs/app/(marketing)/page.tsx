import {
  MarketCard,
  OrderbookPanel,
  ShareCard,
} from "@polymarket-ui-kit/react";
import { sampleMarket, sampleOrderbook, samplePoints } from "../../content/sample-data";

export default function HomePage() {
  return (
    <>
      <section className="docs-hero">
        <div>
          <span className="pui-badge">React first. Registry ready. No auth by default.</span>
          <h1>Build Polymarket interfaces in minutes.</h1>
          <p className="docs-copy">
            Market cards, probability charts, orderbook depth, comments, builder
            badges, fee previews, and share images for apps, dashboards, media tools,
            embeds, and research portals.
          </p>
          <div className="docs-actions">
            <a className="pui-button" href="/components">Browse components</a>
            <a className="pui-button" data-variant="ghost" href="/registry">
              Copy registry item
            </a>
          </div>
          <pre className="docs-code">
            <code>{`pnpm add @polymarket-ui-kit/react
npx shadcn@latest add https://polymarket-ui-kit.dev/r/market-card.json`}</code>
          </pre>
        </div>
        <MarketCard market={sampleMarket} points={samplePoints} />
      </section>
      <section className="docs-section">
        <h2>What ships in v0</h2>
        <div className="docs-card-grid">
          <OrderbookPanel orderbook={sampleOrderbook} />
          <ShareCard market={sampleMarket} />
        </div>
      </section>
    </>
  );
}

