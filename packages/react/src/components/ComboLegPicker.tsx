"use client";

import {
  formatCompactNumber,
  probabilityToCents,
  type ComboLegMarket,
  type ComboLegOutcome,
} from "@polymarket-ui-kit/core";
import { useMemo, useState } from "react";
import { cx, EmptyState } from "./shared";

export interface ComboLegPickerProps {
  markets: ComboLegMarket[];
  selectedPositionIds?: string[] | undefined;
  onSelect?: ((market: ComboLegMarket, outcome: ComboLegOutcome) => void) | undefined;
  className?: string | undefined;
}

export function ComboLegPicker({
  markets,
  selectedPositionIds = [],
  onSelect,
  className,
}: ComboLegPickerProps) {
  const [query, setQuery] = useState("");
  const selected = useMemo(
    () => new Set(selectedPositionIds),
    [selectedPositionIds],
  );
  const filteredMarkets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return markets;
    }

    return markets.filter((market) =>
      [market.title, market.category, market.slug, ...market.tags]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [markets, query]);

  return (
    <section className={cx("pui-panel pui-combo-picker", className)}>
      <div className="pui-combo-section-heading">
        <span>Combo leg picker</span>
        <strong>{markets.length} markets</strong>
      </div>
      <label className="pui-combo-search">
        <span className="pui-sr-only">Search combo markets</span>
        <input
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search markets, tags, slugs"
          type="search"
          value={query}
        />
      </label>

      {filteredMarkets.length === 0 ? (
        <EmptyState
          className="pui-combo-empty"
          title="No combo markets"
          description="Try another query or pass preloaded fallback data."
        />
      ) : (
        <div className="pui-combo-picker__list">
          {filteredMarkets.map((market) => (
            <article className="pui-combo-picker__market" key={market.id}>
              <div className="pui-combo-picker__market-copy">
                <span>{market.category ?? "Market"}</span>
                <strong>{market.title}</strong>
                <small>
                  {market.volume ? `${formatCompactNumber(market.volume)} volume` : market.slug}
                </small>
              </div>
              <div className="pui-combo-picker__outcomes">
                {market.outcomes.map((outcome) => {
                  const isSelected = selected.has(outcome.positionId);

                  return (
                    <button
                      aria-pressed={isSelected}
                      className="pui-combo-outcome"
                      data-selected={isSelected ? "true" : undefined}
                      key={outcome.positionId}
                      onClick={() => onSelect?.(market, outcome)}
                      type="button"
                    >
                      <span>{outcome.name}</span>
                      <strong>{probabilityToCents(outcome.price)}</strong>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
