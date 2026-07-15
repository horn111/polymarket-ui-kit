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
      <section className="rounded-md border border-border/70 bg-background p-5 shadow-xl">
        <strong>No evidence sources</strong>
        <p className="mt-1 text-sm text-muted-foreground">
          Add official records, polls, models, or reporting.
        </p>
      </section>
    );
  }

  return (
    <section aria-label={title} className="rounded-md border border-border/70 bg-gradient-to-br from-background via-muted/20 to-background p-5 shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <strong>{title}</strong>
        <span className="text-sm text-muted-foreground">{items.length} sources</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.slice(0, 4).map((item) => {
          const content = (
            <>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                {kindLabels[item.kind ?? "other"]}
              </span>
              <strong className="text-sm leading-snug">{item.title}</strong>
              <span className="text-xs text-muted-foreground">{item.publisher}</span>
            </>
          );
          return item.href ? (
            <a
              className="grid min-h-36 min-w-60 gap-2 rounded-sm border border-border/70 bg-muted/35 p-4 transition hover:bg-muted"
              href={item.href}
              key={item.id}
              rel="noreferrer"
            >
              {content}
            </a>
          ) : (
            <article
              className="grid min-h-36 min-w-60 gap-2 rounded-sm border border-border/70 bg-muted/35 p-4"
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
