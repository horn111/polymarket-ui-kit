import {
  clampProbability,
  formatCompactNumber,
  formatProbability,
  type MarketPricePoint,
  type PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { cx } from "./shared.js";
import { ProbabilitySparkline } from "./ProbabilitySparkline.js";

export interface MarketCardProps {
  market: PolymarketMarket;
  href?: string;
  points?: MarketPricePoint[];
  className?: string;
  sourceLabel?: string;
  selectedOutcomeId?: string;
  onOutcomeChange?: (outcomeId: string) => void;
}

export function MarketCard({
  market,
  href,
  points = [],
  className,
  sourceLabel,
  selectedOutcomeId,
  onOutcomeChange,
}: MarketCardProps) {
  const outcomes = [...market.outcomes].sort(
    (a, b) =>
      (typeof b.price === "number" && Number.isFinite(b.price) ? b.price : -1) -
      (typeof a.price === "number" && Number.isFinite(a.price) ? a.price : -1),
  );
  const history = points
    .filter(
      (point) =>
        Number.isFinite(point.price) && Number.isFinite(Date.parse(point.timestamp)),
    )
    .sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
  const change =
    history.length > 1
      ? Math.round((history.at(-1)!.price - history[0]!.price) * 100)
      : null;
  const date =
    market.endDate && Number.isFinite(Date.parse(market.endDate))
      ? new Date(market.endDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })
      : null;
  const actionable = Boolean(onOutcomeChange && !href);
  const content = (
    <article className={cx("pui-card pui-market-card", className)}>
      <h2 className="pui-market-card__question">{market.question}</h2>
      <header className="pui-market-card__topline">
        <span>{market.category ?? "Market"}</span>
        <span>{sourceLabel ?? market.status}</span>
      </header>
      <div className="pui-market-card__outcomes" aria-label="Market probabilities">
        {outcomes.length ? (
          outcomes.map((outcome, index) => {
            const probability =
              typeof outcome.price === "number" && Number.isFinite(outcome.price)
                ? clampProbability(outcome.price)
                : null;
            const row = (
              <>
                <span className="pui-market-card__rank">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pui-market-card__outcome-name">{outcome.name}</span>
                <strong>{formatProbability(probability)}</strong>
                <span className="pui-market-card__measure" aria-hidden="true">
                  <span style={{ width: `${(probability ?? 0) * 100}%` }} />
                </span>
              </>
            );
            return actionable ? (
              <button
                aria-pressed={(selectedOutcomeId ?? outcomes[0]?.id) === outcome.id}
                className="pui-market-card__outcome"
                key={outcome.id}
                onClick={() => onOutcomeChange?.(outcome.id)}
                type="button"
              >
                {row}
              </button>
            ) : (
              <div className="pui-market-card__outcome" key={outcome.id}>
                {row}
              </div>
            );
          })
        ) : (
          <p className="pui-market-card__empty">No outcome prices available.</p>
        )}
      </div>
      {change !== null ? (
        <div className="pui-market-card__history">
          <div>
            <span>Shown price history</span>
            <strong>
              {change > 0 ? "+" : ""}
              {change} pts
            </strong>
          </div>
          <ProbabilitySparkline points={history} />
        </div>
      ) : null}
      <footer className="pui-market-card__footer">
        {date ? <span>Resolves {date}</span> : null}
        {market.volume != null ? (
          <span>{formatCompactNumber(market.volume)} traded</span>
        ) : null}
      </footer>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <a className="pui-card-link" href={href}>
      {content}
    </a>
  );
}
