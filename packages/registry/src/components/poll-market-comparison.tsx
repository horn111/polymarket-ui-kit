import {
  formatProbability,
  type PollMarketComparisonRow,
} from "@polymarket-ui-kit/core";

function share(value: number | null) {
  return value === null ? "—" : formatProbability(value);
}

export function PollMarketComparison({ rows }: { rows: PollMarketComparisonRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border bg-background p-4">No comparison data</div>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground">
        <span>Outcome</span>
        <span>Latest poll average</span>
        <span>Market probability</span>
      </div>
      {rows.map((row) => (
        <div
          className="grid grid-cols-1 gap-3 border-t p-4 sm:grid-cols-[1.5fr_1fr_1fr]"
          key={row.id}
        >
          <strong>{row.label}</strong>
          <span>{share(row.pollShare)}</span>
          <span className="font-semibold text-primary">
            {share(row.marketProbability)}
          </span>
        </div>
      ))}
    </section>
  );
}
