import type { MarketOutcome } from "@polymarket-ui-kit/core";
import { probabilityToCents } from "@polymarket-ui-kit/core";

export interface OutcomeSwitcherProps {
  outcomes: MarketOutcome[];
  value?: string | undefined;
  onValueChange?: ((outcome: MarketOutcome) => void) | undefined;
}

export function OutcomeSwitcher({
  outcomes,
  value,
  onValueChange,
}: OutcomeSwitcherProps) {
  return (
    <div className="pui-outcomes" role="group" aria-label="Market outcomes">
      {outcomes.map((outcome) => (
        <button
          aria-pressed={value === outcome.id}
          className="pui-outcome-button"
          key={outcome.id}
          onClick={() => onValueChange?.(outcome)}
          type="button"
        >
          <span>{outcome.name}</span>
          <span className="pui-outcome-price">
            {probabilityToCents(outcome.price)}
          </span>
        </button>
      ))}
    </div>
  );
}
