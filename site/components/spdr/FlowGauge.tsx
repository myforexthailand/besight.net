'use client'

import { useT } from '@/site/lib/lang'
import { useSpdr } from '@/site/lib/spdr-context'

const SIZE = 240
const STROKE = 16
const RADIUS = (SIZE - STROKE) / 2
const CIRC = Math.PI * RADIUS // semicircle length

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 180) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

const DESCRIPTIONS: Record<string, { th: string; en: string }> = {
  'Strong Inflow': {
    th: 'แรงไหลเข้าของ SPDR อยู่ในระดับสูงเมื่อเทียบกับสถิติย้อนหลัง ทั้งยอดสะสม 7 วัน 30 วัน และความต่อเนื่อง',
    en: 'SPDR inflow pressure is high relative to historical norms, across the 7-day and 30-day cumulative totals and streak persistence.',
  },
  Inflow: {
    th: 'แรงไหลเข้าของ SPDR อยู่เหนือระดับปกติเล็กน้อยเมื่อเทียบกับสถิติย้อนหลัง',
    en: 'SPDR inflow pressure is slightly above normal relative to historical norms.',
  },
  Neutral: {
    th: 'แรงไหลเข้า-ออกของ SPDR อยู่ในระดับปกติ ยังไม่มีทิศทางชัดเจน',
    en: 'SPDR inflows and outflows are at normal levels, with no clear direction yet.',
  },
  Outflow: {
    th: 'แรงไหลออกของ SPDR มากกว่าระดับปกติเล็กน้อยเมื่อเทียบกับสถิติย้อนหลัง',
    en: 'SPDR outflow pressure is slightly above normal relative to historical norms.',
  },
  'Strong Outflow': {
    th: 'แรงไหลออกของ SPDR อยู่ในระดับสูงเมื่อเทียบกับสถิติย้อนหลัง ทั้งยอดสะสมและความต่อเนื่อง',
    en: 'SPDR outflow pressure is high relative to historical norms, across cumulative totals and streak persistence.',
  },
}

function scoreColor(score: number) {
  if (score >= 55) return '#16A34A'
  if (score > 45) return '#F5B700'
  return '#DC2626'
}

export function FlowGauge() {
  const t = useT()
  const { momentum } = useSpdr()
  const score = momentum.score ?? 50
  const color = scoreColor(score)
  const cx = SIZE / 2
  const cy = SIZE / 2
  const progressAngle = Math.max(1, (score / 100) * 180)

  return (
    <div className="flex h-full flex-col surface-lg p-4 md:p-7">
      <h3 className="text-lg font-semibold text-navy">SPDR Flow Momentum</h3>

      <div className="mt-2 flex flex-1 flex-col items-center justify-center">
        <svg width={SIZE} height={SIZE / 2 + 20} viewBox={`0 0 ${SIZE} ${SIZE / 2 + 20}`} role="img" aria-label={t(`Flow Momentum ${score} จาก 100`, `Flow Momentum ${score} out of 100`)}>
          <path
            d={arcPath(cx, cy, RADIUS, 0, 180)}
            fill="none"
            stroke="rgba(11,27,59,0.08)"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
          <path
            d={arcPath(cx, cy, RADIUS, 0, progressAngle)}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
          />
          <text
            x={cx}
            y={cy - 12}
            textAnchor="middle"
            className="fill-navy"
            style={{ fontSize: 34, fontWeight: 700 }}
          >
            {momentum.score ?? '—'}
          </text>
          <text
            x={cx}
            y={cy + 10}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ fontSize: 12 }}
          >
            / 100
          </text>
        </svg>
        <p className="-mt-2 text-base font-bold" style={{ color }}>{momentum.label ?? 'Neutral'}</p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {(() => {
            const d = DESCRIPTIONS[momentum.label ?? 'Neutral']
            return d ? t(d.th, d.en) : undefined
          })()}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3.5 border-t border-zinc-900/[0.06] pt-6">
        {momentum.metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: scoreColor(m.value) }} />
            <span className="w-36 shrink-0 text-xs text-muted-foreground">{m.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-900/[0.06]">
              <div
                className="h-full rounded-full"
                style={{ width: `${m.value}%`, backgroundColor: scoreColor(m.value) }}
              />
            </div>
            <span className="w-7 shrink-0 text-right text-xs font-semibold text-navy">
              {m.value}
            </span>
          </div>
        ))}
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          {t(
            'คะแนนแต่ละด้านคือเปอร์เซ็นไทล์เทียบกับข้อมูลย้อนหลัง (50 = ระดับปกติ)',
            'Each score is a percentile versus historical data (50 = normal level)',
          )}
        </p>
      </div>
    </div>
  )
}
