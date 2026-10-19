import type { Metadata } from "next";
import { loadSpdrSnapshot } from "@/lib/server/spdr/refresh";
import { getServerLang } from "@/site/lib/lang-server";
import { SpdrGoldAnalysis } from "@/site/pages/SpdrGoldAnalysis";

export async function generateMetadata(): Promise<Metadata> {
  if ((await getServerLang()) === "en") {
    return {
      title: "SPDR Gold (GLD) Analysis",
      description: "Daily SPDR Gold Trust (GLD) holdings with Flow Momentum, Heatmap and Divergence, plus Thai gold prices.",
    };
  }
  return {
    title: "วิเคราะห์ SPDR Gold (GLD)",
    description: "ติดตามการถือครองทองคำ SPDR Gold Trust (GLD) รายวัน พร้อม Flow Momentum, Heatmap, Divergence และราคาทองไทย",
  };
}

export default async function Page() {
  return <SpdrGoldAnalysis snapshot={await loadSpdrSnapshot()} />;
}
