# Component API

The public React package exports display primitives, public data hooks, providers,
and theme utilities.

## Components

- `MarketHeader`
- `MarketCard`
- `EvidenceRail`
- `PollMarketComparison`
- `ProbabilitySparkline`
- `ProbabilityChart`
- `OrderbookPanel`
- `OutcomeSwitcher`
- `FeePill`
- `CommentList`
- `ComboBuilderCard`
- `ComboIntentPreview`
- `ComboLegList`
- `ComboLegPicker`
- `ComboShareCard`
- `EmbedSnippetPanel`
- `BuilderBadge`
- `BuilderFeeDisclosure`
- `ShareCard`
- `LeaderboardTable`
- `MobileTradeDrawer`

All components accept typed data from `@polymarket-ui-kit/core`. Components must
render useful empty and fallback states when data is missing.

## Evidence and poll context

`EvidenceRail` accepts host-provided `EvidenceItem[]` and renders official
records, polls, models, reporting, and other sources. `PollMarketComparison`
accepts `PollMarketComparisonRow[]` with `0..1` poll shares and market
probabilities. These are display contracts only; the kit does not fetch or
endorse external political data.

```tsx
<EvidenceRail items={verifiedSources} maxVisible={4} />
<PollMarketComparison rows={comparisonRows} />
```

## Hooks

- `useMarket`
- `useMarkets`
- `useOrderbook`
- `usePriceHistory`
- `useComments`
- `useComboMarkets`
- `useComboSelection`
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
- `listComboMarkets`
- `getOrderbook`
- `getPriceHistory`
- `normalizePriceHistory`
- `createShareCardSvg`
- `resolvePolymarketSlug`
- `buildEmbedUrl`
- `buildShareImageUrl`
- `buildIframeSnippet`
- `buildReactSnippet`
- `buildRegistryCommand`
- `buildClobV2MarketOrderDraft`
- `buildComboIntent`
- formatters and fee preview helpers

## Example

```tsx
import { MarketCard } from "@polymarket-ui-kit/react";

export function Embed({ market }) {
  return <MarketCard market={market} href={market.url} />;
}
```
