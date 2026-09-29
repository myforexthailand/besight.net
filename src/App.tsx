import { Route, Routes } from 'react-router-dom'

import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { ProductsGrid } from '@/components/sections/products-grid'
import { Leaderboard } from '@/components/sections/leaderboard'
import { WeightLoss } from '@/components/sections/weight-loss'
import { ProductCarousel } from '@/components/sections/product-carousel'
import { ScienceNature } from '@/components/sections/science-nature'
import { Faq } from '@/components/sections/faq'
import { HealthGuide } from '@/components/sections/health-guide'
import { CTA as RivrCTA } from '@/components/sections/rivr-defi/CTA'
import { Metrics as RivrMetrics } from '@/components/sections/rivr-defi/Metrics'
import { RivrSection } from '@/components/sections/rivr-defi/RivrSection'
import { Footer } from '@/components/sections/footer'
import { NewsList } from '@/pages/NewsList'
import { NewsArticle } from '@/pages/NewsArticle'
import { CookiePolicy } from '@/pages/CookiePolicy'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { SpdrGoldAnalysis } from '@/pages/SpdrGoldAnalysis'
import { Po3xmLanding } from '@/pages/Po3xmLanding'
import { AboutBeSight } from '@/pages/AboutBeSight'

function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Navbar />
      <main>
        <Hero />
        <div className="bg-[#f0f0f0]">
          <RivrMetrics />
        </div>
        <RivrSection />
        <ProductsGrid />
        <Leaderboard />
        <WeightLoss />
        <ProductCarousel />
        <ScienceNature />
        <Faq />
        <HealthGuide />
        <RivrCTA />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<NewsList />} />
      <Route path="/news/:slug" element={<NewsArticle />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/spdr-gold-analysis" element={<SpdrGoldAnalysis />} />
      <Route path="/indicators/po3xm" element={<Po3xmLanding />} />
      <Route path="/about" element={<AboutBeSight />} />
    </Routes>
  )
}

export default App
