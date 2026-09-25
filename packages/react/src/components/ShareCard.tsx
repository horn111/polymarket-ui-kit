import {
  clampProbability,
  formatCompactNumber,
  formatProbability,
  type PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { cx } from "./shared.js";

export interface ShareCardProps {
  market: PolymarketMarket;
  className?: string;
  attribution?: string;
  statusLabel?: string;
}

export function ShareCard({
  market,
  className,
  attribution = "polymarket-ui-kit",
  statusLabel,
}: ShareCardProps) {
  const leadingOutcome = [...market.outcomes].sort(
    (a, b) => (b.price ?? -1) - (a.price ?? -1),
  )[0];
  const probability =
    leadingOutcome?.price != null && Number.isFinite(leadingOutcome.price)
      ? clampProbability(leadingOutcome.price)
      : null;
  const stats = [
    market.volume
      ? { label: "Volume", value: formatCompactNumber(market.volume) }
      : null,
    market.liquidity
      ? { label: "Liquidity", value: formatCompactNumber(market.liquidity) }
      : null,
    market.commentCount
      ? { label: "Comments", value: formatCompactNumber(market.commentCount) }
      : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <article className={cx("pui-card pui-share-card", className)}>
      <div className="pui-share-card__topline">
        <div className="pui-row">
          <span className="pui-share-card__brand">Polymarket</span>
          <span className="pui-share-card__status">
            {statusLabel ??
              (market.status === "unknown"
                ? "Market"
                : `${market.status[0]!.toUpperCase()}${market.status.slice(1)} market`)}
          </span>
        </div>
        <span className="pui-share-card__attribution">{attribution}</span>
      </div>

      <div className="pui-share-card__body">
        <div className="pui-share-card__market">
          <h2>{market.question}</h2>
          <span className="pui-share-card__label">
            {market.category ?? "Prediction market"}
          </span>
        </div>

        {leadingOutcome ? (
          <div className="pui-share-card__quote">
            <div>
              <span className="pui-share-card__label">Leading outcome</span>
              <strong>{leadingOutcome.name}</strong>
            </div>
            <div className="pui-share-card__price">
              {formatProbability(probability)}
            </div>
          </div>
        ) : null}
      </div>

      <dl className="pui-share-card__stats">
        {stats.length ? (
          stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))
        ) : (
          <div>
            <dt>Status</dt>
            <dd>{market.status}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}
