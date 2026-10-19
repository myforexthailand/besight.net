import { AlertTriangle, ArrowRight } from 'lucide-react'
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts'

import { divergenceAlert } from '@/data/spdr-gold'

// Indexed (base = 100) illustrative series built to match the divergence
// narrative in the copy above: gold trending up, SPDR holdings trending down.
const chartData = Array.from({ length: divergenceAlert.windowDays + 1 }, (_, i) => {
  const t = i / divergenceAlert.windowDays
  const wiggle = Math.sin(i * 1.7) * 0.4
  return {
    gold: 100 + divergenceAlert.goldChangePct * t + wiggle,
    spdr: 100 + divergenceAlert.spdrChangePct * t - wiggle,
  }
})

export function DivergenceAlert() {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#0B1B3B]">SPDR Divergence Alert</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DC2626]/10 px-3 py-1 text-xs font-semibold text-[#DC2626]">
          <AlertTriangle className="h-3.5 w-3.5" />
          Divergence Detected
        </span>
      </div>

      <p className="mt-4 text-sm text-zinc-700">
        ราคาทอง <span className="font-semibold text-[#16A34A]">+{divergenceAlert.goldChangePct.toFixed(1)}%</span> ใน{' '}
        {divergenceAlert.windowDays} วัน แต่ SPDR Holdings{' '}
        <span className="font-semibold text-[#DC2626]">{divergenceAlert.spdrChangePct.toFixed(1)}%</span>
      </p>

      <div className="mt-4 h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
            <Line type="monotone" dataKey="gold" stroke="#F5B700" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="spdr" stroke="#0B1B3B" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#F5B700]" />
          Gold Price
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#0B1B3B]" />
          SPDR Holdings
        </span>
      </div>

      <button
        type="button"
        className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#0B1B3B] transition-colors hover:text-[#0B1B3B]/70"
      >
        ดูข้อมูลย้อนหลัง
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
