import { useMemo } from "react";

export interface UseShareImageOptions {
  slug: string;
  baseUrl?: string;
  theme?: "light" | "dark";
}

export function useShareImage({
  slug,
  baseUrl = "",
  theme = "dark",
}: UseShareImageOptions) {
  return useMemo(() => {
    const params = new URLSearchParams({ slug, theme });
    const path = `/api/og?${params.toString()}`;
    const url = baseUrl ? new URL(path, baseUrl).toString() : path;

    return {
      url,
      alt: `Share image for ${slug}`,
    };
  }, [baseUrl, slug, theme]);
}

