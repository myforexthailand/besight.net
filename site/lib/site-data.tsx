'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Article } from '@/site/data/news'
import type { SiteContent, SiteLeaderboard } from '@/lib/server/site'
import { products } from '@/site/data/products'
import { faqs } from '@/site/data/content'
import { REBATE_RATES } from '@/site/data/rebateRates'

/* Server-fetched data for the landing (app/(site)/layout.tsx): published
   articles (without bodies), the CRM-editable page content, the public
   leaderboard and who's signed in. Components read it with useSiteData()
   instead of importing site/data/* directly. */

export type SiteSession = { role: 'admin' | 'member' } | null

export type SiteData = {
  articles: Article[]
  content: SiteContent
  leaderboard: SiteLeaderboard
  session: SiteSession
}

const FALLBACK: SiteData = {
  articles: [],
  content: { products, faqs, rebateRates: REBATE_RATES },
  leaderboard: { current: [], previous: [], activeTraders: 0 },
  session: null,
}

const SiteDataContext = createContext<SiteData>(FALLBACK)

export function SiteDataProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  return useContext(SiteDataContext)
}

/** Where the navbar's account button goes for the current visitor. */
export function accountLink(session: SiteSession) {
  if (!session) return { href: 'https://app.besight.net/', label: 'Login' }
  return session.role === 'admin' ? { href: '/crm', label: 'CRM' } : { href: '/dashboard', label: 'Dashboard' }
}
