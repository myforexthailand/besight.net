import type { Metadata } from "next";
import { getServerLang } from "@/site/lib/lang-server";
import { CookiePolicy } from "@/site/pages/CookiePolicy";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await getServerLang()) === "en";
  return en
    ? { title: "Cookie Policy", description: "Which cookies BeSight uses and how you can manage your cookie settings." }
    : { title: "นโยบายคุกกี้", description: "BeSight ใช้คุกกี้อะไรบ้าง และคุณจัดการการตั้งค่าคุกกี้ได้อย่างไร" };
}

export default function Page() {
  return <CookiePolicy />;
}
