export default function RegistryPage() {
  return (
    <section className="docs-section">
      <h1>Registry</h1>
      <div className="pui-stack">
        <p className="docs-copy">
          Use registry items when you want Polymarket-specific components copied into
          your app for full design control.
        </p>
        <pre className="docs-code">
          <code>{`npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/market-card.json
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/orderbook-panel.json
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/share-card.json
npx shadcn@latest add https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r/embed-studio.json`}</code>
        </pre>
      </div>
    </section>
  );
}
