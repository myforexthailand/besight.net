import { Bell, TrendingUp } from 'lucide-react'
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts'

import { spdrSummary, last } from '@/data/spdr-gold'

const sparkData = last(30).map((p) => ({ value: p.goldPrice }))

export function SpdrHeader() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: gold-bar gradient hero */}
        <div className="relative overflow-hidden bg-[#0B1B3B] bg-[url('/images/news/gold-bars-banner.jpg')] bg-cover bg-center p-8 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0B1B3B] via-[#0B1B3B]/85 to-[#3d2c0a]/40" />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 85% 20%, rgba(245,183,0,0.55), transparent 55%)',
            }}
          />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                SPDR Gold Shares
              </h1>
              <span className="rounded-full bg-[#F5B700] px-3 py-1 text-xs font-bold text-[#0B1B3B]">
                GLD
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm text-white/70">
              ข้อมูลการถือครองทองคำของกองทุน SPDR แบบเรียลไทม์ พร้อมเครื่องมือวิเคราะห์
              เพื่อประกอบการเทรด
            </p>
            <p className="mt-6 text-xs text-white/50">
              อัปเดตล่าสุด: {spdrSummary.lastUpdated}
            </p>
          </div>
        </div>

        {/* Right: live gold price readout */}
        <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            ราคาทองคำ (XAUUSD)
          </p>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-bold tracking-tight text-[#0B1B3B] md:text-5xl">
              {spdrSummary.goldPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#16A34A]/10 px-2.5 py-1 text-xs font-semibold text-[#16A34A]">
              <TrendingUp className="h-3.5 w-3.5" />+
              {spdrSummary.goldChange.toFixed(2)} (+{spdrSummary.goldChangePct.toFixed(2)}%)
            </span>
          </div>

          <div className="h-14 w-full max-w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <YAxis domain={['dataMin', 'dataMax']} hide />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#16A34A"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0B1B3B] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <Bell className="h-4 w-4" />
            ตั้งแจ้งเตือน
          </button>
        </div>
      </div>
    </div>
  )
}
