'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'

export interface PillNavItem {
  label: string
  href: string
  icon?: LucideIcon
}

export function GlassPillNav({ items }: { items: PillNavItem[] }) {
  const [active, setActive] = useState(items[0]?.href)

  return (
    <nav
      className="relative hidden h-14 items-center gap-0.5 rounded-full border border-white/15 border-t-white/25 bg-white/0 px-2 py-2 shadow-lg backdrop-blur-[13px] md:flex lg:h-16 lg:gap-1 lg:px-3"
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-label={item.label}
          onClick={() => setActive(item.href)}
          className="relative flex items-center justify-center whitespace-nowrap rounded-full px-3 py-3 text-xs font-light uppercase tracking-wider text-black lg:px-5 lg:text-[0.8rem] lg:tracking-wider"
        >
          {active === item.href && (
            <motion.span
              layoutId="mainActivePill"
              className="absolute inset-0 rounded-full bg-black/[0.08]"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
