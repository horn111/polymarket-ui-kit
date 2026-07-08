# Grant Application Draft

Use this as copy-ready material for a Polymarket Builders submission. Replace
the placeholders before submitting.

## Product Name

Polymarket UI Kit

## Website URL

https://github.com/horn111/polymarket-ui-kit

## Demo URL

https://polymarket-ui-kit-demo-fkan-chi.vercel.app/

## X Handle

https://x.com/debythm

## Email

`<your-email>`

## Telegram

`<your-telegram>`

## Builder API Key / Builder Code

`<optional-builder-code-or-note>`

Polymarket UI Kit supports Builder-Code-aware UI, but the library does not
auto-inject a default Builder Code and does not submit orders. Host apps own
their authenticated CLOB or RFQ flow.

## Short Description

Open-source React UI kit for Polymarket builders: market cards, public data
hooks, CLOB price history charts, Link-to-Embed Studio, OG/share export,
Builder-Code-aware fee disclosure, and Combo-aware UI primitives.

The goal is to help dashboards, blogs, media products, embeds, and lightweight
apps bring users into Polymarket without rebuilding the same frontend layer from
scratch.

## Problem

Polymarket has strong APIs, but many builders still rebuild the same frontend
surfaces: market cards, odds charts, orderbook panels, share cards, builder
attribution, and now Combo-aware UI. This slows down experimentation and makes it
harder for markets to travel into blogs, dashboards, research portals, and media
products.

## Solution

Polymarket UI Kit is a distribution UI layer for prediction markets. It gives
builders read-first components and hooks that can be dropped into external
surfaces while keeping trading, signing, RFQ flows, and Builder Code handling in
the host app.

The new Link-to-Embed Studio turns a Polymarket URL into a live iframe, React
snippet, OG PNG/SVG links, and shadcn-style registry command. This makes the
project easier to evaluate and easier for builders, blogs, dashboards, and media
tools to try quickly.

## Why This Helps Polymarket

- More teams can embed Polymarket-native surfaces outside polymarket.com.
- Builders can ship prototypes faster using public market data defaults.
- Media and research products can make markets more readable and shareable.
- Builder-Code-aware UX makes attribution and fees visible instead of hidden in
  glue code.
- Combo-aware UI helps builders explain multi-market ideas without building the
  entire frontend from scratch.

## Current Status

- Live demo deployed.
- 19 React components.
- Link-to-Embed Studio route for copy-ready iframe, React, OG, and registry
  outputs.
- Public data hooks for markets, depth, comments, leaderboards, and CLOB price
  history.
- Builder-Code-aware disclosure and trade-intent payloads.
- Combo-aware market discovery, leg picker, share card, and intent payloads.
- Advanced dry-run Builder Flow example that maps UI intent to a CLOB V2 order
  draft with `builderCode` attached.
- PNG/SVG share export route.
- Hosted registry routes on the live demo domain plus registry source files.

## 30-Day Milestones

- Publish the first npm prerelease for `@polymarket-ui-kit/core` and
  `@polymarket-ui-kit/react`.
- Move hosted registry endpoints from the Vercel demo domain to a custom domain.
- Expand Link-to-Embed Studio with more blog, dashboard, social card, and
  Combo-aware presets.
- Improve docs for SSR/ISR, caching, rate-limit handling, and public data
  fallbacks.
- Collect traction signals: GitHub stars, X impressions, demo visits, external
  builder feedback, and first downstream usage.

## Grant Ask

Support continued development of the open-source Polymarket distribution UI
layer: package release, hosted registry, docs, examples, accessibility hardening,
and builder-focused demo surfaces.

## Verifiable Builder Flow

The repo includes an advanced dry-run example for grant reviewers and builders:
`examples/clob-v2-builder-flow`.

It shows the path from UI intent to host-owned CLOB V2 submission:

`TradeIntent -> market-order draft with builderCode -> optional server-side live submission -> matched fill -> OrderFilled builder attribution`.

Live order submission is disabled unless the host app sets
`POLY_ENABLE_LIVE_ORDERS=true` and provides server-only CLOB/wallet env vars.

## Safety / Scope Boundary

This project is independent open-source frontend tooling. It is not affiliated
with Polymarket. It is read-first by default and does not place authenticated
orders from the core or React packages, submit RFQ quotes, sign messages, or
auto-attach Builder Codes.
