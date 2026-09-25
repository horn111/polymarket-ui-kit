import "../lib/polymarket-theme.css";
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
    <article className="pui-registry-panel grid min-w-0 max-w-2xl gap-5 overflow-hidden p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <strong className="text-sm font-medium pui-registry-accent">
          Polymarket Combo
        </strong>
        <span className="break-all text-xs pui-registry-muted">{attribution}</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto]">
        <h2 className="pui-registry-question max-w-md text-2xl leading-tight">
          {title}
        </h2>
        <div className="rounded-xl border pui-registry-border pui-registry-well p-4 sm:text-right">
          <span className="text-xs pui-registry-muted">Reference</span>
          <strong className="block text-4xl font-medium leading-tight tabular-nums pui-registry-accent">
            {formatProbability(reference)}
          </strong>
        </div>
      </div>

      <div className="grid gap-2">
        {legs.slice(0, 4).map(({ market, outcome }) => (
          <div
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t pui-registry-border py-4"
            key={outcome.positionId}
          >
            <div className="grid gap-1">
              <span className="text-xs pui-registry-accent">{outcome.name}</span>
              <strong className="text-sm font-medium leading-snug">
                {market.title}
              </strong>
            </div>
            <span className="text-sm tabular-nums pui-registry-muted">
              {formatProbability(outcome.price)}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed pui-registry-muted">
        Reference multiplies the selected prices and assumes independent outcomes. It is
        not an executable quote.
      </p>
    </article>
  );
}
