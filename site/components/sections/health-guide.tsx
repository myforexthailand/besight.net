'use client'

import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Link } from '@/site/lib/router'

import { Button } from '@/site/components/ui/button'
import { GradientButton } from '@/site/components/ui/gradient-button'
import { useSiteData } from '@/site/lib/site-data'
import { blogTopic } from '@/site/data/blogTopics'
import { useT } from '@/site/lib/lang'

// Best-effort topical match between the static homepage teaser cards and a
// real scraped article, falling back to the /news listing when nothing fits.

const PAGE_SIZE = 4

/** Homepage "News & Insights" — the blog: published blog posts from CRM →
 *  News (events live in BeSight Events instead), pinned first then newest,
 *  four at a time with a "see more" button. */
export function HealthGuide() {
  const { articles } = useSiteData()
  const t = useT()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const ordered = useMemo(
    () =>
      articles.filter((a) => a.section !== 'event').sort(
        (a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || (a.date < b.date ? 1 : a.date > b.date ? -1 : 0),
      ),
    [articles],
  )
  const visible = ordered.slice(0, visibleCount)
  const hasMore = ordered.length > visibleCount

  return (
    <section id="guide" className="scroll-mt-24 bg-gray-50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 eyebrow">
            News & Insights
          </p>
          <h2 className="section-title">
            {t('ข่าวสารและมุมมองตลาด', 'News and Market Insights')}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            {t(
              'ติดตามข่าวเศรษฐกิจ บทวิเคราะห์ตลาด และอัปเดตสำคัญจาก BeSight',
              'Follow economic news, market analysis, and important updates from BeSight',
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/news">{t('ดูข่าวล่าสุด', 'Latest news')}</Link>
            </Button>
            <GradientButton asChild>
              <Link to="/news">{t('ดูบทความทั้งหมด', 'View all articles')}</Link>
            </GradientButton>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((article) => (
            <div
              key={article.slug}
              className="flex flex-col rounded-3xl bg-white p-4 shadow-soft"
            >
              <Link to={`/news/${article.slug}`} className="block overflow-hidden rounded-3xl">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  loading="lazy"
                  className="h-48 w-full rounded-3xl object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <p className="mt-4 eyebrow text-xs">
                {blogTopic(article.topic).eyebrow}
              </p>
              <h3 className="mt-1 line-clamp-2 text-lg font-semibold">{article.title}</h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
              <Link
                to={`/news/${article.slug}`}
                className="mt-4 pill-outline w-fit"
              >
                {blogTopic(article.topic).button}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Button size="lg" variant="outline" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
              {t('ดูเพิ่มเติม', 'Show more')}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
