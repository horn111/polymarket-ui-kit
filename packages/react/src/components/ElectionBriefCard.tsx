import {
  clampProbability,
  formatProbability,
  type EvidenceItem,
  type MarketPricePoint,
  type PollMarketComparisonRow,
  type PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { cx } from "./shared.js";
import { DirectionArrow } from "./DirectionArrow.js";
import { ProbabilitySparkline } from "./ProbabilitySparkline.js";

export interface ElectionBriefCardProps {
  market: PolymarketMarket;
  points?: MarketPricePoint[] | undefined;
  polls?: PollMarketComparisonRow[] | undefined;
  evidence?: EvidenceItem[] | undefined;
  resolutionSummary?: string | undefined;
  sourceLabel?: string | undefined;
  className?: string | undefined;
}

/** A read-first election surface; outside polling and settlement context are supplied by the host. */
export function ElectionBriefCard({
  market,
  points = [],
  polls = [],
  evidence = [],
  resolutionSummary,
  sourceLabel,
  className,
}: ElectionBriefCardProps) {
  const outcomes = [...market.outcomes].sort(
    (a, b) =>
      (typeof b.price === "number" && Number.isFinite(b.price) ? b.price : -1) -
      (typeof a.price === "number" && Number.isFinite(a.price) ? a.price : -1),
  );
  const pollByOutcome = new Map(
    polls.map((row) => [row.label.toLocaleLowerCase(), row]),
  );
  const endDate =
    market.endDate && Number.isFinite(Date.parse(market.endDate))
      ? new Date(market.endDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })
      : null;
  const validPoints = points
    .filter(
      (point) =>
        Number.isFinite(point.price) &&
        point.price >= 0 &&
        point.price <= 1 &&
        Number.isFinite(Date.parse(point.timestamp)),
    )
    .sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
  const history = validPoints.filter(
    (point) => point.outcomeId === validPoints[0]?.outcomeId,
  );
  const historyOutcome =
    market.outcomes.find((outcome) => outcome.id === history[0]?.outcomeId) ??
    market.outcomes[0];
  const historyRange =
    history.length > 1
      ? `${formatProbability(Math.min(...history.map((point) => point.price)))}–${formatProbability(Math.max(...history.map((point) => point.price)))}`
      : null;
  const historyDate = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  const pollSample = polls.find(
    (row) => typeof row.sampleSize === "number" && Number.isFinite(row.sampleSize),
  );

  return (
    <article className={cx("pui-election-brief", className)}>
      <div className="pui-election-brief__layout">
        <div className="pui-election-brief__cover">
          <div className="pui-election-brief__opening">
            <h2>{market.question}</h2>
          </div>
          <div className="pui-election-brief__topline">
            <span>{market.category ?? "Market"}</span>
            <span>{sourceLabel ?? market.status}</span>
          </div>
        </div>
        <div className="pui-election-brief__sheet">
          <div className="pui-election-brief__reading">
            <div className="pui-election-brief__reading-columns">
              <section aria-label="Market probabilities">
                <header>
                  <h3>Market price</h3>
                  <span>Chance of winning</span>
                </header>
                {outcomes.length ? (
                  outcomes.map((outcome) => {
                    const probability =
                      typeof outcome.price === "number" &&
                      Number.isFinite(outcome.price)
                        ? clampProbability(outcome.price)
                        : null;
                    return (
                      <div className="pui-election-brief__row" key={outcome.id}>
                        <strong>{outcome.name}</strong>
                        <b>{formatProbability(probability)}</b>
                        <span
                          className="pui-election-brief__measure"
                          aria-hidden="true"
                        >
                          <span style={{ width: `${(probability ?? 0) * 100}%` }} />
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p>No outcome prices available.</p>
                )}
              </section>
              <section aria-label="Polling context">
                <header>
                  <h3>Outside polling</h3>
                  <span>Vote share</span>
                </header>
                {polls.length ? (
                  outcomes.map((outcome) => {
                    const poll = pollByOutcome.get(outcome.name.toLocaleLowerCase());
                    return (
                      <div className="pui-election-brief__poll" key={outcome.id}>
                        <span>{outcome.name}</span>
                        <strong>
                          {poll?.pollShare == null || !Number.isFinite(poll.pollShare)
                            ? "—"
                            : formatProbability(poll.pollShare)}
                        </strong>
                      </div>
                    );
                  })
                ) : (
                  <p>No polling context supplied.</p>
                )}
              </section>
            </div>
            <p className="pui-election-brief__caution">
              {polls[0]?.asOf ? `${polls[0].asOf} · ` : ""}
              {pollSample
                ? `n=${pollSample.sampleSize?.toLocaleString("en-US")} · `
                : ""}
              Vote share and chance of winning answer different questions.
            </p>
          </div>
          <div className="pui-election-brief__history">
            <div className="pui-election-brief__history-heading">
              <h3>Price history</h3>
              <strong>
                {historyOutcome?.name ?? "Market"} ·{" "}
                {history.length
                  ? formatProbability(history[history.length - 1]!.price)
                  : "—"}
              </strong>
            </div>
            {history.length > 1 ? (
              <>
                <ProbabilitySparkline
                  points={history}
                  aria-label={`${historyOutcome?.name ?? "Market"} price history, ${historyDate(history[0]!.timestamp)} to ${historyDate(history[history.length - 1]!.timestamp)}, last ${formatProbability(history[history.length - 1]!.price)}`}
                />
                <div className="pui-election-brief__history-foot">
                  <span>{historyDate(history[0]!.timestamp)}</span>
                  <span>{historyRange} range</span>
                  <span>{historyDate(history[history.length - 1]!.timestamp)}</span>
                </div>
              </>
            ) : (
              <p>History unavailable</p>
            )}
          </div>
        </div>
        <div className="pui-election-brief__record">
          <section className="pui-election-brief__settlement">
            <h3>How this settles</h3>
            <p>{resolutionSummary ?? "Settlement criteria have not been supplied."}</p>
            {endDate ? <span>Market end date · {endDate}</span> : null}
            {market.url ? (
              <a href={market.url} rel="noreferrer">
                Open market rules <DirectionArrow diagonal />
              </a>
            ) : null}
          </section>
          <section className="pui-election-brief__sources">
            <h3>Source record</h3>
            {evidence.length ? (
              <details>
                <summary>
                  Read {evidence.length} {evidence.length === 1 ? "source" : "sources"}
                </summary>
                <ol>
                  {evidence.map((item) => (
                    <li key={item.id}>
                      {item.href ? (
                        <a href={item.href} rel="noreferrer">
                          {item.title} <DirectionArrow diagonal />
                        </a>
                      ) : (
                        <strong>{item.title}</strong>
                      )}
                      <span>{item.publisher}</span>
                    </li>
                  ))}
                </ol>
              </details>
            ) : (
              <p>No external sources supplied.</p>
            )}
          </section>
        </div>
      </div>
    </article>
  );
}
