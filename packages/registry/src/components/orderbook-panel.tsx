import type { OrderbookSnapshot } from "@polymarket-ui-kit/core";
import { formatProbability } from "../lib/polymarket-format";

export function OrderbookPanel({ orderbook }: { orderbook: OrderbookSnapshot }) {
  const bids = orderbook.bids.slice(0, 8);
  const asks = orderbook.asks.slice(0, 8);

  return (
    <section className="rounded-lg border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <strong>Orderbook</strong>
        <span className="text-sm text-muted-foreground">
          Spread {orderbook.spread === null ? "-" : formatProbability(orderbook.spread)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="mb-2 text-muted-foreground">Bids</div>
          {bids.map((level) => (
            <div className="flex justify-between py-1" key={`bid-${level.price}-${level.size}`}>
              <span>{formatProbability(level.price)}</span>
              <span>{level.size.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-2 text-muted-foreground">Asks</div>
          {asks.map((level) => (
            <div className="flex justify-between py-1" key={`ask-${level.price}-${level.size}`}>
              <span>{formatProbability(level.price)}</span>
              <span>{level.size.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

