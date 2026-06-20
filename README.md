<p align="center">
  <img src="https://img.shields.io/badge/React-first-149eca?style=for-the-badge&logo=react&logoColor=white" alt="React first" />
  <img src="https://img.shields.io/badge/Polymarket-UI%20Kit-0f766e?style=for-the-badge" alt="Polymarket UI Kit" />
  <img src="https://img.shields.io/badge/Registry-shadcn%20style-111827?style=for-the-badge" alt="shadcn style registry" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</p>

<h1 align="center">Polymarket UI Kit</h1>

<p align="center">
  <strong>Drop-in React components, public data hooks, and copy-in registry items for Polymarket apps.</strong>
</p>

<p align="center">
  <a href="#60-second-quickstart">Quickstart</a> ·
  <a href="#components">Components</a> ·
  <a href="#data-architecture">Data</a> ·
  <a href="#ssrisr">SSR/ISR</a> ·
  <a href="#builder-and-grant-angle">Builder angle</a>
</p>

<h3 align="center">Light</h3>

<img alt="Polymarket UI Kit preview (Light)" src="apps/docs/public/screenshots/hero.svg?v=1" width="100%">

<h3 align="center">Dark</h3>

<img alt="Polymarket UI Kit preview (Dark)" src="apps/docs/public/screenshots/hero-dark.svg?v=1" width="100%">

Build market cards, probability charts, orderbook panels, comment feeds, builder
badges, fee previews, leaderboard tables, mobile trade previews, and social share
cards without rebuilding the same Polymarket UI layer from scratch.

This project is built for frontend developers, media tools, embeddings, dashboard
builders, content products, and research portals that need Polymarket-native UI
with strong defaults and clean escape hatches.

## Turn Any Polymarket Link Into A Live Market Card

```tsx
import { MarketCard, useMarket } from "@polymarket-ui-kit/react";
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";

export function LiveMarketCard({ slug }: { slug: string }) {
  const { data: market, isLoading, error } = useMarket(slug);

  if (isLoading) return <div>Loading market...</div>;
  if (error || !market) return <div>Market unavailable</div>;

  return <MarketCard market={market} href={market.url} />;
}
```

## 60-Second Quickstart

Install the React package:

```bash
pnpm add @polymarket-ui-kit/react
```

Or copy a component into a shadcn-style project:

```bash
npx shadcn@latest add https://polymarket-ui-kit.dev/r/market-card.json
```

Import styles once:

```tsx
import "@polymarket-ui-kit/react/styles.css";
import "@polymarket-ui-kit/react/themes.css";
```

## Copy-Paste Examples

Market card:

```tsx
import { getMarketBySlug } from "@polymarket-ui-kit/core";
import { MarketCard } from "@polymarket-ui-kit/react";

export default async function Page({ params }: { params: { slug: string } }) {
  const market = await getMarketBySlug(params.slug);
  return <MarketCard market={market} href={market.url} />;
}
```

Orderbook panel:

```tsx
import { OrderbookPanel, useOrderbook } from "@polymarket-ui-kit/react";

export function Depth({ tokenId }: { tokenId: string }) {
  const { data, isLoading } = useOrderbook(tokenId);
  if (isLoading) return <div>Loading depth...</div>;
  return <OrderbookPanel orderbook={data} />;
}
```

Share image card:

```tsx
import { ShareCard } from "@polymarket-ui-kit/react";

export function MarketScreenshot({ market }) {
  return <ShareCard market={market} attribution="your-product.com" />;
}
```

## Builder-Code-Aware UX

Builder Codes are public `bytes32` identifiers used by host applications when they submit Polymarket CLOB V2 orders. This kit does not place orders, but it helps builders make attribution and fee disclosure clear before handing off a trade intent.

```tsx
import {
  BuilderFeeDisclosure,
  MobileTradeDrawer,
  PolymarketProvider,
} from "@polymarket-ui-kit/react";

const builder = {
  name: "Forecast Studio",
  handle: "@forecast-studio",
  code: process.env.NEXT_PUBLIC_POLY_BUILDER_CODE,
  takerFeeBps: 25,
  makerFeeBps: 10,
};

export function BuilderAwareMarket({ market }) {
  return (
    <PolymarketProvider builder={builder}>
      <BuilderFeeDisclosure builder={builder} notional={100} side="taker" />
      <MobileTradeDrawer
        market={market}
        onTradeIntent={(intent) => {
          // Pass intent.builderCode into your own CLOB V2 order flow.
        }}
      />
    </PolymarketProvider>
  );
}
```

Read the implementation notes in [docs/builder-codes.md](docs/builder-codes.md).

## Components

| Component              | Purpose                                                   | Status |
| ---------------------- | --------------------------------------------------------- | ------ |
| `MarketHeader`         | Question, status, category, volume, expiry, builder badge | MVP    |
| `MarketCard`           | Compact embeddable market card                            | MVP    |
| `ProbabilitySparkline` | Lightweight inline price movement                         | MVP    |
| `ProbabilityChart`     | Multi-series probability chart                            | MVP    |
| `OrderbookPanel`       | Bid/ask depth with spread and totals                      | MVP    |
| `OutcomeSwitcher`      | Yes/No or multi-outcome selector                          | MVP    |
| `FeePill`              | Platform and builder fee preview                          | MVP    |
| `CommentList`          | Public market comments                                    | MVP    |
| `BuilderBadge`         | Builder identity and attribution surface                  | MVP    |
| `BuilderFeeDisclosure` | Builder code attribution and maker/taker fee disclosure   | MVP    |
| `ShareCard`            | X-ready market screenshot and OG card base                | MVP    |
| `LeaderboardTable`     | Trader leaderboard rows                                   | MVP    |
| `MobileTradeDrawer`    | Read-first trade intent preview                           | MVP    |

## Data Architecture

Polymarket UI Kit is read-first in v0. It defaults to public market data and
does not place authenticated orders.

| Source         | Used for                                           | Auth                   |
| -------------- | -------------------------------------------------- | ---------------------- |
| Gamma API      | markets, events, search, comments, profiles        | No                     |
| Data API       | positions, trades, leaderboards, builder analytics | No                     |
| CLOB API       | orderbooks, midpoints, spreads, price history      | Public for market data |
| CLOB WebSocket | live book and price updates                        | No for market channel  |

The core package normalizes API responses into stable UI types so components can
accept either preloaded server data or client-side hooks.

## SSR/ISR

Server-load with `@polymarket-ui-kit/core`, render with
`@polymarket-ui-kit/react`, then refresh client-side only where live updates are
needed.

```tsx
import { getMarketBySlug } from "@polymarket-ui-kit/core";
import { MarketCard } from "@polymarket-ui-kit/react";

export const revalidate = 60;

export default async function MarketPage({ params }: { params: { slug: string } }) {
  const market = await getMarketBySlug(params.slug);
  return <MarketCard market={market} points={[]} />;
}
```

## Theming

The package ships CSS variables and a tiny theme provider. You can use it as-is,
override variables, or copy registry files into your own design system.

```css
:root {
  --pui-accent: #0f766e;
  --pui-radius-md: 8px;
}
```

## Why This Exists

The Polymarket ecosystem has dashboards, APIs, bots, and trading tools. What is
still weak is the frontend layer: polished market primitives that a builder can
drop into a media product, research portal, dashboard, or embed in minutes.

The moat is not just visual polish. It is DX:

- first-class TypeScript types
- no-auth public data defaults
- SSR/ISR-friendly APIs
- Storybook and visual states
- shadcn-style copy-in registry
- launch-ready share cards
- builder-code-aware fee and attribution surfaces

## Demo Links

- Docs app: `pnpm docs:dev`
- Demo app: `pnpm demo:dev`
- Storybook: `pnpm storybook`
- Registry validation: `pnpm registry:validate`

## Builder And Grant Angle

This is an independent open-source project for the Polymarket ecosystem. The
goal is to help more teams build market-native interfaces, distribute markets
into vertical apps, and make builder-code-aware UX easier to ship.

The repo includes:

- [Grant strategy](docs/grant-strategy.md)
- [Launch playbook](docs/launch-playbook.md)
- [Tweet templates](docs/tweet-templates.md)
- [Builder Codes notes](docs/builder-codes.md)

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Component requests, examples, visual
states, accessibility fixes, and adapter improvements are all welcome.

## Disclaimer

Polymarket UI Kit is not affiliated with Polymarket. It is open-source frontend
tooling for builders using public Polymarket data and APIs.

## License

MIT. See [LICENSE](LICENSE).
