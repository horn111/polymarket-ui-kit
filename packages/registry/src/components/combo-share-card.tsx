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
    <article className="grid max-w-2xl gap-6 overflow-hidden rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-sm font-extrabold text-teal-700">
          Polymarket Combo
        </strong>
        <span className="text-xs text-slate-500">{attribution}</span>
      </div>

      <div className="flex items-start justify-between gap-5">
        <h2 className="max-w-md text-3xl font-black leading-none">{title}</h2>
        <div className="text-right">
          <span className="text-xs text-slate-500">Reference</span>
          <strong className="block text-4xl font-black leading-none">
            {formatProbability(reference)}
          </strong>
        </div>
      </div>

      <div className="grid gap-2">
        {legs.slice(0, 4).map(({ market, outcome }) => (
          <div
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-slate-200 p-3"
            key={outcome.positionId}
          >
            <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-extrabold text-teal-700">
              {outcome.name}
            </span>
            <strong className="text-sm leading-tight">{market.title}</strong>
            <span className="text-xs font-extrabold text-slate-500">
              {formatProbability(outcome.price)}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
