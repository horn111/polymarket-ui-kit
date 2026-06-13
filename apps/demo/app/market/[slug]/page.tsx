import { MarketCard, MobileTradeDrawer, OrderbookPanel } from "@polymarket-ui-kit/react";
import { sampleMarket, sampleOrderbook, samplePoints } from "../../../components/sample-data";

export default function MarketPage({ params }: { params: { slug: string } }) {
  const market = { ...sampleMarket, slug: params.slug };

  return (
    <>
      <MarketCard market={market} points={samplePoints} />
      <OrderbookPanel orderbook={sampleOrderbook} />
      <MobileTradeDrawer market={market} builderFeeBps={25} />
    </>
  );
}

