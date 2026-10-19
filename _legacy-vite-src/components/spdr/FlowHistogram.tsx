import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts'

import { spdrHistory, spdrLatest } from '@/data/spdr-gold'

const BUCKET_SIZE = 1.5

function buildHistogram() {
  const flows = spdrHistory.map((p) => p.dailyFlow)
  const min = Math.floor(Math.min(...flows) / BUCKET_SIZE) * BUCKET_SIZE
  const max = Math.ceil(Math.max(...flows) / BUCKET_SIZE) * BUCKET_SIZE
  const buckets: { range: number; label: string; count: number }[] = []
  for (let b = min; b < max; b += BUCKET_SIZE) {
    buckets.push({ range: b, label: b.toFixed(1), count: 0 })
  }
  for (const f of flows) {
    const idx = Math.min(buckets.length - 1, Math.max(0, Math.floor((f - min) / BUCKET_SIZE)))
    buckets[idx].count += 1
  }
  return buckets
}

export function FlowHistogram() {
  const buckets = useMemo(buildHistogram, [])
  const todayBucket = Math.floor(spdrLatest.dailyFlow / BUCKET_SIZE) * BUCKET_SIZE

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-[#0B1B3B]">SPDR Historical Extreme</h3>
        <select
          defaultValue="daily"
          className="rounded-full border-2 border-zinc-900/[0.13] bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 outline-none"
        >
          <option value="daily">Daily Flow</option>
          <option value="weekly">Weekly Flow</option>
        </select>
      </div>

      <div className="mt-4 h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={buckets} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,27,59,0.06)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 9, fill: '#71717a' }} tickLine={false} interval={2} />
            <YAxis tick={{ fontSize: 10, fill: '#71717a' }} tickLine={false} axisLine={false} width={28} />
            <Tooltip
              formatter={(v) => [`${v} วัน`, 'จำนวน']}
              labelFormatter={(l) => `Flow ~${l} ตัน`}
            />
            <ReferenceLine x={todayBucket.toFixed(1)} stroke="#DC2626" strokeDasharray="4 4" />
            <Bar dataKey="count" radius={[3, 3, 0, 0]}>
              {buckets.map((b) => (
                <Cell key={b.range} fill={b.range === todayBucket ? '#DC2626' : '#0B1B3B'} fillOpacity={b.range === todayBucket ? 0.9 : 0.25} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 rounded-xl bg-[#DC2626]/5 p-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#DC2626] px-2.5 py-1 text-[10px] font-bold text-white">
            Top 5%
          </span>
          <p className="text-sm font-semibold text-[#0B1B3B]">
            Today: +{spdrLatest.dailyFlow.toFixed(1)} ตัน
          </p>
        </div>
        <p className="mt-2 text-xs text-zinc-700">
          การเปลี่ยนแปลง +{spdrLatest.dailyFlow.toFixed(1)} ตัน ในวันนี้ อยู่ในกลุ่ม Top 5% ของการไหลเข้าออกมากที่สุด
          เมื่อเทียบกับข้อมูลย้อนหลัง 10 ปี
        </p>
      </div>
    </div>
  )
}
