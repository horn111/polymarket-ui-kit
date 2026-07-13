import {
  formatProbability,
  type OrderbookLevel,
  type OrderbookSnapshot,
} from "@polymarket-ui-kit/core";
import { cx, EmptyState } from "./shared";

export interface OrderbookPanelProps {
  orderbook: OrderbookSnapshot | null;
  depth?: number;
  className?: string;
}

function LevelRow({
  level,
  maxTotal,
  side,
}: {
  level: OrderbookLevel;
  maxTotal: number;
  side: "bid" | "ask";
}) {
  const width =
    maxTotal > 0
      ? `${Math.min(100, ((level.total ?? level.size) / maxTotal) * 100)}%`
      : "0%";
  return (
    <div className="pui-orderbook__row">
      <span className="pui-orderbook__depth" data-side={side} style={{ width }} />
      <span>{formatProbability(level.price)}</span>
      <span>{level.size.toLocaleString("en-US", { maximumFractionDigits: 2 })}</span>
    </div>
  );
}

export function OrderbookPanel({
  orderbook,
  depth = 8,
  className,
}: OrderbookPanelProps) {
  if (!orderbook) {
    return (
      <EmptyState
        className={className}
        description="Pass a token id to load CLOB depth."
        title="No orderbook loaded"
      />
    );
  }

  const bids = orderbook.bids.slice(0, depth);
  const asks = orderbook.asks.slice(0, depth);
  const maxTotal = Math.max(
    0,
    ...bids.map((level) => level.total ?? level.size),
    ...asks.map((level) => level.total ?? level.size),
  );

  return (
    <section className={cx("pui-panel pui-orderbook", className)}>
      <div className="pui-row pui-between">
        <strong>Orderbook</strong>
        <span className="pui-muted">
          {orderbook.spread === null || orderbook.spread === undefined
            ? "Spread -"
            : `Spread ${formatProbability(orderbook.spread)}`}
        </span>
      </div>
      <div className="pui-orderbook__grid">
        <div className="pui-orderbook__side">
          <span className="pui-muted">Bids</span>
          {bids.map((level) => (
            <LevelRow
              key={`bid-${level.price}-${level.size}`}
              level={level}
              maxTotal={maxTotal}
              side="bid"
            />
          ))}
        </div>
        <div className="pui-orderbook__side">
          <span className="pui-muted">Asks</span>
          {asks.map((level) => (
            <LevelRow
              key={`ask-${level.price}-${level.size}`}
              level={level}
              maxTotal={maxTotal}
              side="ask"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
