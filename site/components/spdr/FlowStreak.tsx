'use client'

import { Flame, Minus, TrendingDown } from 'lucide-react'

import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { useSpdr } from '@/site/lib/spdr-context'

export function FlowStreak() {
  const t = useT()
  const { streak } = useSpdr()
  const inflow = streak.direction === 'inflow'
  const outflow = streak.direction === 'outflow'
  const Icon = inflow ? Flame : outflow ? TrendingDown : Minus
  const tone = inflow ? 'text-positive' : outflow ? 'text-negative' : 'text-navy'
  const title = inflow ? `${streak.days} DAYS INFLOW` : outflow ? `${streak.days} DAYS OUTFLOW` : 'NO STREAK'
  const subtitle = inflow
    ? t(`เพิ่มการถือครองต่อเนื่อง ${streak.days} วันทำการ`, `Holdings increased for ${streak.days} consecutive trading days`)
    : outflow
      ? t(`ลดการถือครองต่อเนื่อง ${streak.days} วันทำการ`, `Holdings decreased for ${streak.days} consecutive trading days`)
      : t('Holdings ไม่เปลี่ยนแปลงในวันทำการล่าสุด', 'Holdings unchanged on the latest trading day')

  return (
    <div className="flex h-full flex-col surface-lg p-4 md:p-6">
      <h3 className="text-lg font-semibold text-navy">SPDR Flow Streak</h3>

      <div className="mt-4 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
            inflow ? 'bg-gold/15 text-gold' : outflow ? 'bg-negative/10 text-negative' : 'bg-zinc-900/[0.05] text-zinc-500'
          }`}
        >
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight text-navy">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-zinc-900/[0.03] p-4">
          <p className="text-xs text-muted-foreground">Accumulated Flow</p>
          <p className={`mt-1 text-lg font-bold ${tone}`}>{formatSigned(streak.accumulatedFlow)} {t('ตัน', 'tonnes')}</p>
        </div>
        <div className="rounded-xl bg-zinc-900/[0.03] p-4">
          <p className="text-xs text-muted-foreground">Gold Performance</p>
          <p
            className={`mt-1 text-lg font-bold ${
              streak.goldPerformancePct === null ? 'text-zinc-400' : streak.goldPerformancePct >= 0 ? 'text-positive' : 'text-negative'
            }`}
          >
            {streak.goldPerformancePct === null ? '—' : `${formatSigned(streak.goldPerformancePct)}%`}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-center">
        <p className="eyebrow text-xs tracking-wider">
          {t('สถิติย้อนหลัง (ตั้งแต่ 2004)', 'Historical records (since 2004)')}
        </p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Longest Inflow Streak</span>
            <span className="font-semibold text-navy">{streak.longestInflowStreak} {t('วัน', 'days')}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Longest Outflow Streak</span>
            <span className="font-semibold text-navy">{streak.longestOutflowStreak} {t('วัน', 'days')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
