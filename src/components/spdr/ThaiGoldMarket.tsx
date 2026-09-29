import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { last, spdrHistory, spdrSummary, thaiGoldMarket } from '@/data/spdr-gold'

// 1 troy oz = 15.244 baht-weight; scale factor tuned so today's chart point
// roughly lands near the quoted Thai bar-gold price.
const THB_PER_OZ_USD = 15.244

const GOLD_TYPES = [
  { label: 'ทองคำแท่ง 96.5%' },
  { label: 'ทองรูปพรรณ 96.5%' },
] as const

const PERIODS = [
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: '1Y', days: 365 },
] as const

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

function formatThb(n: number) {
  return n.toLocaleString('th-TH', { maximumFractionDigits: 0 })
}

export function ThaiGoldMarket() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]['label']>('6M')

  const chartData = useMemo(() => {
    const p = PERIODS.find((x) => x.label === period)
    return last(Math.min(p?.days ?? 180, spdrHistory.length)).map((pt) => ({
      date: pt.date,
      xauusd: pt.goldPrice,
      thb: Math.round(pt.goldPrice * THB_PER_OZ_USD * thaiGoldMarket.usdThb),
    }))
  }, [period])

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)] md:p-8">
      <img
        src="/images/yaowarat-gold-thailand.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-amber-50/85" />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-2xl">🇹🇭</span>
          <div>
            <h2 className="text-xl font-semibold text-[#0B1B3B] md:text-2xl">ตลาดทองคำไทย</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              ราคาทองคำในประเทศ เทียบกับราคาทองโลก และค่าเงินบาท
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">อัปเดตล่าสุด: {thaiGoldMarket.lastUpdated}</p>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
        {/* Chart card — tall feature, left */}
        <div className="rounded-2xl bg-white p-5 shadow-[2px_4px_12px_rgba(0,0,0,0.05)] lg:row-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#0B1B3B]">ราคาทองโลก vs ทองไทย</p>
            <div className="flex gap-1">
              {PERIODS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPeriod(p.label)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    period === p.label ? 'bg-[#0B1B3B] text-white' : 'bg-zinc-900/[0.04] text-zinc-600'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 h-64 w-full lg:h-[calc(100%-2.5rem)]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,27,59,0.06)" vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 10, fill: '#71717a' }} tickLine={false} minTickGap={40} />
                <YAxis
                  yAxisId="thb"
                  tick={{ fontSize: 10, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={false}
                  width={0}
                  domain={['dataMin - 500', 'dataMax + 500']}
                />
                <YAxis
                  yAxisId="usd"
                  orientation="right"
                  tick={{ fontSize: 10, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  domain={['dataMin - 20', 'dataMax + 20']}
                />
                <Tooltip
                  formatter={(v, name) => [
                    name === 'thb' ? `${formatThb(Number(v))} บาท` : `$${Number(v).toFixed(2)}`,
                    name === 'thb' ? 'ทองไทย' : 'XAUUSD',
                  ]}
                  labelFormatter={(l) => formatDate(l as string)}
                />
                <Line yAxisId="thb" type="monotone" dataKey="thb" stroke="#F5B700" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line yAxisId="usd" type="monotone" dataKey="xauusd" stroke="#0B1B3B" strokeWidth={2} dot={false} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fair value table — wide, top right */}
        <div className="rounded-2xl bg-white p-5 shadow-[2px_4px_12px_rgba(0,0,0,0.05)] lg:col-span-2">
          <p className="text-sm font-semibold text-[#0B1B3B]">Thai Gold Fair Value</p>
          <div className="mt-3 divide-y divide-zinc-900/5 text-sm">
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-600">ราคาทองโลก (XAUUSD)</span>
              <span className="font-semibold text-[#0B1B3B]">
                ${spdrSummary.goldPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-600">ค่าเงินบาท (USDTHB)</span>
              <span className="font-semibold text-[#0B1B3B]">{thaiGoldMarket.usdThb.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-600">ราคาทองแฟร์แวลู</span>
              <span className="font-semibold text-[#0B1B3B]">{formatThb(thaiGoldMarket.fairValue)} บาท</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-600">ราคาทองไทย (สมาคมฯ)</span>
              <span className="font-semibold text-[#0B1B3B]">{formatThb(thaiGoldMarket.thaiAssocPrice)} บาท</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[#16A34A]/5 px-3 py-3">
              <span className="font-semibold text-[#0B1B3B]">ส่วนต่าง (Premium)</span>
              <span className="font-bold text-[#16A34A]">
                +{formatThb(thaiGoldMarket.premium)} บาท (+{thaiGoldMarket.premiumPct.toFixed(2)}%)
              </span>
            </div>
          </div>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1B3B] transition-colors hover:text-[#0B1B3B]/70"
          >
            ดูรายละเอียด Fair Value
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Buy/sell price cards — bottom right, small */}
        {GOLD_TYPES.map((gt) => (
          <div
            key={gt.label}
            className="flex h-full flex-col justify-center rounded-2xl bg-white p-5 shadow-[2px_4px_12px_rgba(0,0,0,0.05)]"
          >
            <p className="text-xs font-medium text-muted-foreground">ราคา{gt.label}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">รับซื้อ</p>
                <p className="mt-1 text-3xl font-bold text-[#0B1B3B]">{formatThb(thaiGoldMarket.barBuy)}</p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#16A34A]/10 px-2 py-0.5 text-[10px] font-semibold text-[#16A34A]">
                  +{thaiGoldMarket.barChange} (+{thaiGoldMarket.barChangePct.toFixed(2)}%)
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ขายออก</p>
                <p className="mt-1 text-3xl font-bold text-[#0B1B3B]">{formatThb(thaiGoldMarket.barSell)}</p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#16A34A]/10 px-2 py-0.5 text-[10px] font-semibold text-[#16A34A]">
                  +{thaiGoldMarket.barChange} (+{thaiGoldMarket.barChangePct.toFixed(2)}%)
                </span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">บาท / บาททองคำ</p>
          </div>
        ))}
      </div>
    </div>
  )
}
