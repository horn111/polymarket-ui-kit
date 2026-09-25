import "../lib/polymarket-theme.css";
import { formatProbability, type PolymarketMarket } from "@polymarket-ui-kit/core";
import { formatCompact } from "../lib/polymarket-format";

export function ShareCard({
  market,
  attribution = "polymarket-ui-kit",
  statusLabel,
}: {
  market: PolymarketMarket;
  attribution?: string;
  statusLabel?: string;
}) {
  const leadingOutcome = [...market.outcomes].sort(
    (a, b) => (b.price ?? -1) - (a.price ?? -1),
  )[0];
  return (
    <article className="pui-registry-panel p-5">
      <header className="flex items-center justify-between gap-3 pb-3 text-xs">
        <span>
          <strong className="pui-registry-accent">Polymarket</strong>
          <span className="ml-3 border-l pui-registry-border pl-3 pui-registry-muted">
            {statusLabel ?? market.status}
          </span>
        </span>
        <span className="pui-registry-muted">{attribution}</span>
      </header>
      <div className="grid gap-4">
        <div className="flex flex-col gap-3 py-2">
          <h2 className="pui-registry-question text-2xl leading-tight">
            {market.question}
          </h2>
          <span className="text-xs pui-registry-muted">
            {market.category ?? "Prediction market"}
          </span>
        </div>
        {leadingOutcome ? (
          <div className="flex items-center justify-between border-y pui-registry-border py-6">
            <span className="text-xs pui-registry-muted">Market leader</span>
            <div>
              <strong className="block text-5xl font-medium tabular-nums">
                {formatProbability(leadingOutcome.price)}
              </strong>
              <span>{leadingOutcome.name}</span>
            </div>
          </div>
        ) : null}
      </div>
      <footer className="flex flex-wrap gap-x-6 mt-4 py-2 text-xs pui-registry-muted">
        {market.volume != null ? (
          <span>Volume · {formatCompact(market.volume)}</span>
        ) : null}
        {market.liquidity != null ? (
          <span>Liquidity · {formatCompact(market.liquidity)}</span>
        ) : null}
      </footer>
    </article>
  );
}
