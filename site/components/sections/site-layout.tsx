'use client'

import { Navbar } from '@/site/components/sections/navbar'
import { Footer } from '@/site/components/sections/footer'

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
