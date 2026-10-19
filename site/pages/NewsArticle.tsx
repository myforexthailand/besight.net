'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/site/lib/router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { SiteLayout } from '@/site/components/sections/site-layout'
import { ContentBlockView } from '@/site/components/news/content-block'
import { ImageGallery, groupContentBlocks } from '@/site/components/news/image-gallery'
import { CommentsSection } from '@/site/components/news/comments-section'
import type { Article, ArticleCategory } from '@/site/data/news'
import { useSiteData } from '@/site/lib/site-data'
import { HONEYPOT_STYLE, useNewsletter } from '@/site/lib/newsletter'
import { useSiteLang, useT } from '@/site/lib/lang'

const categoryLabels: Record<ArticleCategory, { th: string; en: string }> = {
  News: { th: 'ข่าวสาร', en: 'News' },
  Promotion: { th: 'โปรโมชั่น', en: 'Promotions' },
  Tools: { th: 'เครื่องมือ', en: 'Tools' },
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

/** `article` comes from the route (app/(site)/news/[slug]) with its body;
 *  a missing slug is a 404 there. Related articles use the site-wide list. */
export function NewsArticle({ article }: { article: Article }) {
  const { articles } = useSiteData()
  const t = useT()
  const { lang } = useSiteLang()
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'en' ? 'en-US' : 'th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  const categoryLabel = (cat: ArticleCategory) => t(categoryLabels[cat].th, categoryLabels[cat].en)
  const newsletter = useNewsletter(`article:${article.slug}`)
  // Share links and the comments plugin need an absolute URL; the origin is
  // only known in the browser, so it's filled in after mount.
  const [origin, setOrigin] = useState('')
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only value, unknown during SSR
    setOrigin(window.location.origin)
  }, [])
  const articleUrl = `${origin}/news/${article.slug}/`

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <SiteLayout>
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container !max-w-[1600px]">
          <Link
            to="/news"
            className="back-link"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('กลับไปหน้าข่าวสารทั้งหมด', 'Back to all news')}
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
                {categoryLabel(article.category)}
              </span>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-navy md:text-4xl lg:text-5xl">
                {article.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                    Be
                  </div>
                  <p className="text-sm">
                    {t('โดย', 'By')} <span className="font-medium text-zinc-700">BeSight Team</span>
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
                {t('เนื้อหาต้นฉบับ:', 'Original content:')}{' '}
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-navy"
                >
                  besight.net
                </a>
              </p>
            </article>

            <aside className="space-y-8">
              <div className="rounded-2xl border-2 border-zinc-900/[0.08] bg-white p-6">
                <p className="text-lg font-semibold text-navy">{t('ไม่พลาดทุกอัปเดต', 'Never miss an update')}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t(
                    'สมัครรับข่าวสารเพื่ออัปเดตเทคนิคและโปรโมชั่นล่าสุดจาก BeSight',
                    'Subscribe to get the latest techniques and promotions from BeSight',
                  )}
                </p>
                <form
                  className="relative mt-4 space-y-3"
                  onSubmit={(e) => void newsletter.onSubmit(e)}
                >
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={HONEYPOT_STYLE} />
                  <input
                    name="name"
                    type="text"
                    aria-label={t('ชื่อ', 'Name')}
                    placeholder={t('ชื่อ', 'Name')}
                    className="w-full rounded-lg border border-zinc-900/[0.13] px-3 py-2 text-sm outline-none transition-colors focus:border-navy"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    aria-label={t('อีเมล', 'Email')}
                    placeholder={t('อีเมล', 'Email')}
                    className="w-full rounded-lg border border-zinc-900/[0.13] px-3 py-2 text-sm outline-none transition-colors focus:border-navy"
                  />
                  <button
                    type="submit"
                    disabled={newsletter.state === 'sending'}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
                  >
                    {t('สมัครรับข่าวสาร', 'Subscribe')}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  {newsletter.message && (
                    <p role="status" className={`text-xs ${newsletter.state === 'done' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {newsletter.message}
                    </p>
                  )}
                </form>
              </div>

              <div>
                <p className="text-sm font-semibold text-navy">{t('แชร์บทความนี้', 'Share this article')}</p>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('แชร์ไปที่ X', 'Share on X')}
                    className="icon-btn text-zinc-700"
                  >
                    <XIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('แชร์ไปที่ LinkedIn', 'Share on LinkedIn')}
                    className="icon-btn text-zinc-700"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/besight.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('ดู Instagram ของ BeSight', 'View BeSight on Instagram')}
                    className="icon-btn text-zinc-700"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {origin && <CommentsSection slug={article.slug} articleUrl={articleUrl} />}

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-10 border-t border-zinc-900/10 pt-6 md:mt-16 md:pt-10">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold tracking-tight md:text-xl">{t('บทความที่เกี่ยวข้อง', 'Related articles')}</p>
                <Link
                  to={`/news?category=${article.category}`}
                  className="text-sm font-medium text-navy hover:underline"
                >
                  {t('ดูทั้งหมด', 'View all')}
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-6 sm:grid-cols-3 sm:gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/news/${r.slug}`}
                    className="group flex flex-col gap-2 sm:gap-3"
                  >
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={r.heroImage}
                        alt={r.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
                        <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                        {categoryLabel(r.category)}
                      </p>
                      <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold group-hover:text-navy sm:mt-2 sm:text-base">
                        {r.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground max-sm:hidden">{r.excerpt}</p>
                      <p className="mt-1.5 text-[11px] text-muted-foreground sm:mt-2 sm:text-xs">{formatDate(r.date)}</p>
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
