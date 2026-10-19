'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

import type { PillNavItem } from '@/site/components/ui/glass-pill-nav'

export function MobileBottomNav({ items }: { items: PillNavItem[] }) {
  const [active, setActive] = useState(items[0]?.href)

  return (
    <nav
      className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-between rounded-full border border-black/10 bg-white/90 px-2 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-md md:hidden"
      aria-label="Mobile navigation"
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive = active === item.href
        return (
          <a
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => setActive(item.href)}
            className="relative flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-[10px] font-medium text-zinc-500"
          >
            {isActive && (
              <motion.span
                layoutId="mobileActivePill"
                className="absolute inset-0 rounded-full bg-navy/[0.06]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {Icon && (
              <Icon
                className={`relative z-10 h-5 w-5 ${isActive ? 'text-navy' : 'text-zinc-500'}`}
                strokeWidth={1.75}
              />
            )}
            <span className={`relative z-10 ${isActive ? 'text-navy' : ''}`}>
              {item.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
