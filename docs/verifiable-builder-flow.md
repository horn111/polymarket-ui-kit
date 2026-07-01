# Verifiable Builder Flow

Polymarket UI Kit is read-first by default. It does not sign orders, submit
orders, approve tokens, or attach a Builder Code automatically.

The advanced Builder Flow example shows how a host app can take a UI Kit
`TradeIntent`, convert it into a CLOB V2 market-order draft with `builderCode`,
and then submit that order from server-owned infrastructure.

## Verification Chain

Builder attribution is verifiable after a matched fill:

```txt
TradeIntent
  -> CLOB V2 order with builderCode
  -> match / fill
  -> OrderFilled event
  -> builder field
```

Creating an order draft is not the proof. The useful proof appears after the
order is matched and emitted through the relevant Polymarket exchange event.

## Example

The advanced example lives in:

```txt
examples/clob-v2-builder-flow
```

Run it locally:

```powershell
pnpm.cmd --filter @polymarket-ui-kit/example-clob-v2-builder-flow dev
```

The example starts in dry-run mode. It can build and display the host-app order
draft without signing or submitting anything.

## Live Mode

Live mode is intentionally server-only and gated by environment variables:

```txt
POLY_ENABLE_LIVE_ORDERS=true
POLY_BUILDER_CODE=0x...
POLY_PRIVATE_KEY=0x...
POLY_FUNDER_ADDRESS=0x...
POLY_CLOB_HOST=https://clob.polymarket.com
POLY_CHAIN_ID=137
```

Never expose private keys in client components, public demos, or screenshots.

## Core Helper

Host apps can use `buildClobV2MarketOrderDraft` from
`@polymarket-ui-kit/core`:

```ts
import { buildClobV2MarketOrderDraft } from "@polymarket-ui-kit/core";

const draft = buildClobV2MarketOrderDraft({
  builderCode: intent.builderCode,
  market: intent.market,
  notional: intent.notional,
  outcome: intent.outcome,
});
```

The helper returns a draft with `tokenID`, `side`, `amount`, `price`,
`builderCode`, and `orderType`. It does not sign, post, or mutate orders.

## Boundaries

- The UI kit never auto-injects a default Builder Code.
- The React package never places authenticated orders.
- Host apps own wallet custody, signing, balances, compliance checks, and order
  submission.
- Public Vercel demos should stay dry-run only.

Official references:

- [Builder Code docs](https://docs.polymarket.com/builders/api-keys)
- [Builder Fees / on-chain attribution](https://docs.polymarket.com/builders/fees)
- [Create Order](https://docs.polymarket.com/trading/orders/create)
- [Contracts](https://docs.polymarket.com/resources/contracts)
