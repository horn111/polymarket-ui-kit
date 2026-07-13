import { CivicDemoClient } from "./components/CivicDemoClient";
import { sampleMarket } from "../components/sample-data";
import { loadPublicMarketBundle } from "../components/live-data";

export const revalidate = 60;

export default async function DemoHome() {
  const bundle = await loadPublicMarketBundle(sampleMarket.slug);
  return <CivicDemoClient bundle={bundle} />;
}
