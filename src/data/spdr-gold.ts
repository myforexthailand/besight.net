// Mock SPDR Gold Shares (GLD) holdings + gold price dataset.
// Illustrative demo data only — generated with a plausible random-walk,
// NOT a live market data feed.

export interface SpdrDailyPoint {
  date: string // ISO yyyy-mm-dd
  spdrHoldings: number // metric tons
  goldPrice: number // USD / oz
  dailyFlow: number // tons, +inflow / -outflow
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const DAYS = 365
const rand = mulberry32(20250928)

function generate(): SpdrDailyPoint[] {
  const points: SpdrDailyPoint[] = []
  let holdings = 780
  let price = 3450

  const start = new Date()
  start.setDate(start.getDate() - (DAYS - 1))

  for (let i = 0; i < DAYS; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)

    // Correlated-ish random walk: gold price drifts up slightly with noise,
    // SPDR flow loosely tracks price momentum with its own noise.
    const priceNoise = (rand() - 0.48) * 18
    price = Math.max(3000, price + priceNoise)

    const momentumBias = priceNoise > 0 ? 0.35 : -0.25
    const flowNoise = (rand() - 0.5) * 3.2 + momentumBias
    const dailyFlow = Math.round(flowNoise * 100) / 100
    holdings = Math.max(700, holdings + dailyFlow)

    points.push({
      date: date.toISOString().slice(0, 10),
      spdrHoldings: Math.round(holdings * 100) / 100,
      goldPrice: Math.round(price * 100) / 100,
      dailyFlow,
    })
  }

  // Force the tail end of the series to match the numbers used across the
  // reference UI copy so the headline stats line up with the charts.
  const tail = points.slice(-31)
  const last = points[points.length - 1]
  last.spdrHoldings = 812.43
  last.goldPrice = 3742.6
  last.dailyFlow = 4.31

  // Give the most recent 4 days a clean inflow streak for the streak widget.
  const n = points.length
  points[n - 2].dailyFlow = 3.1
  points[n - 2].spdrHoldings = points[n - 3].spdrHoldings + points[n - 2].dailyFlow
  points[n - 3].dailyFlow = 5.8
  points[n - 3].spdrHoldings = points[n - 4].spdrHoldings + points[n - 3].dailyFlow
  points[n - 4].dailyFlow = 5.42
  points[n - 4].spdrHoldings = points[n - 5].spdrHoldings + points[n - 4].dailyFlow

  void tail
  return points
}

export const spdrHistory: SpdrDailyPoint[] = generate()

export const spdrLatest = spdrHistory[spdrHistory.length - 1]

function findByDaysAgo(days: number): SpdrDailyPoint {
  const idx = Math.max(0, spdrHistory.length - 1 - days)
  return spdrHistory[idx]
}

function pctChange(current: number, previous: number) {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

const d7 = findByDaysAgo(7)
const d30 = findByDaysAgo(30)
const yearStart = spdrHistory[0]

export const spdrSummary = {
  holdingsTons: spdrLatest.spdrHoldings,
  holdingsOz: spdrLatest.spdrHoldings * 32150.7 / 1_000_000, // tons -> troy oz (millions)
  holdingsValueUsdBn: (spdrLatest.spdrHoldings * 32150.7 * spdrLatest.goldPrice) / 1_000_000_000,
  changePct1d: pctChange(spdrLatest.spdrHoldings, spdrHistory[spdrHistory.length - 2].spdrHoldings),
  change1d: spdrLatest.dailyFlow,
  change7d: spdrLatest.spdrHoldings - d7.spdrHoldings,
  change7dPct: pctChange(spdrLatest.spdrHoldings, d7.spdrHoldings),
  change30d: spdrLatest.spdrHoldings - d30.spdrHoldings,
  change30dPct: pctChange(spdrLatest.spdrHoldings, d30.spdrHoldings),
  changeYtd: spdrLatest.spdrHoldings - yearStart.spdrHoldings,
  changeYtdPct: pctChange(spdrLatest.spdrHoldings, yearStart.spdrHoldings),
  goldPrice: spdrLatest.goldPrice,
  goldChange: 18.4,
  goldChangePct: 0.49,
  lastUpdated: 'วันนี้ 15:42 น. (เวลาไทย)',
}

export const flowMomentum = {
  score: 78,
  label: 'Strong Inflow',
  description:
    'แรงไหลเข้าของ SPDR อยู่ในระดับสูง ต่อเนื่องหลายวัน สอดคล้องกับทิศทางราคาทองคำขาขึ้นในช่วงนี้',
  metrics: [
    { label: '7D Flow', value: 85, color: '#16A34A' },
    { label: '30D Flow', value: 80, color: '#16A34A' },
    { label: 'Inflow Streak', value: 70, color: '#F5B700' },
    { label: 'Flow Acceleration', value: 75, color: '#0B1B3B' },
    { label: 'Holdings Percentile', value: 82, color: '#16A34A' },
  ],
}

export const flowStatus = {
  status: 'INFLOW',
  headline: 'Strong Accumulation',
  description:
    'SPDR เพิ่มการถือครองต่อเนื่อง 4 วัน Net Flow 7 วัน +12.84 ตัน ราคาทอง +1.8% ในช่วงเดียวกัน',
}

export const flowStreak = {
  days: 4,
  subtitle: 'เพิ่มการถือครองต่อเนื่อง 4 วัน',
  accumulatedFlow: 18.42,
  goldPerformancePct: 2.31,
  longestInflowStreak: 11,
  longestOutflowStreak: 14,
}

export const divergenceAlert = {
  goldChangePct: 3.2,
  spdrChangePct: -1.7,
  windowDays: 14,
}

export const thaiGoldMarket = {
  lastUpdated: 'วันนี้ 15:40 น.',
  usdThb: 32.45,
  barBuy: 56850,
  barSell: 56950,
  barChange: 150,
  barChangePct: 0.26,
  fairValue: 56820,
  thaiAssocPrice: 56950,
  premium: 130,
  premiumPct: 0.23,
}

export function last(n: number): SpdrDailyPoint[] {
  return spdrHistory.slice(-n)
}
