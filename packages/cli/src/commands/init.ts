export function initCommand(): string {
  return [
    "Install the React package:",
    "  pnpm add @polymarket-ui-kit/react",
    "",
    "Or copy a registry component into a shadcn project:",
    "  npx shadcn@latest add https://polymarket-ui-kit.dev/r/market-card.json",
    "",
    "Then import the styles once:",
    "  import '@polymarket-ui-kit/react/styles.css';",
    "  import '@polymarket-ui-kit/react/themes.css';",
  ].join("\n");
}

