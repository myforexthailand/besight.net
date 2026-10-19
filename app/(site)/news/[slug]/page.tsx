import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedArticle } from "@/lib/server/site";
import { NewsArticle } from "@/site/pages/NewsArticle";

type Params = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  try {
    return await getPublishedArticle(decodeURIComponent(slug));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await load((await params).slug);
  if (!article) return { title: "ไม่พบบทความ" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: article.heroImage ? [article.heroImage] : undefined },
  };
}

export default async function NewsArticlePage({ params }: Params) {
  const article = await load((await params).slug);
  if (!article) notFound();
  return <NewsArticle article={article} />;
}
