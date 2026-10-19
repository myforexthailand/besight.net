import type { Metadata } from "next";
import { getServerLang } from "@/site/lib/lang-server";
import { AboutBeSight } from "@/site/pages/AboutBeSight";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await getServerLang()) === "en";
  return en
    ? { title: "About Us", description: "BeSight is a community for traders, with trading analysis tools, rebates, a discussion community and trading knowledge." }
    : { title: "เกี่ยวกับเรา", description: "BeSight คือคอมมูนิตี้สำหรับเทรดเดอร์ ที่มีบริการเครื่องวิเคราะห์การเทรด รีเบต คอมมูนิตี้พูดคุย และความรู้" };
}

export default function Page() {
  return <AboutBeSight />;
}
