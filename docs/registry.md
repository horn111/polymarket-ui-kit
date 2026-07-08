# Registry

Registry items are for teams that want to own and customize component code.

```bash
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/market-card.json
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/orderbook-panel.json
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/share-card.json
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/combo-share-card.json
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/embed-studio.json
```

Registry index:
https://polymarket-ui-kit-demo-fkan-chi.vercel.app/registry.json

The custom `polymarket-ui-kit.dev` registry domain is planned. Until then, use
the live Vercel demo registry URL above.

Rules:

- Keep registry files small and readable.
- Avoid hidden runtime magic.
- Prefer shadcn-compatible class names.
- Use `@polymarket-ui-kit/core` for normalized types and API helpers.
