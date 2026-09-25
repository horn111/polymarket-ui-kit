import "../lib/polymarket-theme.css";
import type { EvidenceItem } from "@polymarket-ui-kit/core";

const kindLabels: Record<NonNullable<EvidenceItem["kind"]>, string> = {
  official: "Official",
  poll: "Poll",
  model: "Model",
  news: "News",
  other: "Source",
};

export function EvidenceRail({
  items,
  title = "Evidence & sources",
}: {
  items: EvidenceItem[];
  title?: string;
}) {
  if (items.length === 0) {
    return (
      <section className="pui-registry-panel p-5">
        <strong>No evidence sources</strong>
        <p className="mt-1 text-sm pui-registry-muted">
          Add official records, polls, models, or reporting.
        </p>
      </section>
    );
  }

  return (
    <section aria-label={title} className="pui-registry-panel p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <strong>{title}</strong>
        <span className="text-sm pui-registry-muted">{items.length} sources</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.slice(0, 4).map((item) => {
          const content = (
            <>
              <span className="text-xs font-semibold pui-registry-accent">
                {kindLabels[item.kind ?? "other"]}
              </span>
              <strong className="text-sm leading-snug">{item.title}</strong>
              <span className="text-xs pui-registry-muted">{item.publisher}</span>
            </>
          );
          return item.href ? (
            <a
              className="grid min-w-60 gap-1 rounded-xl border pui-registry-border pui-registry-well p-4 underline-offset-4 hover:underline"
              href={item.href}
              key={item.id}
              rel="noreferrer"
            >
              {content}
            </a>
          ) : (
            <article
              className="grid min-w-60 gap-1 rounded-xl border pui-registry-border pui-registry-well p-4"
              key={item.id}
            >
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
