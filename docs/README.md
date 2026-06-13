# Docs Directory Guide

This directory is the strategic and technical source of truth for the repo. It is
different from `apps/docs`, which is the public website. Files here explain why
the project exists, how it should be built, how adoption should happen, and what
evidence matters for grants or ecosystem attention.

## File Map

| File                 | Purpose                                                    | What it covers                                                                                                                                                                                                                                  | When to update it                                                                                                                   |
| -------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `architecture.md`    | Defines the monorepo shape and package boundaries.         | The split between `core`, `react`, `registry`, `cli`, docs, demo, and Storybook; the data flow from Polymarket APIs into UI primitives; the v0 boundary that excludes authenticated trading.                                                    | Update when packages are added, package ownership changes, or the project starts supporting order placement or new runtime targets. |
| `component-api.md`   | Lists the public React surface area.                       | MVP components such as `MarketCard`, `ProbabilityChart`, `OrderbookPanel`, `CommentList`, `BuilderBadge`, `ShareCard`, and `MobileTradeDrawer`; the expectation that components accept typed core data and render useful empty/fallback states. | Update whenever a component is added, renamed, removed, or promoted from experimental to stable.                                    |
| `data-sources.md`    | Documents where market data should come from.              | Gamma API for market metadata and comments, Data API for activity and leaderboards, CLOB API for orderbooks and prices, and WebSocket behavior for live updates.                                                                                | Update when adapters change, new public Polymarket endpoints are supported, or fallback behavior changes.                           |
| `registry.md`        | Explains the shadcn-style copy-in distribution path.       | Registry install commands, design rules for registry items, and the rule that registry components should stay readable and avoid hidden runtime magic.                                                                                          | Update when registry URLs, registry schema, or copy-in component conventions change.                                                |
| `ssr-isr.md`         | Shows how to use the kit in server-rendered Next.js apps.  | Fetching data through `@polymarket-ui-kit/core` on the server, passing typed props into React components, ISR with `revalidate`, and using client hooks for live states.                                                                        | Update when server APIs, caching strategy, or Next.js examples change.                                                              |
| `theming.md`         | Defines how apps should customize the visual system.       | CSS variable imports, variable overrides at the app root, radius/accent examples, and dark mode through `data-pui-theme="dark"`.                                                                                                                | Update when tokens are renamed, theme files move, or Tailwind/registry theming conventions mature.                                  |
| `grant-strategy.md`  | Frames the project as a Polymarket ecosystem growth asset. | Why the kit can expand market distribution, what proof to collect, and the short grant submission angle.                                                                                                                                        | Update after launches, npm releases, user adoption, external PRs, demo traffic, or builder feedback.                                |
| `launch-playbook.md` | Turns development progress into public distribution.       | Prelaunch checklist, launch channels, X thread strategy, builder/community outreach, and post-launch cadence.                                                                                                                                   | Update before each launch phase or whenever a promotion channel starts working or stops working.                                    |
| `tweet-templates.md` | Provides ready-to-adapt X post drafts.                     | Launch, component update, registry angle, and grant angle copy focused on builders and Polymarket distribution.                                                                                                                                 | Update after every visible product improvement so public updates stay specific and visual.                                          |

## GitHub Repository Metadata

Recommended short description:

> React components, data hooks, and shadcn-style registry items for building Polymarket apps, embeds, dashboards, and share cards.

Recommended topics:

```txt
polymarket
prediction-markets
react
typescript
ui-kit
component-library
shadcn-ui
nextjs
storybook
data-hooks
orderbook
charts
websocket
clob
og-image
vercel
open-source
frontend
```
