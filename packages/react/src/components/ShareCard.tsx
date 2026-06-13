import {
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

  return (
    <article className={cx("pui-card pui-share-card pui-stack", className)}>
      <div className="pui-row" style={{ justifyContent: "space-between" }}>
        <span className="pui-badge">Polymarket</span>
        <span className="pui-muted">{attribution}</span>
      </div>
      <h2 style={{ fontSize: "1.65rem", lineHeight: 1.15, margin: 0 }}>
        {market.question}
      </h2>
      {leadingOutcome ? (
        <div>
          <span className="pui-muted">{leadingOutcome.name}</span>
          <div style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>
            {probabilityToCents(leadingOutcome.price)}
          </div>
        </div>
      ) : null}
      <div className="pui-market-meta">
        {market.volume ? <span>{formatCompactNumber(market.volume)} volume</span> : null}
        {market.liquidity ? (
          <span>{formatCompactNumber(market.liquidity)} liquidity</span>
        ) : null}
        {market.commentCount ? <span>{market.commentCount} comments</span> : null}
      </div>
    </article>
  );
}

