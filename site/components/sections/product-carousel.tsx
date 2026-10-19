'use client'

import { useState } from 'react'
import { Link } from '@/site/lib/router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { GradientButton } from '@/site/components/ui/gradient-button'
import { cn } from '@/site/lib/utils'
import type { Article } from '@/site/data/news'
import { useSiteData } from '@/site/lib/site-data'
import { useSiteLang, useT } from '@/site/lib/lang'



function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}


function Slide({ item }: { item: Article }) {
  const { lang } = useSiteLang()
  const t = useT()
  return (
    <>
      <img
        src={item.heroImage}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8 text-white">
        <p className="text-sm uppercase tracking-widest opacity-80">{formatDate(item.date, lang === 'en' ? 'en-US' : 'th-TH')}</p>
        <p className="mt-1 max-w-xs text-xl font-medium">{item.title}</p>
        <GradientButton asChild className="mt-6">
          <Link to={`/news/${item.slug}`}>{t('อ่านเพิ่มเติม', 'Read more')}</Link>
        </GradientButton>
      </div>
    </>
  )
}

function Carousel({ items }: { items: Article[] }) {
  const [index, setIndex] = useState(0)

  const goPrev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const goNext = () => setIndex((i) => (i + 1) % items.length)

  return (
    <div className="relative">
      <div className="relative h-[24rem] overflow-hidden rounded-3xl sm:h-[28rem] md:h-[32rem]">
        {items.map((item, i) => (
          <div
            key={item.slug}
            className={cn(
              'group absolute inset-0 transition-opacity duration-500',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <Slide item={item} />
          </div>
        ))}

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-100/80 text-foreground transition-colors hover:bg-neutral-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-100/80 text-foreground transition-colors hover:bg-neutral-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Go to ${item.title}`}
              onClick={() => setIndex(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === index ? 'w-6 bg-foreground' : 'w-2 bg-foreground/25',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function ProductCarousel() {
  const { articles } = useSiteData()
  // BeSight Events: articles marked "event" in CRM → News, pinned first then newest.
  const seminars = articles
    .filter((a): a is Article => a.section === 'event')
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  const featured = seminars[0]
  const rest = seminars.slice(1)
  const carouselA = rest.filter((_, i) => i % 3 === 0)
  const carouselB = rest.filter((_, i) => i % 3 === 1)
  const carouselC = rest.filter((_, i) => i % 3 === 2)
  if (!featured) return null

  return (
    <section id="events" className="scroll-mt-24 bg-gray-100 py-20 md:py-28">
      <div className="container mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 eyebrow">
          BeSight Events
        </p>
        <h2 className="section-title">
          Learn. Connect. Trade Together.
        </h2>
      </div>

      <div className="container grid gap-8 lg:grid-cols-4">
        <div className="group relative h-[24rem] overflow-hidden rounded-3xl sm:h-[28rem] md:h-[32rem]">
          <Slide item={featured} />
        </div>

        <Carousel items={carouselA} />
        <Carousel items={carouselB} />
        <Carousel items={carouselC} />
      </div>
    </section>
  )
}
