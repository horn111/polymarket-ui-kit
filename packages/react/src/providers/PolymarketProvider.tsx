import {
  getMarketBySlug,
  getOrderbook,
  listComments,
  listMarkets,
  type BuilderConfig,
  type ListCommentsParams,
  type ListMarketsParams,
  type MarketAdapterOptions,
  type OrderbookAdapterOptions,
  type OrderbookParams,
} from "@polymarket-ui-kit/core";
import { createContext, useContext, useMemo, type PropsWithChildren } from "react";

export interface PolymarketClient {
  listMarkets: typeof listMarkets;
  getMarketBySlug: typeof getMarketBySlug;
  listComments: typeof listComments;
  getOrderbook: typeof getOrderbook;
}

export interface PolymarketProviderProps extends PropsWithChildren {
  fetch?: typeof fetch;
  gammaBaseUrl?: string;
  dataBaseUrl?: string;
  clobBaseUrl?: string;
  builder?: BuilderConfig;
}

const PolymarketContext = createContext<PolymarketClient | null>(null);
const PolymarketBuilderContext = createContext<BuilderConfig | null>(null);

export function PolymarketProvider({
  children,
  fetch,
  gammaBaseUrl,
  clobBaseUrl,
  builder,
}: PolymarketProviderProps) {
  const client = useMemo<PolymarketClient>(() => {
    const marketOptions: MarketAdapterOptions = { fetch, gammaBaseUrl };
    const orderbookOptions: OrderbookAdapterOptions = { fetch, clobBaseUrl };

    return {
      listMarkets: (params?: ListMarketsParams) => listMarkets(params, marketOptions),
      getMarketBySlug: (slug: string) => getMarketBySlug(slug, marketOptions),
      listComments: (params?: ListCommentsParams) =>
        listComments(params, marketOptions),
      getOrderbook: (params: OrderbookParams) => getOrderbook(params, orderbookOptions),
    };
  }, [clobBaseUrl, fetch, gammaBaseUrl]);

  return (
    <PolymarketContext.Provider value={client}>
      <PolymarketBuilderContext.Provider value={builder ?? null}>
        {children}
      </PolymarketBuilderContext.Provider>
    </PolymarketContext.Provider>
  );
}

export function usePolymarketClient(): PolymarketClient {
  const client = useContext(PolymarketContext);

  if (!client) {
    return {
      listMarkets: (params?: ListMarketsParams) => listMarkets(params),
      getMarketBySlug: (slug: string) => getMarketBySlug(slug),
      listComments: (params?: ListCommentsParams) => listComments(params),
      getOrderbook: (params: OrderbookParams) => getOrderbook(params),
    };
  }

  return client;
}

export function usePolymarketBuilder(): BuilderConfig | null {
  return useContext(PolymarketBuilderContext);
}
