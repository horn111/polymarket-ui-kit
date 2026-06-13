# Tweet Templates

## Launch

I am building the missing UI layer for Polymarket apps.

React components, public data hooks, and shadcn-style registry items:

- market cards
- orderbooks
- comments
- charts
- builder badges
- share cards

Repo: https://github.com/horn111/polymarket-ui-kit

## Component update

New in Polymarket UI Kit: `MarketCard`.

Drop in one component and get:

- live market metadata
- outcome prices
- volume and comments
- theme-ready styling
- SSR-friendly props

Builders should not rebuild this from scratch every time.

## Registry angle

NPM packages are good.
Copy-in components are better when your app needs design control.

Polymarket UI Kit now has shadcn-style registry installs:

`npx shadcn@latest add https://polymarket-ui-kit.dev/r/market-card.json`

## Grant angle

Polymarket has APIs.
Builders need distribution-ready interfaces.

Polymarket UI Kit turns market data into reusable cards, charts, orderbooks,
comments, and share images for apps, media products, and research portals.

