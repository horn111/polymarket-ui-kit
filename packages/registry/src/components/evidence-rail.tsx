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
      <section className="rounded-xl border bg-background p-4">
        <strong>No evidence sources</strong>
        <p className="mt-1 text-sm text-muted-foreground">
          Add official records, polls, models, or reporting.
        </p>
      </section>
    );
  }

  return (
    <section aria-label={title} className="rounded-xl border bg-background p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <strong>{title}</strong>
        <span className="text-sm text-muted-foreground">{items.length} sources</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.slice(0, 4).map((item) => {
          const content = (
            <>
              <span className="text-xs font-semibold text-primary">
                {kindLabels[item.kind ?? "other"]}
              </span>
              <strong className="text-sm leading-snug">{item.title}</strong>
              <span className="text-xs text-muted-foreground">{item.publisher}</span>
            </>
          );
          return item.href ? (
            <a
              className="grid min-w-60 gap-1 rounded-lg border bg-muted/40 p-3 transition hover:bg-muted"
              href={item.href}
              key={item.id}
              rel="noreferrer"
            >
              {content}
            </a>
          ) : (
            <article
              className="grid min-w-60 gap-1 rounded-lg border bg-muted/40 p-3"
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
