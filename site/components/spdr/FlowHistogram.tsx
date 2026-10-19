'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { useSpdr } from '@/site/lib/spdr-context'

export function FlowHistogram() {
  const t = useT()
  const { histogram } = useSpdr()
  const [mode, setMode] = useState<'daily' | 'weekly'>('daily')
  const h = histogram[mode]
  const lastBin = h.bins.length - 1
  const todayIndex = h.bins.findIndex((b, i) => (h.today >= b.start || i === 0) && (h.today < b.end || i === lastBin))
  const data = h.bins.map((b, i) => ({
    ...b,
    label: i === 0 ? `≤${b.end}` : i === lastBin ? `≥${b.start}` : String(b.start),
  }))

  // Upper tail = unusually large inflow, lower tail = unusually large outflow.
  const inflowSide = h.percentile >= 50
  const tail = inflowSide ? Math.max(0.1, 100 - h.percentile) : Math.max(0.1, h.percentile)
  const tailText = `${tail < 1 ? tail.toFixed(1) : Math.round(tail)}%`
  const unit = mode === 'daily' ? t('วันนี้', 'today') : t('สัปดาห์นี้ (5 วันทำการ)', 'this week (5 trading days)')

  return (
    <div className="flex h-full flex-col surface-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy">SPDR Historical Extreme</h3>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value === 'weekly' ? 'weekly' : 'daily')}
          aria-label={t('ประเภท Flow', 'Flow type')}
          className="select-pill"
        >
          <option value="daily">Daily Flow</option>
          <option value="weekly">Weekly Flow</option>
        </select>
      </div>

      <div className="mt-4 h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,27,59,0.06)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#71717a' }} tickLine={false} interval={1} />
            <YAxis tick={{ fontSize: 10, fill: '#71717a' }} tickLine={false} axisLine={false} width={34} />
            <Tooltip
              formatter={(v) => [
                `${v} ${mode === 'daily' ? t('วัน', 'days') : t('สัปดาห์', 'weeks')}`,
                t('จำนวน', 'Count'),
              ]}
              labelFormatter={(_, payload) => {
                const bin = payload?.[0]?.payload as { start: number; end: number } | undefined
                return bin ? t(`Flow ${bin.start} ถึง ${bin.end} ตัน`, `Flow ${bin.start} to ${bin.end} tonnes`) : ''
              }}
            />
            <Bar dataKey="count" radius={[3, 3, 0, 0]} isAnimationActive={false}>
              {data.map((b, i) => (
                <Cell key={b.start} fill={i === todayIndex ? '#DC2626' : '#0B1B3B'} fillOpacity={i === todayIndex ? 0.9 : 0.25} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={`mt-4 rounded-xl p-4 ${inflowSide ? 'bg-positive/5' : 'bg-negative/5'}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold text-white ${inflowSide ? 'bg-positive' : 'bg-negative'}`}>
            Top {tailText}
          </span>
          <p className="text-sm font-semibold text-navy">
            {mode === 'daily' ? 'Today' : 'This week'}: {formatSigned(h.today)} {t('ตัน', 'tonnes')}
          </p>
        </div>
        <p className="mt-2 text-xs text-zinc-700">
          {t(
            `การเปลี่ยนแปลง ${formatSigned(h.today)} ตัน${unit} อยู่ในกลุ่ม Top ${tailText} ของ${inflowSide ? 'การไหลเข้า' : 'การไหลออก'}มากที่สุด เมื่อเทียบกับข้อมูลย้อนหลัง ${h.years} ปี (${h.observations.toLocaleString('en-US')} ${mode === 'daily' ? 'วันทำการ' : 'สัปดาห์'})`,
            `The change of ${formatSigned(h.today)} tonnes ${unit} ranks in the Top ${tailText} of the largest ${inflowSide ? 'inflows' : 'outflows'} versus ${h.years} years of historical data (${h.observations.toLocaleString('en-US')} ${mode === 'daily' ? 'trading days' : 'weeks'})`,
          )}
        </p>
      </div>
    </div>
  )
}
