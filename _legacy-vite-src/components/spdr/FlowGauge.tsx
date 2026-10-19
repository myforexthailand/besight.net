import { flowMomentum } from '@/data/spdr-gold'

const SIZE = 200
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

export function FlowGauge() {
  const score = flowMomentum.score
  const cx = SIZE / 2
  const cy = SIZE / 2
  const progressAngle = (score / 100) * 180

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)] md:p-7">
      <h3 className="text-lg font-semibold text-[#0B1B3B]">SPDR Flow Momentum</h3>

      <div className="mt-2 flex flex-col items-center">
        <svg width={SIZE} height={SIZE / 2 + 20} viewBox={`0 0 ${SIZE} ${SIZE / 2 + 20}`}>
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
            stroke="#16A34A"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
          />
          <text
            x={cx}
            y={cy - 12}
            textAnchor="middle"
            className="fill-[#0B1B3B]"
            style={{ fontSize: 34, fontWeight: 700 }}
          >
            {score}
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
        <p className="-mt-2 text-base font-bold text-[#16A34A]">{flowMomentum.label}</p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {flowMomentum.description}
        </p>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
        {flowMomentum.metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: m.color }} />
            <span className="w-32 shrink-0 text-xs text-muted-foreground">{m.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-900/[0.06]">
              <div
                className="h-full rounded-full"
                style={{ width: `${m.value}%`, backgroundColor: m.color }}
              />
            </div>
            <span className="w-7 shrink-0 text-right text-xs font-semibold text-[#0B1B3B]">
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
