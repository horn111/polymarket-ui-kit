import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import { MarketCard } from "@polymarket-ui-kit/react";
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";

const market: PolymarketMarket = {
  id: "vite-example",
  slug: "vite-example",
  question: "Will this Vite example render a Polymarket card?",
  status: "open",
  active: true,
  closed: false,
  archived: false,
  outcomes: [
    { id: "yes", name: "Yes", price: 0.61 },
    { id: "no", name: "No", price: 0.39 }
  ],
  clobTokenIds: []
};

export function App() {
  return <MarketCard market={market} />;
}

