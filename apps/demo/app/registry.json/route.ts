import registry from "@polymarket-ui-kit/registry/registry.json";

export const dynamic = "force-static";

export function GET() {
  return Response.json(registry, {
    headers: {
      "cache-control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}
