"use client";

import {
  buildComboIntent,
  type BuildComboIntentInput,
  type ComboIntent,
  type ComboLegMarket,
  type ComboLegOutcome,
  type ComboSelectionLeg,
} from "@polymarket-ui-kit/core";
import { useCallback, useMemo, useState } from "react";

export interface ComboSelectionState {
  legs: ComboSelectionLeg[];
  addLeg: (market: ComboLegMarket, outcome: ComboLegOutcome) => void;
  removeLeg: (positionId: string) => void;
  clearLegs: () => void;
  hasLeg: (positionId: string) => boolean;
  createIntent: (
    input?: Omit<BuildComboIntentInput, "legs">,
  ) => ComboIntent;
}

export function useComboSelection(
  initialLegs: ComboSelectionLeg[] = [],
): ComboSelectionState {
  const [legs, setLegs] = useState<ComboSelectionLeg[]>(initialLegs);

  const addLeg = useCallback((market: ComboLegMarket, outcome: ComboLegOutcome) => {
    setLegs((current) => {
      const withoutSameMarket = current.filter(
        (leg) => leg.market.id !== market.id && leg.market.conditionId !== market.conditionId,
      );

      return [...withoutSameMarket, { market, outcome }];
    });
  }, []);

  const removeLeg = useCallback((positionId: string) => {
    setLegs((current) => current.filter((leg) => leg.outcome.positionId !== positionId));
  }, []);

  const clearLegs = useCallback(() => setLegs([]), []);

  return useMemo(
    () => ({
      legs,
      addLeg,
      removeLeg,
      clearLegs,
      hasLeg: (positionId: string) =>
        legs.some((leg) => leg.outcome.positionId === positionId),
      createIntent: (input = {}) => buildComboIntent({ ...input, legs }),
    }),
    [addLeg, clearLegs, legs, removeLeg],
  );
}
