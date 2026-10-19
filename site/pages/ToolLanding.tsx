'use client'

import type { ReactNode } from 'react'
import {
  ArrowRight,
  Bell,
  Check,
  CircleCheck,
  Crosshair,
  Cpu,
  Download,
  FileClock,
  FileText,
  Gauge,
  History,
  Info,
  LineChart,
  ListChecks,
  RefreshCw,
  Shield,
  Target,
  Wallet,
} from 'lucide-react'

import { SiteLayout } from '@/site/components/sections/site-layout'
import { BottomRightCorner } from '@/site/components/sections/rivr-defi/BottomRightCorner'
import { GradientButton } from '@/site/components/ui/gradient-button'
import { useSiteLang } from '@/site/lib/lang'
import type { ToolBlock, ToolIcon, ToolItem, ToolLink, ToolPage, ToolTone } from '@/site/data/toolPage'

/* Tool details page (/indicators/<handle>) rendered from CRM content — the
   layout of the original PO3XM landing, driven by data. */

const ICONS: Record<ToolIcon, typeof Target> = {
  target: Target, shield: Shield, crosshair: Crosshair, gauge: Gauge, bell: Bell, check: CircleCheck,
  list: ListChecks, cpu: Cpu, file: FileText, history: History, download: Download, chart: LineChart,
  info: Info, refresh: RefreshCw, wallet: Wallet, clock: FileClock,
}

const BADGE_TONE: Record<ToolTone, string> = {
  default: 'bg-navy/10 text-navy',
  green: 'bg-positive/10 text-positive',
  red: 'bg-red-500/10 text-red-600',
  amber: 'bg-gold/15 text-[#B87E00]',
}
const TITLE_TONE: Record<ToolTone, string> = {
  default: 'text-navy',
  green: 'text-positive',
  red: 'text-red-600',
  amber: 'text-[#B87E00]',
}
const COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-5',
}

const isVideo = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url)

function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title?: string; description?: string }) {
  if (!eyebrow && !title && !description) return null
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="mb-3 eyebrow">{eyebrow}</p>}
      {title && (
        <h2 className="text-3xl font-semibold leading-snug tracking-tight text-navy md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug">
          {title}
        </h2>
      )}
      {description && <p className="mt-4 whitespace-pre-line text-base text-muted-foreground">{description}</p>}
    </div>
  )
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`surface p-6 ${className}`}>{children}</div>
}

function Note({ text }: { text?: string }) {
  if (!text) return null
  return <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line text-center text-sm text-muted-foreground">{text}</p>
}

function Section({ block, children }: { block: ToolBlock; children: ReactNode }) {
  const hasHeader = Boolean(block.eyebrow || block.title || block.description)
  // These blocks draw their own heading (split / cta / split-layout cards).
  const ownHeader = block.type === 'split' || block.type === 'cta' || (block.type === 'cards' && block.layout === 'split')
  return (
    <section className={`${block.background === 'gray' ? 'bg-gray-50' : 'bg-white'} py-16 md:py-24`}>
      <div className="container">
        {!ownHeader && <SectionHeader eyebrow={block.eyebrow} title={block.title} description={block.description} />}
        <div className={hasHeader && !ownHeader ? 'mt-12' : ''}>{children}</div>
        {block.type !== 'split' && !ownHeader && <Note text={block.note} />}
      </div>
    </section>
  )
}

function ItemCard({ item, variant }: { item: ToolItem; variant: 'card' | 'center' | 'alert' }) {
  const Icon = item.icon ? ICONS[item.icon] : null
  const tone = item.tone ?? 'default'
  if (variant === 'alert') {
    return (
      <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft">
        {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-navy" />}
        <div>
          <p className={`text-sm font-semibold ${TITLE_TONE[tone]}`}>{item.title}</p>
          {item.text && <p className="whitespace-pre-line text-xs text-zinc-500">{item.text}</p>}
        </div>
      </div>
    )
  }
  if (variant === 'center') {
    return (
      <Card className="text-center">
        <p className={`text-sm font-semibold ${item.text ? 'uppercase tracking-wide' : ''} ${TITLE_TONE[tone]}`}>{item.title}</p>
        {item.text && <p className="mt-2 whitespace-pre-line text-sm text-zinc-600">{item.text}</p>}
      </Card>
    )
  }
  if (item.image) {
    return (
      <Card className="flex flex-col overflow-hidden !p-0">
        <img src={item.image} alt={item.title} loading="lazy" className="w-full object-cover" />
        <div className="flex flex-1 flex-col p-6">
          <p className={`text-base font-semibold ${TITLE_TONE[tone]}`}>{item.title}</p>
          {item.text && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-zinc-600">{item.text}</p>}
        </div>
      </Card>
    )
  }
  return (
    <Card>
      {Icon && (
        <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${BADGE_TONE[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      )}
      <p className={`text-sm font-semibold ${Icon ? 'text-navy' : `uppercase tracking-wide ${TITLE_TONE[tone]}`}`}>{item.title}</p>
      {item.text && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-zinc-600">{item.text}</p>}
    </Card>
  )
}

function ActionLink({ link, className, children }: { link: ToolLink; className?: string; children: ReactNode }) {
  const external = /^https?:\/\//i.test(link.url)
  return (
    <a href={link.url} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

function BlockView({ block }: { block: ToolBlock }) {
  switch (block.type) {
    case 'cards':
      if (block.layout === 'split') {
        return (
          <Section block={block}>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={block.flip ? 'lg:order-last' : undefined}>
                {block.eyebrow && <p className="mb-3 eyebrow">{block.eyebrow}</p>}
                {block.title && <h2 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">{block.title}</h2>}
                {block.description && <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-zinc-700 md:text-base">{block.description}</p>}
                {block.note && <p className="mt-6 whitespace-pre-line text-sm text-muted-foreground">{block.note}</p>}
              </div>
              {block.image ? (
                <img src={block.image} alt={block.title ?? ''} loading="lazy" className="w-full rounded-2xl" />
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {block.items.map((item, i) => <ItemCard key={i} item={item} variant={block.variant} />)}
                </div>
              )}
            </div>
          </Section>
        )
      }
      return (
        <Section block={block}>
          <div className={`grid grid-cols-1 gap-6 ${COLS[block.columns]} ${block.columns === 2 ? 'mx-auto max-w-3xl' : ''}`}>
            {block.items.map((item, i) => <ItemCard key={i} item={item} variant={block.variant} />)}
          </div>
        </Section>
      )
    case 'images':
      return (
        <Section block={block}>
          <div className={`grid grid-cols-1 gap-8 ${block.images.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {block.images.map((image, i) => (
              <div key={i}>
                <img src={image.url} alt={image.caption || block.title || ''} loading="lazy" className="mx-auto w-full max-w-7xl rounded-2xl" />
                {image.caption && (
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5" />
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
          {block.badges.length > 0 && (
            <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
              {block.badges.map((badge, i) => {
                const Icon = badge.icon ? ICONS[badge.icon] : null
                return (
                  <span key={i} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${BADGE_TONE[badge.tone ?? 'default']}`}>
                    {Icon && <Icon className="h-4 w-4" />}
                    {badge.title}
                  </span>
                )
              })}
            </div>
          )}
        </Section>
      )
    case 'split': {
      const BulletIcon = ICONS[block.bulletIcon]
      const bullets = block.bullets.length > 0 && (
        <ul className={block.side === 'bullets' ? 'space-y-3' : 'mt-6 space-y-3'}>
          {block.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              {block.bulletIcon === 'check' ? (
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-positive/10 text-positive">
                  <CircleCheck className="h-3.5 w-3.5" />
                </span>
              ) : (
                <BulletIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
              )}
              <span className="text-sm leading-relaxed text-zinc-700">{bullet}</span>
            </li>
          ))}
        </ul>
      )
      return (
        <Section block={block}>
          <div className={`grid grid-cols-1 items-center gap-10 ${block.side !== 'none' ? 'lg:grid-cols-2 lg:gap-14' : 'mx-auto max-w-3xl'}`}>
            <div className={block.flip && block.side !== 'none' ? 'lg:order-last' : undefined}>
              {block.eyebrow && <p className="mb-3 eyebrow">{block.eyebrow}</p>}
              {block.title && <h2 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">{block.title}</h2>}
              {block.description && <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-zinc-700 md:text-base">{block.description}</p>}
              {block.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {block.tags.map((tag) => (
                    <span key={tag} className="rounded-full border-2 border-zinc-900/[0.13] px-3 py-1 text-xs font-medium text-zinc-700">{tag}</span>
                  ))}
                </div>
              )}
              {block.side !== 'bullets' && bullets}
              {block.note && <p className="mt-6 whitespace-pre-line text-sm text-muted-foreground">{block.note}</p>}
            </div>
            {block.side === 'image' && block.image && <img src={block.image} alt={block.title ?? ''} loading="lazy" className="w-full rounded-2xl" />}
            {block.side === 'bullets' && (
              <Card>
                {bullets}
                {block.panelText && (
                  <p className="mt-5 border-t border-zinc-900/10 pt-4 text-xs leading-relaxed text-muted-foreground">{block.panelText}</p>
                )}
              </Card>
            )}
            {block.side === 'panel' && (
              <div className="rounded-2xl bg-navy p-6 text-white">
                {block.panelTitle && (
                  <div className="flex items-center gap-2 text-white/70">
                    <Wallet className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-wide">{block.panelTitle}</p>
                  </div>
                )}
                <div className="mt-4 space-y-2 text-sm">
                  {block.rows.map((row, i) => (
                    <div key={i} className={`flex items-center justify-between ${i < block.rows.length - 1 ? 'border-b border-white/10 pb-2' : ''}`}>
                      <span className="text-white/70">{row.label}</span>
                      <span className={`font-semibold ${i === block.rows.length - 1 ? 'text-[#A3E635]' : ''}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                {block.panelText && <p className="mt-4 text-xs leading-relaxed text-white/60">{block.panelText}</p>}
              </div>
            )}
          </div>
        </Section>
      )
    }
    case 'steps':
      return (
        <Section block={block}>
          <div className="mx-auto max-w-xl">
            {block.items.map((item, i, arr) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i !== arr.length - 1 && <span className="w-px flex-1 bg-zinc-900/10" />}
                </div>
                <div className="pb-8">
                  <p className="pt-1.5 text-base font-semibold text-navy">{item.title}</p>
                  {item.text && <p className="mt-1 whitespace-pre-line text-sm text-zinc-600">{item.text}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )
    case 'cta':
      return (
        <Section block={block}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
              {block.title && <p className="mt-3 text-2xl font-semibold tracking-tight text-navy md:text-3xl">{block.title}</p>}
            </div>
            <GradientButton asChild className="shrink-0">
              <ActionLink link={block.button}>
                {block.button.label}
                <ArrowRight className="h-4 w-4" />
              </ActionLink>
            </GradientButton>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
            <Card className="lg:row-span-2">
              {block.listTitle && <p className="eyebrow text-xs">{block.listTitle}</p>}
              <ul className="mt-5 flex flex-col gap-3 text-sm text-zinc-600">
                {block.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="lg:col-span-2">
              {block.aboutTitle && <p className="eyebrow text-xs">{block.aboutTitle}</p>}
              {block.aboutText && <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-600">{block.aboutText}</p>}
            </Card>
            <div
              className={`flex items-center justify-center rounded-2xl p-6 shadow-soft ${
                block.logoDark ? 'bg-black' : 'bg-white'
              }`}
            >
              {block.logo && <img src={block.logo} alt="" className="w-4/5" />}
            </div>
            <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#6D28D9] to-[#1D4ED8] p-8">
              {block.promo && <p className="text-sm font-semibold text-white">{block.promo}</p>}
              <GradientButton asChild className="mt-6 w-fit">
                <ActionLink link={block.button}>
                  {block.button.label}
                  <ArrowRight className="h-4 w-4" />
                </ActionLink>
              </GradientButton>
            </div>
          </div>
        </Section>
      )
  }
}

export function ToolLanding({ title: titleTh, titleEn, page: pageTh, pageEn }: { title: string; titleEn?: string; page: ToolPage; pageEn?: ToolPage }) {
  const { lang } = useSiteLang()
  const page = lang === 'en' && pageEn ? pageEn : pageTh
  const title = lang === 'en' && titleEn ? titleEn : titleTh
  const { hero } = page
  return (
    <SiteLayout>
      <section id="hero" className="bg-gray-50 py-10 md:py-16">
        <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            {hero.logo ? (
              <img src={hero.logo} alt={title} className="h-16 w-auto md:h-24" />
            ) : (
              <h1 className="text-3xl font-semibold tracking-tight text-navy md:text-5xl">{title}</h1>
            )}
            {hero.intro && <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-zinc-600 md:text-base">{hero.intro}</p>}
            {hero.facts.length > 0 && (
              <div className="mt-8 flex flex-col gap-3">
                {hero.facts.map((fact, i) => {
                  const Icon = fact.icon ? ICONS[fact.icon] : Info
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0 text-zinc-500" />
                      <p className="text-sm font-medium text-navy">{fact.label}</p>
                    </div>
                  )
                })}
              </div>
            )}
            {hero.buttons.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {hero.buttons.map((button, i) => (
                  <GradientButton
                    key={i}
                    asChild
                    className="w-fit"
                    innerClassName={i === 0 ? 'bg-navy text-white hover:bg-navy/90' : undefined}
                  >
                    <ActionLink link={button}>
                      {i === 0 ? <Download className="h-4 w-4" /> : <LineChart className="h-4 w-4" />}
                      {button.label}
                    </ActionLink>
                  </GradientButton>
                ))}
              </div>
            )}
            {hero.links.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-zinc-500">
                {hero.links.map((l, i) => (
                  <ActionLink key={i} link={l} className="underline-offset-4 hover:text-navy hover:underline">{l.label}</ActionLink>
                ))}
              </div>
            )}
          </div>

          {hero.media && (
            <div className="group relative order-1 h-[26rem] w-full overflow-hidden rounded-[1.5rem] sm:h-[32rem] lg:order-2 lg:h-[40rem] lg:rounded-[3rem]">
              {isVideo(hero.media) ? (
                <video autoPlay muted playsInline src={hero.media} className="cover-fill" />
              ) : (
                <img src={hero.media} alt={title} className="cover-fill" />
              )}
              <BottomRightCorner bgColor="#F9FAFB" />
            </div>
          )}
        </div>
      </section>

      {page.blocks.map((block, i) => {
        // A block right after an image block on the same background sits closer to it (the two paddings stack otherwise).
        const prev = page.blocks[i - 1]
        const joined = prev?.type === 'images' && prev.background === block.background
        return joined ? (
          <div key={i} className="-mt-16 md:-mt-24 [&>section]:pt-10 md:[&>section]:pt-12">
            <BlockView block={block} />
          </div>
        ) : (
          <BlockView key={i} block={block} />
        )
      })}
    </SiteLayout>
  )
}
