import { ShareCard } from "@polymarket-ui-kit/react";
import { sampleMarket } from "../../../components/sample-data";

export default function EmbedPage({ params }: { params: { slug: string } }) {
  return <ShareCard market={{ ...sampleMarket, slug: params.slug }} />;
}

