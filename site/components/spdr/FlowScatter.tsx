'use client'

import { useMemo, useState } from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from 'recharts'

import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { formatTradeDate, useSpdr, useSpdrLocale } from '@/site/lib/spdr-context'

const RANGES = { '3m': 63, '6m': 126, '1y': 252 } as const

export function FlowScatter() {
  const t = useT()
  const locale = useSpdrLocale()
  const { history } = useSpdr()
  const [range, setRange] = useState<keyof typeof RANGES>('6m')

  const points = useMemo(() => {
    const slice = history.slice(-(RANGES[range] + 1))
    return slice.slice(1).map((p, i) => ({
      flow: p.dailyFlow,
      goldReturn: ((p.goldPrice - slice[i].goldPrice) / slice[i].goldPrice) * 100,
      date: p.date,
    }))
  }, [history, range])
  const today = points[points.length - 1]

  return (
    <div className="flex h-full flex-col surface-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy">SPDR Flow vs Gold Return</h3>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as keyof typeof RANGES)}
          aria-label={t('ช่วงเวลา', 'Time range')}
          className="select-pill"
        >
          <option value="3m">{t('ประมาณ 3 เดือน', 'About 3 months')}</option>
          <option value="6m">{t('ประมาณ 6 เดือน', 'About 6 months')}</option>
          <option value="1y">{t('ประมาณ 1 ปี', 'About 1 year')}</option>
        </select>
      </div>

      <div className="relative mt-4 h-72 w-full">
        {/* Quadrant labels sit inside the plot area, inset from the axes so they don't collide with tick labels */}
        <div className="pointer-events-none absolute bottom-14 left-16 right-5 top-8 z-10 grid grid-cols-2 grid-rows-2 text-[10px] font-medium text-muted-foreground">
          <span className="self-start justify-self-start">{t('SPDR ลด / GOLD ขึ้น', 'SPDR down / GOLD up')}</span>
          <span className="self-start justify-self-end">{t('SPDR เพิ่ม / GOLD ขึ้น', 'SPDR up / GOLD up')}</span>
          <span className="self-end justify-self-start">{t('SPDR ลด / GOLD ลง', 'SPDR down / GOLD down')}</span>
          <span className="self-end justify-self-end">{t('SPDR เพิ่ม / GOLD ลง', 'SPDR up / GOLD down')}</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 10, left: -10, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,27,59,0.06)" />
            <XAxis
              type="number"
              dataKey="flow"
              name="SPDR Net Flow"
              tick={{ fontSize: 10, fill: '#71717a' }}
              tickLine={false}
              label={{ value: t('SPDR Net Flow (ตัน)', 'SPDR Net Flow (tonnes)'), position: 'insideBottom', offset: -12, fontSize: 10, fill: '#71717a' }}
            />
            <YAxis
              type="number"
              dataKey="goldReturn"
              name="Gold Return"
              tick={{ fontSize: 10, fill: '#71717a' }}
              tickLine={false}
              tickFormatter={(v: number) => v.toFixed(1)}
              label={{ value: 'Gold Return (%)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#71717a' }}
            />
            <ZAxis range={[36, 36]} />
            <ReferenceLine x={0} stroke="rgba(11,27,59,0.2)" />
            <ReferenceLine y={0} stroke="rgba(11,27,59,0.2)" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              labelFormatter={() => ''}
              formatter={(value, name) => [
                `${Number(value).toFixed(2)}${name === 'Gold Return' ? '%' : ` ${t('ตัน', 'tonnes')}`}`,
                name,
              ]}
            />
            <Scatter data={points} fill="#0B1B3B" fillOpacity={0.45} isAnimationActive={false}>
              {points.map((p) => (
                <Cell key={p.date} fill={p === today ? '#F5B700' : '#0B1B3B'} fillOpacity={p === today ? 1 : 0.35} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {today && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <span className="font-semibold text-gold">●</span> {t('ล่าสุด', 'Latest')} ({formatTradeDate(today.date, undefined, locale)}): {formatSigned(today.flow)} {t('ตัน', 'tonnes')} · {t('ทอง', 'Gold')}{' '}
          {formatSigned(today.goldReturn)}%
        </p>
      )}
    </div>
  )
}
