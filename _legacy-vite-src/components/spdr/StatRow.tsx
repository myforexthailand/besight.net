import { ArrowUp, Info, TrendingUp } from 'lucide-react'

import { spdrSummary, flowStatus } from '@/data/spdr-gold'

function ChangeBadge({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const positive = value >= 0
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
        positive ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-[#DC2626]/10 text-[#DC2626]'
      }`}
    >
      <ArrowUp className={`h-3 w-3 ${positive ? '' : 'rotate-180'}`} />
      {positive ? '+' : ''}
      {value.toFixed(2)}
      {suffix}
    </span>
  )
}

function StatCard({
  label,
  value,
  subLine,
  change,
  showInfo,
  large,
}: {
  label: string
  value: string
  subLine?: string
  change: number
  showInfo?: boolean
  large?: boolean
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-5 shadow-[2px_4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {showInfo && <Info className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
      </div>
      <p
        className={`mt-2 font-bold tracking-tight text-[#0B1B3B] ${large ? 'text-4xl md:text-5xl' : 'text-2xl'}`}
      >
        {value}
      </p>
      {subLine && <p className="mt-1 text-xs text-muted-foreground">{subLine}</p>}
      <div className="mt-3">
        <ChangeBadge value={change} />
      </div>
    </div>
  )
}

export function StatRow() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-2">
      {/* Tall feature card, left */}
      <div className="lg:row-span-2">
        <StatCard
          label="SPDR Holdings (ล่าสุด)"
          value={`${spdrSummary.holdingsTons.toLocaleString('en-US', { minimumFractionDigits: 2 })} ตัน`}
          subLine={`≈ ${spdrSummary.holdingsOz.toFixed(2)} ล้านออนซ์ | มูลค่า ~${spdrSummary.holdingsValueUsdBn.toFixed(1)} พันล้าน USD`}
          change={spdrSummary.changePct1d}
          showInfo
          large
        />
      </div>

      {/* Highlighted flow status card - wide, top right */}
      <div className="lg:col-span-3">
        <div className="relative h-full overflow-hidden rounded-2xl bg-[#0B1B3B] p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.1)]">
          <img
            src="/images/news/gold-bars-banner.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[url('/images/homepage/widget-card-bg.webp')] bg-cover bg-center opacity-90 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-[#0B1B3B]/20" />
          <div className="relative z-10 flex h-full flex-wrap items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/20 text-[#4ADE80]">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                สถานะ SPDR FLOW
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                {flowStatus.status} &middot; {flowStatus.headline}
              </p>
              <p className="mt-1 text-sm text-white/70">{flowStatus.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Small stat cards, wide bottom right */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-3">
        <StatCard
          label="เปลี่ยนแปลงวันนี้"
          value={`+${spdrSummary.change1d.toFixed(2)} ตัน`}
          change={spdrSummary.changePct1d}
        />
        <StatCard
          label="7 วัน"
          value={`+${spdrSummary.change7d.toFixed(2)} ตัน`}
          change={spdrSummary.change7dPct}
        />
        <StatCard
          label="30 วัน"
          value={`+${spdrSummary.change30d.toFixed(2)} ตัน`}
          change={spdrSummary.change30dPct}
        />
        <StatCard
          label="YTD (ปีนี้)"
          value={`+${spdrSummary.changeYtd.toFixed(2)} ตัน`}
          change={spdrSummary.changeYtdPct}
        />
      </div>
    </div>
  )
}
