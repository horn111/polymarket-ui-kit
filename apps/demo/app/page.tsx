import { CivicDemoClient } from "./components/CivicDemoClient";
import { loadPublicMarketBundle } from "../components/live-data";

export const revalidate = 60;

export default async function DemoHome() {
  const bundle = await loadPublicMarketBundle("sample");
  return <CivicDemoClient bundle={bundle} />;
}
