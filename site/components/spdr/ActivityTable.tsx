'use client'

import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'
import { formatTradeDate, useSpdr, useSpdrLocale } from '@/site/lib/spdr-context'

export function ActivityTable() {
  const t = useT()
  const locale = useSpdrLocale()
  const { history } = useSpdr()
  // 60 trading days, scrolling inside the card so it always fills the height of its grid row.
  const rows = [...history.slice(-60)].reverse()
  // Bars scale to the largest move of the last 30 days, not all time (spec §14).
  const scale = Math.max(...history.slice(-30).map((r) => Math.abs(r.dailyFlow)), 0.01)

  return (
    <div className="flex h-full flex-col surface-lg p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-navy">{t('SPDR Activity (ล่าสุด)', 'SPDR Activity (Latest)')}</h3>
        <span className="text-xs font-medium text-muted-foreground">{t('60 วันทำการล่าสุด', 'Last 60 trading days')}</span>
      </div>

      <div className="relative mt-3 min-h-[24rem] flex-1 md:mt-4 md:min-h-[28rem]">
        <div className="absolute inset-0 overflow-y-auto pr-1">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="sticky top-0 bg-white pb-2 font-medium">{t('วันที่', 'Date')}</th>
              <th className="sticky top-0 bg-white pb-2 font-medium">{t('การเปลี่ยนแปลง', 'Change')}</th>
              <th className="sticky top-0 bg-white pb-2 font-medium">{t('Holdings (ตัน)', 'Holdings (tonnes)')}</th>
              <th className="sticky top-0 bg-white pb-2 font-medium"><span className="sr-only">{t('ขนาด', 'Size')}</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const flat = Math.abs(row.dailyFlow) < 0.01
              const positive = row.dailyFlow > 0
              const color = flat ? '#a1a1aa' : positive ? '#16A34A' : '#DC2626'
              return (
                <tr key={row.date} className="border-t border-zinc-900/5">
                  <td className="whitespace-nowrap py-2 text-xs text-zinc-600 md:py-2.5">{formatTradeDate(row.date, undefined, locale)}</td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color }}>
                      {flat ? <Minus className="h-3 w-3" /> : positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {formatSigned(row.dailyFlow)}
                    </span>
                  </td>
                  <td className="py-2.5 text-xs font-medium text-navy">{row.spdrHoldings.toFixed(2)}</td>
                  <td className="w-14 py-2 md:w-24 md:py-2.5">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-900/[0.06]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.min(100, (Math.abs(row.dailyFlow) / scale) * 100)}%`, backgroundColor: color }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
