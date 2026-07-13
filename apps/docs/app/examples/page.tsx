export default function ExamplesPage() {
  return (
    <section className="docs-section">
      <h1>Examples</h1>
      <div className="pui-stack">
        <pre className="docs-code">
          <code>{`import { MarketCard } from "@polymarket-ui-kit/react";

export function MarketEmbed({ market }) {
  return <MarketCard market={market} href={market.url} />;
}`}</code>
        </pre>
        <pre className="docs-code">
          <code>{`import { getMarketBySlug } from "@polymarket-ui-kit/core";

export default async function Page({ params }) {
  const market = await getMarketBySlug(params.slug);
  return <MarketCard market={market} />;
}`}</code>
        </pre>
      </div>
    </section>
  );
}
