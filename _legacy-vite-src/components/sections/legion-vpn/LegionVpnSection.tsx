import { useRef } from 'react'

import { BackgroundVideo } from './BackgroundVideo'
import { Hero } from './Hero'
import { SecondSection } from './SecondSection'
import { SvgFilters } from './SvgFilters'

export function LegionVpnSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="relative bg-black">
      <SvgFilters />

      <div className="relative min-h-screen overflow-hidden">
        <BackgroundVideo videoRef={heroVideoRef} />
        <Hero heroVideoRef={heroVideoRef} />
      </div>

      <SecondSection />
    </div>
  )
}
