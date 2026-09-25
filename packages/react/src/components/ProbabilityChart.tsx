import type { MarketPricePoint } from "@polymarket-ui-kit/core";
import { cx, EmptyState } from "./shared.js";

export interface ProbabilitySeries {
  id: string;
  label: string;
  color: string;
  points: MarketPricePoint[];
}

export interface ProbabilityChartProps {
  series: ProbabilitySeries[];
  className?: string;
  height?: number;
}

const dateLabel = (time: number) =>
  new Date(time).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export function ProbabilityChart({
  series,
  className,
  height = 220,
}: ProbabilityChartProps) {
  const width = 560;
  const plotLeft = 38;
  const plotRight = width - 8;
  const plotTop = 12;
  const plotBottom = Math.max(120, height) - 30;
  const clean = series.map((item) => ({
    ...item,
    points: item.points
      .filter(
        (point) =>
          Number.isFinite(point.price) && Number.isFinite(Date.parse(point.timestamp)),
      )
      .map((point) => ({
        time: Date.parse(point.timestamp),
        price: Math.max(0, Math.min(1, point.price)),
      }))
      .sort((a, b) => a.time - b.time),
  }));
  const allPoints = clean.flatMap((item) => item.points);
  if (!allPoints.length) {
    return (
      <EmptyState
        className={className}
        title="No probability history"
        description="History will appear when price data is available."
      />
    );
  }
  let first = Infinity;
  let last = -Infinity;
  for (const point of allPoints) {
    first = Math.min(first, point.time);
    last = Math.max(last, point.time);
  }
  const x = (time: number) =>
    first === last
      ? (plotLeft + plotRight) / 2
      : plotLeft + ((time - first) / (last - first)) * (plotRight - plotLeft);
  const y = (price: number) => plotBottom - price * (plotBottom - plotTop);
  const summary = clean
    .filter((item) => item.points.length)
    .map((item) => `${item.label}: ${Math.round(item.points.at(-1)!.price * 100)}%`)
    .join("; ");

  return (
    <div className={cx("pui-panel pui-stack pui-probability-chart", className)}>
      <svg
        role="img"
        aria-label={`Probability chart. ${dateLabel(first)} to ${dateLabel(last)}. ${summary}`}
        viewBox={`0 0 ${width} ${Math.max(120, height)}`}
      >
        <title>Probability history</title>
        {[0, 0.5, 1].map((value) => (
          <g key={value}>
            <path
              d={`M${plotLeft} ${y(value)} H${plotRight}`}
              stroke="var(--pui-border)"
              strokeWidth="1"
            />
            <text
              x="0"
              y={y(value) + 4}
              fill="var(--pui-text-muted)"
              fontSize="11"
              fontFamily="var(--pui-font-sans)"
            >
              {value * 100}%
            </text>
          </g>
        ))}
        {clean.map((item) => (
          <g key={item.id}>
            <path
              d={item.points
                .map(
                  (point, index) =>
                    `${index ? "L" : "M"} ${x(point.time).toFixed(2)} ${y(point.price).toFixed(2)}`,
                )
                .join(" ")}
              fill="none"
              stroke={item.color}
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {item.points.length ? (
              <circle
                cx={x(item.points.at(-1)!.time)}
                cy={y(item.points.at(-1)!.price)}
                r="3.5"
                fill={item.color}
              />
            ) : null}
          </g>
        ))}
        <text
          x={plotLeft}
          y={plotBottom + 24}
          fill="var(--pui-text-muted)"
          fontSize="11"
        >
          {dateLabel(first)}
        </text>
        {first !== last ? (
          <text
            x={plotRight}
            y={plotBottom + 24}
            textAnchor="end"
            fill="var(--pui-text-muted)"
            fontSize="11"
          >
            {dateLabel(last)}
          </text>
        ) : null}
      </svg>
      <div className="pui-row pui-wrap">
        {clean.map((item) => (
          <span className="pui-chart-legend" key={item.id}>
            <span
              aria-hidden
              className="pui-chart-legend__line"
              style={{ background: item.color }}
            />
            {item.label}{" "}
            <strong>
              {item.points.length
                ? `${Math.round(item.points.at(-1)!.price * 100)}%`
                : "No data"}
            </strong>
          </span>
        ))}
      </div>
    </div>
  );
}
