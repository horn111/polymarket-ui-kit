# Component API

The public React package exports:

- `MarketHeader`
- `MarketCard`
- `ProbabilitySparkline`
- `ProbabilityChart`
- `OrderbookPanel`
- `OutcomeSwitcher`
- `FeePill`
- `CommentList`
- `BuilderBadge`
- `ShareCard`
- `LeaderboardTable`
- `MobileTradeDrawer`

All components accept typed data from `@polymarket-ui-kit/core`. Components must
render useful empty and fallback states when data is missing.

## Example

```tsx
import { MarketCard } from "@polymarket-ui-kit/react";

export function Embed({ market }) {
  return <MarketCard market={market} href={market.url} />;
}
```

