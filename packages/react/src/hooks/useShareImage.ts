import { useMemo } from "react";
import type { ShareImageFormat, ShareImageTheme } from "@polymarket-ui-kit/core";

export interface UseShareImageOptions {
  slug: string;
  baseUrl?: string;
  theme?: ShareImageTheme;
  format?: ShareImageFormat;
  attribution?: string;
}

export function useShareImage({
  slug,
  baseUrl = "",
  theme = "dark",
  format = "png",
  attribution,
}: UseShareImageOptions) {
  return useMemo(() => {
    const params = new URLSearchParams({ slug, theme, format });

    if (attribution) {
      params.set("attribution", attribution);
    }

    const path = `/api/og?${params.toString()}`;
    const url = baseUrl ? new URL(path, baseUrl).toString() : path;

    return {
      url,
      alt: `Share image for ${slug}`,
      downloadName: `${slug}.${format}`,
    };
  }, [attribution, baseUrl, format, slug, theme]);
}
