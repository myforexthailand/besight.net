'use client'

import { Link } from '@/site/lib/router'
import { ArrowUpRight } from 'lucide-react'

export function CTA() {
  return (
    <div className="flex w-full items-center justify-center p-3 pb-12 md:p-5 md:pb-24">
      <section className="relative flex h-[32rem] w-full max-w-[1536px] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] md:h-[38rem] md:rounded-[3rem]">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/images/homepage/loopabout.mp4"
          className="cover-fill"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center text-white">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
            Beyond Trading.
            <br />
            We Build Together.
          </h2>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="https://discord.gg/DkKc4P2sw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-medium text-navy transition-transform hover:scale-[1.02]"
            >
              Our Community
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <Link
              to="/about"
              className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-2 pl-6 pr-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Explore BeSight
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
