/* What the SPDR widgets receive (built in lib/server/spdr/snapshot.ts from
   the imported SPDR archive + live quotes). Types and pure helpers only. */

export interface SpdrDailyPoint {
  /** US trade date, yyyy-mm-dd. */
  date: string
  /** Metric tonnes held by the trust. */
  spdrHoldings: number
  /** Gold close, USD/oz (LBMA PM implied by SPDR's NAV). */
  goldPrice: number
  /** Holdings change vs the previous trading day, tonnes. */
  dailyFlow: number
}

export type SpdrHistogramBin = { start: number; end: number; count: number }
export type SpdrHistogram = {
  bins: SpdrHistogramBin[]
  today: number
  /** Share of observations ≤ today's flow. */
  percentile: number
  /** Observations in the comparison window. */
  observations: number
  years: number
}

export type SpdrSnapshot = {
  /** Latest US trade date in the data. */
  asOf: string
  /** When the archive was last imported (ISO). */
  syncedAt: string | null
  summary: {
    holdingsTons: number
    holdingsOunces: number
    navUsd: number | null
    change1d: number
    changePct1d: number
    change7d: number
    change7dPct: number
    change30d: number
    change30dPct: number
    changeYtd: number | null
    changeYtdPct: number | null
    goldReturn7d: number | null
    flowZscore: number | null
  }
  flowStatus: {
    status: 'INFLOW' | 'OUTFLOW' | 'UNCHANGED'
    regimeScore: number | null
    headline: string
  }
  momentum: {
    score: number | null
    label: string | null
    metrics: { label: string; value: number }[]
  }
  streak: {
    direction: 'inflow' | 'outflow' | 'flat'
    days: number
    accumulatedFlow: number
    goldPerformancePct: number | null
    longestInflowStreak: number
    longestOutflowStreak: number
  }
  divergence: {
    windowDays: number
    goldChangePct: number | null
    spdrChangePct: number | null
    type: string | null
  }
  /** About one year of trading days, oldest first. */
  history: SpdrDailyPoint[]
  histogram: { daily: SpdrHistogram; weekly: SpdrHistogram }
  /** XAUUSD for the headline — live quote when available, else the LBMA close. */
  gold: { price: number; change: number | null; changePct: number | null; live: boolean; updatedAt: string | null }
  thaiGold: {
    updatedAt: string | null
    usdThb: number
    barBuy: number
    barSell: number
    ornamentBuy: number
    ornamentSell: number
    change: number
    changePct: number
    fairValue: number
    premium: number
    premiumPct: number
  } | null
}

export const TROY_OUNCES_PER_TONNE = 32_150.7466
/** Pure gold in one baht-weight of 96.5% Thai gold, as a share of a troy ounce. */
export const THAI_BAHT_GOLD_OZ = (15.244 * 0.965) / 31.1034768

export function formatSigned(value: number, digits = 2) {
  return `${value > 0 ? '+' : value < 0 ? '−' : ''}${Math.abs(value).toFixed(digits)}`
}

export function lastPoints(history: SpdrDailyPoint[], n: number) {
  return history.slice(-n)
}
