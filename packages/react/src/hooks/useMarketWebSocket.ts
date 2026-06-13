import {
  createMarketWebSocket,
  type MarketWebSocketController,
} from "@polymarket-ui-kit/core";
import { useEffect, useMemo, useState } from "react";

export interface UseMarketWebSocketOptions {
  assetIds: string[];
  enabled?: boolean;
  onMessage?: (message: unknown) => void;
}

export function useMarketWebSocket({
  assetIds,
  enabled = true,
  onMessage,
}: UseMarketWebSocketOptions) {
  const [lastMessage, setLastMessage] = useState<unknown>(null);
  const [isConnected, setIsConnected] = useState(false);
  const assetKey = useMemo(() => assetIds.join(","), [assetIds]);

  useEffect(() => {
    if (!enabled || assetIds.length === 0 || typeof WebSocket === "undefined") {
      return undefined;
    }

    let controller: MarketWebSocketController | null = createMarketWebSocket({
      assetIds,
      onOpen: () => setIsConnected(true),
      onMessage: (message) => {
        setLastMessage(message);
        onMessage?.(message);
      },
      onError: () => setIsConnected(false),
    });

    return () => {
      setIsConnected(false);
      controller?.close();
      controller = null;
    };
  }, [assetIds, assetKey, enabled, onMessage]);

  return { lastMessage, isConnected };
}

