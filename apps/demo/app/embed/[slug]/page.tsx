import { ShareCard } from "@polymarket-ui-kit/react";
import { loadPublicMarket } from "../../../components/live-data";

export const revalidate = 60;

type EmbedPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { slug } = await params;
  const { market } = await loadPublicMarket(slug);

  return <ShareCard market={market} />;
}
