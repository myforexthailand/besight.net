'use client'

import { useMemo, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { GoldPriceCard } from '@/site/components/news/gold-price-card'
import { THAI_BAHT_GOLD_OZ, formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { formatTradeDate, useSpdr, useSpdrLocale } from '@/site/lib/spdr-context'

const PERIODS = [
  { label: '1M', days: 21 },
  { label: '3M', days: 63 },
  { label: '6M', days: 126 },
  { label: '1Y', days: 252 },
] as const

const BAHT_WEIGHT_GRAMS = 15.244
const SAMPLE_MARKER = 'ข้อมูลตัวอย่างสำหรับการพัฒนา'

const fmt2 = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function formatThb(n: number) {
  return n.toLocaleString('th-TH', { maximumFractionDigits: 0 })
}

/** Gold-toned table frame used by the Association price tables. */
const TABLE_BOX = 'rounded-xl border border-[#d9b64a] bg-white text-[11px] md:text-sm'
const TABLE_FRAME = `overflow-hidden ${TABLE_BOX}`
const TABLE_HEAD = 'bg-[#f2de79] font-medium text-[#402c1b]'

export function ThaiGoldMarket() {
  const t = useT()
  const locale = useSpdrLocale()
  const { thaiGold, gold, history } = useSpdr()
  const [period, setPeriod] = useState<(typeof PERIODS)[number]['label']>('6M')
  // Look-back filters (one per table); both start on the latest trading day.
  const latestIso = history.length ? history[history.length - 1].date : ''
  const [intraRange, setIntraRange] = useState<DateRange | null>(null)
  const [typesRange, setTypesRange] = useState<DateRange | null>(null)

  const chartData = useMemo(() => {
    if (!thaiGold) return []
    const days = PERIODS.find((x) => x.label === period)?.days ?? 126
    // Thai price line = theoretical 96.5% baht-gold value at today's USDTHB.
    return history.slice(-days).map((pt) => ({
      date: pt.date,
      xauusd: pt.goldPrice,
      thb: Math.round(pt.goldPrice * thaiGold.usdThb * THAI_BAHT_GOLD_OZ),
    }))
  }, [period, history, thaiGold])

  if (!thaiGold) return null
  const premiumUp = thaiGold.premium >= 0
  const up = thaiGold.change >= 0
  const updated = thaiGold.updatedAt ? t(thaiGold.updatedAt, thaiGold.updatedAt.replace(/ น\.$/, '')) : '—'

  // Development sample: the snapshot only carries the latest announcement, so fill the tables with synthetic rows.
  // Never shown for real data (the sample is recognised by its marker text).
  const isSample = process.env.NODE_ENV !== 'production' && thaiGold.updatedAt === SAMPLE_MARKER
  const intra = intraRange ?? { from: latestIso, to: latestIso }
  const types = typesRange ?? { from: latestIso, to: latestIso }
  const fmtDay = (iso: string) => {
    const [y, m, d] = iso.split('-')
    return t(`${d}/${m}/${Number(y) + 543}`, `${d}/${m}/${y}`)
  }
  const ROUNDS = [
    { no: 4, time: '16:43', change: 50, shift: 0 },
    { no: 3, time: '14:10', change: -50, shift: 50 },
    { no: 2, time: '11:25', change: 0, shift: 0 },
    { no: 1, time: '09:12', change: 50, shift: 50 },
  ]
  const intradayRows = isSample
    ? daysIn(intra.from, intra.to).flatMap((day) =>
        ROUNDS.map((r) => {
          const shift = r.shift - dateShift(day, latestIso)
          return {
            no: r.no,
            change: r.change,
            time: `${fmtDay(day)} ${r.time}${t(' น', '')}`,
            barBuy: thaiGold.barBuy - shift,
            barSell: thaiGold.barSell - shift,
            ornBuy: thaiGold.ornamentBuy - shift,
            ornSell: thaiGold.ornamentSell - shift,
          }
        }),
      )
    : intra.from <= latestIso && latestIso <= intra.to
      ? [{ no: '—', time: updated, change: thaiGold.change, barBuy: thaiGold.barBuy, barSell: thaiGold.barSell, ornBuy: thaiGold.ornamentBuy, ornSell: thaiGold.ornamentSell }]
      : []
  // Only USDTHB comes from real data; the cross rates have no source yet, so they appear in the development sample only.
  const fxRates: { pair: string; a: FlagCode; b: FlagCode; value: string; unit: string }[] = [
    { pair: 'USDTHB', a: 'US', b: 'TH', value: thaiGold.usdThb.toFixed(2), unit: 'THB' },
    ...(isSample
      ? [
          { pair: 'THBJPY', a: 'TH' as const, b: 'JP' as const, value: (150 / thaiGold.usdThb).toFixed(2), unit: '¥' },
          { pair: 'THBAUD', a: 'TH' as const, b: 'NZ' as const, value: (1 / (thaiGold.usdThb * 0.65)).toFixed(4), unit: 'A$' },
          { pair: 'USDJPY', a: 'US' as const, b: 'JP' as const, value: '150.00', unit: '¥' },
        ]
      : []),
  ]
  const typeDays = isSample ? daysIn(types.from, types.to) : types.from <= latestIso && latestIso <= types.to ? [latestIso] : []
  const endShift = dateShift(typeDays[0] ?? latestIso, latestIso)
  const barSellD = thaiGold.barSell + endShift
  const typeRows: { label: string; gram: number | null; buy: number; sell: number }[] =
    typeDays.length === 1
      ? (() => {
          const sh = dateShift(typeDays[0], latestIso)
          const ornBuy = thaiGold.ornamentBuy + sh
          const ornSell = thaiGold.ornamentSell + sh
          return [
            { label: t('ทองคำแท่ง 96.5%', 'Gold bar 96.5%'), gram: null, buy: thaiGold.barBuy + sh, sell: thaiGold.barSell + sh },
            { label: t('ทองรูปพรรณ 96.5%', 'Ornament gold 96.5%'), gram: ornBuy / BAHT_WEIGHT_GRAMS, buy: ornBuy, sell: ornSell },
            ...(isSample
              ? [90, 80, 50, 40, 99.99].map((purity) => {
                  const k = purity / 96.5
                  return {
                    label: t(`ทองรูปพรรณ ${purity}%`, `Ornament gold ${purity}%`),
                    gram: (ornBuy * k) / BAHT_WEIGHT_GRAMS,
                    buy: Math.round(ornBuy * k),
                    sell: Math.round(ornSell * k),
                  }
                })
              : []),
          ]
        })()
      : // Several days: the two 96.5% prices for each day, newest first.
        typeDays.flatMap((day) => {
          const sh = dateShift(day, latestIso)
          return [
            { label: `${fmtDay(day)} · ${t('ทองคำแท่ง 96.5%', 'Gold bar 96.5%')}`, gram: null, buy: thaiGold.barBuy + sh, sell: thaiGold.barSell + sh },
            { label: `${fmtDay(day)} · ${t('ทองรูปพรรณ 96.5%', 'Ornament gold 96.5%')}`, gram: (thaiGold.ornamentBuy + sh) / BAHT_WEIGHT_GRAMS, buy: thaiGold.ornamentBuy + sh, sell: thaiGold.ornamentSell + sh },
          ]
        })
  const marketRows: { label: string; open: number | null; close: number | null }[] = isSample
    ? [
        { label: t('ฮ่องกง', 'Hong Kong'), open: null, close: null },
        { label: t('ลอนดอน AM FIX', 'London AM FIX'), open: null, close: barSellD },
        { label: t('ลอนดอน PM FIX', 'London PM FIX'), open: null, close: barSellD },
        { label: t('นิวยอร์ก', 'New York'), open: null, close: barSellD },
      ]
    : []

  return (
    <div className="relative md:overflow-hidden md:rounded-3xl md:p-8 md:shadow-soft-lg">
      <img src="/images/yaowarat-gold-thailand.jpg" alt="" className="cover-fill hidden md:block" />
      <div className="pointer-events-none absolute inset-0 hidden bg-amber-50/85 md:block" />
      <div className="relative z-10 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-6">
        <GoldPriceCard thaiGold={thaiGold} />

        {/* Chart card */}
        <div className="surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-navy md:text-base">{t('ราคาทองโลก vs ทองไทย', 'Global Gold vs Thai Gold')}</p>
            <div className="flex gap-1">
              {PERIODS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={period === p.label}
                  onClick={() => setPeriod(p.label)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    period === p.label ? 'bg-navy text-white' : 'bg-zinc-900/[0.04] text-zinc-600'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-zinc-600">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-navy" />{t('ทองไทย (เชิงทฤษฎี)', 'Thai gold (theoretical)')}</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#F5B700]" />{t('ราคาทองโลก (XAUUSD)', 'Global gold (XAUUSD)')}</span>
          </div>
          <div className="mt-3 h-64 w-full xl:h-[calc(100%-5rem)] xl:min-h-[16rem]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,27,59,0.06)" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(d: string) => formatTradeDate(d, undefined, locale)} tick={{ fontSize: 10, fill: '#71717a' }} tickLine={false} minTickGap={40} />
                <YAxis yAxisId="thb" hide domain={['dataMin - 500', 'dataMax + 500']} />
                <YAxis
                  yAxisId="usd"
                  orientation="right"
                  tick={{ fontSize: 10, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  domain={['dataMin - 20', 'dataMax + 20']}
                  tickFormatter={(v: number) => v.toFixed(0)}
                />
                <Tooltip
                  formatter={(v, name) => [
                    name === 'thb' ? `${formatThb(Number(v))} ${t('บาท', 'THB')}` : `$${Number(v).toFixed(2)}`,
                    name === 'thb' ? t('ทองไทย (เชิงทฤษฎี)', 'Thai gold (theoretical)') : 'XAUUSD',
                  ]}
                  labelFormatter={(l) => formatTradeDate(String(l), { day: 'numeric', month: 'short', year: 'numeric' }, locale)}
                />
                <Line yAxisId="thb" type="monotone" dataKey="thb" stroke="#0B1B3B" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line yAxisId="usd" type="monotone" dataKey="xauusd" stroke="#F5B700" strokeWidth={2} dot={false} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Intraday adjustments — the snapshot only carries the latest Association announcement */}
      <div className="relative z-10 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-base font-semibold text-[#402c1b] md:text-lg">{t('การปรับเปลี่ยนระหว่างวัน', 'Intraday adjustments')}</p>
          <DateFilter label={t('เช็คราคาทองคำย้อนหลัง', 'Check past prices')} search={t('ค้นหา', 'Search')} value={intra} max={latestIso} onApply={setIntraRange} />
        </div>
        <div className={`mt-2 max-h-[28rem] overflow-auto ${TABLE_BOX}`}>
          <table className="w-full min-w-[56rem] text-center">
            <thead className={TABLE_HEAD}>
              <tr className="border-b border-[#d9b64a]">
                <th colSpan={2} className="py-1.5">{t('ช่วงเวลา', 'Time')}</th>
                <th colSpan={2} className="border-l border-[#d9b64a] py-1.5">{t('ทองแท่ง', 'Gold bar')}</th>
                <th colSpan={2} className="border-l border-[#d9b64a] py-1.5">{t('ทองรูปพรรณ', 'Ornament gold')}</th>
                <th colSpan={3} className="border-l border-[#d9b64a] py-1.5">{t('ภาพรวมเปลี่ยนแปลง', 'Overview')}</th>
              </tr>
              <tr>
                <th className="py-1.5">{t('วันที่ / เวลา', 'Date / time')}</th>
                <th>{t('ครั้งที่', 'No.')}</th>
                <th>{t('รับซื้อ (บาท)', 'Buy (THB)')}</th>
                <th>{t('ขายออก (บาท)', 'Sell (THB)')}</th>
                <th>{t('รับซื้อ (บาท)', 'Buy (THB)')}</th>
                <th>{t('ขายออก (บาท)', 'Sell (THB)')}</th>
                <th>{t('ทองโลก', 'Global gold')}</th>
                <th>THB / USD</th>
                <th>{t('ขึ้น / ลง', 'Change')}</th>
              </tr>
            </thead>
            <tbody>
              {intradayRows.length === 0 && (
                <tr className="bg-[#fffcc2]">
                  <td colSpan={9} className="py-4 text-zinc-500">{t('ไม่มีข้อมูลสำหรับวันที่เลือก', 'No data for the selected date')}</td>
                </tr>
              )}
              {intradayRows.map((r, i) => (
                <tr key={r.no} className={i % 2 === 0 ? 'bg-[#fffcc2]' : 'bg-white'}>
                  <td className={`py-1.5 ${r.change > 0 ? 'text-[#1f9a03]' : r.change < 0 ? 'text-[#d60808]' : ''}`}>{r.time}</td>
                  <td>{r.no}</td>
                  <td>{fmt2(r.barBuy)}</td>
                  <td>{fmt2(r.barSell)}</td>
                  <td>{fmt2(r.ornBuy)}</td>
                  <td>{fmt2(r.ornSell)}</td>
                  <td>{fmt2(gold.price)}</td>
                  <td>{thaiGold.usdThb.toFixed(2)}</td>
                  <td className={`pr-3 text-right font-medium ${r.change > 0 ? 'text-[#1f9a03]' : r.change < 0 ? 'text-[#d60808]' : ''}`}>
                    {r.change > 0 ? '+' : ''}{r.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-1 text-right text-[10px] text-[#402c1b]/70">
          {t('ราคาทองคำที่มาอ้างอิงโดย www.goldtraders.or.th', 'Prices referenced from www.goldtraders.or.th')}
        </p>
      </div>

      <div className="relative z-10 mt-4 grid grid-cols-1 gap-4 min-[1440px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-6">
        {/* All gold types */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <p className="text-base font-semibold text-[#402c1b] md:text-lg">
              {t('ราคาทองคำทุกชนิด ตามประกาศสมาคมค้าทองคำ', 'All gold prices from the Gold Traders Association')}
            </p>
            <DateFilter label={t('เช็คราคาทองคำย้อนหลัง', 'Check past prices')} search={t('ค้นหา', 'Search')} value={types} max={latestIso} onApply={setTypesRange} />
          </div>
          <div className={`mt-2 max-h-[24rem] overflow-y-auto ${TABLE_BOX}`}>
            <table className="w-full text-right">
              <thead className={TABLE_HEAD}>
                <tr>
                  <th className="px-3 py-1.5 text-left">{t('ชนิดทอง', 'Type')}</th>
                  <th className="hidden px-2 md:table-cell">{t('ราคารับซื้อ (กรัมละ)', 'Buy (per gram)')}</th>
                  <th className="px-2">{t('ราคารับซื้อ (บาทละ)', 'Buy (per baht)')}</th>
                  <th className="px-3">{t('ราคาขาย (บาทละ)', 'Sell (per baht)')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/5">
                {typeRows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-center text-zinc-500">{t('ไม่มีข้อมูลสำหรับวันที่เลือก', 'No data for the selected date')}</td>
                  </tr>
                )}
                {typeRows.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 1 ? 'bg-[#fffcc2]' : ''}>
                    <td className="px-3 py-1.5 text-left">{r.label}</td>
                    <td className={`hidden px-2 md:table-cell ${r.gram === null ? 'text-zinc-400' : ''}`}>{r.gram === null ? 'n/a' : fmt2(r.gram)}</td>
                    <td className="px-2">{fmt2(r.buy)}</td>
                    <td className="px-3">{fmt2(r.sell)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {marketRows.length > 0 && (
            <div className={`mt-4 flex-1 ${TABLE_FRAME}`}>
              <table className="h-full w-full text-right">
                <thead className={TABLE_HEAD}>
                  <tr>
                    <th className="px-3 py-1.5 text-center">{t('ทองคำ 99.99 และ 99.50%', 'Gold 99.99 and 99.50%')}</th>
                    <th className="px-2">{t('ราคาเปิด', 'Open')}</th>
                    <th className="px-3">{t('ราคาปิด', 'Close')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/5">
                  {marketRows.map((r) => (
                    <tr key={r.label}>
                      <td className="px-3 py-1.5 text-left">{r.label}</td>
                      <td className={`px-2 ${r.open === null ? 'text-zinc-400' : ''}`}>{r.open === null ? 'n/a' : fmt2(r.open)}</td>
                      <td className={`px-3 ${r.close === null ? 'text-zinc-400' : ''}`}>{r.close === null ? 'n/a' : fmt2(r.close)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Fair value */}
        <div className="flex flex-col gap-4">
        <div className="surface p-4 md:p-5">
          <p className="text-sm font-semibold text-navy">Thai Gold Fair Value</p>
          <div className="mt-2 divide-y divide-zinc-900/5 text-xs md:mt-3 md:text-sm">
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-600">{t('ราคาทองโลก (XAUUSD)', 'Global gold price (XAUUSD)')}</span>
              <span className="font-semibold text-navy">${fmt2(gold.price)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-600">{t('ค่าเงินบาท (USDTHB)', 'Baht exchange rate (USDTHB)')}</span>
              <span className="font-semibold text-navy">{thaiGold.usdThb.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-600">{t('ราคาทองแฟร์แวลู', 'Gold fair value')}</span>
              <span className="font-semibold text-navy">{formatThb(thaiGold.fairValue)} {t('บาท', 'THB')}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-600">{t('ราคาทองแท่งขายออก (สมาคมฯ)', 'Gold bar selling price (Association)')}</span>
              <span className="font-semibold text-navy">{formatThb(thaiGold.barSell)} {t('บาท', 'THB')}</span>
            </div>
            <div className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 md:py-3 ${premiumUp ? 'bg-positive/5' : 'bg-negative/5'}`}>
              <span className="font-semibold text-navy">{t('ส่วนต่าง', 'Spread')} ({premiumUp ? 'Premium' : 'Discount'})</span>
              <span className={`font-bold ${premiumUp ? 'text-positive' : 'text-negative'}`}>
                {formatSigned(thaiGold.premium, 0)} {t('บาท', 'THB')} ({formatSigned(thaiGold.premiumPct)}%)
              </span>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            {t(
              'แฟร์แวลู = XAUUSD × USDTHB × (15.244 × 0.965) ÷ 31.1035 — เป็นค่าอ้างอิงเชิงทฤษฎี ราคาจริงของสมาคมฯ มี spread, อุปสงค์-อุปทานในประเทศ และจังหวะค่าเงินร่วมด้วย',
              'Fair value = XAUUSD × USDTHB × (15.244 × 0.965) ÷ 31.1035 — a theoretical reference. The Association’s actual prices also reflect the spread, domestic supply and demand, and currency timing.',
            )}
          </p>
        </div>
        {/* Baht exchange rates */}
        <div className="flex flex-1 flex-col">
          <p className="text-base font-semibold text-[#402c1b] md:text-lg">{t('อัตราแลกเปลี่ยนเงินบาท', 'Baht exchange rates')}</p>
          <div className="mt-2 grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:gap-2">
            {fxRates.map((r) => (
              <div key={r.pair} className="flex flex-col items-center gap-2 rounded-2xl bg-white px-3 py-4 text-center shadow-soft">
                <span className="flex items-center">
                  <Flag code={r.a} className="h-9 w-9" />
                  <Flag code={r.b} className="-ml-3 h-9 w-9 shadow-[0_0_0_2px_#fff]" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wide text-zinc-500">{r.pair}</p>
                  <p className="mt-0.5 text-lg font-bold text-[#d60808]">
                    {r.value}
                    <span className="ml-1 text-xs font-semibold uppercase">{r.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

/** Sample-data helper: a stable price offset per past date (0 for the latest day). */
function dateShift(iso: string, latestIso: string) {
  if (!iso || iso === latestIso) return 0
  let n = 0
  for (const ch of iso) n += ch.charCodeAt(0)
  return ((n % 9) - 4) * 50
}

type DateRange = { from: string; to: string }

const MAX_RANGE_DAYS = 31

const isoToUtc = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

/** Weekdays between two ISO dates (inclusive), newest first, capped at MAX_RANGE_DAYS calendar days. */
function daysIn(from: string, to: string) {
  if (!from || !to) return []
  const out: string[] = []
  const start = Math.max(isoToUtc(from), isoToUtc(to) - (MAX_RANGE_DAYS - 1) * 86_400_000)
  for (let ts = isoToUtc(to); ts >= start; ts -= 86_400_000) {
    const dt = new Date(ts)
    const dow = dt.getUTCDay()
    if (dow !== 0 && dow !== 6) out.push(dt.toISOString().slice(0, 10))
  }
  return out
}

/** "Check past prices" control: from / to date pickers + search button (applies only on click / Enter). */
function DateFilter({ label, search, value, max, onApply }: { label: string; search: string; value: DateRange; max: string; onApply: (range: DateRange) => void }) {
  const t = useT()
  const [from, setFrom] = useState(value.from)
  const [to, setTo] = useState(value.to)
  // Mobile: a single button opens the date panel; from md up the controls are always inline.
  const [open, setOpen] = useState(false)
  const inputCls = 'w-full rounded-lg border border-zinc-400 bg-white/90 px-2 py-1.5 text-xs outline-none focus:border-[#d9b64a] md:w-auto md:py-1 md:text-sm'
  const short = (iso: string) => iso.split('-').reverse().slice(0, 2).join('/')
  return (
    <div className="max-md:w-full">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex w-full items-center justify-between gap-2 rounded-full border border-zinc-400 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-[#402c1b] md:hidden"
      >
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {label}
        </span>
        <span className="text-zinc-500">{short(value.from)}{value.from !== value.to ? ` – ${short(value.to)}` : ''}</span>
      </button>
      <form
        className={`${open ? 'mt-2 grid grid-cols-2 gap-2' : 'hidden'} text-xs text-[#402c1b] md:mt-0 md:flex md:flex-wrap md:items-center md:gap-2 md:text-sm`}
        onSubmit={(e) => {
          e.preventDefault()
          if (!from || !to) return
          // Accept the dates in either order.
          onApply(from <= to ? { from, to } : { from: to, to: from })
          setOpen(false)
        }}
      >
        <span className="hidden font-medium md:inline">{label}</span>
        <label className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1.5">
          {t('ตั้งแต่', 'From')}
          <input type="date" value={from} max={to || max || undefined} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1.5">
          {t('ถึง', 'To')}
          <input type="date" value={to} min={from || undefined} max={max || undefined} onChange={(e) => setTo(e.target.value)} className={inputCls} />
        </label>
        <button type="submit" className="col-span-2 rounded-lg border border-zinc-400 bg-white/90 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[#f2de79] md:col-span-1 md:py-1 md:text-sm">
          {search}
        </button>
      </form>
    </div>
  )
}

type FlagCode = 'TH' | 'US' | 'JP' | 'NZ'

/** Round flag, exported from the Figma design (public/images/flags). */
function Flag({ code, className }: { code: FlagCode; className?: string }) {
  return <img src={`/images/flags/${code.toLowerCase()}.svg`} alt="" aria-hidden="true" className={`aspect-square shrink-0 rounded-full object-cover ${className ?? ''}`} />
}
