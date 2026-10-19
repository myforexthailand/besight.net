import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Poppins } from "next/font/google";
import { auth } from "@/auth";
import {
  defaultSiteContent,
  devMockArticles,
  listPublishedArticles,
  readSiteContent,
  readSiteLeaderboard,
  type SiteContent,
  type SiteLeaderboard,
} from "@/lib/server/site";
import { SiteDataProvider, type SiteSession } from "@/site/lib/site-data";
import { SiteLangProvider } from "@/site/lib/lang";
import { getServerLang } from "@/site/lib/lang-server";
import type { Article } from "@/site/data/news";
import "@/site/index.css";

/* Public landing site (/, /news, /about, …). Its Tailwind stylesheet is only
   loaded under this layout, and links into the member app are plain <a>
   (see site/lib/router.tsx), so the landing's styles never reach the CRM or
   dashboard. */

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const plexThai = IBM_Plex_Sans_Thai({ subsets: ["thai", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex-thai", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const en = (await getServerLang()) === "en";
  return {
    title: { default: en ? "BeSight - More Than Just Trading" : "BeSight - ให้คุณได้มากกว่าการเทรด", template: "%s - BeSight" },
    description: en
      ? "Rebates, trading tools, community and trading knowledge for traders, all in one place."
      : "รวมรีเบต เครื่องมือเทรด คอมมูนิตี้ และความรู้การเทรด สำหรับเทรดเดอร์ไว้ในที่เดียว",
  };
}

// A settings/DB hiccup must never take the public homepage down: each piece
// falls back independently.
async function safely<T>(load: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await load();
  } catch {
    return fallback;
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [articles, content, leaderboard, session] = await Promise.all([
    safely<Article[]>(listPublishedArticles, devMockArticles()),
    safely<SiteContent>(readSiteContent, defaultSiteContent()),
    safely<SiteLeaderboard>(() => readSiteLeaderboard(), { current: [], previous: [], activeTraders: 0 }),
    safely(() => auth(), null),
  ]);
  // Tools set to "not published" in CRM → Website never reach the browser.
  const publicContent: SiteContent = { ...content, products: content.products.filter((p) => p.status !== "hidden") };
  const siteSession: SiteSession = session?.user?.role ? { role: session.user.role } : null;
  const initialLang = await getServerLang();

  return (
    <div className={`site-root ${poppins.variable} ${plexThai.variable}`}>
      <SiteLangProvider initialLang={initialLang}>
        <SiteDataProvider value={{ articles, content: publicContent, leaderboard, session: siteSession }}>{children}</SiteDataProvider>
      </SiteLangProvider>
    </div>
  );
}
