'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/site/lib/router'
import { accountLink, useSiteData } from '@/site/lib/site-data'
import { Calculator, Home, Newspaper, User, Wrench } from 'lucide-react'

import { Button } from '@/site/components/ui/button'
import { GlassPillNav } from '@/site/components/ui/glass-pill-nav'
import { MobileBottomNav } from '@/site/components/ui/mobile-bottom-nav'
import { GradientButton } from '@/site/components/ui/gradient-button'
import { LangSwitch } from '@/site/components/ui/lang-switch'
import { navLinks } from '@/site/data/content'
import { useSiteLang, useT } from '@/site/lib/lang'

const SCROLL_THRESHOLD = 20

const navIcons = [Home, Calculator, Wrench, Newspaper]

export function Navbar() {
  const account = accountLink(useSiteData().session)
  const { lang } = useSiteLang()
  const t = useT()
  const navItems = navLinks.map((item, i) => ({
    label: lang === 'en' ? item.labelEn : item.label,
    href: item.href,
    icon: navIcons[i],
  }))
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white via-white/15 to-transparent pb-1 md:pb-6">
      <nav className="container relative z-20 flex h-16 items-center md:h-20 justify-between gap-2">
        <Link to="/" className="relative flex min-w-0 flex-1 items-center md:flex-none">
          <img
            src="/images/besight-logo.png"
            alt="BeSight"
            className={`h-auto w-full max-w-[7.5rem] md:h-8 md:w-auto md:max-w-none transition-transform duration-300 ease-in-out ${
              scrolled ? '-translate-y-16 pointer-events-none' : 'translate-y-0'
            }`}
          />
          <img
            src="/images/Tagline-c.png"
            alt="BeSight"
            className={`absolute left-0 top-[-24px] h-[96px] w-[4.25rem] object-cover md:h-[112px] md:w-20 transition-transform duration-300 ease-in-out ${
              scrolled ? 'translate-y-0' : '-translate-y-36 pointer-events-none'
            }`}
          />
        </Link>

        <GlassPillNav items={navItems} />

        <div className="relative flex shrink-0 items-center gap-2 lg:gap-3">
          <Button className="hidden whitespace-nowrap lg:inline-flex" asChild>
            <a href="https://affs.click/CHg1N" target="_blank" rel="noopener noreferrer">
              {t('เปิดบัญชีเทรด XM', 'Open XM Account')}
            </a>
          </Button>
          {/* Plain <a>: the member app is a separate layout (full page load). */}
          <GradientButton asChild cta innerClassName="max-[375px]:gap-1.5 max-[375px]:px-3 max-[375px]:py-1.5 max-[375px]:text-xs">
            <a href={account.href}>
              <User className="h-4 w-4 max-[375px]:h-3.5 max-[375px]:w-3.5" />
              {account.label}
            </a>
          </GradientButton>
          <LangSwitch />
        </div>
      </nav>

      <MobileBottomNav items={navItems} />
    </header>
  )
}
