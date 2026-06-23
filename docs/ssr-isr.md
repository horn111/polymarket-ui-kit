# SSR and ISR

Use `@polymarket-ui-kit/core` on the server and pass data into React components.
Client hooks can accept the same data as `initialData` and skip refetching on
mount when the page was just rendered by ISR.

```tsx
import { getMarketBySlug, getPriceHistory } from "@polymarket-ui-kit/core";
import { MarketCard } from "@polymarket-ui-kit/react";

export const revalidate = 60;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = await getMarketBySlug(slug);
  const tokenId = market.clobTokenIds[0];
  const points = tokenId
    ? await getPriceHistory({ tokenId, interval: "1w", fidelity: 60 })
    : [];

  return <MarketCard market={market} points={points} />;
}
```

Client hooks are best for comments, orderbook refreshes, and live market states.

```tsx
import { useMarket } from "@polymarket-ui-kit/react";

export function ClientMarket({ slug, initialMarket }) {
  const market = useMarket(slug, {
    initialData: initialMarket,
    refetchOnMount: false,
    refetchIntervalMs: 60_000,
  });

  return market.data ? <span>{market.data.question}</span> : null;
}
```
