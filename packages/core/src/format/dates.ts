export function formatRelativeTime(
  date: string | Date | null | undefined,
  now: Date = new Date(),
): string {
  if (!date) {
    return "-";
  }

  const target = typeof date === "string" ? new Date(date) : date;
  const diffMs = target.getTime() - now.getTime();
  const diffAbs = Math.abs(diffMs);
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["day", 86_400_000],
    ["hour", 3_600_000],
    ["minute", 60_000],
    ["second", 1_000],
  ];

  const formatter = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  const fallback: [Intl.RelativeTimeFormatUnit, number] = ["second", 1_000];
  const [unit, ms] =
    units.find(([, unitMs]) => diffAbs >= unitMs) ?? fallback;

  return formatter.format(Math.round(diffMs / ms), unit);
}

export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) {
    return "-";
  }

  const parsed = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed);
}
