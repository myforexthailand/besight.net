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

import { last, spdrLatest } from '@/data/spdr-gold'

const points = last(180).map((p, i, arr) => {
  const prev = arr[i - 1]
  const goldReturn = prev ? ((p.goldPrice - prev.goldPrice) / prev.goldPrice) * 100 : 0
  return { flow: p.dailyFlow, goldReturn, date: p.date }
})

const todayPoint = points[points.length - 1]

export function FlowScatter() {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-[#0B1B3B]">SPDR Flow vs Gold Return</h3>
        <select
          defaultValue="6m"
          className="rounded-full border-2 border-zinc-900/[0.13] bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 outline-none"
        >
          <option value="6m">ประมาณ 6 เดือน</option>
          <option value="3m">ประมาณ 3 เดือน</option>
          <option value="1y">ประมาณ 1 ปี</option>
        </select>
      </div>

      <div className="relative mt-4 h-64 w-full">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-2 px-2 py-1 text-[10px] font-medium text-muted-foreground">
          <span className="self-start justify-self-start">SPDR ลด / GOLD ขึ้น</span>
          <span className="self-start justify-self-end">SPDR เพิ่ม / GOLD ขึ้น</span>
          <span className="self-end justify-self-start">SPDR ลด / GOLD ลง</span>
          <span className="self-end justify-self-end">SPDR เพิ่ม / GOLD ลง</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,27,59,0.06)" />
            <XAxis
              type="number"
              dataKey="flow"
              name="SPDR Net Flow"
              tick={{ fontSize: 10, fill: '#71717a' }}
              tickLine={false}
              label={{ value: 'SPDR Net Flow (ตัน)', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#71717a' }}
            />
            <YAxis
              type="number"
              dataKey="goldReturn"
              name="Gold Return"
              tick={{ fontSize: 10, fill: '#71717a' }}
              tickLine={false}
              label={{ value: 'Gold Return (%)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#71717a' }}
            />
            <ZAxis range={[36, 36]} />
            <ReferenceLine x={0} stroke="rgba(11,27,59,0.2)" />
            <ReferenceLine y={0} stroke="rgba(11,27,59,0.2)" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => [
                `${Number(value).toFixed(2)}${name === 'Gold Return' ? '%' : ' ตัน'}`,
                name,
              ]}
            />
            <Scatter data={points} fill="#0B1B3B" fillOpacity={0.45}>
              {points.map((p, i) => (
                <Cell key={i} fill={p === todayPoint ? '#F5B700' : '#0B1B3B'} fillOpacity={p === todayPoint ? 1 : 0.35} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        <span className="font-semibold text-[#F5B700]">●</span> Today: {spdrLatest.dailyFlow >= 0 ? '+' : ''}
        {spdrLatest.dailyFlow.toFixed(2)} ตัน
      </p>
    </div>
  )
}
