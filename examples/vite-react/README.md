# Vite React Example

Use client-side hooks for a single-page dashboard or embed builder.

```tsx
import { MarketCard, useMarkets } from "@polymarket-ui-kit/react";

export function MarketGrid() {
  const { data, isLoading } = useMarkets({ active: true, limit: 6 });
  if (isLoading) return "Loading markets";
  return data?.map((market) => <MarketCard key={market.id} market={market} />);
}
```

