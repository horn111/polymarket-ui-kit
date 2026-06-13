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
    <article className="grid min-h-[300px] gap-5 overflow-hidden rounded-lg border border-slate-700 bg-slate-950 p-6 text-slate-50 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-teal-300">Polymarket</span>
          <span className="rounded-full border border-teal-300/30 bg-teal-300/10 px-2 py-1 text-xs font-bold text-teal-100">
            Live market
          </span>
        </div>
        <span className="text-xs text-slate-400">polymarket-ui-kit</span>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-2">
          <span className="text-xs text-slate-400">
            {market.category ?? "Prediction market"}
          </span>
          <h2 className="text-2xl font-black leading-tight">{market.question}</h2>
        </div>

        {leadingOutcome ? (
          <div className="grid gap-3 rounded-lg border border-slate-700/70 bg-white/[0.06] p-4">
            <div>
              <div className="text-xs text-slate-400">Leading outcome</div>
              <div className="font-bold">{leadingOutcome.name}</div>
            </div>
            <div className="text-5xl font-black leading-none">
              {formatProbability(leadingOutcome.price)}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-700/70">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-teal-300 to-amber-400"
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
              className="rounded-md border border-slate-700/70 bg-white/[0.05] p-3"
            >
              <dt className="text-xs text-slate-400">{stat.label}</dt>
              <dd className="mt-1 font-extrabold">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}
