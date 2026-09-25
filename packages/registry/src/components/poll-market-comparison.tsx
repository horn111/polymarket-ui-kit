import "../lib/polymarket-theme.css";
import {
  formatProbability,
  type PollMarketComparisonRow,
} from "@polymarket-ui-kit/core";

function share(value: number | null) {
  return value === null ? "—" : formatProbability(value);
}

export function PollMarketComparison({ rows }: { rows: PollMarketComparisonRow[] }) {
  if (rows.length === 0) {
    return <div className="pui-registry-panel p-5">No comparison data</div>;
  }

  return (
    <section
      className="pui-registry-panel overflow-hidden"
      role="table"
      aria-label="Poll and market comparison"
    >
      <div
        className="sr-only sm:not-sr-only sm:grid sm:grid-cols-[1.5fr_1fr_1fr] pui-registry-well px-4 py-3 text-xs font-medium pui-registry-muted"
        role="row"
      >
        <span role="columnheader">Outcome</span>
        <span role="columnheader">Latest poll average</span>
        <span role="columnheader">Market probability</span>
      </div>
      {rows.map((row) => (
        <div
          className="grid grid-cols-2 gap-3 border-t pui-registry-border p-4 sm:grid-cols-[1.5fr_1fr_1fr]"
          key={row.id}
          role="row"
        >
          <strong className="col-span-2 sm:col-span-1" role="cell">
            {row.label}
          </strong>
          <span role="cell">
            <span
              className="mb-1 block text-xs pui-registry-muted sm:hidden"
              aria-hidden="true"
            >
              Latest poll average
            </span>
            {share(row.pollShare)}
          </span>
          <span className="font-medium pui-registry-accent" role="cell">
            <span
              className="mb-1 block text-xs pui-registry-muted sm:hidden"
              aria-hidden="true"
            >
              Market probability
            </span>
            {share(row.marketProbability)}
          </span>
        </div>
      ))}
    </section>
  );
}
