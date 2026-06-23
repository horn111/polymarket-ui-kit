import {
  MarketCard,
  MobileTradeDrawer,
  OrderbookPanel,
} from "@polymarket-ui-kit/react";
import { sampleBuilder } from "../../../components/sample-builder";
import { loadPublicMarketBundle } from "../../../components/live-data";

export const revalidate = 60;

type MarketPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params;
  const { market, orderbook, points, source } = await loadPublicMarketBundle(slug);

  return (
    <>
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
