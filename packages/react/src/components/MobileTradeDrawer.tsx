import type {
  BuilderConfig,
  BuilderFeeSide,
  FeePreview,
  MarketOutcome,
  PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { formatCurrency, previewFees } from "@polymarket-ui-kit/core";
import { useMemo, useState } from "react";
import { usePolymarketBuilder } from "../providers/PolymarketProvider";
import { BuilderFeeDisclosure } from "./BuilderFeeDisclosure";
import { FeePill } from "./FeePill";
import { OutcomeSwitcher } from "./OutcomeSwitcher";

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
  const [notional, setNotional] = useState(defaultNotional);
  const feePreview = useMemo(
    () =>
      previewFees({
        notional,
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
      notional,
      selectedOutcome?.price,
    ],
  );

  return (
    <div className="pui-trade-drawer">
      <section className="pui-panel pui-stack pui-trade-drawer__inner">
        <div className="pui-row" style={{ justifyContent: "space-between" }}>
          <strong>Trade preview</strong>
          <FeePill preview={feePreview} />
        </div>
        {effectiveBuilder ? (
          <BuilderFeeDisclosure
            builder={effectiveBuilder}
            notional={notional}
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
            inputMode="decimal"
            min={1}
            onChange={(event) => setNotional(Number(event.target.value))}
            style={{
              background: "var(--pui-bg-muted)",
              border: "1px solid var(--pui-border)",
              borderRadius: "var(--pui-radius-sm)",
              color: "var(--pui-text)",
              font: "inherit",
              minHeight: "2.5rem",
              padding: "0 var(--pui-space-3)",
            }}
            type="number"
            value={notional}
          />
        </label>
        <button
          className="pui-button"
          disabled={!selectedOutcome}
          onClick={() =>
            selectedOutcome
              ? onTradeIntent?.({
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
      </section>
    </div>
  );
}
