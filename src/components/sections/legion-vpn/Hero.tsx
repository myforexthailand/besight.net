import { type RefObject } from 'react'
import { motion } from 'motion/react'

import { EASE_OUT_EXPO } from './constants'
import { GlassCard } from './GlassCard'
import { HelmetCard } from './HelmetCard'

export function Hero({
  heroVideoRef,
}: {
  heroVideoRef: RefObject<HTMLVideoElement | null>
}) {
  return (
    <div className="relative z-20 mx-auto grid max-w-[1800px] grid-cols-1 items-end gap-12 px-6 pb-16 pt-8 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
      <div className="lg:col-span-6">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="uppercase leading-[0.82] text-[10vw] sm:text-[7vw] lg:text-[5vw] xl:text-[5.4vw]"
        >
          <span className="text-white">Conquer the web</span>
          <br />
          <span className="text-white/95">— Unseen,</span>
          <br />
          <span className="text-white/90">Untouchable,</span>
          <br />
          <span className="text-white/80">Imperial</span>
        </motion.h1>

        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT_EXPO }}
          className="my-8 h-[220px] w-px origin-top bg-gradient-to-b from-white/40 via-white/[0.15] to-transparent"
        />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="w-[320px] max-w-full font-sans text-sm font-light leading-relaxed text-white/[0.64] md:text-base"
        >
          Encrypt your traffic, hide your IP, and bypass any restrictions.
          Full online anonymity — no logs, no limits, no compromises.
        </motion.p>
      </div>

      <div className="flex flex-col items-start gap-6 lg:col-span-6 lg:flex-row lg:items-end lg:justify-end">
        <GlassCard heroVideoRef={heroVideoRef} />
        <HelmetCard />
      </div>
    </div>
  )
}
