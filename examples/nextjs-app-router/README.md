# Next.js App Router Example

Server-load market data with `@polymarket-ui-kit/core`, then render with
`@polymarket-ui-kit/react`.

```tsx
import { getMarketBySlug } from "@polymarket-ui-kit/core";
import { MarketCard } from "@polymarket-ui-kit/react";

export default async function Page({ params }: { params: { slug: string } }) {
  const market = await getMarketBySlug(params.slug);
  return <MarketCard market={market} href={market.url} />;
}
```

