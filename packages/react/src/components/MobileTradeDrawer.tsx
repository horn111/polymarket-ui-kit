import type { MarketOutcome, PolymarketMarket } from "@polymarket-ui-kit/core";
import { formatCurrency, previewFees } from "@polymarket-ui-kit/core";
import { useMemo, useState } from "react";
import { FeePill } from "./FeePill";
import { OutcomeSwitcher } from "./OutcomeSwitcher";

export interface TradeIntent {
  market: PolymarketMarket;
  outcome: MarketOutcome;
  notional: number;
}

export interface MobileTradeDrawerProps {
  market: PolymarketMarket;
  defaultNotional?: number;
  builderFeeBps?: number;
  onTradeIntent?: (intent: TradeIntent) => void;
}

export function MobileTradeDrawer({
  market,
  defaultNotional = 25,
  builderFeeBps = 0,
  onTradeIntent,
}: MobileTradeDrawerProps) {
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
      }),
    [builderFeeBps, notional, selectedOutcome?.price],
  );

  return (
    <div className="pui-trade-drawer">
      <section className="pui-panel pui-stack pui-trade-drawer__inner">
        <div className="pui-row" style={{ justifyContent: "space-between" }}>
          <strong>Trade preview</strong>
          <FeePill preview={feePreview} />
        </div>
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
              ? onTradeIntent?.({ market, outcome: selectedOutcome, notional })
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

