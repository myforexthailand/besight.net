'use client'

import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts'

import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { formatThaiDateTime, formatTradeDate, useSpdr, useSpdrLocale } from '@/site/lib/spdr-context'

export function SpdrHeader({ action }: { action?: ReactNode }) {
  const t = useT()
  const locale = useSpdrLocale()
  const { asOf, syncedAt, gold, history } = useSpdr()
  const sparkData = history.slice(-30).map((p) => ({ value: p.goldPrice }))
  const up = (gold.change ?? 0) >= 0

  return (
    <div className="overflow-hidden surface-lg">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: gold-bar gradient hero */}
        <div className="relative overflow-hidden bg-navy bg-[url('/images/news/gold-bars-banner.jpg')] bg-cover bg-center p-8 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-navy/85 to-[#3d2c0a]/40" />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 85% 20%, rgba(245,183,0,0.55), transparent 55%)',
            }}
          />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                SPDR Gold Shares
              </h2>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
                GLD
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm text-white/70">
              {t(
                'ข้อมูลการถือครองทองคำของกองทุน SPDR Gold Trust จากข้อมูลทางการ พร้อมเครื่องมือวิเคราะห์เพื่อประกอบการเทรด',
                'Gold holdings of the SPDR Gold Trust from official data, with analysis tools to support your trading.',
              )}
            </p>
            <p className="mt-6 text-xs text-white/50">
              {t('ข้อมูล SPDR ณ วันทำการ', 'SPDR data as of trading day')} {formatTradeDate(asOf, { day: 'numeric', month: 'short', year: 'numeric' }, locale)} {t('(เวลาสหรัฐฯ)', '(US time)')}
              {syncedAt && (
                <> · {t('อัปเดตเมื่อ', 'Updated')} {formatThaiDateTime(syncedAt, locale)}{t(' น.', ' (Bangkok time)')}</>
              )}
            </p>
          </div>
        </div>

        {/* Right: gold price readout */}
        <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
          <p className="eyebrow text-xs tracking-wider">
            {t('ราคาทองคำ (XAUUSD)', 'Gold Price (XAUUSD)')}{gold.live ? '' : t(' · ราคาปิด LBMA', ' · LBMA close')}
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <p className="text-4xl font-bold tracking-tight text-navy md:text-5xl">
              {gold.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            {gold.change !== null && gold.changePct !== null && (
              <span
                className={`mb-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  up ? 'bg-positive/10 text-positive' : 'bg-negative/10 text-negative'
                }`}
              >
                {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {formatSigned(gold.change)} ({formatSigned(gold.changePct)}%)
              </span>
            )}
          </div>
          {gold.updatedAt && <p className="-mt-2 text-xs text-muted-foreground">{t('อัปเดต', 'Updated')} {t(gold.updatedAt, gold.updatedAt.replace(/ น\.$/, ''))}</p>}

          <div className="h-14 w-full max-w-[220px]" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <YAxis domain={['dataMin', 'dataMax']} hide />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={sparkData.length > 1 && sparkData[sparkData.length - 1].value >= sparkData[0].value ? '#16A34A' : '#DC2626'}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="-mt-2 text-[11px] text-muted-foreground">{t('ราคาปิด 30 วันทำการล่าสุด', 'Closing prices, last 30 trading days')}</p>

          {action}
        </div>
      </div>
    </div>
  )
}
