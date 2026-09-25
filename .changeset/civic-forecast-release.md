---
"@polymarket-ui-kit/core": minor
"@polymarket-ui-kit/react": minor
"@polymarket-ui-kit/registry": minor
"@polymarket-ui-kit/cli": minor
---

Prepare the first Civic Forecast release. Make package imports work in native
Node.js ESM, include source content and complete local dependencies in registry
payloads, and verify all distributed entrypoints.

Add dated probability charts with accessible summaries, explicit share-card
status labels, keyboard navigation for snippet tabs, and clipboard failure
feedback. Read-only market cards show outcomes without inactive buttons.

Replace the ambiguous brand symbol with a CF monogram. Rework market and share
cards as dark teal panels with ruled outcome rows and add `ElectionBriefCard` for a separated
reading of market odds, outside polling, source records, and settlement rules.
The new briefing is available in the React package and as a registry item;
outside civic data remains host-supplied.

Present the demo as an editorial component catalogue. Pair Source Serif 4
questions and headings with Instrument Sans data, give each specimen its own
explanation, and separate the briefing's question and provenance from its data.

The demo and documentation use self-hosted fonts and a shared teal-and-brass
palette. The component explorer supports dragging, touch, keyboard navigation,
and reduced motion. Studio previews resize to fit their contents. The demo serves fixtures only through the explicit sample route and no
longer substitutes invented prices when a public market request fails.

Keep provider-free data clients stable and skip polling while a request is pending.
Follow OS theme changes in system mode and ship shared theme CSS with all registry
items. Improve light-theme contrast, mobile table semantics, control target sizes,
and selected-state announcements. Read-only trade previews explain their status
and stay in the page flow; connected trade actions require a valid notional.
Debounce Studio text fields so typing does not reload the preview on every key.
