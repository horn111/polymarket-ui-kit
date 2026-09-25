# Link-to-Embed Studio

Link-to-Embed Studio turns a Polymarket URL or market slug into copy-ready
distribution surfaces:

- live iframe embed
- React snippet
- OG PNG route
- OG SVG route
- shadcn-style registry command

Live demo:
https://polymarket-ui-kit-demo-fkan-chi.vercel.app/studio

## Why It Exists

Many builders, media products, blogs, and dashboards do not need a full trading
terminal. They need a clean way to make Polymarket markets readable and
shareable outside polymarket.com.

Studio is the shortest path:

```txt
Polymarket link -> live embed -> blog, dashboard, social post, or app surface
```

## Supported Inputs

Studio accepts:

```txt
will-bitcoin-hit-100k-in-2026
https://polymarket.com/event/will-bitcoin-hit-100k-in-2026
https://polymarket.com/event/will-bitcoin-hit-100k-in-2026?ref=builder#comments
```

The core helper strips query strings and hash fragments, validates the slug, and
rejects non-Polymarket hosts.

`sample` is reserved by the demo for illustrative data. It works in the demo's
iframe and image routes; it is not a Polymarket API slug. Paste a real market slug
before copying the generated `useMarket` React example into another app.

Unavailable markets show a retry state. Image requests for unavailable markets
return HTTP 503 with `Cache-Control: no-store`. Missing history or orderbook data
stays empty and is labeled as partial data. The app never relabels a fixture as
the market you requested.

## Generated Outputs

```ts
import {
  buildEmbedUrl,
  buildIframeSnippet,
  buildReactSnippet,
  buildShareImageUrl,
  resolvePolymarketSlug,
} from "@polymarket-ui-kit/core";

const slug = resolvePolymarketSlug("https://polymarket.com/event/example-market");

const iframe = buildIframeSnippet({
  slug,
  surface: "share-card",
  theme: "dark",
  baseUrl: "https://your-app.com",
});

const png = buildShareImageUrl({
  slug,
  format: "png",
  theme: "dark",
});
```

## Surfaces

- `share-card` for social, newsletters, and editorial embeds.
- `market-card` for compact app/dashboard widgets.
- `builder-disclosure` for public Builder Code attribution and fee disclosure.

Builder Code is treated as public attribution data only. Studio does not sign,
submit, place orders, inject default Builder Codes, or handle private keys.

## Hosted Registry

The demo serves registry items with complete source content and local helper
dependencies, including the shared `polymarket-theme.css` file. Theme scopes use
the same `data-pui-theme` attribute as the React package; see [theming](theming.md).
Text fields update the preview and generated snippets together after 450 ms
without typing, avoiding a new embed request for each keystroke.
Rebuild the registry before deploying changes:

```bash
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/embed-studio.json
```

The planned custom registry domain is still future work. Until then, use the
Vercel demo registry URL above.
