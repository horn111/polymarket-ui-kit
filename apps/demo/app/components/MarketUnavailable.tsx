export function MarketUnavailable({ slug }: { slug: string }) {
  return (
    <section className="civic-route" aria-labelledby="unavailable-title">
      <a className="civic-route__back" href="/studio">
        Back to Studio
      </a>
      <div className="pui-panel pui-stack">
        <h1 id="unavailable-title">Market unavailable</h1>
        <p>
          We couldn’t load “{slug}” from Polymarket. Check the market URL or try again
          in a moment.
        </p>
        <p className="pui-muted">No prices or history have been substituted.</p>
        <a className="civic-button" href={`/market/${encodeURIComponent(slug)}`}>
          Try again
        </a>
        <a href="/embed/sample?theme=light">View the labelled sample</a>
      </div>
    </section>
  );
}
