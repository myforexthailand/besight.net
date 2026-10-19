import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { GradientButton } from '@/components/ui/gradient-button'
import { guides } from '@/data/content'
import { articles } from '@/data/news'

// Best-effort topical match between the static homepage teaser cards and a
// real scraped article, falling back to the /news listing when nothing fits.
const guideArticleSlug: Record<string, string | undefined> = {
  'Market News': articles.find((a) => a.slug === 'xauusd-daily-02102025')?.slug,
  'Gold Outlook': articles.find((a) => a.slug === 'ppi-core-ppi')?.slug,
  'Economic News': articles.find((a) => a.slug === 'fomc-meeting-minutes')?.slug,
  'BeSight Update': articles.find((a) => a.slug === 'besight-one-str')?.slug,
}

export function HealthGuide() {
  return (
    <section id="guide" className="scroll-mt-24 bg-gray-50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            News & Insights
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            ข่าวสารและมุมมองตลาด
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            ติดตามข่าวเศรษฐกิจ บทวิเคราะห์ตลาด และอัปเดตสำคัญจาก BeSight
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/news">ดูข่าวล่าสุด</Link>
            </Button>
            <GradientButton asChild>
              <Link to="/news">ดูบทความทั้งหมด</Link>
            </GradientButton>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide) => {
            const slug = guideArticleSlug[guide.category]
            const href = slug ? `/news/${slug}` : '/news'
            return (
              <div
                key={guide.title}
                className="flex flex-col rounded-3xl bg-white p-4 shadow-[2px_4px_12px_rgba(0,0,0,0.08)]"
              >
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="h-48 w-full rounded-3xl object-cover"
                />
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {guide.eyebrow}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{guide.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {guide.description}
                </p>
                <Link
                  to={href}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-zinc-900/[0.13] px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-900/[0.04]"
                >
                  {guide.category}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
