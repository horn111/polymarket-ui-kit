import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  EvidenceRail,
  OutcomeSwitcher,
  PollMarketComparison,
} from "@polymarket-ui-kit/react";
import { fixtureMarket } from "../fixtures/market";

describe("component accessibility", () => {
  it("labels the outcome group", () => {
    render(<OutcomeSwitcher outcomes={fixtureMarket.outcomes} />);
    expect(screen.getByRole("group", { name: "Market outcomes" })).toBeInTheDocument();
  });

  it("labels evidence and poll comparison structures", () => {
    render(
      <>
        <EvidenceRail
          items={[
            {
              id: "rules",
              title: "Resolution rules",
              publisher: "Market metadata",
              kind: "official",
            },
          ]}
        />
        <PollMarketComparison
          rows={[{ id: "yes", label: "Yes", pollShare: 0.52, marketProbability: 0.56 }]}
        />
      </>,
    );

    expect(
      screen.getByRole("region", { name: "Evidence & sources" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("table", { name: "Poll and market comparison" }),
    ).toBeInTheDocument();
  });
});
