export interface FetchJsonOptions extends RequestInit {
  fetch?: typeof fetch | undefined;
  query?: Record<string, boolean | number | string | null | undefined> | undefined;
}

export class PolymarketRequestError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "PolymarketRequestError";
    this.status = status;
    this.url = url;
  }
}

export function withQuery(
  baseUrl: string,
  query?: Record<string, boolean | number | string | null | undefined>,
): string {
  const url = new URL(baseUrl);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

export async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions = {},
): Promise<T> {
  const fetcher = options.fetch ?? globalThis.fetch;

  if (!fetcher) {
    throw new Error("No fetch implementation is available.");
  }

  const { query, headers, ...initWithFetch } = options;
  const { fetch: omittedFetch, ...init } = initWithFetch;
  void omittedFetch;
  const requestUrl = withQuery(url, query);
  const response = await fetcher(requestUrl, {
    ...init,
    headers: {
      accept: "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new PolymarketRequestError(
      `Polymarket request failed with ${response.status}`,
      response.status,
      requestUrl,
    );
  }

  return (await response.json()) as T;
}
