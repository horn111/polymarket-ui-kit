export function DirectionArrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ display: "inline-block", verticalAlign: "-0.15em", flexShrink: 0 }}
    >
      <path
        d={diagonal ? "M4 12 12 4M4 4h8v8" : "M3 8h10M8 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
