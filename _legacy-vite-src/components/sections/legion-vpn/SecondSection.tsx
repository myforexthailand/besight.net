import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { BorderGlowCard } from './BorderGlowCard'
import { SECOND_SECTION_VIDEO_SRC } from './constants'
import { LegionLogo } from './LegionLogo'
import { useAutoplayRecovery } from './useAutoplayRecovery'

const MARQUEE_TEXT =
  'YOUR DATA. YOUR PRIVACY. YOUR CONTROL. • ENCRYPTED TRAFFIC • COMPLETE ANONYMITY • NO LOGS • NO TRACKING • UNBREAKABLE DIGITAL PROTECTION • '

const INFO_CARDS = [
  {
    stat: 'NO LOGS',
    description: 'ZERO ACTIVITY OR CONNECTION LOGS, EVER RETAINED OR SHARED.',
  },
  {
    stat: '256-BIT',
    description: 'MILITARY-GRADE ENCRYPTION SECURES EVERY BYTE YOU SEND.',
  },
  {
    stat: '120+',
    description: 'GLOBAL SERVER LOCATIONS FOR FAST, RELIABLE ACCESS.',
  },
]

export function SecondSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useAutoplayRecovery(videoRef)

  return (
    <section className="relative z-20 min-h-screen overflow-hidden bg-[#0F141B]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        src={SECOND_SECTION_VIDEO_SRC}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
        style={{ transform: 'scale(1.20)', transformOrigin: 'right bottom' }}
      />
      <div className="pointer-events-none absolute inset-0 z-[15] bg-[#0F141B]/10 mix-blend-multiply" />

      <div className="relative z-30 flex h-10 items-center overflow-hidden bg-white md:h-[52px]">
        <div className="flex animate-legion-marquee whitespace-nowrap">
          {[0, 1].map((rep) => (
            <span
              key={rep}
              className="text-xl font-light uppercase text-[#0F141B] md:text-[28px] lg:text-[32px]"
            >
              {MARQUEE_TEXT.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      <LegionLogo className="pointer-events-none absolute left-6 top-[100px] z-10 h-[594px] w-[598px] md:left-10" opacity={0.08} />

      <div className="relative z-20 px-6 pt-[200px] md:px-10">
        <h2 className="uppercase text-white" style={{ fontSize: 72, lineHeight: '64px' }}>
          &#8195;&#8195;&#8195;&#8195;Protect the web —
          <br />
          <span className="font-light text-white/95">Unbreakable, Invisible,</span>
          <br />
          <span className="text-white/90">Absolute</span>
        </h2>

        <p className="mt-8 w-[480px] max-w-full font-light text-sm leading-relaxed text-white/[0.64]">
          Every packet is wrapped in layered, military-grade encryption before
          it ever leaves your device — closing the door on trackers,
          throttling, and surveillance, on any network, anywhere in the world.
        </p>

        <button
          type="button"
          className="mt-10 flex h-16 items-center gap-2 rounded-full border border-white/25 border-t-white/[0.45] bg-gradient-to-b from-white to-gray-100 px-6 text-xs font-bold uppercase tracking-wider text-[#0F141B]"
        >
          Secure Your Connection
          <ArrowUpRight className="h-4 w-4" />
        </button>

        <div className="mx-auto mt-20 grid max-w-[1100px] grid-cols-1 gap-6 pb-24 md:grid-cols-3">
          {INFO_CARDS.map((card, i) => (
            <BorderGlowCard key={card.stat} startProgress={i * 0.33}>
              <p className="text-3xl text-white">{card.stat}</p>
              <p className="mt-3 text-[11px] uppercase tracking-widest text-white/[0.64]">
                {card.description}
              </p>
            </BorderGlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
