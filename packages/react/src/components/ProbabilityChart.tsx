import type { MarketPricePoint } from "@polymarket-ui-kit/core";
import { cx } from "./shared";

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

function seriesPath(points: MarketPricePoint[], width: number, height: number): string {
  if (points.length === 0) {
    return "";
  }

  return points
    .map((point, index) => {
      const x = points.length === 1 ? width : (index / (points.length - 1)) * width;
      const y = height - Math.max(0, Math.min(1, point.price)) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function ProbabilityChart({
  series,
  className,
  height = 220,
}: ProbabilityChartProps) {
  const width = 560;

  return (
    <div className={cx("pui-panel pui-stack pui-probability-chart", className)}>
      <svg
        className="pui-probability-chart__plot"
        role="img"
        aria-label="Probability chart"
        viewBox={`0 0 ${width} ${height}`}
      >
        {[0.25, 0.5, 0.75].map((line) => (
          <path
            d={`M0 ${height - line * height} H${width}`}
            className="pui-probability-chart__grid"
            key={line}
            stroke="var(--pui-border)"
            strokeDasharray="4 6"
          />
        ))}
        {series.map((item) => (
          <path
            d={seriesPath(item.points, width, height)}
            className="pui-probability-chart__series"
            fill="none"
            key={item.id}
            pathLength={1}
            stroke={item.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        ))}
      </svg>
      <div className="pui-row pui-wrap">
        {series.map((item) => (
          <span className="pui-badge" key={item.id}>
            <span
              aria-hidden
              className="pui-legend-dot"
              style={{ background: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
