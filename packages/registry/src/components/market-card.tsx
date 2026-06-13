import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import { formatCompact, formatProbability } from "../lib/polymarket-format";

export function MarketCard({ market }: { market: PolymarketMarket }) {
  return (
    <article className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>{market.status}</span>
        {market.volume ? <span>{formatCompact(market.volume)} volume</span> : null}
      </div>
      <h3 className="mb-4 text-base font-semibold leading-snug">{market.question}</h3>
      <div className="grid gap-2">
        {market.outcomes.map((outcome) => (
          <div
            className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2"
            key={outcome.id}
          >
            <span>{outcome.name}</span>
            <strong>{formatProbability(outcome.price)}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}

