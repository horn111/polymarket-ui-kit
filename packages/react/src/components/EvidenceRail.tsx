import { formatRelativeTime, type EvidenceItem } from "@polymarket-ui-kit/core";
import { cx, EmptyState } from "./shared";

export interface EvidenceRailProps {
  items: EvidenceItem[];
  title?: string;
  maxVisible?: number;
  className?: string;
}

const kindLabels: Record<NonNullable<EvidenceItem["kind"]>, string> = {
  official: "Official",
  poll: "Poll",
  model: "Model",
  news: "News",
  other: "Source",
};

function EvidenceContent({ item }: { item: EvidenceItem }) {
  return (
    <>
      <span className="pui-evidence__kind">{kindLabels[item.kind ?? "other"]}</span>
      <strong>{item.title}</strong>
      <span className="pui-evidence__meta">
        {item.publisher}
        {item.publishedAt ? ` · ${formatRelativeTime(item.publishedAt)}` : ""}
      </span>
    </>
  );
}

function ExternalArrowIcon() {
  return (
    <svg aria-hidden="true" height="14" viewBox="0 0 16 16" width="14">
      <path
        d="M5 11 11 5M6 5h5v5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function EvidenceRail({
  items,
  title = "Evidence & sources",
  maxVisible = 4,
  className,
}: EvidenceRailProps) {
  const visibleItems = items.slice(0, Math.max(0, maxVisible));
  const remaining = Math.max(0, items.length - visibleItems.length);

  if (visibleItems.length === 0) {
    return (
      <EmptyState
        className={className}
        description="Add official records, polls, models, or reporting to show the context behind this market."
        title="No evidence sources"
      />
    );
  }

  return (
    <section className={cx("pui-panel pui-evidence", className)} aria-label={title}>
      <header className="pui-section-heading">
        <div>
          <span className="pui-section-heading__signal" aria-hidden="true" />
          <strong>{title}</strong>
        </div>
        <span className="pui-muted">{items.length} sources</span>
      </header>
      <div className="pui-evidence__rail">
        {visibleItems.map((item) => {
          const classes = "pui-evidence__item";
          return item.href ? (
            <a className={classes} href={item.href} key={item.id} rel="noreferrer">
              <EvidenceContent item={item} />
              <span className="pui-evidence__arrow" aria-hidden="true">
                <ExternalArrowIcon />
              </span>
            </a>
          ) : (
            <article className={classes} key={item.id}>
              <EvidenceContent item={item} />
            </article>
          );
        })}
        {remaining > 0 ? (
          <div className="pui-evidence__more" aria-label={`${remaining} more sources`}>
            +{remaining}
          </div>
        ) : null}
      </div>
    </section>
  );
}
