export function doctorCommand(): string {
  const checks = [
    "Node >= 20",
    "React >= 18.3 or React 19",
    "CSS imported once at the app root",
    "Server components pass preloaded market data or use client hooks",
    "No authenticated order placement in the v0 UI kit",
  ];

  return ["Polymarket UI Kit doctor", ...checks.map((check) => `- ${check}`)].join("\n");
}

