import { probabilityToCents, type ComboSelectionLeg } from "@polymarket-ui-kit/core";
import { cx, EmptyState } from "./shared";

export interface ComboLegListProps {
  legs: ComboSelectionLeg[];
  onRemove?: ((positionId: string) => void) | undefined;
  className?: string | undefined;
}

export function ComboLegList({ legs, onRemove, className }: ComboLegListProps) {
  if (legs.length === 0) {
    return (
      <EmptyState
        className={cx("pui-combo-empty", className)}
        title="No legs selected"
        description="Select outcomes from public combo markets to build an intent."
      />
    );
  }

  return (
    <section className={cx("pui-panel pui-combo-leg-list", className)}>
      <div className="pui-combo-section-heading">
        <span>Selected legs</span>
        <strong>{legs.length}</strong>
      </div>
      <div className="pui-combo-leg-list__items">
        {legs.map(({ market, outcome }, index) => (
          <article className="pui-combo-leg" key={outcome.positionId}>
            <span className="pui-combo-leg__index">{String(index + 1).padStart(2, "0")}</span>
            <div className="pui-combo-leg__copy">
              <strong>{market.title}</strong>
              <span>
                {outcome.name} / {probabilityToCents(outcome.price)}
              </span>
            </div>
            {onRemove ? (
              <button
                aria-label={`Remove ${market.title}`}
                className="pui-button"
                data-variant="ghost"
                onClick={() => onRemove(outcome.positionId)}
                type="button"
              >
                Remove
              </button>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
