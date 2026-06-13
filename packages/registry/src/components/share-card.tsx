import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import { formatCompact, formatProbability } from "../lib/polymarket-format";

export function ShareCard({ market }: { market: PolymarketMarket }) {
  const leadingOutcome = market.outcomes[0];

  return (
    <article className="grid min-h-[260px] gap-5 rounded-lg border bg-background p-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Polymarket</span>
        <span>polymarket-ui-kit</span>
      </div>
      <h2 className="text-2xl font-bold leading-tight">{market.question}</h2>
      {leadingOutcome ? (
        <div>
          <div className="text-sm text-muted-foreground">{leadingOutcome.name}</div>
          <div className="text-5xl font-black">
            {formatProbability(leadingOutcome.price)}
          </div>
        </div>
      ) : null}
      <div className="text-sm text-muted-foreground">
        {market.volume ? `${formatCompact(market.volume)} volume` : "Live market"}
      </div>
    </article>
  );
}

