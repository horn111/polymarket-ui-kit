# 60-Second Demo Script

Use this for a short walkthrough video or live grant review.

## 0-10s: Thesis

"Polymarket UI Kit is the missing frontend distribution layer for Polymarket
apps. It helps builders put markets into dashboards, blogs, embeds, and social
surfaces without rebuilding the same UI from scratch."

## 10-25s: Core Surfaces

Show the calibrated demo home after the mechanical hero plates settle:

- Market card.
- Price history.
- Orderbook snapshot.
- Share export.

"The kit is read-first. It uses public market data defaults and graceful fallback
states. It does not place orders."

## 25-35s: Link-To-Embed Studio

Show `/studio` as one continuous calibration workspace:

"Paste a Polymarket link and the kit generates a live iframe, React snippet,
OG PNG/SVG routes, and registry command. This is the distribution layer for
blogs, dashboards, media tools, and lightweight builder apps."

## 35-45s: Builder-Code UX

Show Builder Disclosure:

"Builders can show transparent attribution and maker/taker fee preview before
their host app handles an order flow. The UI emits intent payloads; it does not
submit orders."

## 45-55s: Combo-Aware UI

Show Combo-aware surface:

"Combos need a readable frontend layer too. The kit supports public combo-market
discovery, leg selection, combo share cards, and typed intent payloads for host
RFQ flows."

## 55-60s: Ask

"The grant would support the first public release cycle: npm prerelease, hosted
registry custom domain, more embed presets, stronger docs, and accessibility
hardening."

## Optional 60-70s: Verifiable Builder Flow

"For reviewers who want the deeper integration path, the repo includes a dry-run
CLOB V2 Builder Flow example. The UI kit emits a typed intent, the host app
builds an order draft with builderCode, and matched fills can be verified
through the builder field on the relevant fill event."

## Screenshot Checklist

- README hero and quickstart.
- Demo home first viewport.
- Link-to-Embed Studio.
- Builder Disclosure section.
- Combo-aware section.
- Advanced Builder Flow example.
- Interactive lab Combo tab.
- OG PNG export route.
- OG SVG export route.
- GitHub repo file tree showing `packages/core`, `packages/react`, and `docs`.
