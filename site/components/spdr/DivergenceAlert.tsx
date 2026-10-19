'use client'

import { AlertTriangle, CheckCircle2, Minus } from 'lucide-react'
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts'

import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { useSpdr } from '@/site/lib/spdr-context'

const BADGES: Record<string, { label: string; className: string; icon: typeof AlertTriangle }> = {
  GOLD_UP_SPDR_DOWN: { label: 'Divergence: Gold ↑ / SPDR ↓', className: 'bg-negative/10 text-negative', icon: AlertTriangle },
  GOLD_DOWN_SPDR_UP: { label: 'Divergence: Gold ↓ / SPDR ↑', className: 'bg-negative/10 text-negative', icon: AlertTriangle },
  CONFIRMING_UP: { label: 'Confirming Up', className: 'bg-positive/10 text-positive', icon: CheckCircle2 },
  CONFIRMING_DOWN: { label: 'Confirming Down', className: 'bg-positive/10 text-positive', icon: CheckCircle2 },
  NONE: { label: 'No Divergence', className: 'bg-zinc-900/[0.05] text-zinc-600', icon: Minus },
}

export function DivergenceAlert() {
  const t = useT()
  const { divergence, history } = useSpdr()
  const window = history.slice(-(divergence.windowDays + 1))
  const base = window[0]
  // Both series indexed to 100 at the start of the window.
  const chartData = base
    ? window.map((p) => ({ gold: (p.goldPrice / base.goldPrice) * 100, spdr: (p.spdrHoldings / base.spdrHoldings) * 100 }))
    : []
  const badge = BADGES[divergence.type ?? 'NONE'] ?? BADGES.NONE
  const BadgeIcon = badge.icon
  const signClass = (v: number | null) => (v === null ? '' : v >= 0 ? 'text-positive' : 'text-negative')

  return (
    <div className="flex h-full flex-col surface-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy">SPDR Divergence Alert</h3>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}>
          <BadgeIcon className="h-3.5 w-3.5" />
          {badge.label}
        </span>
      </div>

      <p className="mt-4 text-sm text-zinc-700">
        {t('ราคาทอง', 'Gold price')}{' '}
        <span className={`font-semibold ${signClass(divergence.goldChangePct)}`}>
          {divergence.goldChangePct === null ? '—' : `${formatSigned(divergence.goldChangePct, 1)}%`}
        </span>{' '}
        {t(`ใน ${divergence.windowDays} วันทำการ ขณะที่ SPDR Holdings`, `over ${divergence.windowDays} trading days, while SPDR Holdings`)}{' '}
        <span className={`font-semibold ${signClass(divergence.spdrChangePct)}`}>
          {divergence.spdrChangePct === null ? '—' : `${formatSigned(divergence.spdrChangePct, 1)}%`}
        </span>
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
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold" />
          Gold Price
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-navy" />
          SPDR Holdings
        </span>
        <span>{t('ดัชนี (เริ่มต้น = 100)', 'Index (start = 100)')}</span>
      </div>
      <p className="mt-4 text-[11px] text-muted-foreground">
        {t(
          'เกณฑ์: ทองเปลี่ยน ≥ 1% และ Holdings เปลี่ยน ≥ 0.5% คนละทิศทาง = Divergence',
          'Criteria: gold moves ≥ 1% and Holdings move ≥ 0.5% in opposite directions = Divergence',
        )}
      </p>
    </div>
  )
}
