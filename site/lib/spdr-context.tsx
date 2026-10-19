'use client'

import { createContext, useContext, type ReactNode } from 'react'

import type { SpdrSnapshot } from '@/site/data/spdr'
import { useSiteLang } from '@/site/lib/lang'

const SpdrContext = createContext<SpdrSnapshot | null>(null)

/** Supplies the server-built SPDR snapshot to the SPDR widgets. */
export function SpdrProvider({ value, children }: { value: SpdrSnapshot; children: ReactNode }) {
  return <SpdrContext.Provider value={value}>{children}</SpdrContext.Provider>
}

export function useSpdr(): SpdrSnapshot {
  const value = useContext(SpdrContext)
  if (!value) throw new Error('SPDR widgets must be rendered inside <SpdrProvider>')
  return value
}

export function useSpdrLocale() {
  const { lang } = useSiteLang()
  return lang === 'en' ? 'en-US' : 'th-TH'
}

/** Dates are US trade dates (yyyy-mm-dd) — format them in UTC so the server
 *  and the browser always print the same day. */
export function formatTradeDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' },
  locale = 'th-TH',
) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { timeZone: 'UTC', ...options })
}

export function formatThaiDateTime(iso: string, locale = 'th-TH') {
  return new Date(iso).toLocaleString(locale, {
    timeZone: 'Asia/Bangkok',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
