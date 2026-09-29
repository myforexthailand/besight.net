import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react'

const LOOP_DURATION_MS = 7000

const maskLayerStyle = (padding: number): CSSProperties => ({
  padding,
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
})

export function BorderGlowCard({
  startProgress = 0,
  children,
  className,
}: {
  startProgress?: number
  children: ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const path = pathRef.current
    if (!card || !path) return

    let rafId: number
    let totalLength = 0

    const measure = () => {
      const rect = card.getBoundingClientRect()
      path.setAttribute('width', String(Math.max(rect.width, 1)))
      path.setAttribute('height', String(Math.max(rect.height, 1)))
      totalLength = path.getTotalLength()
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(card)

    const start = performance.now() - startProgress * LOOP_DURATION_MS

    const tick = (now: number) => {
      if (totalLength > 0) {
        const elapsed = (now - start) % LOOP_DURATION_MS
        const progress = elapsed / LOOP_DURATION_MS
        const point = path.getPointAtLength(progress * totalLength)
        card.style.setProperty('--glow-x', `${point.x}px`)
        card.style.setProperty('--glow-y', `${point.y}px`)
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [startProgress])

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-[2rem] bg-white/[0.03] p-8 transition-transform duration-300 hover:-translate-y-1 ${className ?? ''}`}
      style={{ '--glow-x': '0px', '--glow-y': '0px' } as CSSProperties}
    >
      <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <rect ref={pathRef} x={0.5} y={0.5} rx={32} ry={32} fill="none" />
      </svg>

      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{ border: '0.8px solid rgba(255, 255, 255, 0.14)' }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{
          ...maskLayerStyle(2),
          opacity: 0.15,
          filter: 'blur(4px)',
          background:
            'radial-gradient(circle 110px at var(--glow-x) var(--glow-y), #fff 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{
          ...maskLayerStyle(1.2),
          opacity: 0.28,
          filter: 'blur(2px)',
          background:
            'radial-gradient(circle 75px at var(--glow-x) var(--glow-y), #fff 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{
          ...maskLayerStyle(0.9),
          opacity: 0.78,
          filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))',
          background:
            'radial-gradient(circle 35px at var(--glow-x) var(--glow-y), #fff 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
