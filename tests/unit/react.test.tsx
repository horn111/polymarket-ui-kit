import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  BuilderFeeDisclosure,
  CommentList,
  LeaderboardTable,
  MarketCard,
  MobileTradeDrawer,
  OrderbookPanel,
  PolymarketProvider,
  ShareCard,
  usePolymarketBuilder,
} from "@polymarket-ui-kit/react";
import {
  fixtureComments,
  fixtureMarket,
  fixtureOrderbook,
  fixturePoints,
  fixtureRows,
} from "../fixtures/market";

describe("React components", () => {
  it("renders a market card", () => {
    render(<MarketCard market={fixtureMarket} points={fixturePoints} />);
    expect(screen.getByText(fixtureMarket.question)).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  it("renders an orderbook", () => {
    render(<OrderbookPanel orderbook={fixtureOrderbook} />);
    expect(screen.getByText("Orderbook")).toBeInTheDocument();
  });

  it("renders comments", () => {
    render(<CommentList comments={fixtureComments} />);
    expect(
      screen.getByText("This project has a very clear DX angle."),
    ).toBeInTheDocument();
  });

  it("renders a share card", () => {
    render(<ShareCard market={fixtureMarket} />);
    expect(screen.getByText("polymarket-ui-kit")).toBeInTheDocument();
  });

  it("renders leaderboard rows", () => {
    render(<LeaderboardTable rows={fixtureRows} />);
    expect(screen.getByText("Top Builder")).toBeInTheDocument();
  });
});

const fixtureBuilder = {
  name: "Forecast Studio",
  handle: "@forecast-studio",
  code: "0x00000000000000000000000000000000000000000000000000000000000000f5",
  makerFeeBps: 10,
  takerFeeBps: 25,
};

function BuilderProbe() {
  const builder = usePolymarketBuilder();
  return <span>{builder?.code ?? "no-builder"}</span>;
}

describe("Builder-code-aware UX", () => {
  it("renders builder fee disclosure", () => {
    render(
      <BuilderFeeDisclosure
        builder={fixtureBuilder}
        notional={100}
        price={0.64}
        side="taker"
      />,
    );

    expect(screen.getByText("Builder code attached")).toBeInTheDocument();
    expect(screen.getByText("Forecast Studio")).toBeInTheDocument();
    expect(screen.getByText("25 bps")).toBeInTheDocument();
    expect(screen.getByText("$0.25")).toBeInTheDocument();
  });

  it("exposes builder config from the provider", () => {
    render(
      <PolymarketProvider builder={fixtureBuilder}>
        <BuilderProbe />
      </PolymarketProvider>,
    );

    expect(screen.getByText(fixtureBuilder.code)).toBeInTheDocument();
  });

  it("emits builder code and fee preview in trade intents", () => {
    const onTradeIntent = vi.fn();

    render(
      <MobileTradeDrawer
        builder={fixtureBuilder}
        market={fixtureMarket}
        onTradeIntent={onTradeIntent}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Continue with/i }));

    expect(onTradeIntent).toHaveBeenCalledTimes(1);
    expect(onTradeIntent.mock.calls[0]?.[0]).toMatchObject({
      builderCode: fixtureBuilder.code,
      builderFeeSide: "taker",
      feePreview: {
        builderFee: 0.0625,
        builderFeeBps: 25,
      },
    });
  });
});
