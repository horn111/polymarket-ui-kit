"use client";

import { useMemo, useState } from "react";
import type {
  MarketComment,
  MarketPricePoint,
  OrderbookSnapshot,
  PolymarketMarket,
  TraderLeaderboardRow,
} from "@polymarket-ui-kit/core";
import {
  BuilderBadge,
  BuilderFeeDisclosure,
  CommentList,
  FeePill,
  LeaderboardTable,
  MarketCard,
  OrderbookPanel,
  ShareCard,
  useShareImage,
} from "@polymarket-ui-kit/react";
import { sampleBuilder } from "../../components/sample-builder";

type DemoTab = "market" | "share" | "builder" | "export" | "data" | "states";
type DemoState = "live" | "loading" | "error" | "empty";
type DemoTheme = "light" | "dark";

interface InteractiveLabProps {
  theme: DemoTheme;
}

const markets: PolymarketMarket[] = [
  {
    id: "btc-ath-2026",
    slug: "btc-ath-2026",
    question: "Will Bitcoin set a new All-Time High in 2026?",
    description: "Demo crypto market.",
    category: "Crypto",
    image: null,
    icon: null,
    status: "open",
    active: true,
    closed: false,
    archived: false,
    endDate: "2026-12-31T23:59:59Z",
    volume: 15400000,
    liquidity: 1240000,
    commentCount: 842,
    outcomes: [
      { id: "yes", name: "Yes", price: 0.68, tokenId: "btc-yes" },
      { id: "no", name: "No", price: 0.32, tokenId: "btc-no" },
    ],
    clobTokenIds: ["btc-yes", "btc-no"],
  },
  {
    id: "fed-cut-2026",
    slug: "fed-cut-2026",
    question: "Will the Fed cut rates at the next meeting?",
    description: "Demo macro market.",
    category: "Macro",
    image: null,
    icon: null,
    status: "open",
    active: true,
    closed: false,
    archived: false,
    endDate: "2026-09-16T18:00:00Z",
    volume: 5800000,
    liquidity: 420000,
    commentCount: 321,
    outcomes: [
      { id: "yes", name: "Yes", price: 0.57, tokenId: "fed-yes" },
      { id: "no", name: "No", price: 0.43, tokenId: "fed-no" },
    ],
    clobTokenIds: ["fed-yes", "fed-no"],
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
  "btc-ath-2026": [0.38, 0.43, 0.52, 0.56, 0.68],
  "fed-cut-2026": [0.52, 0.55, 0.61, 0.58, 0.57],
  "who-will-win-the-2028-us-presidential-election": [0.34, 0.36, 0.33, 0.39, 0.42],
};

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
    <div className="demo-state-card" aria-label="Loading preview">
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
    <div className="demo-message-state" data-tone={tone}>
      <strong>
        {tone === "error" ? "MARKET DATA UNAVAILABLE" : "NO MARKET SELECTED"}
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
  const [copied, setCopied] = useState(false);
  const market = markets.find((item) => item.slug === marketSlug) ?? markets[0]!;
  const points = useMemo(() => makePoints(market), [market]);
  const orderbook = useMemo(() => makeOrderbook(market), [market]);
  const pngShareImage = useShareImage({
    attribution: "pui-kit/demo",
    format: "png",
    slug: market.slug,
    theme,
  });
  const svgShareImage = useShareImage({
    attribution: "pui-kit/demo",
    format: "svg",
    slug: market.slug,
    theme,
  });
  const exportPath = `/api/og?slug=${market.slug}&theme=${theme}&format=png`;
  const snippet = `import { MarketCard } from "@polymarket-ui-kit/react";

export function MarketEmbed({ market, points }) {
  return <MarketCard market={market} points={points} />;
}`;

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      // The local preview can run in browser contexts where clipboard writes are blocked.
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className="demo-lab" aria-labelledby="interactive-lab-title">
      <header className="demo-lab__heading">
        <p className="demo-kicker">08 / OPERATOR CONSOLE</p>
        <h2 id="interactive-lab-title">BUILDER PREVIEW LAB</h2>
      </header>

      <div className="demo-lab__toolbar">
        <label>
          MARKET INPUT
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

        <button className="demo-copy-button" onClick={copySnippet} type="button">
          {copied ? "COPIED" : "COPY SNIPPET"}
        </button>
      </div>

      <div className="demo-lab__content" data-tab={tab}>
        <nav className="demo-lab__tabs" aria-label="Component preview">
          {(["market", "share", "builder", "export", "data", "states"] as DemoTab[]).map(
            (item) => (
              <button
                aria-current={tab === item ? "page" : undefined}
                data-active={tab === item ? "true" : undefined}
                key={item}
                onClick={() => setTab(item)}
                type="button"
              >
                {item}
              </button>
            ),
          )}
        </nav>

        <div className="demo-lab__preview">
          {tab === "market" ? <MarketCard market={market} points={points} /> : null}
          {tab === "share" ? (
            <div className="demo-share-stage">
              <ShareCard market={market} attribution="pui-kit/demo" />
              <div className="demo-share-meta" aria-label="Share card metadata">
                <span>{theme.toUpperCase()} SUBSTRATE</span>
                <span>{market.category ?? "MARKET"}</span>
                <span>
                  {market.outcomes[0]?.price
                    ? `${Math.round(market.outcomes[0].price * 100)}C`
                    : "LIVE"}
                </span>
              </div>
            </div>
          ) : null}
          {tab === "builder" ? (
            <div className="demo-lab__builder-grid">
              <BuilderFeeDisclosure
                builder={sampleBuilder}
                notional={100}
                price={market.outcomes[0]?.price ?? undefined}
                side="taker"
              />
              <div className="demo-builder-surface">
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
          {tab === "export" ? (
            <div className="demo-lab__export-grid">
              <ShareCard
                className="demo-export-card"
                market={market}
                attribution="pui-kit/demo"
              />
              <div className="demo-export-panel">
                <div className="demo-export-panel__header">
                  <span>OG / SHARE EXPORT</span>
                  <strong>ONE SLUG. PNG + SVG.</strong>
                </div>
                <div className="demo-export-actions">
                  <a href={pngShareImage.url} rel="noreferrer" target="_blank">
                    PNG ROUTE
                  </a>
                  <a href={svgShareImage.url} rel="noreferrer" target="_blank">
                    SVG ROUTE
                  </a>
                </div>
                <div className="demo-export-specs" aria-label="Export details">
                  <div>
                    <span>SUBSTRATE</span>
                    <strong>{theme === "dark" ? "DARK" : "PRINT"}</strong>
                  </div>
                  <div>
                    <span>SOURCE</span>
                    <strong>PUBLIC</strong>
                  </div>
                  <div>
                    <span>FALLBACK</span>
                    <strong>READY</strong>
                  </div>
                </div>
                <code>{exportPath}</code>
              </div>
            </div>
          ) : null}
          {tab === "data" ? (
            <div className="demo-lab__data-grid">
              <OrderbookPanel orderbook={orderbook} />
              <CommentList comments={comments} />
              <LeaderboardTable rows={leaderboardRows} />
            </div>
          ) : null}
          {tab === "states" ? (
            <div className="demo-lab__states">
              <div className="demo-segmented" role="group" aria-label="Render state">
                {(["live", "loading", "error", "empty"] as DemoState[]).map((item) => (
                  <button
                    data-active={state === item ? "true" : undefined}
                    key={item}
                    onClick={() => setState(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
              {state === "live" ? <MarketCard market={market} points={points} /> : null}
              {state === "loading" ? <SkeletonState /> : null}
              {state === "error" ? <MessageState tone="error" /> : null}
              {state === "empty" ? <MessageState tone="empty" /> : null}
            </div>
          ) : null}
        </div>

        <pre className="demo-lab__snippet">
          <code>{snippet}</code>
        </pre>
      </div>
    </section>
  );
}
