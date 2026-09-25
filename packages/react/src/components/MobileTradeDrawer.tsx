import type {
  BuilderConfig,
  BuilderFeeSide,
  FeePreview,
  MarketOutcome,
  PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { formatCurrency, previewFees } from "@polymarket-ui-kit/core";
import { useId, useMemo, useState } from "react";
import { usePolymarketBuilder } from "../providers/PolymarketProvider.js";
import { BuilderFeeDisclosure } from "./BuilderFeeDisclosure.js";
import { FeePill } from "./FeePill.js";
import { OutcomeSwitcher } from "./OutcomeSwitcher.js";

export interface TradeIntent {
  market: PolymarketMarket;
  outcome: MarketOutcome;
  notional: number;
  builder?: BuilderConfig | undefined;
  builderCode?: string | undefined;
  builderFeeSide: BuilderFeeSide;
  feePreview: FeePreview;
}

export interface MobileTradeDrawerProps {
  market: PolymarketMarket;
  defaultNotional?: number | undefined;
  builder?: BuilderConfig | undefined;
  builderFeeBps?: number | undefined;
  builderFeeSide?: BuilderFeeSide | undefined;
  onTradeIntent?: (intent: TradeIntent) => void;
}

export function MobileTradeDrawer({
  market,
  defaultNotional = 25,
  builder,
  builderFeeBps,
  builderFeeSide = "taker",
  onTradeIntent,
}: MobileTradeDrawerProps) {
  const providerBuilder = usePolymarketBuilder();
  const effectiveBuilder = builder ?? providerBuilder ?? undefined;
  const [selectedOutcome, setSelectedOutcome] = useState<MarketOutcome | null>(
    market.outcomes[0] ?? null,
  );
  const [notionalInput, setNotionalInput] = useState(String(defaultNotional));
  const notional = Number(notionalInput);
  const validNotional = Number.isFinite(notional) && notional >= 1;
  const previewNotional = validNotional ? notional : 0;
  const notionalHelpId = useId();
  const feePreview = useMemo(
    () =>
      previewFees({
        notional: previewNotional,
        price: selectedOutcome?.price ?? 0,
        builderFeeBps,
        builderFeeSide,
        builderMakerFeeBps: effectiveBuilder?.makerFeeBps,
        builderTakerFeeBps: effectiveBuilder?.takerFeeBps,
      }),
    [
      builderFeeBps,
      builderFeeSide,
      effectiveBuilder?.makerFeeBps,
      effectiveBuilder?.takerFeeBps,
      previewNotional,
      selectedOutcome?.price,
    ],
  );

  return (
    <div className="pui-trade-drawer" data-mode={onTradeIntent ? "action" : "preview"}>
      <section className="pui-panel pui-stack pui-trade-drawer__inner">
        <div className="pui-row pui-between">
          <strong>Trade preview</strong>
          <FeePill preview={feePreview} />
        </div>
        {effectiveBuilder ? (
          <BuilderFeeDisclosure
            builder={effectiveBuilder}
            notional={previewNotional}
            price={selectedOutcome?.price ?? undefined}
            side={builderFeeSide}
          />
        ) : null}
        <OutcomeSwitcher
          outcomes={market.outcomes}
          value={selectedOutcome?.id}
          onValueChange={setSelectedOutcome}
        />
        <label className="pui-stack">
          <span className="pui-muted">Notional</span>
          <input
            className="pui-input"
            aria-invalid={!validNotional}
            aria-describedby={!validNotional ? notionalHelpId : undefined}
            inputMode="decimal"
            min={1}
            onChange={(event) => setNotionalInput(event.target.value)}
            step="any"
            type="number"
            value={notionalInput}
          />
          {!validNotional ? <span id={notionalHelpId}>Enter at least $1.</span> : null}
        </label>
        {onTradeIntent ? (
          <button
            className="pui-button"
            disabled={!selectedOutcome || !validNotional}
            onClick={() =>
              selectedOutcome && validNotional
                ? onTradeIntent({
                    market,
                    outcome: selectedOutcome,
                    notional,
                    builder: effectiveBuilder,
                    builderCode: effectiveBuilder?.code,
                    builderFeeSide,
                    feePreview,
                  })
                : undefined
            }
            type="button"
          >
            Continue with {formatCurrency(feePreview.totalCost)}
          </button>
        ) : (
          <p className="pui-muted pui-reset-margin">
            Preview only. No order will be submitted.
          </p>
        )}
      </section>
    </div>
  );
}
