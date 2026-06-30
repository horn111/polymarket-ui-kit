# Registry

Registry items are for teams that want to own and customize component code.

```bash
npx shadcn@latest add https://polymarket-ui-kit.dev/r/market-card.json
npx shadcn@latest add https://polymarket-ui-kit.dev/r/orderbook-panel.json
npx shadcn@latest add https://polymarket-ui-kit.dev/r/share-card.json
npx shadcn@latest add https://polymarket-ui-kit.dev/r/combo-share-card.json
```

Rules:

- Keep registry files small and readable.
- Avoid hidden runtime magic.
- Prefer shadcn-compatible class names.
- Use `@polymarket-ui-kit/core` for normalized types and API helpers.
