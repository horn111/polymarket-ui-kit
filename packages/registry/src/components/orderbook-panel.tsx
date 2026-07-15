import type { OrderbookSnapshot } from "@polymarket-ui-kit/core";
import { formatProbability } from "../lib/polymarket-format";

export function OrderbookPanel({ orderbook }: { orderbook: OrderbookSnapshot }) {
  const bids = orderbook.bids.slice(0, 8);
  const asks = orderbook.asks.slice(0, 8);

  return (
    <section className="grid gap-4 rounded-md border border-border/70 bg-gradient-to-br from-background via-muted/20 to-background p-5 shadow-xl tabular-nums">
      <div className="mb-3 flex items-center justify-between">
        <strong>Orderbook</strong>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
          Spread {orderbook.spread === null ? "-" : formatProbability(orderbook.spread)}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-2">
        <div>
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Bids</div>
          {bids.map((level) => (
            <div className="flex justify-between border-t border-border/60 py-2 font-mono text-xs" key={`bid-${level.price}-${level.size}`}>
              <span>{formatProbability(level.price)}</span>
              <span>{level.size.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Asks</div>
          {asks.map((level) => (
            <div className="flex justify-between border-t border-border/60 py-2 font-mono text-xs" key={`ask-${level.price}-${level.size}`}>
              <span>{formatProbability(level.price)}</span>
              <span>{level.size.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
