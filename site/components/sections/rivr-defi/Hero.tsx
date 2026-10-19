'use client'

import { BottomLeftCard } from './BottomLeftCard'
import { BottomRightCorner } from './BottomRightCorner'
import { Navbar } from './Navbar'

export function Hero() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center bg-[#f0f0f0] p-3 md:h-screen md:p-5">
      <section className="group relative flex h-full w-full max-w-[1536px] flex-col items-center overflow-hidden rounded-[1.5rem] md:rounded-[3rem]">
        <video
          autoPlay
          muted
          playsInline
          src="/images/Firefly-bear.mp4"
          className="cover-fill"
        />

        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-tr from-white from-15% to-transparent to-40%" />

        <div className="relative z-10 flex w-full flex-1 flex-col items-center">
          <Navbar />
        </div>

        <BottomLeftCard />
        <BottomRightCorner />
      </section>
    </div>
  )
}
