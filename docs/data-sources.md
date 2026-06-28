# Data Sources

## Gamma API

Used for markets, events, search, comments, tags, sports, and public profiles.
Market pages can server-load by slug with `getMarketBySlug` and pass the result
into React components as `initialData`.

## Data API

Used for positions, trades, activity, open interest, leaderboards, and builder
analytics.

## CLOB API

Used for public orderbook data, pricing, spreads, midpoints, and price history.
Authenticated trading endpoints are intentionally outside the v0 scope.

Price history uses the public CLOB endpoint:

```txt
GET https://clob.polymarket.com/prices-history?market=<asset-id>&interval=1w&fidelity=60
```

`market` is the outcome asset/token id, not the human-readable slug. The adapter
normalizes the current `{ history: [{ t, p }] }` response into
`MarketPricePoint[]`.

## Combo RFQ API

Used for public combo-market discovery:

```txt
GET https://combos-rfq-api.polymarket.com/v1/rfq/combo-markets
```

The UI kit uses the public catalog only. Authenticated RFQ quote submission,
maker flows, and quoter gateway infrastructure are intentionally left to host
applications.

## WebSocket

The market channel is planned for near-real-time book and price updates. Hooks
must keep stale data visible when the stream disconnects. The current public hook
update remains HTTP-first and does not add streaming behavior.
