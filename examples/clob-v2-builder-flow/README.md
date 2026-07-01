# CLOB V2 Builder Flow Example

Advanced host-app example for turning a Polymarket UI Kit `TradeIntent` into a
CLOB V2 market-order draft with a Builder Code attached.

This example is dry-run by default. Live order placement is gated behind
`POLY_ENABLE_LIVE_ORDERS=true` and server-only environment variables.

## Run

```powershell
pnpm.cmd --filter @polymarket-ui-kit/example-clob-v2-builder-flow dev
```

## Live Mode

Copy `.env.example` to `.env.local`, set a real Builder Code, wallet key, funder
address, CLOB host, and `POLY_ENABLE_LIVE_ORDERS=true`.

The UI kit itself does not sign orders, submit orders, or auto-attach Builder
Codes. This example shows how a host app can own that step.

## Verification

Builder attribution is verifiable after a matched fill. The chain is:

`TradeIntent -> CLOB V2 order with builderCode -> match/fill -> OrderFilled event -> builder field`
