import registry from "@polymarket-ui-kit/registry/registry.json";

type RegistryItem = (typeof registry.items)[number];

export const dynamic = "force-static";

function normalizeName(value: string): string {
  return value.endsWith(".json") ? value.slice(0, -5) : value;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name: rawName } = await params;
  const name = normalizeName(rawName);
  const item = registry.items.find((candidate: RegistryItem) => candidate.name === name);

  if (!item) {
    return Response.json(
      { error: `Registry item not found: ${name}` },
      { status: 404 },
    );
  }

  return Response.json(item, {
    headers: {
      "cache-control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}
