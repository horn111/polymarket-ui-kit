const registryBaseUrl = "https://polymarket-ui-kit.dev/r";

export function addCommand(component = "market-card"): string {
  return `Run: npx shadcn@latest add ${registryBaseUrl}/${component}.json`;
}

