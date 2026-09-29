import { Features } from './Features'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { RebateCalculator } from './RebateCalculator'

export function RivrSection() {
  return (
    <div className="min-h-screen w-full bg-[#f0f0f0]">
      <Hero />
      <Features />
      <RebateCalculator />
      <Footer />
    </div>
  )
}
