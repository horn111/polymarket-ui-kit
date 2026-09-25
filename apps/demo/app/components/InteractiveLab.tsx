"use client";

import { useMemo, useState } from "react";
import type {
  EvidenceItem,
  MarketComment,
  MarketPricePoint,
  OrderbookSnapshot,
  PolymarketMarket,
  PollMarketComparisonRow,
  TraderLeaderboardRow,
} from "@polymarket-ui-kit/core";
import {
  BuilderBadge,
  BuilderFeeDisclosure,
  CommentList,
  ComboBuilderCard,
  ComboShareCard,
  EvidenceRail,
  FeePill,
  LeaderboardTable,
  MarketCard,
  OrderbookPanel,
  PollMarketComparison,
  ShareCard,
  useShareImage,
} from "@polymarket-ui-kit/react";
import { sampleBuilder } from "../../components/sample-builder";
import { sampleMarket } from "../../components/sample-data";
import { sampleComboLegs, sampleComboMarkets } from "../../components/sample-combos";
import { PreviewRail } from "../../../shared/PreviewRail";

type DemoTab =
  | "market"
  | "evidence"
  | "polls"
  | "share"
  | "builder"
  | "combo"
  | "export"
  | "data"
  | "states";
type DemoState = "live" | "loading" | "error" | "empty";

const labTabs: Array<{ label: string; value: DemoTab }> = [
  { label: "Market", value: "market" },
  { label: "Evidence", value: "evidence" },
  { label: "Poll comparison", value: "polls" },
  { label: "Share", value: "share" },
  { label: "Builder", value: "builder" },
  { label: "Combo", value: "combo" },
  { label: "Export", value: "export" },
  { label: "Market data", value: "data" },
  { label: "States", value: "states" },
];
type DemoTheme = "light" | "dark";

interface InteractiveLabProps {
  theme: DemoTheme;
}

const markets: PolymarketMarket[] = [
  {
    id: "midterm-turnout-2026",
    slug: "midterm-turnout-2026",
    question: "Will voter turnout in the 2026 U.S. midterm elections exceed 2022?",
    description: "Illustrative politics market.",
    category: "Politics",
    image: null,
    icon: null,
    status: "open",
    active: true,
    closed: false,
    archived: false,
    endDate: "2026-11-03T23:59:59Z",
    volume: 15482000,
    liquidity: 1247000,
    commentCount: 814,
    outcomes: [
      { id: "yes", name: "Yes", price: 0.61, tokenId: "turnout-yes" },
      { id: "no", name: "No", price: 0.39, tokenId: "turnout-no" },
    ],
    clobTokenIds: ["turnout-yes", "turnout-no"],
  },
  {
    id: "senate-control-2026",
    slug: "senate-control-2026",
    question: "Will one party hold a U.S. Senate majority after the 2026 elections?",
    description: "Illustrative politics market.",
    category: "Politics",
    image: null,
    icon: null,
    status: "open",
    active: true,
    closed: false,
    archived: false,
    endDate: "2026-11-04T18:00:00Z",
    volume: 5830000,
    liquidity: 426000,
    commentCount: 327,
    outcomes: [
      { id: "yes", name: "Yes", price: 0.54, tokenId: "senate-yes" },
      { id: "no", name: "No", price: 0.46, tokenId: "senate-no" },
    ],
    clobTokenIds: ["senate-yes", "senate-no"],
  },
  {
    id: "election-2028",
    slug: "who-will-win-the-2028-us-presidential-election",
    question: "Who will win the 2028 US presidential election?",
    description: "Demo politics market.",
    category: "Politics",
    image: null,
    icon: null,
    status: "open",
    active: true,
    closed: false,
    archived: false,
    endDate: "2028-11-07T23:59:59Z",
    volume: 12800000,
    liquidity: 870000,
    commentCount: 1842,
    outcomes: [
      { id: "candidate-a", name: "Candidate A", price: 0.42, tokenId: "election-a" },
      { id: "field", name: "Field", price: 0.58, tokenId: "election-field" },
    ],
    clobTokenIds: ["election-a", "election-field"],
  },
];

const pointsByMarket: Record<string, number[]> = {
  "midterm-turnout-2026": [0.48, 0.52, 0.57, 0.59, 0.61],
  "senate-control-2026": [0.49, 0.51, 0.56, 0.52, 0.54],
  "who-will-win-the-2028-us-presidential-election": [0.34, 0.36, 0.33, 0.39, 0.42],
};

const evidenceItems: EvidenceItem[] = [
  {
    id: "calendar",
    title: "Election certification calendar",
    publisher: "Sample state election board",
    kind: "official",
  },
  {
    id: "survey",
    title: "Illustrative registered-voter survey",
    publisher: "Demo research desk",
    kind: "poll",
  },
  {
    id: "model",
    title: "Turnout baseline methodology",
    publisher: "Civic model lab",
    kind: "model",
  },
];

const pollComparisonRows: PollMarketComparisonRow[] = [
  {
    id: "yes",
    label: "Yes",
    pollShare: 0.58,
    marketProbability: 0.61,
    sampleSize: 1287,
    marginOfErrorPoints: 2.8,
    asOf: "Illustrative data",
  },
  {
    id: "no",
    label: "No",
    pollShare: 0.42,
    marketProbability: 0.39,
    sampleSize: 1287,
    marginOfErrorPoints: 2.8,
    asOf: "Illustrative data",
  },
];

const comments: MarketComment[] = [
  {
    id: "research-desk",
    body: "The spread is finally tight enough to embed in a live dashboard.",
    createdAt: "2026-06-15T08:30:00Z",
    profile: { name: "Research Desk" },
  },
  {
    id: "builder-ops",
    body: "This is the exact surface media products keep rebuilding from scratch.",
    createdAt: "2026-06-15T09:45:00Z",
    profile: { pseudonym: "builder-ops" },
  },
];

const leaderboardRows: TraderLeaderboardRow[] = [
  {
    rank: 1,
    wallet: "0x1111111111111111111111111111111111111111",
    name: "Event Arb",
    volume: 1280000,
    profit: 82000,
  },
  {
    rank: 2,
    wallet: "0x2222222222222222222222222222222222222222",
    name: "Research Desk",
    volume: 940000,
    profit: 54000,
  },
  {
    rank: 3,
    wallet: "0x3333333333333333333333333333333333333333",
    name: "Macro Flow",
    volume: 710000,
    profit: 31000,
  },
];

function makePoints(market: PolymarketMarket): MarketPricePoint[] {
  const prices = pointsByMarket[market.slug] ?? [0.42, 0.44, 0.47, 0.51, 0.54];

  return prices.map((price, index) => ({
    price,
    timestamp: `2026-06-0${index + 1}T00:00:00Z`,
  }));
}

function makeOrderbook(market: PolymarketMarket): OrderbookSnapshot {
  const price = market.outcomes[0]?.price ?? 0.5;

  return {
    asks: [
      { price: Math.min(0.99, price + 0.01), size: 1100, total: 1100 },
      { price: Math.min(0.99, price + 0.02), size: 700, total: 1800 },
      { price: Math.min(0.99, price + 0.03), size: 500, total: 2300 },
    ],
    bids: [
      { price: Math.max(0.01, price - 0.01), size: 1200, total: 1200 },
      { price: Math.max(0.01, price - 0.02), size: 900, total: 2100 },
      { price: Math.max(0.01, price - 0.03), size: 600, total: 2700 },
    ],
    mid: price,
    spread: 0.02,
    tokenId: market.outcomes[0]?.tokenId ?? "demo-token",
    updatedAt: "2026-06-15T10:00:00Z",
  };
}

function SkeletonState() {
  return (
    <div className="civic-lab__state-card" aria-label="Loading preview">
      <span />
      <strong />
      <p />
      <p />
      <i />
    </div>
  );
}

function MessageState({ tone }: { tone: "empty" | "error" }) {
  return (
    <div className="civic-lab__message" data-tone={tone}>
      <strong>
        {tone === "error" ? "Market data unavailable" : "No market selected"}
      </strong>
      <p>
        {tone === "error"
          ? "Fallback states preserve the grid and keep the interface operational."
          : "Empty states remain structural, not decorative."}
      </p>
    </div>
  );
}

export function InteractiveLab({ theme }: InteractiveLabProps) {
  const [marketSlug, setMarketSlug] = useState(markets[0]?.slug ?? "");
  const [tab, setTab] = useState<DemoTab>("market");
  const [state, setState] = useState<DemoState>("live");
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState("");
  const [comboIntentLabel, setComboIntentLabel] = useState("No intent emitted");
  const market = markets.find((item) => item.slug === marketSlug) ?? markets[0]!;
  const points = useMemo(() => makePoints(market), [market]);
  const orderbook = useMemo(() => makeOrderbook(market), [market]);
  const pngShareImage = useShareImage({
    attribution: "pui-kit/demo",
    format: "png",
    slug: "sample",
    theme,
  });
  const svgShareImage = useShareImage({
    attribution: "pui-kit/demo",
    format: "svg",
    slug: "sample",
    theme,
  });
  const exportPath = `/api/og?slug=sample&theme=${theme}&format=png`;
  const snippets: Record<DemoTab, string> = {
    market: `import { MarketCard } from "@polymarket-ui-kit/react";

<MarketCard market={market} points={points} />`,
    evidence: `import { EvidenceRail } from "@polymarket-ui-kit/react";

<EvidenceRail items={verifiedSources} />`,
    polls: `import { PollMarketComparison } from "@polymarket-ui-kit/react";

<PollMarketComparison rows={pollRows} contextLabel="Your source and date" />`,
    share: `import { ShareCard } from "@polymarket-ui-kit/react";

<ShareCard market={market} attribution="your-publication" statusLabel="Public market" />`,
    builder: `import { BuilderFeeDisclosure, BuilderBadge } from "@polymarket-ui-kit/react";

<BuilderFeeDisclosure builder={builder} notional={100} side="taker" />
<BuilderBadge builder={builder} showCode />`,
    combo: `import { ComboBuilderCard } from "@polymarket-ui-kit/react";

<ComboBuilderCard markets={markets} onComboIntent={handleIntent} />`,
    export: `import { useShareImage } from "@polymarket-ui-kit/react";

const image = useShareImage({ slug: "sample", format: "png", theme: "${theme}" });
// Host the /api/og route from the demo in your application.
<a href={image.url}>Open share image</a>`,
    data: `import { OrderbookPanel, CommentList, LeaderboardTable } from "@polymarket-ui-kit/react";

<OrderbookPanel orderbook={orderbook} />
<CommentList comments={comments} />
<LeaderboardTable rows={leaderboard} />`,
    states: `import { MarketCard, useMarket } from "@polymarket-ui-kit/react";

const { data, error, isLoading } = useMarket(slug);
if (isLoading) return <p role="status">Loading market...</p>;
if (error) return <p role="alert">Market unavailable.</p>;
if (!data) return <p>No market data.</p>;
return <MarketCard market={data} />;`,
  };
  const snippet = snippets[tab];

  async function copySnippet() {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(snippet);
    } catch {
      setCopied("");
      setCopyError("Clipboard unavailable. Select the snippet and copy it manually.");
    }
  }

  return (
    <section className="civic-lab" aria-labelledby="interactive-lab-title">
      <header className="civic-lab__heading">
        <h2 id="interactive-lab-title">Test the Civic Forecast system.</h2>
        <span>
          Switch fixtures, inspect component states, and copy the same typed React
          surface. All values in this lab are illustrative.
        </span>
      </header>

      <div className="civic-lab__toolbar">
        <label>
          <span>Market fixture</span>
          <select
            onChange={(event) => setMarketSlug(event.target.value)}
            value={marketSlug}
          >
            {markets.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.category}: {item.question}
              </option>
            ))}
          </select>
        </label>

        <button onClick={copySnippet} type="button">
          {copied === snippet ? "Copied" : "Copy React snippet"}
        </button>
      </div>

      <p className="civic-source-note" role="status">
        {copyError}
      </p>
      <div className="civic-lab__workspace">
        <PreviewRail
          items={labTabs}
          value={tab}
          onChange={setTab}
          panelId="lab-panel"
        />
        <div className="civic-lab__content" data-tab={tab}>
          <div
            className="civic-lab__preview"
            role="tabpanel"
            id="lab-panel"
            aria-labelledby={`lab-tab-${tab}`}
            tabIndex={0}
          >
            {tab === "market" ? (
              <MarketCard market={market} points={points} sourceLabel="Sample data" />
            ) : null}
            {tab === "evidence" ? <EvidenceRail items={evidenceItems} /> : null}
            {tab === "polls" ? (
              <PollMarketComparison
                rows={pollComparisonRows}
                contextLabel="Illustrative external context"
              />
            ) : null}
            {tab === "share" ? (
              <div className="civic-lab__share-stage">
                <ShareCard
                  market={market}
                  attribution="pui-kit/demo"
                  statusLabel="Sample data"
                />
                <div className="civic-lab__share-meta" aria-label="Share card metadata">
                  <span>{theme === "dark" ? "Dark theme" : "Light theme"}</span>
                  <span>{market.category ?? "Market"}</span>
                  <span>
                    {market.outcomes[0]?.price != null
                      ? `${Math.round(market.outcomes[0].price * 100)} cents`
                      : "No price"}
                  </span>
                </div>
              </div>
            ) : null}
            {tab === "builder" ? (
              <div className="civic-lab__builder-grid">
                <BuilderFeeDisclosure
                  builder={sampleBuilder}
                  notional={100}
                  price={market.outcomes[0]?.price ?? undefined}
                  side="taker"
                />
                <div className="civic-lab__builder-surface">
                  <BuilderBadge
                    builder={sampleBuilder}
                    feeBps={sampleBuilder.takerFeeBps}
                    feeSide="taker"
                    showCode
                  />
                  <FeePill
                    input={{
                      builderFeeSide: "taker",
                      builderTakerFeeBps: sampleBuilder.takerFeeBps,
                      notional: 100,
                      price: market.outcomes[0]?.price ?? undefined,
                    }}
                    label="Estimated builder fee"
                  />
                </div>
              </div>
            ) : null}
            {tab === "combo" ? (
              <div className="civic-lab__combo">
                <ComboShareCard
                  legs={sampleComboLegs}
                  title="BTC ATH + Fed cut combo"
                  attribution="pui-kit/demo"
                />
                <ComboBuilderCard
                  builderCode={sampleBuilder.code}
                  initialLegs={sampleComboLegs}
                  markets={sampleComboMarkets}
                  onComboIntent={(intent) => {
                    setComboIntentLabel(
                      `${intent.legs.length} legs / ${intent.direction} / ${intent.source}`,
                    );
                  }}
                  size={25}
                />
                <div className="civic-lab__intent">{comboIntentLabel}</div>
              </div>
            ) : null}
            {tab === "export" ? (
              <div className="civic-lab__export-grid">
                <ShareCard
                  className="civic-lab__export-card"
                  market={sampleMarket}
                  attribution="pui-kit/demo"
                  statusLabel="Sample data"
                />
                <div className="civic-lab__export-panel">
                  <div className="civic-lab__export-header">
                    <span>Election sample export</span>
                    <strong>One slug. PNG + SVG.</strong>
                  </div>
                  <div className="civic-lab__export-actions">
                    <a href={pngShareImage.url} rel="noreferrer" target="_blank">
                      Open PNG route
                    </a>
                    <a href={svgShareImage.url} rel="noreferrer" target="_blank">
                      Open SVG route
                    </a>
                  </div>
                  <div className="civic-lab__export-specs" aria-label="Export details">
                    <div>
                      <span>Theme</span>
                      <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
                    </div>
                    <div>
                      <span>Source</span>
                      <strong>Sample data</strong>
                    </div>
                    <div>
                      <span>Size</span>
                      <strong>1200 × 630</strong>
                    </div>
                  </div>
                  <code>{exportPath}</code>
                </div>
              </div>
            ) : null}
            {tab === "data" ? (
              <div className="civic-lab__data-grid">
                <OrderbookPanel orderbook={orderbook} />
                <CommentList comments={comments} />
                <LeaderboardTable rows={leaderboardRows} />
              </div>
            ) : null}
            {tab === "states" ? (
              <div className="civic-lab__states">
                <div
                  className="civic-lab__segmented"
                  role="group"
                  aria-label="Render state"
                >
                  {(["live", "loading", "error", "empty"] as DemoState[]).map(
                    (item) => (
                      <button
                        aria-pressed={state === item}
                        data-active={state === item ? "true" : undefined}
                        key={item}
                        onClick={() => setState(item)}
                        type="button"
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
                {state === "live" ? (
                  <MarketCard
                    market={market}
                    points={points}
                    sourceLabel="Sample data"
                  />
                ) : null}
                {state === "loading" ? <SkeletonState /> : null}
                {state === "error" ? <MessageState tone="error" /> : null}
                {state === "empty" ? <MessageState tone="empty" /> : null}
              </div>
            ) : null}
          </div>

          <pre className="civic-lab__snippet">
            <code>{snippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
