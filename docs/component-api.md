# Component API

The public React package exports display primitives, public data hooks, providers,
and theme utilities.

## Components

- `MarketHeader`
- `MarketCard`
- `ProbabilitySparkline`
- `ProbabilityChart`
- `OrderbookPanel`
- `OutcomeSwitcher`
- `FeePill`
- `CommentList`
- `BuilderBadge`
- `BuilderFeeDisclosure`
- `ShareCard`
- `LeaderboardTable`
- `MobileTradeDrawer`

All components accept typed data from `@polymarket-ui-kit/core`. Components must
render useful empty and fallback states when data is missing.

## Hooks

- `useMarket`
- `useMarkets`
- `useOrderbook`
- `usePriceHistory`
- `useComments`
- `useLeaderboard`
- `useShareImage`
- `usePolymarketBuilder`
- `usePolymarketClient`

Data hooks accept either legacy `initialData` as the final argument or an options
object:

```tsx
const market = useMarket(slug, {
  initialData,
  enabled: true,
  refetchOnMount: false,
  refetchIntervalMs: 60_000,
});
```

## Core Utilities

`@polymarket-ui-kit/core` exports public adapters and helpers:

- `getMarketBySlug`
- `listMarkets`
- `listComments`
- `getOrderbook`
- `getPriceHistory`
- `normalizePriceHistory`
- `createShareCardSvg`
- formatters and fee preview helpers

## Example

```tsx
import { MarketCard } from "@polymarket-ui-kit/react";

export function Embed({ market }) {
  return <MarketCard market={market} href={market.url} />;
}
```
