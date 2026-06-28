import { fetchJson } from "../utils/fetcher";
import { asNumber, asStringArray, isRecord } from "../utils/invariant";
import type {
  BuildComboIntentInput,
  ComboIntent,
  ComboLegMarket,
  ComboLegOutcome,
  ComboMarketAdapterOptions,
  ComboMarketsPage,
  ListComboMarketsParams,
} from "../types/combo";

const COMBOS_BASE_URL = "https://combos-rfq-api.polymarket.com";

function field(record: Record<string, unknown>, ...keys: string[]): unknown {
  for (const key of keys) {
    if (record[key] !== undefined) {
      return record[key];
    }
  }

  return undefined;
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function asTags(value: unknown): string[] {
  const items = asArray(value);

  if (items.length === 0) {
    return asStringArray(value);
  }

  return items
    .map((item) => {
      if (isRecord(item)) {
        return String(item.label ?? item.name ?? item.slug ?? item.id ?? "");
      }

      return String(item ?? "");
    })
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseComboOutcomes(record: Record<string, unknown>): ComboLegOutcome[] {
  const names = asStringArray(field(record, "outcomes"));
  const positionIds = asStringArray(field(record, "position_ids", "positionIds"));
  const prices = asArray(field(record, "outcome_prices", "outcomePrices"));

  return names.map((name, index) => {
    const positionId = positionIds[index] ?? `${String(field(record, "id") ?? "combo")}-${index}`;

    return {
      id: positionId,
      name,
      price: asNumber(prices[index]),
      positionId,
    };
  });
}

export function normalizeComboMarket(raw: unknown): ComboLegMarket {
  const record = isRecord(raw) ? raw : {};
  const id = String(
    field(record, "id", "market_id", "marketId", "condition_id", "conditionId") ?? "",
  );
  const conditionId = String(field(record, "condition_id", "conditionId") ?? id);
  const slug = String(field(record, "slug") ?? id);

  return {
    id,
    conditionId,
    slug,
    title: String(
      field(record, "title", "question", "description", "market_slug", "slug") ??
        "Untitled combo market",
    ),
    description: String(field(record, "description") ?? "") || null,
    category: String(field(record, "category") ?? "") || null,
    image: String(field(record, "image", "featured_image", "featuredImage") ?? "") || null,
    icon: String(field(record, "icon") ?? "") || null,
    volume:
      asNumber(field(record, "volume", "volume_num", "volumeNum")) ??
      asNumber(field(record, "liquidity")),
    liquidity: asNumber(field(record, "liquidity", "liquidity_num", "liquidityNum")),
    active:
      typeof field(record, "active") === "boolean"
        ? Boolean(field(record, "active"))
        : undefined,
    tags: asTags(field(record, "tags")),
    outcomes: parseComboOutcomes(record),
    raw,
  };
}

export function normalizeComboMarketsPage(raw: unknown): ComboMarketsPage {
  if (Array.isArray(raw)) {
    return {
      markets: raw.map(normalizeComboMarket),
      raw,
    };
  }

  const record = isRecord(raw) ? raw : {};
  const markets = asArray(field(record, "markets"));
  const data = asArray(field(record, "data"));
  const comboMarkets = asArray(field(record, "combo_markets", "comboMarkets"));
  const items = markets.length > 0 ? markets : data.length > 0 ? data : comboMarkets;

  return {
    markets: items.map(normalizeComboMarket),
    cursor:
      typeof field(record, "cursor") === "string"
        ? String(field(record, "cursor"))
        : null,
    nextCursor:
      typeof field(record, "next_cursor", "nextCursor") === "string"
        ? String(field(record, "next_cursor", "nextCursor"))
        : null,
    raw,
  };
}

export async function listComboMarkets(
  params: ListComboMarketsParams = {},
  options: ComboMarketAdapterOptions = {},
): Promise<ComboMarketsPage> {
  const exclude = Array.isArray(params.exclude)
    ? params.exclude.join(",")
    : params.exclude;
  const data = await fetchJson<unknown>(
    `${options.combosBaseUrl ?? COMBOS_BASE_URL}/v1/rfq/combo-markets`,
    {
      fetch: options.fetch,
      query: {
        limit: params.limit,
        cursor: params.cursor,
        exclude,
      },
    },
  );

  return normalizeComboMarketsPage(data);
}

export function buildComboIntent({
  legs,
  direction = "BUY",
  side = "YES",
  size,
  builderCode,
}: BuildComboIntentInput): ComboIntent {
  return {
    legs: legs.map(({ market, outcome }) => ({
      marketId: market.id,
      conditionId: market.conditionId,
      slug: market.slug,
      title: market.title,
      outcomeId: outcome.id,
      outcomeName: outcome.name,
      positionId: outcome.positionId,
      price: outcome.price,
    })),
    direction,
    side,
    size,
    builderCode,
    source: "ui-kit",
  };
}
