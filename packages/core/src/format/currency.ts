export interface FormatCurrencyOptions {
  currency?: string;
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  compact?: boolean;
}

export function formatCurrency(
  value: number | null | undefined,
  options: FormatCurrencyOptions = {},
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  const {
    currency = "USD",
    locale = "en-US",
    maximumFractionDigits = value >= 1000 ? 0 : 2,
    minimumFractionDigits = 0,
    compact = false,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(value);
}

export function formatCompactNumber(
  value: number | null | undefined,
  locale = "en-US",
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

