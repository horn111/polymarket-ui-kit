import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OutcomeSwitcher } from "@polymarket-ui-kit/react";
import { fixtureMarket } from "../fixtures/market";

describe("component accessibility", () => {
  it("labels the outcome group", () => {
    render(<OutcomeSwitcher outcomes={fixtureMarket.outcomes} />);
    expect(screen.getByRole("group", { name: "Market outcomes" })).toBeInTheDocument();
  });
});

