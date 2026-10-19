import { useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { SiteLayout } from '@/components/sections/site-layout'
import { articles, categories, type Article, type ArticleCategory } from '@/data/news'

const PAGE_SIZE = 12

const categoryLabel: Record<ArticleCategory | 'All', string> = {
  All: 'ทั้งหมด',
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

function LatestItem({ article }: { article: Article }) {
  return (
    <Link
      to={`/news/${article.slug}`}
      className="group flex items-center gap-3 py-3 first:pt-0 last:pb-0"
    >
      <img
        src={article.heroImage}
        alt=""
        loading="lazy"
        className="h-24 w-24 shrink-0 rounded-xl object-cover"
      />
      <div className="flex-1">
        <p className="line-clamp-2 text-sm font-semibold group-hover:text-[#0B1B3B]">
          {article.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{formatDate(article.date)}</p>
      </div>
    </Link>
  )
}

function GridCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/news/${article.slug}`}
      className="group flex w-72 shrink-0 snap-start flex-col gap-3 sm:w-80"
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
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1B3B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0B1B3B]" />
          {categoryLabel[article.category]}
        </p>
        <p className="mt-2 line-clamp-2 text-base font-semibold group-hover:text-[#0B1B3B]">
          {article.title}
        </p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
        <p className="mt-2 text-xs text-muted-foreground">{formatDate(article.date)}</p>
      </div>
    </Link>
  )
}

export function NewsList() {
  const [searchParams] = useSearchParams()
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
    [],
  )

  const featured = sorted[0]
  const latest = sorted.slice(1, 5)

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

  return (
    <SiteLayout>
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container !max-w-[1600px]">
          {/* Magazine hero: overlay featured + latest list */}
          {featured && (
            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
              <Link
                to={`/news/${featured.slug}`}
                className="group flex flex-col gap-3 lg:col-span-2"
              >
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={featured.heroImage}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:aspect-video"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0B1B3B]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0B1B3B]" />
                      {categoryLabel[featured.category]}
                    </span>
                    <h2 className="mt-3 max-w-xl text-xl font-semibold tracking-tight text-white group-hover:underline md:text-2xl lg:text-3xl">
                      {featured.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(featured.date)} &middot; BeSight
                </p>
              </Link>

              <div className="flex flex-col">
                <p className="text-lg font-semibold tracking-tight">ล่าสุด</p>
                <div className="mt-4 flex flex-1 flex-col justify-between divide-y divide-zinc-900/10">
                  {latest.map((article) => (
                    <LatestItem key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SPDR Gold Analysis banner */}
          <Link
            to="/spdr-gold-analysis"
            className="group relative mt-16 flex flex-col items-center gap-6 overflow-hidden rounded-3xl p-8 text-white sm:flex-row sm:justify-between md:p-10"
          >
            <img
              src="/images/news/gold-bars-banner.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1B3B] via-[#0B1B3B]/85 to-[#0B1B3B]/40" />

            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Gold Market Dashboard
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                เช็คราคาทองคำ SPDR Gold Shares แบบเรียลไทม์
              </p>
              <p className="mt-2 text-sm text-white/70">
                วิเคราะห์แนวโน้ม กองทุน GLD และปัจจัยสำคัญที่ส่งผลต่อราคาทองคำ
              </p>
            </div>
            <span className="relative z-10 inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1B3B] transition-transform group-hover:scale-[1.02]">
              ดูการวิเคราะห์
              <ChevronRight className="h-4 w-4" />
            </span>
          </Link>

          {/* Category preview rows */}
          {contentCategories.map((cat) => {
            const items = sorted.filter((a) => a.category === cat).slice(0, 8)
            if (items.length === 0) return null

            return (
              <div key={cat} className="mt-16">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className="text-xl font-semibold tracking-tight transition-colors hover:text-[#0B1B3B] md:text-2xl"
                  >
                    {categoryLabel[cat]}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollRow(cat, -1)}
                      aria-label="เลื่อนไปทางซ้าย"
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-900/[0.13] text-zinc-500 transition-colors hover:bg-zinc-900/[0.04]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollRow(cat, 1)}
                      aria-label="เลื่อนไปทางขวา"
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-900/[0.13] text-zinc-500 transition-colors hover:bg-zinc-900/[0.04]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div
                  ref={(el) => {
                    rowRefs.current[cat] = el
                  }}
                  className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {items.map((article) => (
                    <GridCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Full filterable archive */}
          <div id="all-articles" className="mt-20 scroll-mt-24 border-t border-zinc-900/10 pt-16">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full border-2 px-5 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'border-[#0B1B3B] bg-[#0B1B3B] text-white'
                      : 'border-zinc-900/[0.13] bg-white text-zinc-700 hover:bg-zinc-900/[0.04]'
                  }`}
                >
                  {categoryLabel[cat]}
                </button>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((article) => (
                <Link
                  key={article.slug}
                  to={`/news/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[2px_4px_12px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      loading="lazy"
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex w-fit items-center rounded-full bg-[#0B1B3B]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0B1B3B]">
                        {categoryLabel[article.category]}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#0B1B3B]">
                      อ่านต่อ
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {page < totalPages && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-full border-2 border-[#0B1B3B] px-8 py-3 text-sm font-semibold text-[#0B1B3B] transition-colors hover:bg-[#0B1B3B] hover:text-white"
                >
                  โหลดบทความเพิ่มเติม
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">
                ยังไม่มีบทความในหมวดหมู่นี้
              </p>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
