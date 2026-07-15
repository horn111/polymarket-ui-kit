import type { ComboSelectionLeg } from "@polymarket-ui-kit/core";
import { formatProbability } from "../lib/polymarket-format";

export function ComboShareCard({
  legs,
  title = "Combo market preview",
  attribution = "polymarket-ui-kit",
}: {
  legs: ComboSelectionLeg[];
  title?: string;
  attribution?: string;
}) {
  const reference =
    legs.length === 0 || legs.some((leg) => leg.outcome.price === null)
      ? null
      : legs.reduce((probability, leg) => probability * (leg.outcome.price ?? 0), 1);

  return (
    <article className="grid max-w-2xl gap-6 overflow-hidden rounded-md border border-zinc-700 bg-gradient-to-br from-zinc-800 via-zinc-950 to-zinc-900 p-6 text-stone-100 shadow-2xl tabular-nums">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-sm font-black tracking-tight">
          Polymarket Combo
        </strong>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">{attribution}</span>
      </div>

      <div className="flex items-start justify-between gap-5">
        <h2 className="max-w-md text-3xl font-black leading-none">{title}</h2>
        <div className="text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400">Reference</span>
          <strong className="block text-4xl font-black leading-none tracking-[-0.06em] text-orange-300">
            {formatProbability(reference)}
          </strong>
        </div>
      </div>

      <div className="grid gap-2">
        {legs.slice(0, 4).map(({ market, outcome }) => (
          <div
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-sm border border-zinc-700 bg-zinc-950/70 p-3"
            key={outcome.positionId}
          >
            <span className="border border-orange-300/30 bg-orange-300/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-orange-300">
              {outcome.name}
            </span>
            <strong className="text-sm leading-tight">{market.title}</strong>
            <span className="font-mono text-xs font-extrabold text-zinc-400">
              {formatProbability(outcome.price)}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
