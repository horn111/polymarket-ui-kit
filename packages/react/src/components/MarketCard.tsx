import type { MarketPricePoint, PolymarketMarket } from "@polymarket-ui-kit/core";
import { MarketHeader } from "./MarketHeader";
import { OutcomeSwitcher } from "./OutcomeSwitcher";
import { ProbabilitySparkline } from "./ProbabilitySparkline";
import { cx } from "./shared";

export interface MarketCardProps {
  market: PolymarketMarket;
  href?: string;
  points?: MarketPricePoint[];
  className?: string;
  onOutcomeChange?: (outcomeId: string) => void;
}

export function MarketCard({
  market,
  href,
  points = [],
  className,
  onOutcomeChange,
}: MarketCardProps) {
  const content = (
    <article className={cx("pui-card pui-market-card", className)}>
      {market.image ? (
        <img
          alt={`${market.question} market artwork`}
          className="pui-market-card__media"
          loading="lazy"
          src={market.image}
        />
      ) : null}
      <MarketHeader market={market} />
      <OutcomeSwitcher
        outcomes={market.outcomes}
        onValueChange={(outcome) => onOutcomeChange?.(outcome.id)}
      />
      {points.length > 0 ? <ProbabilitySparkline points={points} /> : null}
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
