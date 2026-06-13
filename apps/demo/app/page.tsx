import {
  MarketCard,
  OrderbookPanel,
  ShareCard,
} from "@polymarket-ui-kit/react";
import { sampleMarket, sampleOrderbook, samplePoints } from "../components/sample-data";

export default function DemoHome() {
  return (
    <>
      <header className="pui-stack">
        <span className="pui-badge">Demo</span>
        <h1 style={{ fontSize: "3rem", letterSpacing: 0, lineHeight: 1, margin: 0 }}>
          Polymarket UI primitives
        </h1>
        <p className="pui-muted">
          Static demo data today, live public Polymarket hooks tomorrow.
        </p>
      </header>
      <section className="demo-grid">
        <MarketCard market={sampleMarket} points={samplePoints} />
        <OrderbookPanel orderbook={sampleOrderbook} />
        <ShareCard market={sampleMarket} />
      </section>
    </>
  );
}

