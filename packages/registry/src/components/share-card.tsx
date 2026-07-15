import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import { formatCompact, formatProbability } from "../lib/polymarket-format";

export function ShareCard({ market }: { market: PolymarketMarket }) {
  const leadingOutcome = market.outcomes[0];
  const probability = Math.min(1, Math.max(0, leadingOutcome?.price ?? 0));
  const stats = [
    market.volume ? { label: "Volume", value: formatCompact(market.volume) } : null,
    market.liquidity
      ? { label: "Liquidity", value: formatCompact(market.liquidity) }
      : null,
    market.commentCount
      ? { label: "Comments", value: formatCompact(market.commentCount) }
      : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <article className="grid min-h-[340px] gap-5 overflow-hidden rounded-md border border-zinc-700 bg-gradient-to-br from-zinc-800 via-zinc-950 to-zinc-900 p-6 text-stone-100 shadow-2xl tabular-nums">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black tracking-tight">Polymarket UI Kit</span>
          <span className="border border-teal-300/30 bg-teal-300/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-teal-200">
            Live market
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">polymarket-ui-kit</span>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-orange-300">
            {market.category ?? "Prediction market"}
          </span>
          <h2 className="text-3xl font-black leading-[1.05] tracking-[-0.045em]">{market.question}</h2>
        </div>

        {leadingOutcome ? (
          <div className="grid gap-3 rounded-sm border border-zinc-700 bg-zinc-950/90 p-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">Leading outcome</div>
              <div className="font-bold">{leadingOutcome.name}</div>
            </div>
            <div className="text-5xl font-black leading-none tracking-[-0.06em] text-orange-300">
              {formatProbability(leadingOutcome.price)}
            </div>
            <div className="h-1 overflow-hidden bg-zinc-700/70">
              <span
                className="block h-full bg-orange-300"
                style={{ width: `${Math.round(probability * 100)}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      {stats.length ? (
        <dl className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-zinc-700/70 bg-zinc-950/60 p-3"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">{stat.label}</dt>
              <dd className="mt-1 font-extrabold">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}
