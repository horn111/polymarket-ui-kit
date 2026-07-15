"use client";

import type {
  ComboIntent,
  ComboIntentDirection,
  ComboLegMarket,
  ComboOutcomeSide,
  ComboSelectionLeg,
} from "@polymarket-ui-kit/core";
import { useComboSelection } from "../hooks/useComboSelection";
import { ComboIntentPreview } from "./ComboIntentPreview";
import { ComboLegList } from "./ComboLegList";
import { ComboLegPicker } from "./ComboLegPicker";
import { cx, EmptyState } from "./shared";

export interface ComboBuilderCardProps {
  markets: ComboLegMarket[];
  initialLegs?: ComboSelectionLeg[] | undefined;
  isLoading?: boolean | undefined;
  error?: Error | null | undefined;
  direction?: ComboIntentDirection | undefined;
  side?: ComboOutcomeSide | undefined;
  size?: number | undefined;
  builderCode?: string | undefined;
  onComboIntent?: ((intent: ComboIntent) => void) | undefined;
  className?: string | undefined;
}

export function ComboBuilderCard({
  markets,
  initialLegs = [],
  isLoading = false,
  error = null,
  direction = "BUY",
  side = "YES",
  size,
  builderCode,
  onComboIntent,
  className,
}: ComboBuilderCardProps) {
  const selection = useComboSelection(initialLegs);
  const selectedPositionIds = selection.legs.map((leg) => leg.outcome.positionId);

  return (
    <article className={cx("pui-card pui-combo-builder-card", className)}>
      <header className="pui-combo-builder-card__header">
        <div>
          <span>Combo-aware UI</span>
          <h3>Build multi-market surfaces without RFQ glue in the component.</h3>
        </div>
        <strong>{selection.legs.length} legs</strong>
      </header>

      {isLoading ? (
        <EmptyState
          data-state="loading"
          description="Fetching public combo legs."
          role="status"
          title="Loading combo markets"
        />
      ) : error ? (
        <EmptyState
          data-state="error"
          description="Render fallback data or retry from the host app."
          role="alert"
          title="Combo markets unavailable"
        />
      ) : (
        <div className="pui-combo-builder-card__grid">
          <ComboLegPicker
            markets={markets}
            onSelect={selection.addLeg}
            selectedPositionIds={selectedPositionIds}
          />
          <div className="pui-combo-builder-card__side">
            <ComboLegList legs={selection.legs} onRemove={selection.removeLeg} />
            <ComboIntentPreview
              builderCode={builderCode}
              direction={direction}
              legs={selection.legs}
              onCreateIntent={onComboIntent}
              side={side}
              size={size}
            />
          </div>
        </div>
      )}
    </article>
  );
}
