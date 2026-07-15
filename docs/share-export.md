# Share Export

Polymarket UI Kit supports two share-image paths:

The renderer uses the same Mechanical Probability materials, copper calibration
signal, and light/dark semantic palette as the React components. Existing URL
parameters remain backward compatible.

- `ShareCard` renders a React component that can be embedded in app surfaces.
- `createShareCardSvg` returns a framework-agnostic SVG string for API routes,
  workers, static generation, and fixture generation.

The demo app exposes both from one endpoint:

```txt
/api/og?slug=<market-slug>&theme=dark&format=png
/api/og?slug=<market-slug>&theme=dark&format=svg
```

## Why This Matters

Prediction market links often need more context than a default site preview. A
builder, newsletter, dashboard, or social tool can turn a Polymarket slug into a
large readable card with the question, leading outcome, probability, and volume
without rebuilding the graphics layer.

## Core API

```ts
import { createShareCardSvg, getMarketBySlug } from "@polymarket-ui-kit/core";

const market = await getMarketBySlug("who-will-win-the-2028-us-presidential-election");
const svg = createShareCardSvg(market, {
  attribution: "your-product.com",
  theme: "dark",
});
```

`createShareCardSvg` escapes market text before embedding it in SVG. The output
is deterministic and does not require React.

## React Hook

```tsx
import { useShareImage } from "@polymarket-ui-kit/react";

export function ShareActions({ slug }: { slug: string }) {
  const png = useShareImage({ slug, format: "png", theme: "dark" });
  const svg = useShareImage({ slug, format: "svg", theme: "dark" });

  return (
    <>
      <a href={png.url}>PNG</a>
      <a href={svg.url}>SVG</a>
    </>
  );
}
```

The hook only builds URLs. Host apps own the route implementation and can point
`baseUrl` at their production domain.

## Demo Route Behavior

The demo route tries to fetch public market data by slug. If the public API is
unavailable or the slug does not resolve, it falls back to fixture data and keeps
the image route alive. This is intentional for demos, docs previews, and launch
screenshots.
