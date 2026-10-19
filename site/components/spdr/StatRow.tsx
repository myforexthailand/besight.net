'use client'

import { ArrowUp, Info, Minus, TrendingDown, TrendingUp } from 'lucide-react'

import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { formatTradeDate, useSpdr, useSpdrLocale } from '@/site/lib/spdr-context'

function ChangeBadge({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const positive = value >= 0
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
        positive ? 'bg-positive/10 text-positive' : 'bg-negative/10 text-negative'
      }`}
    >
      <ArrowUp className={`h-3 w-3 ${positive ? '' : 'rotate-180'}`} />
      {formatSigned(value)}
      {suffix}
    </span>
  )
}

function StatCard({
  label,
  value,
  subLine,
  change,
  info,
  large,
}: {
  label: string
  value: string
  subLine?: string
  change: number | null
  info?: string
  large?: boolean
}) {
  return (
    <div className="flex h-full flex-col justify-between surface p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {info && (
          <span title={info} aria-label={info} className="shrink-0 text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      <p
        className={`mt-2 font-bold tracking-tight text-navy ${large ? 'text-4xl md:text-5xl' : 'text-2xl'}`}
      >
        {value}
      </p>
      {subLine && <p className="mt-1 text-xs text-muted-foreground">{subLine}</p>}
      <div className="mt-3">{change !== null && <ChangeBadge value={change} />}</div>
    </div>
  )
}

export function flowStatusText(s: ReturnType<typeof useSpdr>, t: (th: string, en: string) => string) {
  const { streak, summary } = s
  const flow7 = t(`Net Flow 7 วัน ${formatSigned(summary.change7d)} ตัน`, `7-day Net Flow ${formatSigned(summary.change7d)} tonnes`)
  const gold7 =
    summary.goldReturn7d === null
      ? ''
      : t(
          ` · ราคาทอง ${formatSigned(summary.goldReturn7d, 1)}% ในช่วงเดียวกัน`,
          ` · gold ${formatSigned(summary.goldReturn7d, 1)}% over the same period`,
        )
  if (streak.direction === 'inflow')
    return `${t(`SPDR เพิ่มการถือครองต่อเนื่อง ${streak.days} วันทำการ`, `SPDR holdings up ${streak.days} consecutive trading days`)} · ${flow7}${gold7}`
  if (streak.direction === 'outflow')
    return `${t(`SPDR ลดการถือครองต่อเนื่อง ${streak.days} วันทำการ`, `SPDR holdings down ${streak.days} consecutive trading days`)} · ${flow7}${gold7}`
  return `${t('Holdings ไม่เปลี่ยนแปลงในวันทำการล่าสุด', 'Holdings unchanged on the latest trading day')} · ${flow7}${gold7}`
}

/** The four period-change cards on their own (2×2), used by the analysis page layout. */
export function StatCards() {
  const t = useT()
  const { summary } = useSpdr()
  const tonnes = (v: number) => `${formatSigned(v)} ${t('ตัน', 'tonnes')}`
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 min-[1440px]:grid-cols-2 xl:gap-4">
      <StatCard label={t('เปลี่ยนแปลงวันนี้', 'Change today')} value={tonnes(summary.change1d)} change={summary.changePct1d} />
      <StatCard label={t('7 วันทำการ', '7 trading days')} value={tonnes(summary.change7d)} change={summary.change7dPct} />
      <StatCard label={t('30 วันทำการ', '30 trading days')} value={tonnes(summary.change30d)} change={summary.change30dPct} />
      <StatCard
        label={t('YTD (ปีนี้)', 'YTD (this year)')}
        value={summary.changeYtd === null ? '—' : tonnes(summary.changeYtd)}
        change={summary.changeYtdPct}
      />
    </div>
  )
}

export function StatRow() {
  const t = useT()
  const locale = useSpdrLocale()
  const spdr = useSpdr()
  const { summary, flowStatus, asOf } = spdr
  const StatusIcon = flowStatus.status === 'INFLOW' ? TrendingUp : flowStatus.status === 'OUTFLOW' ? TrendingDown : Minus
  const statusColor =
    flowStatus.status === 'INFLOW'
      ? 'bg-positive/20 text-[#4ADE80]'
      : flowStatus.status === 'OUTFLOW'
        ? 'bg-negative/20 text-[#F87171]'
        : 'bg-white/10 text-white/70'
  const tonnes = (v: number) => `${formatSigned(v)} ${t('ตัน', 'tonnes')}`

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-2">
      {/* Tall feature card, left */}
      <div className="lg:row-span-2">
        <StatCard
          label={t('SPDR Holdings (ล่าสุด)', 'SPDR Holdings (Latest)')}
          value={`${summary.holdingsTons.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${t('ตัน', 'tonnes')}`}
          subLine={`≈ ${(summary.holdingsOunces / 1_000_000).toFixed(2)} ${t('ล้านออนซ์', 'million oz')}${
            summary.navUsd
              ? t(
                  ` | มูลค่า ~${(summary.navUsd / 1_000_000_000).toFixed(1)} พันล้าน USD`,
                  ` | value ~$${(summary.navUsd / 1_000_000_000).toFixed(1)}B`,
                )
              : ''
          }`}
          change={summary.changePct1d}
          info={t(
            `ทองคำที่ SPDR Gold Trust ถือครอง ณ วันทำการ ${formatTradeDate(asOf, { day: 'numeric', month: 'long', year: 'numeric' })} (Total Tonnes จาก SPDR)`,
            `Gold held by SPDR Gold Trust as of trading day ${formatTradeDate(asOf, { day: 'numeric', month: 'long', year: 'numeric' }, 'en-US')} (Total Tonnes from SPDR)`,
          )}
          large
        />
      </div>

      {/* Highlighted flow status card - wide, top right */}
      <div className="lg:col-span-3">
        <div className="relative h-full overflow-hidden rounded-2xl bg-navy p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.1)]">
          <img
            src="/images/news/gold-bars-banner.jpg"
            alt=""
            className="cover-fill"
          />
          <div className="pointer-events-none absolute inset-0 bg-[url('/images/homepage/widget-card-bg.webp')] bg-cover bg-center opacity-90 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-navy/20" />
          <div className="relative z-10 flex h-full flex-wrap items-center gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${statusColor}`}>
              <StatusIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                {t('สถานะ SPDR FLOW', 'SPDR FLOW Status')}
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                {flowStatus.status} &middot; {flowStatus.headline}
              </p>
              <p className="mt-1 text-sm text-white/70">{flowStatusText(spdr, t)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Small stat cards, wide bottom right */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-3">
        <StatCard label={t('เปลี่ยนแปลงวันนี้', 'Change today')} value={tonnes(summary.change1d)} change={summary.changePct1d} />
        <StatCard label={t('7 วันทำการ', '7 trading days')} value={tonnes(summary.change7d)} change={summary.change7dPct} />
        <StatCard label={t('30 วันทำการ', '30 trading days')} value={tonnes(summary.change30d)} change={summary.change30dPct} />
        <StatCard
          label={t('YTD (ปีนี้)', 'YTD (this year)')}
          value={summary.changeYtd === null ? '—' : tonnes(summary.changeYtd)}
          change={summary.changeYtdPct}
        />
      </div>
    </div>
  )
}
