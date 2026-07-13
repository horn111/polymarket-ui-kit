import {
  formatCompactNumber,
  formatProbability,
  type PollMarketComparisonRow,
} from "@polymarket-ui-kit/core";
import { cx, EmptyState } from "./shared";

export interface PollMarketComparisonProps {
  rows: PollMarketComparisonRow[];
  pollLabel?: string;
  marketLabel?: string;
  className?: string;
}

function formatShare(value: number | null): string {
  return value === null ? "—" : formatProbability(value);
}

export function PollMarketComparison({
  rows,
  pollLabel = "Latest poll average",
  marketLabel = "Market probability",
  className,
}: PollMarketComparisonProps) {
  if (rows.length === 0) {
    return (
      <EmptyState
        className={className}
        description="Provide poll shares and market probabilities to compare public opinion with market pricing."
        title="No comparison data"
      />
    );
  }

  return (
    <section className={cx("pui-panel pui-poll-comparison", className)}>
      <header className="pui-section-heading">
        <div>
          <span className="pui-section-heading__signal" aria-hidden="true" />
          <strong>Poll + market</strong>
        </div>
        <span className="pui-muted">Sample external context</span>
      </header>
      <div
        className="pui-poll-comparison__table"
        role="table"
        aria-label="Poll and market comparison"
      >
        <div className="pui-poll-comparison__header" role="row">
          <span role="columnheader">Outcome</span>
          <span role="columnheader">{pollLabel}</span>
          <span role="columnheader">{marketLabel}</span>
        </div>
        {rows.map((row) => {
          const difference =
            row.pollShare === null || row.marketProbability === null
              ? null
              : row.marketProbability - row.pollShare;
          return (
            <div className="pui-poll-comparison__row" key={row.id} role="row">
              <div className="pui-poll-comparison__outcome" role="cell">
                <strong>{row.label}</strong>
                <span className="pui-muted">
                  {row.asOf ?? "Sample data"}
                  {row.sampleSize ? ` · n=${formatCompactNumber(row.sampleSize)}` : ""}
                </span>
              </div>
              <div
                className="pui-poll-comparison__value"
                data-label={pollLabel}
                role="cell"
              >
                <strong>{formatShare(row.pollShare)}</strong>
                <span className="pui-muted">
                  {row.marginOfErrorPoints !== undefined
                    ? `±${row.marginOfErrorPoints.toFixed(1)} pts`
                    : "No margin supplied"}
                </span>
              </div>
              <div
                className="pui-poll-comparison__value"
                data-label={marketLabel}
                role="cell"
              >
                <strong>{formatShare(row.marketProbability)}</strong>
                <span
                  data-tone={
                    difference === null
                      ? "neutral"
                      : difference >= 0
                        ? "positive"
                        : "negative"
                  }
                >
                  {difference === null
                    ? "No comparison"
                    : `${difference >= 0 ? "+" : ""}${(difference * 100).toFixed(1)} pts vs poll`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
