# Grant Strategy

Polymarket UI Kit should be framed as ecosystem distribution infrastructure, not
as another dashboard or trading client.

## Evaluator Narrative

Polymarket has strong APIs and growing builder incentives. What is still missing
for many lightweight builders is a polished frontend layer that makes markets
easy to embed, explain, and share across external products.

Polymarket UI Kit gives builders reusable React primitives, public data hooks,
Builder-Code-aware disclosure, share/export surfaces, and Combo-aware UI. The
project helps markets travel into blogs, dashboards, research portals, media
tools, and social posts.

## Problem

Builders repeatedly recreate the same market cards, probability charts,
orderbook panels, fee disclosures, social cards, and fallback states. That
duplication slows experimentation and makes external Polymarket distribution
less consistent.

## Solution

Ship an open-source read-first UI kit:

- Public market data hooks with SSR/ISR-friendly fallbacks.
- Drop-in components for markets, orderbooks, charts, comments, and share cards.
- Builder-Code-aware attribution and fee preview UX.
- Combo-aware leg picking, share cards, and typed intent payloads.
- shadcn-style registry items for teams that want to own copied code.

## Audience

- Frontend builders with limited time.
- Media products embedding markets into stories.
- Dashboard and research tool builders.
- Social and newsletter workflows that need readable market cards.
- Polymarket-native apps that want better defaults before building custom UI.

## Adoption Path

1. Builder finds the repo from X, GitHub, or the live demo.
2. Builder tries the demo or local dev flow.
3. Builder copies a component or installs the first npm prerelease.
4. Builder embeds market cards, share cards, or Combo surfaces in their product.
5. Builder optionally wires emitted intents into their own CLOB/RFQ integration.

## Grant Ask

Funding would support the first public release cycle:

- npm prerelease for core and React packages.
- hosted registry endpoints.
- demo gallery for blogs, dashboards, embeds, social cards, and Combo surfaces.
- accessibility and visual state hardening.
- stronger docs for caching, SSR/ISR, public data fallbacks, and builder codes.

## Evidence To Collect

- GitHub stars.
- demo page visits.
- X impressions and replies from builders.
- npm downloads after prerelease.
- registry installs after hosted endpoints.
- screenshots from apps using the kit.
- issues or PRs from external builders.

## One-Line Submission Angle

Polymarket has APIs. Polymarket UI Kit gives builders the frontend distribution
layer that helps markets travel into new products.
