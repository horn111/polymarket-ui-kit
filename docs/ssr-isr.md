# SSR and ISR

Use `@polymarket-ui-kit/core` on the server and pass data into React components.

```tsx
import { getMarketBySlug } from "@polymarket-ui-kit/core";
import { MarketCard } from "@polymarket-ui-kit/react";

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
  const market = await getMarketBySlug(params.slug);
  return <MarketCard market={market} />;
}
```

Client hooks are best for comments, orderbook refreshes, and live market states.

