export const POLYMARKET_MARKET_WS_URL =
  "wss://ws-subscriptions-clob.polymarket.com/ws/market";

export interface MarketWebSocketOptions {
  url?: string;
  WebSocketCtor?: typeof WebSocket;
  assetIds: string[];
  customFeatureEnabled?: boolean;
  onMessage?: (message: unknown) => void;
  onOpen?: () => void;
  onError?: (event: Event) => void;
}

export interface MarketWebSocketController {
  socket: WebSocket;
  close: () => void;
  subscribe: (assetIds: string[]) => void;
  unsubscribe: (assetIds: string[]) => void;
}

function sendJson(socket: WebSocket, payload: unknown): void {
  socket.send(JSON.stringify(payload));
}

export function createMarketWebSocket(
  options: MarketWebSocketOptions,
): MarketWebSocketController {
  const WebSocketCtor = options.WebSocketCtor ?? globalThis.WebSocket;

  if (!WebSocketCtor) {
    throw new Error("No WebSocket implementation is available.");
  }

  const socket = new WebSocketCtor(options.url ?? POLYMARKET_MARKET_WS_URL);
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  socket.addEventListener("open", () => {
    sendJson(socket, {
      assets_ids: options.assetIds,
      type: "market",
      custom_feature_enabled: options.customFeatureEnabled ?? true,
    });

    heartbeat = setInterval(() => {
      if (socket.readyState === socket.OPEN) {
        socket.send("PING");
      }
    }, 10_000);

    options.onOpen?.();
  });

  socket.addEventListener("message", (event) => {
    if (typeof event.data !== "string") {
      options.onMessage?.(event.data);
      return;
    }

    try {
      options.onMessage?.(JSON.parse(event.data) as unknown);
    } catch {
      options.onMessage?.(event.data);
    }
  });

  socket.addEventListener("error", (event) => options.onError?.(event));
  socket.addEventListener("close", () => {
    if (heartbeat) {
      clearInterval(heartbeat);
    }
  });

  return {
    socket,
    close: () => socket.close(),
    subscribe: (assetIds) =>
      sendJson(socket, {
        assets_ids: assetIds,
        operation: "subscribe",
        custom_feature_enabled: options.customFeatureEnabled ?? true,
      }),
    unsubscribe: (assetIds) =>
      sendJson(socket, {
        assets_ids: assetIds,
        operation: "unsubscribe",
      }),
  };
}

