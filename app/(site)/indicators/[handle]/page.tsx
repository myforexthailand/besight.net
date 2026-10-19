import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readToolPage } from "@/lib/server/toolPages";
import { adminGuard } from "@/lib/session";
import { getServerLang } from "@/site/lib/lang-server";
import { ToolLanding } from "@/site/pages/ToolLanding";

type Params = { params: Promise<{ handle: string }> };

// Content comes from CRM → Website → Tools, so always render fresh.
export const dynamic = "force-dynamic";

// Coming-soon and unpublished tools have no public page; admins still see it
// so they can preview what they're writing in the CRM.
async function load(handle: string) {
  try {
    const tool = await readToolPage(decodeURIComponent(handle));
    if (!tool) return null;
    if ((tool.product.status ?? "live") !== "live" && !(await adminGuard()).ok) return null;
    return tool;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const [tool, lang] = await Promise.all([load((await params).handle), getServerLang()]);
  const en = lang === "en";
  if (!tool) return { title: en ? "Tool not found" : "ไม่พบเครื่องมือ" };
  const title = (en && tool.product.titleEn) || tool.product.title;
  const description = (en && tool.product.descriptionEn) || tool.product.description;
  return {
    title,
    description,
    openGraph: { title, description, images: tool.product.image ? [tool.product.image] : undefined },
  };
}

export default async function ToolPageRoute({ params }: Params) {
  const tool = await load((await params).handle);
  if (!tool) notFound();
  return <ToolLanding title={tool.product.title} pageEn={tool.pageEn} titleEn={tool.product.titleEn} page={tool.page} />;
}
