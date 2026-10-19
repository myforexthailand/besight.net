'use client'

import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link } from '@/site/lib/router'
import { useSiteData } from '@/site/lib/site-data'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

import { SiteLayout } from '@/site/components/sections/site-layout'
import { BottomRightCorner } from '@/site/components/sections/rivr-defi/BottomRightCorner'
import { GoldPriceCard } from '@/site/components/news/gold-price-card'
import { SpdrHoldingsCard, type SpdrSummary } from '@/site/components/news/spdr-holdings-card'
import type { Article, ArticleCategory } from '@/site/data/news'
import type { SpdrSnapshot } from '@/site/data/spdr'
import { useSiteLang, useT } from '@/site/lib/lang'

// Local copy on purpose: importing a value from site/data/news.ts would ship
// every seed article to the browser with this page.
const categories: Array<ArticleCategory | 'All'> = ['All', 'News', 'Promotion', 'Tools']

const PAGE_SIZE = 12

const categoryLabelEn: Record<ArticleCategory | 'All', string> = {
  All: 'All',
  News: 'News',
  Promotion: 'Promotions',
  Tools: 'Tools',
}

const categoryLabelTh: Record<ArticleCategory | 'All', string> = {
  All: 'ทั้งหมด',
  News: 'ข่าวสาร',
  Promotion: 'โปรโมชั่น',
  Tools: 'เครื่องมือ',
}

function useCategoryLabel() {
  const t = useT()
  return (cat: ArticleCategory | 'All') => t(categoryLabelTh[cat], categoryLabelEn[cat])
}

function useFormatDate() {
  const { lang } = useSiteLang()
  return (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'en' ? 'en-US' : 'th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
}

export function LatestItem({ article }: { article: Article }) {
  const formatDate = useFormatDate()
  return (
    <Link
      to={`/news/${article.slug}`}
      className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
    >
      <img
        src={article.heroImage}
        alt=""
        loading="lazy"
        className="h-[5.5rem] w-[5.5rem] shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-base font-medium leading-snug group-hover:text-navy">
          {article.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{formatDate(article.date)}</p>
      </div>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-300 transition-colors group-hover:text-navy" />
    </Link>
  )
}

/** Article card: photo, category dot, title, excerpt, date. `fluid` fills its grid cell instead of the fixed carousel width. */
function GridCard({ article, fluid = false }: { article: Article; fluid?: boolean }) {
  const formatDate = useFormatDate()
  const categoryLabel = useCategoryLabel()
  return (
    <Link
      to={`/news/${article.slug}`}
      className={`group flex flex-col gap-2 sm:gap-3 ${fluid ? 'w-full' : 'w-44 shrink-0 snap-start sm:w-80'}`}
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={article.heroImage}
          alt=""
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
          <span className="h-1.5 w-1.5 rounded-full bg-navy" />
          {categoryLabel(article.category)}
        </p>
        <p className="mt-1.5 line-clamp-2 text-sm font-semibold group-hover:text-navy sm:mt-2 sm:text-base">
          {article.title}
        </p>
        <p className={`mt-1 line-clamp-2 text-sm text-muted-foreground max-sm:hidden`}>{article.excerpt}</p>
        <p className="mt-1.5 text-[11px] text-muted-foreground sm:mt-2 sm:text-xs">{formatDate(article.date)}</p>
      </div>
    </Link>
  )
}

export function NewsList({
  thaiGold = null,
  spdr = null,
}: {
  thaiGold?: SpdrSnapshot['thaiGold']
  spdr?: SpdrSummary | null
}) {
  const { articles } = useSiteData()
  const t = useT()
  const formatDate = useFormatDate()
  const categoryLabel = useCategoryLabel()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const initialCategory: ArticleCategory | 'All' =
    categoryParam === 'News' || categoryParam === 'Promotion' || categoryParam === 'Tools'
      ? categoryParam
      : 'All'

  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'All'>(
    initialCategory,
  )
  const [page, setPage] = useState(1)
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const sorted = useMemo(
    () => [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [articles],
  )

  const featured = sorted[0]
  const latest = sorted.slice(1, 5)
  // Tag on the featured image: the blog topic when it has one, else the category.
  const topicTag: Record<string, [string, string]> = {
    'gold-outlook': ['ทองคำ', 'Gold'],
    'market-news': ['ข่าวตลาด', 'Market news'],
    'economic-calendar': ['ปฏิทินเศรษฐกิจ', 'Economic calendar'],
    'besight-update': ['BeSight Update', 'BeSight Update'],
  }
  const featuredTopic = featured?.topic ? topicTag[featured.topic] : undefined
  const featuredTag = featuredTopic ? t(featuredTopic[0], featuredTopic[1]) : featured ? categoryLabel(featured.category) : ''

  const contentCategories = categories.filter(
    (cat): cat is ArticleCategory => cat !== 'All',
  )

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? sorted
        : sorted.filter((a) => a.category === activeCategory),
    [sorted, activeCategory],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(0, page * PAGE_SIZE)

  const handleCategoryChange = (cat: ArticleCategory | 'All') => {
    setActiveCategory(cat)
    setPage(1)
    document.getElementById('all-articles')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollRow = (cat: ArticleCategory, direction: 1 | -1) => {
    const el = rowRefs.current[cat]
    el?.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  const goldBanner = (cls: string) => (
    <Link
      to="/spdr-gold-analysis"
      className={`group relative min-h-[13rem] flex-col items-start justify-center gap-5 rounded-3xl bg-[#111d45] px-6 py-8 text-white md:min-h-[13.5rem] md:flex-row md:items-center md:justify-between md:gap-8 md:py-10 md:pl-[28rem] md:pr-10 ${cls}`}
    >
            {/* Background photo, clipped to the rounded frame (the bars below overflow it on purpose) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
              <img
                src="/images/news/gold-bars-banner.jpg"
                alt=""
                className="cover-fill transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111d45] via-[#111d45]/90 to-[#1a2a5e]/60 mix-blend-multiply" />
            </div>
            {/* Gold bars rise above the top edge of the banner */}
            <img
              src="/images/news/gold-bars.webp"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -top-14 left-8 hidden h-[calc(100%+1.5rem)] w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.03] md:block"
            />

            <div className="relative z-10 md:pt-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 md:text-sm">
                Gold Market Dashboard
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight md:text-[1.75rem] md:leading-snug">
                {t('เช็คราคาทองคำ SPDR Gold Shares แบบเรียลไทม์', 'Track SPDR Gold Shares prices in real time')}
              </p>
              <p className="mt-2 text-sm text-white/70 md:text-base">
                {t(
                  'วิเคราะห์แนวโน้ม กองทุน GLD และปัจจัยสำคัญที่ส่งผลต่อราคาทองคำ',
                  'Analyze trends, the GLD fund, and the key factors driving gold prices',
                )}
              </p>
            </div>
            <span className="cta-btn relative z-10 inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-transform group-hover:scale-105">
              {t('ดูการวิเคราะห์', 'View analysis')}
              <ChevronRight className="cta-arrow h-4 w-4" />
            </span>
          </Link>
  )

  return (
    <SiteLayout>
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container !max-w-[1600px]">
          {/* Magazine hero: featured story + gold price on the left, latest list + promo tile on the right */}
          {featured && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                  <Link to={`/news/${featured.slug}`} className="group relative block overflow-hidden rounded-3xl">
                    <img
                      src={featured.heroImage}
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:aspect-[11/5]"
                    />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2 md:left-6 md:top-6">
                      {featured.pinned && (
                        <span className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm md:text-sm">
                          {t('ข่าวด่วน', 'Breaking')}
                        </span>
                      )}
                      <span className="rounded-full bg-blue-700 px-4 py-1.5 text-xs font-medium text-white shadow-sm md:text-sm">
                        {featuredTag}
                      </span>
                    </div>
                  </Link>
                  <Link to={`/news/${featured.slug}`} className="group">
                    <h2 className="text-3xl font-semibold leading-tight tracking-tight group-hover:text-navy md:text-4xl lg:text-[2.5rem]">
                      {featured.title}
                    </h2>
                  </Link>
                  <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600 md:text-base">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to={`/news/${featured.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 md:text-sm"
                    >
                      {t('อ่านต่อเพิ่มเติม', 'Read more')}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {formatDate(featured.date)} &middot; BeSight
                    </p>
                  </div>
                </div>

                {(thaiGold || spdr) && (
                  <div className={`grid flex-1 grid-cols-1 gap-4 [&>*]:h-full ${thaiGold && spdr ? 'md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]' : ''}`}>
                    {thaiGold && <GoldPriceCard thaiGold={thaiGold} />}
                    {spdr && <SpdrHoldingsCard summary={spdr} />}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-10">
                {goldBanner('flex md:hidden')}
                <div className="flex flex-col">
                  <p className="text-lg text-muted-foreground">{t('ข่าวสารล่าสุด', 'Latest news')}</p>
                  <div className="mt-4 flex flex-col divide-y divide-zinc-900/10">
                    {latest.map((article) => (
                      <LatestItem key={article.slug} article={article} />
                    ))}
                  </div>
                </div>

                <Link
                  to="/indicators/po3xm"
                  className="relative block aspect-square min-h-[20rem] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] lg:aspect-auto lg:flex-1"
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src="/images/Firefly-bear.mp4"
                    className="cover-fill"
                  />
                  <BottomRightCorner bgColor="#F9FAFB" />
                </Link>
              </div>
            </div>
          )}

          {/* SPDR Gold Analysis banner (desktop position; on mobile it sits above the latest news instead) */}
          {goldBanner('hidden md:flex mt-28 md:mt-24')}

          {/* Category preview rows */}
          {contentCategories.map((cat) => {
            const items = sorted.filter((a) => a.category === cat).slice(0, 8)
            if (items.length === 0) return null

            return (
              <div key={cat} className="mt-8 md:mt-16">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className="text-lg font-semibold tracking-tight transition-colors hover:text-navy md:text-2xl"
                  >
                    {categoryLabel(cat)}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollRow(cat, -1)}
                      aria-label={t('เลื่อนไปทางซ้าย', 'Scroll left')}
                      className="icon-btn text-zinc-500 max-md:!h-7 max-md:!w-7"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollRow(cat, 1)}
                      aria-label={t('เลื่อนไปทางขวา', 'Scroll right')}
                      className="icon-btn text-zinc-500 max-md:!h-7 max-md:!w-7"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div
                  ref={(el) => {
                    rowRefs.current[cat] = el
                  }}
                  className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto md:mt-6 md:gap-6 scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {items.map((article) => (
                    <GridCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Full filterable archive */}
          <div id="all-articles" className="mt-12 scroll-mt-24 border-t border-zinc-900/10 pt-10 md:mt-20 md:pt-16">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full border-2 px-3 py-1 text-xs font-medium transition-colors md:px-5 md:py-2 md:text-sm ${
                    activeCategory === cat
                      ? 'border-navy bg-navy text-white'
                      : 'border-zinc-900/[0.13] bg-white text-zinc-700 hover:bg-zinc-900/[0.04]'
                  }`}
                >
                  {categoryLabel(cat)}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-6 md:mt-12 lg:grid-cols-4">
              {visible.map((article) => (
                <GridCard key={article.slug} article={article} fluid />
              ))}
            </div>

            {page < totalPages && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-full border-2 border-navy px-8 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  {t('โหลดบทความเพิ่มเติม', 'Load more articles')}
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">
                {t('ยังไม่มีบทความในหมวดหมู่นี้', 'There are no articles in this category yet')}
              </p>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
