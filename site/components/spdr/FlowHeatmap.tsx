'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { formatSigned, type SpdrDailyPoint } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { formatTradeDate, useSpdr, useSpdrLocale } from '@/site/lib/spdr-context'

const WEEKDAY_LABELS = [
  { th: 'อา', en: 'Su' },
  { th: 'จ', en: 'Mo' },
  { th: 'อ', en: 'Tu' },
  { th: 'พ', en: 'We' },
  { th: 'พฤ', en: 'Th' },
  { th: 'ศ', en: 'Fr' },
  { th: 'ส', en: 'Sa' },
]

export function FlowHeatmap() {
  const t = useT()
  const locale = useSpdrLocale()
  const { history } = useSpdr()

  const byMonth = useMemo(() => {
    const map = new Map<string, Map<string, SpdrDailyPoint>>()
    for (const p of history) {
      const key = p.date.slice(0, 7)
      if (!map.has(key)) map.set(key, new Map())
      map.get(key)!.set(p.date, p)
    }
    return map
  }, [history])
  // Colour strength is relative to a typical big day (90th percentile of |flow|, spec §8).
  const p90 = useMemo(() => {
    const abs = history.map((p) => Math.abs(p.dailyFlow)).sort((a, b) => a - b)
    return abs[Math.floor(abs.length * 0.9)] || 1
  }, [history])

  const monthKeys = useMemo(() => Array.from(byMonth.keys()).sort(), [byMonth])
  const [monthIndex, setMonthIndex] = useState(monthKeys.length - 1)
  const [hovered, setHovered] = useState<SpdrDailyPoint | null>(null)

  const monthKey = monthKeys[monthIndex]
  const monthPoints = byMonth.get(monthKey) ?? new Map<string, SpdrDailyPoint>()
  const [year, month] = monthKey ? monthKey.split('-').map(Number) : [2000, 1]
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay()
  // Full calendar month: weekends and US holidays are empty cells.
  const cells: ({ day: number; point?: SpdrDailyPoint } | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const iso = `${monthKey}-${String(i + 1).padStart(2, '0')}`
      return { day: i + 1, point: monthPoints.get(iso) }
    }),
  ]
  const points = [...monthPoints.values()]
  const active = hovered && hovered.date.startsWith(monthKey) ? hovered : points[points.length - 1]
  const monthLabel = monthKey ? formatTradeDate(`${monthKey}-01`, { month: 'long', year: 'numeric' }, locale) : ''

  const color = (p: SpdrDailyPoint) => (Math.abs(p.dailyFlow) < 0.01 ? '#d4d4d8' : p.dailyFlow > 0 ? '#16A34A' : '#DC2626')
  const intensity = (p: SpdrDailyPoint) => (Math.abs(p.dailyFlow) < 0.01 ? 1 : 0.3 + Math.min(Math.abs(p.dailyFlow) / p90, 1) * 0.7)

  return (
    <div className="flex h-full flex-col surface-lg p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-navy">SPDR Flow Heatmap</h3>
        <span className="rounded-full bg-zinc-900/[0.04] px-3 py-1 text-xs font-medium text-zinc-600">
          {t('รายเดือน', 'Monthly')}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
          disabled={monthIndex === 0}
          aria-label={t('เดือนก่อนหน้า', 'Previous month')}
          className="icon-btn h-8 w-8 text-zinc-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold text-navy">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setMonthIndex((i) => Math.min(monthKeys.length - 1, i + 1))}
          disabled={monthIndex === monthKeys.length - 1}
          aria-label={t('เดือนถัดไป', 'Next month')}
          className="icon-btn h-8 w-8 text-zinc-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center py-4">
      <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-muted-foreground">
        {WEEKDAY_LABELS.map((d) => (
          <span key={d.th}>{t(d.th, d.en)}</span>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-7 gap-1.5">
        {cells.map((cell, i) =>
          !cell ? (
            <span key={i} />
          ) : cell.point ? (
            <button
              type="button"
              key={i}
              onMouseEnter={() => setHovered(cell.point!)}
              onFocus={() => setHovered(cell.point!)}
              className="aspect-square rounded-md transition-transform hover:scale-110"
              style={{ backgroundColor: color(cell.point), opacity: intensity(cell.point) }}
              title={`${cell.day} · ${formatSigned(cell.point.dailyFlow)} ${t('ตัน', 'tonnes')}`}
            >
              <span className="text-[9px] font-medium text-white/90">{cell.day}</span>
            </button>
          ) : (
            <span key={i} className="flex aspect-square items-center justify-center rounded-md bg-zinc-900/[0.03] text-[9px] text-zinc-400">
              {cell.day}
            </span>
          ),
        )}
      </div>
      </div>

      {active && (
        <div className="rounded-xl bg-zinc-900/[0.03] p-3 text-xs text-zinc-700">
          {formatTradeDate(active.date, { day: 'numeric', month: 'short', year: 'numeric' }, locale)} · Holdings:{' '}
          <span className="font-semibold">{active.spdrHoldings.toFixed(2)} {t('ตัน', 'tonnes')}</span> · Change:{' '}
          <span className={`font-semibold ${active.dailyFlow >= 0 ? 'text-positive' : 'text-negative'}`}>
            {formatSigned(active.dailyFlow)} {t('ตัน', 'tonnes')}
          </span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-positive" />
          {t('เพิ่มขึ้น', 'Increase')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-negative" />
          {t('ลดลง', 'Decrease')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-zinc-300" />
          {t('ไม่เปลี่ยนแปลง', 'Unchanged')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-zinc-900/[0.06]" />
          {t('ตลาดปิด', 'Market closed')}
        </span>
      </div>
    </div>
  )
}
