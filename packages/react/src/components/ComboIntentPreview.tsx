"use client";

import {
  buildComboIntent,
  formatProbability,
  type ComboIntent,
  type ComboIntentDirection,
  type ComboOutcomeSide,
  type ComboSelectionLeg,
} from "@polymarket-ui-kit/core";
import { useMemo } from "react";
import { cx } from "./shared";

export interface ComboIntentPreviewProps {
  legs: ComboSelectionLeg[];
  direction?: ComboIntentDirection | undefined;
  side?: ComboOutcomeSide | undefined;
  size?: number | undefined;
  builderCode?: string | undefined;
  onCreateIntent?: ((intent: ComboIntent) => void) | undefined;
  className?: string | undefined;
}

function getReferenceProbability(legs: ComboSelectionLeg[]): number | null {
  if (legs.length === 0 || legs.some((leg) => leg.outcome.price === null)) {
    return null;
  }

  return legs.reduce((probability, leg) => probability * (leg.outcome.price ?? 0), 1);
}

export function ComboIntentPreview({
  legs,
  direction = "BUY",
  side = "YES",
  size,
  builderCode,
  onCreateIntent,
  className,
}: ComboIntentPreviewProps) {
  const intent = useMemo(
    () => buildComboIntent({ builderCode, direction, legs, side, size }),
    [builderCode, direction, legs, side, size],
  );
  const referenceProbability = getReferenceProbability(legs);

  return (
    <section className={cx("pui-panel pui-combo-intent", className)}>
      <div className="pui-combo-section-heading">
        <span>Combo intent</span>
        <strong>{direction}</strong>
      </div>
      <dl className="pui-combo-intent__stats">
        <div>
          <dt>Legs</dt>
          <dd>{legs.length}</dd>
        </div>
        <div>
          <dt>Side</dt>
          <dd>{side}</dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd>{formatProbability(referenceProbability)}</dd>
        </div>
      </dl>
      <p className="pui-muted">
        Reference only. Host apps still need their own authenticated RFQ or CLOB flow.
      </p>
      {onCreateIntent ? (
        <button
          className="pui-button"
          disabled={legs.length === 0}
          onClick={() => onCreateIntent(intent)}
          type="button"
        >
          Emit combo intent
        </button>
      ) : null}
    </section>
  );
}
