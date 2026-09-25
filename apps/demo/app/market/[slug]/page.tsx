import {
  EvidenceRail,
  MarketCard,
  MobileTradeDrawer,
  OrderbookPanel,
} from "@polymarket-ui-kit/react";
import type { EvidenceItem } from "@polymarket-ui-kit/core";
import { RouteThemeSync } from "../../components/RouteThemeSync";
import { sampleBuilder } from "../../../components/sample-builder";
import { loadPublicMarketBundle } from "../../../components/live-data";
import { MarketUnavailable } from "../../components/MarketUnavailable";

export const revalidate = 60;

const sampleEvidence: EvidenceItem[] = [
  {
    id: "rules",
    title: "Market resolution rules",
    publisher: "Polymarket market metadata",
    kind: "official",
  },
  {
    id: "context",
    title: "Illustrative external context",
    publisher: "Demo fixture · not current reporting",
    kind: "other",
  },
];

type MarketPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ theme?: string }>;
};

function resolveTheme(value: string | undefined): "light" | "dark" {
  return value === "light" ? "light" : "dark";
}

export default async function MarketPage({ params, searchParams }: MarketPageProps) {
  const { slug } = await params;
  const theme = resolveTheme((await searchParams).theme);
  const bundle = await loadPublicMarketBundle(slug).catch(() => null);
  if (!bundle)
    return (
      <>
        <RouteThemeSync theme={theme} />
        <MarketUnavailable slug={slug} />
      </>
    );
  const { market, orderbook, points, source } = bundle;

  return (
    <>
      <RouteThemeSync theme={theme} />
      <section className="civic-route">
        <a className="civic-route__back" href="/">
          ← Civic Forecast demo
        </a>
        <div className="demo-route-note" data-source={source}>
          <span>
            {source === "live"
              ? "Live public market"
              : source === "partial"
                ? "Live market · some data unavailable"
                : "Illustrative market · sample data"}
          </span>
          <h1>{market.question}</h1>
        </div>
        <div className="civic-route__grid">
          <MarketCard market={market} points={points} />
          <div className="pui-stack">
            <OrderbookPanel orderbook={orderbook} />
            <MobileTradeDrawer
              builder={sampleBuilder}
              builderFeeSide="taker"
              market={market}
            />
          </div>
        </div>
        <EvidenceRail items={sampleEvidence} title="Data provenance" />
      </section>
    </>
  );
}
