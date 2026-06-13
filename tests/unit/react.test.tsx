import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  CommentList,
  LeaderboardTable,
  MarketCard,
  OrderbookPanel,
  ShareCard,
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
    expect(screen.getByText("This project has a very clear DX angle.")).toBeInTheDocument();
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

