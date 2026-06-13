import {
  clampProbability,
  formatCompactNumber,
  probabilityToCents,
  type PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { cx } from "./shared";

export interface ShareCardProps {
  market: PolymarketMarket;
  className?: string;
  attribution?: string;
}

export function ShareCard({
  market,
  className,
  attribution = "polymarket-ui-kit",
}: ShareCardProps) {
  const leadingOutcome = market.outcomes[0];
  const probability = leadingOutcome ? clampProbability(leadingOutcome.price ?? 0) : 0;
  const probabilityWidth = `${Math.round(probability * 100)}%`;
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
          <span className="pui-share-card__status">Live market</span>
        </div>
        <span className="pui-share-card__attribution">{attribution}</span>
      </div>

      <div className="pui-share-card__body">
        <div className="pui-share-card__market">
          <span className="pui-share-card__label">
            {market.category ?? "Prediction market"}
          </span>
          <h2>{market.question}</h2>
        </div>

        {leadingOutcome ? (
          <div className="pui-share-card__quote">
            <div>
              <span className="pui-share-card__label">Leading outcome</span>
              <strong>{leadingOutcome.name}</strong>
            </div>
            <div className="pui-share-card__price">
              {probabilityToCents(leadingOutcome.price)}
            </div>
            <div className="pui-share-card__bar" aria-hidden="true">
              <span style={{ width: probabilityWidth }} />
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
