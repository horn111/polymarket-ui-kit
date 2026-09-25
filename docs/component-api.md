# Component API

The public React package exports display primitives, public data hooks, providers,
and theme utilities.

## Components

- `MarketHeader`
- `MarketCard`
- `ElectionBriefCard`
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

`ElectionBriefCard` pairs ranked market outcomes with separate poll vote shares,
optional supplied price history, an expandable source record, and a settlement
summary. Wide containers place the question and provenance beside the data sheet;
narrow containers show the question, data, then provenance. It accepts `market`, optional `points`, `polls`, `evidence`,
`resolutionSummary`, and `sourceLabel`. The host is responsible for checking and updating polling,
sources, and rules. Missing outside context is disclosed in the component.

```tsx
<ElectionBriefCard
  market={market}
  points={priceHistory}
  polls={verifiedPollRows}
  evidence={verifiedSources}
  resolutionSummary={verifiedResolutionRule}
  sourceLabel="Live market"
/>
```

`MarketCard` is the general ranked outcome sheet. Its optional
`onOutcomeChange` and `selectedOutcomeId` make rows selectable; without a
callback, rows remain read-only. A supplied `href` links the whole card.

`MobileTradeDrawer` calculates fees without placing an order. Without
`onTradeIntent`, it stays in the document flow and shows a preview-only notice.
With a callback, it uses a fixed drawer and Continue emits
the selected outcome and a finite notional of at least $1 to the host application;
invalid amounts disable the action.

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

Hooks work with or without `PolymarketProvider`. Polling skips a tick while its
current request is pending; calls to `refresh()` during that request are ignored.
Changing the query starts a new request and ignores late results from the old
query. A failed refresh retains the previous data and sets `isStale`.

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
