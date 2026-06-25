import { ShareCard } from "@polymarket-ui-kit/react";
import { RouteThemeSync } from "../../components/RouteThemeSync";
import { loadPublicMarket } from "../../../components/live-data";

export const revalidate = 60;

type EmbedPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ theme?: string }>;
};

function resolveTheme(value: string | undefined): "light" | "dark" {
  return value === "light" ? "light" : "dark";
}

export default async function EmbedPage({ params, searchParams }: EmbedPageProps) {
  const { slug } = await params;
  const theme = resolveTheme((await searchParams).theme);
  const { market } = await loadPublicMarket(slug);

  return (
    <>
      <RouteThemeSync theme={theme} />
      <ShareCard market={market} />
    </>
  );
}
