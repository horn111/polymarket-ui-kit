import "../lib/polymarket-theme.css";
import { formatProbability, type PolymarketMarket } from "@polymarket-ui-kit/core";
import { formatCompact } from "../lib/polymarket-format";

export function MarketCard({
  market,
  sourceLabel,
}: {
  market: PolymarketMarket;
  sourceLabel?: string;
}) {
  const outcomes = [...market.outcomes].sort(
    (a, b) => (b.price ?? -1) - (a.price ?? -1),
  );
  return (
    <article className="pui-registry-panel p-5">
      <h2 className="pui-registry-question pb-4 text-2xl leading-tight">
        {market.question}
      </h2>
      <header className="flex justify-between gap-4 pb-2 text-xs pui-registry-muted">
        <span>{market.category ?? "Market"}</span>
        <span>{sourceLabel ?? market.status}</span>
      </header>
      <div className="grid" aria-label="Market probabilities">
        {outcomes.length ? (
          outcomes.map((outcome, index) => (
            <div
              className="grid grid-cols-[2rem_minmax(0,1fr)_auto] gap-x-3 gap-y-2 border-t pui-registry-border py-4"
              key={outcome.id}
            >
              <span className="text-xs opacity-65">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{outcome.name}</strong>
              <strong className="text-xl tabular-nums">
                {formatProbability(outcome.price)}
              </strong>
              <span
                className="col-start-2 col-end-4 h-[2px] pui-registry-track"
                aria-hidden="true"
              >
                <span
                  className="block h-full pui-registry-fill"
                  style={{
                    width: `${Math.min(100, Math.max(0, (outcome.price ?? 0) * 100))}%`,
                  }}
                />
              </span>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm pui-registry-muted">No outcome prices available.</p>
        )}
      </div>
      <footer className="mt-3 border-t pui-registry-border py-3 text-xs pui-registry-muted">
        {market.volume != null
          ? `${formatCompact(market.volume)} traded`
          : market.status}
      </footer>
    </article>
  );
}
