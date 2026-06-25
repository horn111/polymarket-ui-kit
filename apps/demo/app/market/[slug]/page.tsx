import {
  MarketCard,
  MobileTradeDrawer,
  OrderbookPanel,
} from "@polymarket-ui-kit/react";
import { RouteThemeSync } from "../../components/RouteThemeSync";
import { sampleBuilder } from "../../../components/sample-builder";
import { loadPublicMarketBundle } from "../../../components/live-data";

export const revalidate = 60;

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
  const { market, orderbook, points, source } = await loadPublicMarketBundle(slug);

  return (
    <>
      <RouteThemeSync theme={theme} />
      <div className="demo-route-note" data-source={source}>
        <span>{source === "live" ? "Live public data" : "Graceful fallback"}</span>
        <strong>{market.question}</strong>
      </div>
      <MarketCard market={market} points={points} />
      <OrderbookPanel orderbook={orderbook} />
      <MobileTradeDrawer
        builder={sampleBuilder}
        builderFeeSide="taker"
        market={market}
      />
    </>
  );
}
