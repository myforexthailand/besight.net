import { type RefObject, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Shield } from 'lucide-react'

import { EASE_OUT_EXPO, HERO_VIDEO_SRC } from './constants'

const DRIFT_TOLERANCE = 0.03

export function GlassCard({
  heroVideoRef,
}: {
  heroVideoRef: RefObject<HTMLVideoElement | null>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dupVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let rafId: number

    const sync = () => {
      const container = containerRef.current
      const heroVideo = heroVideoRef.current
      const dupVideo = dupVideoRef.current

      if (container && heroVideo && dupVideo) {
        const rect = container.getBoundingClientRect()
        dupVideo.style.width = `${window.innerWidth}px`
        dupVideo.style.height = `${window.innerHeight}px`
        dupVideo.style.transform = `translate(${-rect.left}px, ${-rect.top}px)`

        if (Math.abs(dupVideo.currentTime - heroVideo.currentTime) > DRIFT_TOLERANCE) {
          dupVideo.currentTime = heroVideo.currentTime
        }
        if (dupVideo.paused && !heroVideo.paused) {
          dupVideo.play().catch(() => {})
        }
      }

      rafId = requestAnimationFrame(sync)
    }

    rafId = requestAnimationFrame(sync)
    return () => cancelAnimationFrame(rafId)
  }, [heroVideoRef])

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.4, ease: EASE_OUT_EXPO }}
      ref={containerRef}
      className="relative h-[420px] w-full max-w-[340px] overflow-hidden rounded-[3rem] border border-white/20 lg:h-[460px]"
    >
      <video
        ref={dupVideoRef}
        muted
        playsInline
        src={HERO_VIDEO_SRC}
        className="absolute left-0 top-0 origin-top-left object-cover"
        style={{ filter: 'url(#liquid-glass-refraction)' }}
      />

      <div
        className="absolute inset-0 bg-white/[0.05]"
        style={{
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(0,0,0,0.25)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end p-8">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-[80px]">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <h3
          className="uppercase text-white"
          style={{ fontSize: 40, lineHeight: '40px' }}
        >
          Protect the web
          <br />
          — Unbreakable,
          <br />
          Invisible, Absolute
        </h3>
        <p className="mt-4 text-white/80" style={{ fontSize: 12, lineHeight: '19px' }}>
          Military-grade encryption wraps every packet you send, sealing your
          connection from prying eyes on any network.
        </p>
      </div>
    </motion.div>
  )
}
