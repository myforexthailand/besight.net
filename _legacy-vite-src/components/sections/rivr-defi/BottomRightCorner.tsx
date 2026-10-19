import { ArrowUpRight } from 'lucide-react'

const CUTOUT_PATH = 'M56 56V0C56 30.9279 30.9279 56 0 56H56Z'

export function BottomRightCorner({ bgColor = '#f0f0f0' }: { bgColor?: string }) {
  return (
    <div className="absolute bottom-0 right-0 z-10 hidden md:block">
      {/* Fills the gap above the box so the inner curve reads as one continuous cut. */}
      <svg
        className="absolute bottom-full right-0 h-14 w-14"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
      >
        <path d={CUTOUT_PATH} fill={bgColor} />
      </svg>
      {/* Fills the gap to the left so the box merges flush with the container edge. */}
      <svg
        className="absolute right-full bottom-0 h-14 w-14"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
      >
        <path d={CUTOUT_PATH} fill={bgColor} />
      </svg>

      <div className="rounded-tl-[3.5rem] p-6 pl-14 pt-8" style={{ backgroundColor: bgColor }}>
        <div className="flex flex-col items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5E6470]/20 text-[#5E6470]/60">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <p className="text-xs leading-snug text-[#5E6470]/60">
            Documentation
            <br />
            Library
          </p>
        </div>
      </div>
    </div>
  )
}
