# Data Sources

## Gamma API

Used for markets, events, search, comments, tags, sports, and public profiles.

## Data API

Used for positions, trades, activity, open interest, leaderboards, and builder
analytics.

## CLOB API

Used for public orderbook data, pricing, spreads, midpoints, and price history.
Authenticated trading endpoints are intentionally outside the v0 scope.

## WebSocket

The market channel is used for near-real-time book and price updates. Hooks must
keep stale data visible when the stream disconnects.

