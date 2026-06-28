import {
  formatProbability,
  probabilityToCents,
  type ComboSelectionLeg,
} from "@polymarket-ui-kit/core";
import { cx } from "./shared";

export interface ComboShareCardProps {
  legs: ComboSelectionLeg[];
  title?: string | undefined;
  attribution?: string | undefined;
  className?: string | undefined;
}

function getReferenceProbability(legs: ComboSelectionLeg[]): number | null {
  if (legs.length === 0 || legs.some((leg) => leg.outcome.price === null)) {
    return null;
  }

  return legs.reduce((probability, leg) => probability * (leg.outcome.price ?? 0), 1);
}

export function ComboShareCard({
  legs,
  title = "Combo market preview",
  attribution = "polymarket-ui-kit",
  className,
}: ComboShareCardProps) {
  const referenceProbability = getReferenceProbability(legs);

  return (
    <article className={cx("pui-card pui-combo-share-card", className)}>
      <div className="pui-combo-share-card__topline">
        <strong>Polymarket Combo</strong>
        <span>{attribution}</span>
      </div>
      <div className="pui-combo-share-card__hero">
        <h2>{title}</h2>
        <div>
          <span>Reference</span>
          <strong>{formatProbability(referenceProbability)}</strong>
        </div>
      </div>
      <div className="pui-combo-share-card__legs">
        {legs.slice(0, 4).map(({ market, outcome }) => (
          <div key={outcome.positionId}>
            <span>{outcome.name}</span>
            <strong>{market.title}</strong>
            <small>{probabilityToCents(outcome.price)}</small>
          </div>
        ))}
      </div>
    </article>
  );
}
