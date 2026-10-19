import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
