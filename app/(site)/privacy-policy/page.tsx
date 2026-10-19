import type { Metadata } from "next";
import { getServerLang } from "@/site/lib/lang-server";
import { PrivacyPolicy } from "@/site/pages/PrivacyPolicy";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await getServerLang()) === "en";
  return en
    ? { title: "Privacy Policy", description: "How BeSight collects, uses and protects your personal data." }
    : { title: "นโยบายความเป็นส่วนตัว", description: "BeSight เก็บ ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณอย่างไร" };
}

export default function Page() {
  return <PrivacyPolicy />;
}
