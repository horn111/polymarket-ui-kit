import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import { MarketCard } from "@polymarket-ui-kit/react";

const market: PolymarketMarket = {
  id: "example",
  slug: "example",
  question: "Will this Next.js example render a Polymarket card?",
  status: "open",
  active: true,
  closed: false,
  archived: false,
  outcomes: [
    { id: "yes", name: "Yes", price: 0.72 },
    { id: "no", name: "No", price: 0.28 }
  ],
  clobTokenIds: []
};

export default function Page() {
  return (
    <main className="example-shell">
      <span>Next.js App Router / calibrated example</span>
      <h1>One market. One precise surface.</h1>
      <MarketCard market={market} />
    </main>
  );
}
