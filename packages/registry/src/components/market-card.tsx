import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import { formatCompact, formatProbability } from "../lib/polymarket-format";

export function MarketCard({ market }: { market: PolymarketMarket }) {
  return (
    <article className="relative grid gap-4 overflow-hidden rounded-md border border-border/70 bg-gradient-to-br from-background via-muted/25 to-background p-5 shadow-2xl tabular-nums">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>{market.status}</span>
        {market.volume ? <span>{formatCompact(market.volume)} volume</span> : null}
      </div>
      <h3 className="text-xl font-black leading-[1.08] tracking-[-0.035em]">{market.question}</h3>
      <div className="grid gap-2">
        {market.outcomes.map((outcome) => (
          <div
            className="flex min-h-12 items-center justify-between rounded-sm border border-border/70 bg-background/80 px-3 py-2"
            key={outcome.id}
          >
            <span>{outcome.name}</span>
            <strong className="font-mono text-primary">{formatProbability(outcome.price)}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}
