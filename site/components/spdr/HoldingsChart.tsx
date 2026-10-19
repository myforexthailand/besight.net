'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ComposedChart,
  Area,
  Bar,
  Cell,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { formatSigned, type SpdrDailyPoint } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { formatTradeDate, useSpdr, useSpdrLocale } from '@/site/lib/spdr-context'

// Trading-day counts; 3Y / MAX come from /api/spdr/series.
const PERIODS = [
  { label: '1M', days: 21 },
  { label: '3M', days: 63 },
  { label: '6M', days: 126 },
  { label: 'YTD', days: 0 },
  { label: '1Y', days: 252 },
  { label: '3Y', remote: '3y' },
  { label: 'MAX', remote: 'max' },
] as const
type Period = (typeof PERIODS)[number]['label']

type TooltipProps = { active?: boolean; payload?: { payload?: SpdrDailyPoint }[]; label?: string }

function CustomTooltip({ active, payload, label }: TooltipProps) {
  const t = useT()
  const locale = useSpdrLocale()
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  if (!row || !label) return null
  return (
    <div className="rounded-xl border border-zinc-900/10 bg-white p-3 shadow-[2px_4px_16px_rgba(0,0,0,0.12)]">
      <p className="text-xs font-semibold text-navy">{formatTradeDate(label, { day: 'numeric', month: 'short', year: 'numeric' }, locale)}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        SPDR Holdings: <span className="font-semibold text-navy">{row.spdrHoldings.toFixed(2)} {t('ตัน', 'tonnes')}</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Gold Price: <span className="font-semibold text-navy">${row.goldPrice.toFixed(2)}</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Flow:{' '}
        <span className={`font-semibold ${row.dailyFlow >= 0 ? 'text-positive' : 'text-negative'}`}>
          {formatSigned(row.dailyFlow)} {t('ตัน', 'tonnes')}
        </span>
      </p>
    </div>
  )
}

export function HoldingsChart() {
  const t = useT()
  const locale = useSpdrLocale()
  const { history, asOf } = useSpdr()
  const [period, setPeriod] = useState<Period>('1Y')
  const [remote, setRemote] = useState<Record<string, SpdrDailyPoint[]>>({})
  const [loading, setLoading] = useState(false)

  const selected = PERIODS.find((p) => p.label === period)!
  const remoteKey = 'remote' in selected ? selected.remote : null

  useEffect(() => {
    if (!remoteKey || remote[remoteKey]) return
    let alive = true
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loading flag for the fetch below
    setLoading(true)
    fetch(`/api/spdr/series/?range=${remoteKey}`)
      .then((r) => r.json() as Promise<{ ok: boolean; points?: SpdrDailyPoint[] }>)
      .then((payload) => {
        if (alive && payload.ok && payload.points) setRemote((cur) => ({ ...cur, [remoteKey]: payload.points! }))
      })
      .catch(() => undefined)
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [remoteKey, remote])

  const data = useMemo(() => {
    if (remoteKey) return remote[remoteKey] ?? history
    if (period === 'YTD') return history.filter((p) => p.date.slice(0, 4) === asOf.slice(0, 4))
    return history.slice(-('days' in selected ? selected.days : 252))
  }, [remoteKey, remote, history, period, asOf, selected])

  const longRange = Boolean(remoteKey)
  const tick = (iso: string) =>
    formatTradeDate(iso, longRange ? { month: 'short', year: '2-digit' } : { day: 'numeric', month: 'short' }, locale)

  return (
    <div className="flex h-full flex-col surface-lg p-4 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-navy md:text-lg">SPDR Holdings vs Gold Price</h3>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('ช่วงเวลา', 'Time range')}>
          {PERIODS.map((p) => (
            <button
              key={p.label}
              type="button"
              aria-pressed={period === p.label}
              onClick={() => setPeriod(p.label)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors md:px-3 md:py-1.5 ${
                period === p.label
                  ? 'bg-navy text-white'
                  : 'bg-zinc-900/[0.04] text-zinc-600 hover:bg-zinc-900/[0.08]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground md:mt-4 md:gap-4 md:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-navy" />
          {t('SPDR Holdings (ตัน)', 'SPDR Holdings (tonnes)')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold" />
          Gold Price (USD)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-positive" />
          <span className="-ml-1 h-2 w-2 rounded-full bg-negative" />
          {longRange ? t('Flow (รวมต่อช่วง)', 'Flow (total per period)') : 'Daily Flow'}
        </span>
        {loading && <span className="text-[11px]">{t('กำลังโหลด…', 'Loading…')}</span>}
      </div>

      <div className="mt-3 h-56 w-full sm:h-72 md:mt-4 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="holdingsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B1B3B" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#0B1B3B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,27,59,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={tick}
              tick={{ fontSize: 11, fill: '#71717a' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(11,27,59,0.1)' }}
              minTickGap={40}
            />
            <YAxis
              yAxisId="holdings"
              tick={{ fontSize: 11, fill: '#71717a' }}
              tickLine={false}
              axisLine={false}
              width={44}
              domain={[(min: number) => Math.floor(min * 0.98), (max: number) => Math.ceil(max * 1.01)]}
              tickFormatter={(v: number) => v.toFixed(0)}
            />
            <YAxis
              yAxisId="price"
              orientation="right"
              tick={{ fontSize: 11, fill: '#71717a' }}
              tickLine={false}
              axisLine={false}
              width={48}
              domain={[(min: number) => Math.floor(min * 0.98), (max: number) => Math.ceil(max * 1.01)]}
              tickFormatter={(v: number) => v.toFixed(0)}
            />
            {/* Flow bars sit in the bottom quarter on their own hidden axis. */}
            <YAxis
              yAxisId="flow"
              hide
              domain={[(min: number) => Math.min(min, -Math.abs(min)) * 1.1, (max: number) => Math.max(Math.abs(max), 1) * 4]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="flow" dataKey="dailyFlow" isAnimationActive={false} maxBarSize={6}>
              {data.map((p) => (
                <Cell key={p.date} fill={p.dailyFlow >= 0 ? '#16A34A' : '#DC2626'} fillOpacity={0.55} />
              ))}
            </Bar>
            <Area
              yAxisId="holdings"
              type="monotone"
              dataKey="spdrHoldings"
              stroke="#0B1B3B"
              strokeWidth={2}
              fill="url(#holdingsFill)"
              isAnimationActive={false}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="goldPrice"
              stroke="#F5B700"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        {t(
          'ราคาทองในกราฟคือ LBMA Gold Price PM ที่ SPDR ใช้คำนวณ NAV · แท่งเขียว/แดงคือการเปลี่ยนแปลงของ Holdings',
          'Gold price in the chart is the LBMA Gold Price PM that SPDR uses to calculate NAV · Green/red bars show the change in Holdings',
        )}
      </p>
    </div>
  )
}
