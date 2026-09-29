import { useMemo, useState } from 'react'
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { last, spdrHistory } from '@/data/spdr-gold'

const PERIODS = [
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: 'YTD', days: 270 },
  { label: '1Y', days: 365 },
  { label: '3Y', days: 365 },
  { label: 'MAX', days: 365 },
] as const

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  if (!row) return null
  return (
    <div className="rounded-xl border border-zinc-900/10 bg-white p-3 shadow-[2px_4px_16px_rgba(0,0,0,0.12)]">
      <p className="text-xs font-semibold text-[#0B1B3B]">{formatDate(label)}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        SPDR Holdings: <span className="font-semibold text-[#0B1B3B]">{row.spdrHoldings.toFixed(2)} ตัน</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Gold Price: <span className="font-semibold text-[#0B1B3B]">${row.goldPrice.toFixed(2)}</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Daily Flow:{' '}
        <span className={`font-semibold ${row.dailyFlow >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
          {row.dailyFlow >= 0 ? '+' : ''}
          {row.dailyFlow.toFixed(2)} ตัน
        </span>
      </p>
    </div>
  )
}

export function HoldingsChart() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]['label']>('1Y')

  const data = useMemo(() => {
    const p = PERIODS.find((x) => x.label === period)
    return last(Math.min(p?.days ?? 365, spdrHistory.length))
  }, [period])

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)] md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[#0B1B3B]">SPDR Holdings vs Gold Price</h3>
        <div className="flex flex-wrap gap-1.5">
          {PERIODS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setPeriod(p.label)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                period === p.label
                  ? 'bg-[#0B1B3B] text-white'
                  : 'bg-zinc-900/[0.04] text-zinc-600 hover:bg-zinc-900/[0.08]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#0B1B3B]" />
          SPDR Holdings
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#F5B700]" />
          Gold Price (USD)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
          Daily Flow
        </span>
      </div>

      <div className="mt-4 h-72 w-full md:h-80">
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
              tickFormatter={formatDate}
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
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <YAxis
              yAxisId="price"
              orientation="right"
              tick={{ fontSize: 11, fill: '#71717a' }}
              tickLine={false}
              axisLine={false}
              width={48}
              domain={['dataMin - 50', 'dataMax + 50']}
            />
            <Tooltip content={<CustomTooltip />} />
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
    </div>
  )
}
