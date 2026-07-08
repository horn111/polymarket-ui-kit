const registryBaseUrl = "https://polymarket-ui-kit-demo-fkan-chi.vercel.app/r";

export function addCommand(component = "market-card"): string {
  return `Run: npx shadcn@latest add ${registryBaseUrl}/${component}.json`;
}
