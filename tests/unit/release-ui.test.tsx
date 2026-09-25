import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ElectionBriefCard,
  EmbedSnippetPanel,
  MarketCard,
  ProbabilityChart,
  ShareCard,
} from "@polymarket-ui-kit/react";
import { fixtureMarket } from "../fixtures/market";

afterEach(() => vi.unstubAllGlobals());

describe("release UI behavior", () => {
  it("reports blocked clipboard access without claiming success", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
    });
    render(<EmbedSnippetPanel input="sample" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Clipboard unavailable"),
    );
    expect(screen.queryByRole("button", { name: "Copied" })).not.toBeInTheDocument();
  });

  it("moves output tab focus and selection with arrow keys", () => {
    render(<EmbedSnippetPanel input="sample" />);
    const embed = screen.getByRole("tab", { name: "Embed" });
    embed.focus();
    fireEvent.keyDown(embed, { key: "ArrowRight" });
    const react = screen.getByRole("tab", { name: "React" });
    expect(react).toHaveFocus();
    expect(react).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", react.id);
  });

  it("does not label a closed market as live", () => {
    render(<ShareCard market={{ ...fixtureMarket, status: "closed" }} />);
    expect(screen.getByText("Closed market")).toBeInTheDocument();
    expect(screen.queryByText("Live market")).not.toBeInTheDocument();
  });

  it("separates election market odds from polling and exposes source records", () => {
    render(
      <ElectionBriefCard
        market={fixtureMarket}
        sourceLabel="Sample data"
        polls={[
          {
            id: "yes",
            label: "Yes",
            pollShare: 0.39,
            marketProbability: 0.64,
            asOf: "Illustrative data",
          },
        ]}
        evidence={[
          {
            id: "rule",
            title: "Certification record",
            publisher: "Example election office",
            href: "https://example.com/rules",
          },
        ]}
        resolutionSummary="A certified result settles this example."
      />,
    );
    expect(
      screen.getByRole("region", { name: "Market probabilities" }),
    ).toHaveTextContent("64%");
    expect(screen.getByRole("region", { name: "Polling context" })).toHaveTextContent(
      "39%",
    );
    expect(screen.getByText(/answer different questions/)).toBeInTheDocument();
    expect(
      screen.getByText("A certified result settles this example."),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Read 1 source"));
    expect(screen.getByRole("link", { name: /Certification record/ })).toHaveAttribute(
      "href",
      "https://example.com/rules",
    );
  });

  it("keeps missing election context explicit and market outcomes read-only", () => {
    render(
      <>
        <ElectionBriefCard market={fixtureMarket} />
        <MarketCard market={fixtureMarket} />
      </>,
    );
    expect(screen.getByText("No polling context supplied.")).toBeInTheDocument();
    expect(
      screen.getByText("Settlement criteria have not been supplied."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Yes/ })).not.toBeInTheDocument();
  });

  it("labels supplied history and keeps another outcome out of its range", () => {
    render(
      <ElectionBriefCard
        market={fixtureMarket}
        points={[
          { timestamp: "2026-06-01T00:00:00Z", price: 0.34, outcomeId: "yes" },
          { timestamp: "2026-06-03T00:00:00Z", price: 0.91, outcomeId: "no" },
          { timestamp: "2026-06-05T00:00:00Z", price: 0.42, outcomeId: "yes" },
        ]}
      />,
    );
    expect(
      screen.getByRole("img", { name: /Yes price history.*last 42%/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("34%–42% range")).toBeInTheDocument();
  });

  it("renders invalid history as an empty state", () => {
    render(
      <ProbabilityChart
        series={[
          {
            id: "yes",
            label: "Yes",
            color: "blue",
            points: [{ timestamp: "invalid", price: NaN }],
          },
        ]}
      />,
    );
    expect(screen.getByText("No probability history")).toBeInTheDocument();
  });

  it("sorts price history and includes its dates and last value in the accessible name", () => {
    render(
      <ProbabilityChart
        series={[
          {
            id: "yes",
            label: "Yes",
            color: "blue",
            points: [
              { timestamp: "2026-06-05T00:00:00Z", price: 0.42 },
              { timestamp: "2026-06-01T00:00:00Z", price: 0.34 },
            ],
          },
        ]}
      />,
    );
    expect(
      screen.getByRole("img", { name: /Jun 1, 2026 to Jun 5, 2026. Yes: 42%/ }),
    ).toBeInTheDocument();
  });
});
