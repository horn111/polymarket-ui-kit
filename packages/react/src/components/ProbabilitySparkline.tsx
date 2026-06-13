import type { MarketPricePoint } from "@polymarket-ui-kit/core";
import { cx } from "./shared";

export interface ProbabilitySparklineProps {
  points: MarketPricePoint[];
  className?: string;
  color?: string;
  "aria-label"?: string;
}

function toPolyline(points: MarketPricePoint[], width: number, height: number): string {
  if (points.length === 0) {
    return "";
  }

  const min = Math.min(...points.map((point) => point.price));
  const max = Math.max(...points.map((point) => point.price));
  const spread = Math.max(max - min, 0.01);

  return points
    .map((point, index) => {
      const x = points.length === 1 ? width : (index / (points.length - 1)) * width;
      const y = height - ((point.price - min) / spread) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function ProbabilitySparkline({
  points,
  className,
  color = "currentColor",
  "aria-label": ariaLabel = "Probability history",
}: ProbabilitySparklineProps) {
  const polyline = toPolyline(points, 160, 42);

  return (
    <svg
      aria-label={ariaLabel}
      className={cx("pui-sparkline", className)}
      role="img"
      viewBox="0 0 160 42"
    >
      <path d="M0 41 H160" stroke="var(--pui-border)" strokeWidth="1" />
      {polyline ? (
        <polyline
          fill="none"
          points={polyline}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      ) : null}
    </svg>
  );
}

