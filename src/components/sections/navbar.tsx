import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Home, Newspaper, User, Wrench } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GlassPillNav } from '@/components/ui/glass-pill-nav'
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav'
import { GradientButton } from '@/components/ui/gradient-button'
import { navLinks } from '@/data/content'

const SCROLL_THRESHOLD = 20

const navIcons = [Home, Calculator, Wrench, Newspaper]
const navItems = navLinks.map((item, i) => ({ ...item, icon: navIcons[i] }))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white via-white/15 to-transparent pb-6">
      <nav className="container relative z-20 flex h-20 items-center justify-between gap-2">
        <Link to="/" className="relative flex items-center">
          <img
            src="/images/besight-logo.png"
            alt="BeSight"
            className={`h-8 w-auto transition-transform duration-300 ease-in-out ${
              scrolled ? '-translate-y-16 pointer-events-none' : 'translate-y-0'
            }`}
          />
          <img
            src="/images/Tagline-c.png"
            alt="BeSight"
            className={`absolute left-0 top-[-24px] h-[112px] w-20 object-cover transition-transform duration-300 ease-in-out ${
              scrolled ? 'translate-y-0' : '-translate-y-36 pointer-events-none'
            }`}
          />
        </Link>

        <GlassPillNav items={navItems} />

        <div className="relative flex shrink-0 items-center gap-2 lg:gap-3">
          <Button className="hidden whitespace-nowrap lg:inline-flex" asChild>
            <a href="https://affs.click/CHg1N" target="_blank" rel="noopener noreferrer">
              เปิดบัญชีเทรด XM
            </a>
          </Button>
          <GradientButton>
            <User className="h-4 w-4" />
            Login
          </GradientButton>
        </div>
      </nav>

      <MobileBottomNav items={navItems} />
    </header>
  )
}
