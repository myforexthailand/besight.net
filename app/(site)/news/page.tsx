import type { Metadata } from "next";
import { Suspense } from "react";
import { loadSpdrSnapshot } from "@/lib/server/spdr/refresh";
import { getServerLang } from "@/site/lib/lang-server";
import { NewsList } from "@/site/pages/NewsList";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await getServerLang()) === "en";
  return en
    ? { title: "News & Gold Insights", description: "Market news, gold price analysis, promotions and trading knowledge from BeSight." }
    : { title: "ข่าวสารและบทวิเคราะห์ทองคำ", description: "ข่าวตลาด บทวิเคราะห์ราคาทองคำ โปรโมชัน และความรู้การเทรด จาก BeSight" };
}

/** Gold quote + SPDR holdings for the two summary cards. Optional: the page works without them
 *  (loadSpdrSnapshot returns synthetic data in development when no database is available). */
async function loadGoldCards() {
  try {
    const snapshot = await loadSpdrSnapshot();
    if (!snapshot) return { thaiGold: null, spdr: null };
    const s = snapshot.summary;
    return {
      thaiGold: snapshot.thaiGold,
      spdr: {
        holdingsTons: s.holdingsTons,
        holdingsOunces: s.holdingsOunces,
        navUsd: s.navUsd,
        change1d: s.change1d,
        changePct1d: s.changePct1d,
        change7d: s.change7d,
        change7dPct: s.change7dPct,
      },
    };
  } catch {
    return { thaiGold: null, spdr: null };
  }
}

// NewsList reads ?category= on the client.
export default async function NewsPage() {
  const { thaiGold, spdr } = await loadGoldCards();
  return (
    <Suspense fallback={null}>
      <NewsList thaiGold={thaiGold} spdr={spdr} />
    </Suspense>
  );
}
