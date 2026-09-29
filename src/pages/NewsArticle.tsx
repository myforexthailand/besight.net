import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { SiteLayout } from '@/components/sections/site-layout'
import { ContentBlockView } from '@/components/news/content-block'
import { ImageGallery, groupContentBlocks } from '@/components/news/image-gallery'
import { CommentsSection } from '@/components/news/comments-section'
import { getArticleBySlug, articles, type ArticleCategory } from '@/data/news'

const categoryLabel: Record<ArticleCategory, string> = {
  News: 'ข่าวสาร',
  Promotion: 'โปรโมชั่น',
  Tools: 'เครื่องมือ',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function XIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedinIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554z" />
    </svg>
  )
}

function InstagramIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={props.className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function NewsArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return <Navigate to="/news" replace />
  }

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <SiteLayout>
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container !max-w-[1600px]">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[#0B1B3B]"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับไปหน้าข่าวสารทั้งหมด
          </Link>

          <div className="mt-4 overflow-hidden rounded-3xl">
            <img
              src={article.heroImage}
              alt={article.title}
              className="aspect-video w-full object-cover"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            <article className="min-w-0">
              <span className="inline-flex w-fit items-center rounded-full border-2 border-zinc-900/[0.13] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700">
                {categoryLabel[article.category]}
              </span>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#0B1B3B] md:text-4xl lg:text-5xl">
                {article.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1B3B] text-xs font-semibold text-white">
                    Be
                  </div>
                  <p className="text-sm">
                    โดย <span className="font-medium text-zinc-700">BeSight Team</span>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(article.date)}</p>
              </div>

              <p className="mt-6 text-base text-muted-foreground">{article.excerpt}</p>

              <div className="mt-6 border-t border-zinc-900/10 pt-6">
                {groupContentBlocks(article.content).map((group, i) =>
                  group.type === 'gallery' ? (
                    <ImageGallery
                      key={i}
                      images={group.images.map((b) => ({ src: b.src, alt: b.alt }))}
                    />
                  ) : (
                    <ContentBlockView key={i} block={group} />
                  ),
                )}
              </div>

              <p className="mt-10 text-xs text-muted-foreground">
                เนื้อหาต้นฉบับ:{' '}
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#0B1B3B]"
                >
                  besight.net
                </a>
              </p>
            </article>

            <aside className="space-y-8">
              <div className="rounded-2xl border-2 border-zinc-900/[0.08] bg-white p-6">
                <p className="text-lg font-semibold text-[#0B1B3B]">ไม่พลาดทุกอัปเดต</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  สมัครรับข่าวสารเพื่ออัปเดตเทคนิคและโปรโมชั่นล่าสุดจาก BeSight
                </p>
                <form
                  className="mt-4 space-y-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    placeholder="ชื่อ"
                    className="w-full rounded-lg border border-zinc-900/[0.13] px-3 py-2 text-sm outline-none transition-colors focus:border-[#0B1B3B]"
                  />
                  <input
                    type="email"
                    placeholder="อีเมล"
                    className="w-full rounded-lg border border-zinc-900/[0.13] px-3 py-2 text-sm outline-none transition-colors focus:border-[#0B1B3B]"
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1B3B] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B1B3B]/90"
                  >
                    สมัครรับข่าวสาร
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0B1B3B]">แชร์บทความนี้</p>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="แชร์ไปที่ X"
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-900/[0.13] text-zinc-700 transition-colors hover:bg-zinc-900/[0.04]"
                  >
                    <XIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="แชร์ไปที่ LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-900/[0.13] text-zinc-700 transition-colors hover:bg-zinc-900/[0.04]"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/besight.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ดู Instagram ของ BeSight"
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-900/[0.13] text-zinc-700 transition-colors hover:bg-zinc-900/[0.04]"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <CommentsSection slug={article.slug} articleUrl={window.location.href} />

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16 border-t border-zinc-900/10 pt-10">
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold tracking-tight">บทความที่เกี่ยวข้อง</p>
                <Link
                  to={`/news?category=${article.category}`}
                  className="text-sm font-medium text-[#0B1B3B] hover:underline"
                >
                  ดูทั้งหมด
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/news/${r.slug}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-[2px_4px_12px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-0.5"
                  >
                    <img
                      src={r.heroImage}
                      alt={r.title}
                      loading="lazy"
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <span className="inline-flex w-fit items-center rounded-full bg-[#0B1B3B]/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#0B1B3B]">
                        {categoryLabel[r.category]}
                      </span>
                      <h3 className="mt-2 line-clamp-2 text-sm font-semibold group-hover:text-[#0B1B3B]">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  )
}
