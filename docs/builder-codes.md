# Builder Codes

Builder Codes are public `bytes32` identifiers that attribute orders routed through an application to a Polymarket builder profile.

Polymarket UI Kit does not submit orders, sign orders, or attach a Builder Code by itself. It gives builders the UI layer for transparent attribution, fee disclosure, and trade-intent handoff.

## What This Kit Provides

- `BuilderBadge` for visible builder attribution.
- `BuilderFeeDisclosure` for clear maker/taker fee display.
- `FeePill` and core fee helpers for estimated builder fees.
- `MobileTradeDrawer` trade intents that include `builderCode`, `builderFeeSide`, and `feePreview`.
- `PolymarketProvider` builder config for app-wide attribution defaults.

## How Builder Codes Work

A Builder Code only matters when the host application submits an order through its own Polymarket CLOB V2 integration and passes `builderCode` with that order.

For content embeds, blog cards, dashboards, and social previews, this kit can show attribution and estimated fees, but no fee is charged unless an actual attributed order is submitted and matched.

## Example

```tsx
import { PolymarketProvider, MobileTradeDrawer } from "@polymarket-ui-kit/react";

const builder = {
  name: "Forecast Studio",
  handle: "@forecast-studio",
  code: process.env.NEXT_PUBLIC_POLY_BUILDER_CODE,
  takerFeeBps: 25,
  makerFeeBps: 10,
};

export function App({ market }) {
  return (
    <PolymarketProvider builder={builder}>
      <MobileTradeDrawer
        market={market}
        onTradeIntent={(intent) => {
          // Host app decides how to route this into its own CLOB V2 order flow.
          console.log(intent.builderCode, intent.feePreview.totalCost);
        }}
      />
    </PolymarketProvider>
  );
}
```

## Boundaries

- Do not put private keys or order-signing logic in this UI kit.
- Do not use a real Builder Code in public demos unless it belongs to that demo app.
- Do not hide builder fees. Use fee disclosure before trade intent callbacks.
- Keep order placement in the host app, where wallet, auth, balances, and compliance checks belong.
