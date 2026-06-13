const components = [
  "MarketHeader",
  "MarketCard",
  "ProbabilitySparkline",
  "ProbabilityChart",
  "OrderbookPanel",
  "OutcomeSwitcher",
  "FeePill",
  "CommentList",
  "BuilderBadge",
  "ShareCard",
  "LeaderboardTable",
  "MobileTradeDrawer"
];

export default function ComponentsPage() {
  return (
    <section className="docs-section">
      <h1>Components</h1>
      <div className="docs-card-grid">
        {components.map((component) => (
          <article className="pui-card pui-stack" key={component}>
            <span className="pui-badge">MVP</span>
            <h2 className="pui-market-title">{component}</h2>
            <p className="pui-muted">
              Typed, themeable, SSR-friendly, and ready for Storybook coverage.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

