import {
  buildClobV2MarketOrderDraft,
  ClobV2OrderDraftError,
  type ClobV2MarketOrderDraft,
  type ClobV2OrderSide,
  type ClobV2OrderType,
  type MarketOutcome,
  type PolymarketMarket,
} from "@polymarket-ui-kit/core";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface BuilderOrderRequest {
  confirmLive?: boolean | undefined;
  intent?: {
    builderCode?: string | undefined;
    market?: PolymarketMarket | undefined;
    notional?: number | undefined;
    outcome?: MarketOutcome | undefined;
  } | undefined;
}

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for live CLOB V2 order submission.`);
  }

  return value;
}

type ClobClientLike = {
  createAndPostMarketOrder: (
    order: Record<string, unknown>,
    options: Record<string, unknown>,
    orderType: unknown,
  ) => Promise<unknown>;
  createOrDeriveApiKey: () => Promise<unknown>;
};

type ClobClientConstructor = new (config: Record<string, unknown>) => ClobClientLike;

async function submitLiveOrder(draft: ClobV2MarketOrderDraft): Promise<unknown> {
  const clob = (await import("@polymarket/clob-client-v2")) as Record<
    string,
    unknown
  >;
  const viem = await import("viem");
  const accounts = await import("viem/accounts");
  const privateKey = requiredEnv("POLY_PRIVATE_KEY");
  const funderAddress = requiredEnv("POLY_FUNDER_ADDRESS");
  const host = process.env.POLY_CLOB_HOST ?? "https://clob.polymarket.com";
  const chainId = Number(process.env.POLY_CHAIN_ID ?? 137);
  const account = accounts.privateKeyToAccount(privateKey as `0x${string}`);
  const ClobClient = clob.ClobClient as ClobClientConstructor;
  const chainEnum = clob.Chain as Record<string, unknown> | undefined;
  const sideEnum = clob.Side as Record<ClobV2OrderSide, unknown> | undefined;
  const orderTypeEnum = clob.OrderType as
    | Record<ClobV2OrderType, unknown>
    | undefined;
  const chain =
    chainId === 137 && chainEnum?.POLYGON ? chainEnum.POLYGON : chainId;
  const side = sideEnum?.[draft.side] ?? draft.side;
  const orderType = orderTypeEnum?.[draft.orderType] ?? draft.orderType;
  const signer = viem.createWalletClient({
    account,
    transport: viem.http(),
  });
  const unauthenticatedClient = new ClobClient({
    chain,
    funderAddress,
    host,
    signer,
  });
  const credentials = await unauthenticatedClient.createOrDeriveApiKey();
  const client = new ClobClient({
    chain,
    creds: credentials,
    funderAddress,
    host,
    signer,
  });

  return client.createAndPostMarketOrder(
    {
      amount: draft.amount,
      builderCode: draft.builderCode,
      price: draft.price,
      side,
      tokenID: draft.tokenID,
    },
    { negRisk: false, tickSize: "0.01" },
    orderType,
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BuilderOrderRequest;
    const liveEnabled = process.env.POLY_ENABLE_LIVE_ORDERS === "true";
    const draft = buildClobV2MarketOrderDraft({
      builderCode: payload.intent?.builderCode ?? process.env.POLY_BUILDER_CODE,
      market: payload.intent?.market,
      notional: payload.intent?.notional ?? 0,
      outcome: payload.intent?.outcome ?? {
        id: "",
        name: "",
        price: null,
      },
    });
    const proofNote =
      "Builder attribution is verifiable after a matched OrderFilled event exposes the builder field.";

    if (!payload.confirmLive || !liveEnabled) {
      return NextResponse.json({
        draft,
        liveEnabled,
        mode: "dry-run",
        ok: true,
        proofNote,
      });
    }

    const response = await submitLiveOrder(draft);

    return NextResponse.json({
      draft,
      liveEnabled,
      mode: "live",
      ok: true,
      proofNote,
      response,
    });
  } catch (error) {
    const status = error instanceof ClobV2OrderDraftError ? 400 : 500;

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown builder flow error",
        ok: false,
      },
      { status },
    );
  }
}
