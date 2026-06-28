import type { ComboLegMarket, ComboSelectionLeg } from "@polymarket-ui-kit/core";

export const sampleComboMarkets: ComboLegMarket[] = [
  {
    id: "combo-crypto",
    conditionId: "condition-crypto",
    slug: "btc-and-eth-ath-2026",
    title: "Will BTC and ETH both set new all-time highs in 2026?",
    category: "Crypto",
    image: null,
    icon: null,
    volume: 2850000,
    liquidity: 620000,
    active: true,
    tags: ["crypto", "combo"],
    outcomes: [
      { id: "crypto-yes", name: "Yes", price: 0.41, positionId: "combo-crypto-yes" },
      { id: "crypto-no", name: "No", price: 0.59, positionId: "combo-crypto-no" },
    ],
  },
  {
    id: "combo-macro",
    conditionId: "condition-macro",
    slug: "fed-cut-and-btc-green",
    title: "Will the Fed cut rates and Bitcoin close green that week?",
    category: "Macro",
    image: null,
    icon: null,
    volume: 1180000,
    liquidity: 280000,
    active: true,
    tags: ["macro", "crypto"],
    outcomes: [
      { id: "macro-yes", name: "Yes", price: 0.36, positionId: "combo-macro-yes" },
      { id: "macro-no", name: "No", price: 0.64, positionId: "combo-macro-no" },
    ],
  },
  {
    id: "combo-politics",
    conditionId: "condition-politics",
    slug: "turnout-and-election-line",
    title: "Will turnout and the winning party both clear the line?",
    category: "Politics",
    image: null,
    icon: null,
    volume: 940000,
    liquidity: 160000,
    active: true,
    tags: ["politics", "elections"],
    outcomes: [
      {
        id: "politics-yes",
        name: "Yes",
        price: 0.33,
        positionId: "combo-politics-yes",
      },
      {
        id: "politics-no",
        name: "No",
        price: 0.67,
        positionId: "combo-politics-no",
      },
    ],
  },
];

export const sampleComboLegs: ComboSelectionLeg[] = [
  {
    market: sampleComboMarkets[0]!,
    outcome: sampleComboMarkets[0]!.outcomes[0]!,
  },
  {
    market: sampleComboMarkets[1]!,
    outcome: sampleComboMarkets[1]!.outcomes[0]!,
  },
];
