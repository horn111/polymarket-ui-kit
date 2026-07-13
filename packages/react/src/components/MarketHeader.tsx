import {
  formatCompactNumber,
  formatRelativeTime,
  type PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { BuilderBadge, type BuilderBadgeProps } from "./BuilderBadge";
import { cx } from "./shared";

export interface MarketHeaderProps {
  market: PolymarketMarket;
  builder?: BuilderBadgeProps["builder"];
  className?: string;
}

export function MarketHeader({ market, builder, className }: MarketHeaderProps) {
  return (
    <header className={cx("pui-stack", className)}>
      <div className="pui-row pui-between">
        <span className="pui-badge">{market.status}</span>
        {builder ? <BuilderBadge builder={builder} /> : null}
      </div>
      <h2 className="pui-market-title">{market.question}</h2>
      <div className="pui-market-meta">
        {market.category ? <span>{market.category}</span> : null}
        {market.endDate ? <span>Ends {formatRelativeTime(market.endDate)}</span> : null}
        {market.volume ? (
          <span>{formatCompactNumber(market.volume)} volume</span>
        ) : null}
        {market.commentCount ? <span>{market.commentCount} comments</span> : null}
      </div>
    </header>
  );
}
