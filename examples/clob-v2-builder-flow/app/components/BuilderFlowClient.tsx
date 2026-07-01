"use client";

import { useMemo, useState } from "react";
import type { PolymarketMarket } from "@polymarket-ui-kit/core";
import {
  buildClobV2MarketOrderDraft,
  type ClobV2MarketOrderDraft,
} from "@polymarket-ui-kit/core";
import {
  BuilderFeeDisclosure,
  MarketCard,
  MobileTradeDrawer,
  PolymarketProvider,
  type TradeIntent,
} from "@polymarket-ui-kit/react";

interface BuilderFlowClientProps {
  builderCode: string;
  liveEnabled: boolean;
  market: PolymarketMarket;
}

type ServerResult =
  | {
      draft: ClobV2MarketOrderDraft;
      liveEnabled: boolean;
      mode: "dry-run";
      ok: true;
      proofNote: string;
    }
  | {
      draft: ClobV2MarketOrderDraft;
      liveEnabled: boolean;
      mode: "live";
      ok: true;
      response: unknown;
      proofNote: string;
    }
  | {
      error: string;
      ok: false;
    };

export function BuilderFlowClient({
  builderCode,
  liveEnabled,
  market,
}: BuilderFlowClientProps) {
  const builder = useMemo(
    () => ({
      code: builderCode,
      handle: "@verifiable-builder",
      makerFeeBps: 10,
      name: "Verifiable Builder Demo",
      takerFeeBps: 25,
      verified: true,
    }),
    [builderCode],
  );
  const [intent, setIntent] = useState<TradeIntent | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState<ServerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const localDraft = useMemo(() => {
    if (!intent) {
      return null;
    }

    try {
      return buildClobV2MarketOrderDraft({
        builderCode: intent.builderCode,
        market: intent.market,
        notional: intent.notional,
        outcome: intent.outcome,
      });
    } catch {
      return null;
    }
  }, [intent]);

  async function submitIntent(mode: "dry-run" | "live") {
    if (!intent || (mode === "live" && !confirmed)) {
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/builder-order", {
        body: JSON.stringify({
          confirmLive: mode === "live",
          intent: {
            builderCode: intent.builderCode,
            market: intent.market,
            notional: intent.notional,
            outcome: intent.outcome,
          },
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json()) as ServerResult;
      setResult(payload);
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : "Unknown request error",
        ok: false,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PolymarketProvider builder={builder}>
      <main className="builder-flow">
        <header className="builder-flow__header">
          <div>
            <p className="builder-flow__kicker">Polymarket UI Kit / Advanced Example</p>
            <h1>Verifiable Builder Flow</h1>
            <p>
              A read-first UI intent becomes a CLOB V2 order draft with a
              Builder Code attached. Host apps own signing, submission, and fill
              verification.
            </p>
          </div>
          <div className="builder-flow__mode">
            {liveEnabled ? "Live gated" : "Dry-run"}
          </div>
        </header>

        <section className="builder-flow__grid">
          <div className="builder-flow__stack">
            <article className="builder-flow__panel">
              <p className="builder-flow__eyebrow">01 / Public market surface</p>
              <MarketCard market={market} />
            </article>

            <article className="builder-flow__panel">
              <p className="builder-flow__eyebrow">02 / Builder disclosure</p>
              <BuilderFeeDisclosure
                builder={builder}
                notional={100}
                price={market.outcomes[0]?.price ?? undefined}
                side="taker"
              />
            </article>
          </div>

          <div className="builder-flow__stack">
            <article className="builder-flow__panel">
              <p className="builder-flow__eyebrow">03 / Trade intent</p>
              <MobileTradeDrawer
                builder={builder}
                defaultNotional={25}
                market={market}
                onTradeIntent={(nextIntent) => {
                  setIntent(nextIntent);
                  setResult(null);
                }}
              />
            </article>

            <article className="builder-flow__panel">
              <p className="builder-flow__eyebrow">04 / Host app order draft</p>
              <div className="builder-flow__actions">
                <button
                  className="builder-flow__button"
                  disabled={!intent || submitting}
                  onClick={() => void submitIntent("dry-run")}
                  type="button"
                >
                  Build dry-run draft
                </button>
                <button
                  className="builder-flow__button builder-flow__button--ghost"
                  disabled={!intent || !confirmed || !liveEnabled || submitting}
                  onClick={() => void submitIntent("live")}
                  type="button"
                >
                  Submit live order
                </button>
              </div>

              <label className="builder-flow__confirm">
                <input
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  type="checkbox"
                />
                I understand live mode can submit a real CLOB V2 order.
              </label>

              <pre className="builder-flow__json">
                {JSON.stringify(localDraft ?? intent ?? { status: "No intent yet" }, null, 2)}
              </pre>
            </article>

            {result ? (
              <article className="builder-flow__status">
                <strong>{result.ok ? `${result.mode} result` : "Error"}</strong>
                <pre className="builder-flow__json">{JSON.stringify(result, null, 2)}</pre>
              </article>
            ) : null}
          </div>
        </section>

        <aside className="builder-flow__proof">
          Builder attribution is verifiable after a matched fill:
          {" "}
          <strong>
            TradeIntent -&gt; CLOB V2 order with builderCode -&gt; fill -&gt;
            OrderFilled event -&gt; builder field.
          </strong>
        </aside>
      </main>
    </PolymarketProvider>
  );
}
