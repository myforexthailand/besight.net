'use client'

import type { SpdrSnapshot } from '@/site/data/spdr'
import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'

export type SpdrSummary = Pick<
  SpdrSnapshot['summary'],
  'holdingsTons' | 'holdingsOunces' | 'navUsd' | 'change1d' | 'changePct1d' | 'change7d' | 'change7dPct'
>

const tonnes = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function Row({ label, value, tone, pct, unit, note, wide }: { label: string; value: string; tone?: string; pct?: string; unit: string; note?: string; wide?: boolean }) {
  return (
    <div className={`flex flex-1 items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 ${wide ? 'md:max-lg:flex-col md:max-lg:items-start md:max-lg:justify-center' : ''}`}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#402c1b] md:text-base">{label}</p>
        {note && <p className="mt-0.5 text-[9px] leading-tight text-zinc-500">{note}</p>}
      </div>
      <div className={`shrink-0 text-right ${wide ? 'md:max-lg:text-left' : ''}`}>
        <p className={`text-2xl font-bold leading-none md:text-3xl ${tone ?? 'text-[#402c1b]'}`}>{value}</p>
        <p className="mt-1 text-[9px] text-zinc-500">
          {unit}
          {pct && <span className={`ml-1 rounded-full px-1.5 py-0.5 ${tone === 'text-[#d60808]' ? 'bg-red-50' : 'bg-green-50'} ${tone}`}>{pct}</span>}
        </p>
      </div>
    </div>
  )
}

/** SPDR Gold Shares (GLD) holdings snapshot: latest holdings, today's change, 7 trading days. */
/** `wide`: on small tablets (768–1023px) the card spans the row, so the three figures sit side by side. */
export function SpdrHoldingsCard({ summary, wide = false }: { summary: SpdrSummary; wide?: boolean }) {
  const t = useT()
  // Shades taken from the Figma design.
  const toneOf = (n: number) => (n >= 0 ? 'text-[#1f9a03]' : 'text-[#d60808]')
  const ounces = `${(summary.holdingsOunces / 1_000_000).toFixed(2)} ${t('ล้านออนซ์', 'M oz')}`
  const nav = summary.navUsd === null ? '' : ` | ${t('มูลค่า', 'Value')} ~ ${(summary.navUsd / 1_000_000_000).toFixed(1)} ${t('พันล้าน USD', 'bn USD')}`

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-zinc-950 p-4 text-white shadow-soft md:p-5">
      <img src="/images/news/gold-bars-banner.jpg" alt="" aria-hidden className="cover-fill" />
      <div className="pointer-events-none absolute inset-0 bg-black/80" />

      <div className="relative flex items-start justify-between gap-3 pr-20">
        <div className="pt-6">
          <p className="text-xs text-white/80">{t('ถือครองกองทุนทองคำ', 'Gold fund holdings')}</p>
          <p className="mt-1 text-xl font-semibold leading-tight">SPDR Gold Shares</p>
        </div>
      </div>
      {/* GLD tab hanging from the top edge */}
      <div className="absolute right-3 top-0 w-16 bg-[#f6e046] pt-5 md:w-[4.2rem]">
        <img src="/images/news/gld-logo.png" alt="SPDR Gold Shares (GLD)" className="block w-full" />
      </div>

      <div className={`relative mt-4 flex flex-1 flex-col gap-3 ${wide ? 'md:max-lg:flex-row' : ''}`}>
        <Row
          label={t('ถือครองล่าสุด', 'Latest holdings')}
          value={tonnes(summary.holdingsTons)}
          tone="text-[#1f9a03]"
          note={`${ounces}${nav}`}
          unit={t('หน่วย = ตัน', 'unit = tonnes')}
          wide={wide}
        />
        <Row
          label={t('เปลี่ยนแปลงวันนี้', 'Change today')}
          value={formatSigned(summary.change1d)}
          tone={toneOf(summary.change1d)}
          pct={`${formatSigned(summary.changePct1d)}%`}
          unit={t('หน่วย = ตัน', 'unit = tonnes')}
          wide={wide}
        />
        <Row
          label={t('7 วันทำการ', '7 trading days')}
          value={formatSigned(summary.change7d)}
          tone={toneOf(summary.change7d)}
          pct={`${formatSigned(summary.change7dPct)}%`}
          unit={t('หน่วย = ตัน', 'unit = tonnes')}
          wide={wide}
        />
      </div>

      <p className="relative mt-3 text-[9px] text-white/60">
        {t('ข้อมูลจาก SPDR Gold Trust (spdrgoldshares.com)', 'Data from SPDR Gold Trust (spdrgoldshares.com)')}
      </p>
    </div>
  )
}
