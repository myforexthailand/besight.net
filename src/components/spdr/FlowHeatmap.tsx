import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { spdrHistory, type SpdrDailyPoint } from '@/data/spdr-gold'

const WEEKDAY_LABELS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

function cellColor(point: SpdrDailyPoint | undefined) {
  if (!point) return 'bg-transparent'
  if (Math.abs(point.dailyFlow) < 0.15) return 'bg-zinc-200'
  return point.dailyFlow > 0 ? 'bg-[#16A34A]' : 'bg-[#DC2626]'
}

function cellIntensity(point: SpdrDailyPoint | undefined) {
  if (!point) return 1
  const mag = Math.min(Math.abs(point.dailyFlow) / 6, 1)
  return 0.35 + mag * 0.65
}

export function FlowHeatmap() {
  const byMonth = useMemo(() => {
    const map = new Map<string, SpdrDailyPoint[]>()
    for (const p of spdrHistory) {
      const key = p.date.slice(0, 7)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return map
  }, [])

  const monthKeys = useMemo(() => Array.from(byMonth.keys()).sort(), [byMonth])
  const [monthIndex, setMonthIndex] = useState(monthKeys.length - 1)
  const [hovered, setHovered] = useState<SpdrDailyPoint | null>(null)

  const monthKey = monthKeys[monthIndex]
  const monthPoints = byMonth.get(monthKey) ?? []
  const monthLabel = monthKey
    ? new Date(`${monthKey}-01`).toLocaleDateString('th-TH', {
        month: 'long',
        year: 'numeric',
        calendar: 'buddhist',
      })
    : ''

  const firstDay = monthPoints[0] ? new Date(monthPoints[0].date).getDay() : 0
  const cells: (SpdrDailyPoint | undefined)[] = [
    ...Array(firstDay).fill(undefined),
    ...monthPoints,
  ]

  const active = hovered ?? monthPoints[Math.floor(monthPoints.length / 2)]

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#0B1B3B]">SPDR Flow Heatmap</h3>
        <span className="rounded-full bg-zinc-900/[0.04] px-3 py-1 text-xs font-medium text-zinc-600">
          รายเดือน
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
          disabled={monthIndex === 0}
          aria-label="เดือนก่อนหน้า"
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-900/[0.13] text-zinc-500 transition-colors hover:bg-zinc-900/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold text-[#0B1B3B]">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setMonthIndex((i) => Math.min(monthKeys.length - 1, i + 1))}
          disabled={monthIndex === monthKeys.length - 1}
          aria-label="เดือนถัดไป"
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-900/[0.13] text-zinc-500 transition-colors hover:bg-zinc-900/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[10px] text-muted-foreground">
        {WEEKDAY_LABELS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-7 gap-1.5">
        {cells.map((point, i) => (
          <button
            type="button"
            key={i}
            disabled={!point}
            onMouseEnter={() => point && setHovered(point)}
            onFocus={() => point && setHovered(point)}
            className={`aspect-square rounded-md ${cellColor(point)} transition-transform hover:scale-110 disabled:cursor-default`}
            style={{ opacity: point ? cellIntensity(point) : 0 }}
            title={
              point
                ? `${new Date(point.date).getDate()} · ${point.dailyFlow >= 0 ? '+' : ''}${point.dailyFlow.toFixed(2)} ตัน`
                : undefined
            }
          >
            {point && (
              <span className="text-[9px] font-medium text-white/90">
                {new Date(point.date).getDate()}
              </span>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-4 rounded-xl bg-zinc-900/[0.03] p-3 text-xs text-zinc-700">
          {new Date(active.date).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}{' '}
          · Holdings: <span className="font-semibold">{active.spdrHoldings.toFixed(2)} ตัน</span> ·
          Change:{' '}
          <span className={`font-semibold ${active.dailyFlow >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
            {active.dailyFlow >= 0 ? '+' : ''}
            {active.dailyFlow.toFixed(2)} ตัน
          </span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#16A34A]" />
          เพิ่มขึ้น
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#DC2626]" />
          ลดลง
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-zinc-200" />
          ไม่เปลี่ยนแปลง
        </span>
      </div>
    </div>
  )
}
