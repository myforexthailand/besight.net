import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react'

import { last } from '@/data/spdr-gold'

const rows = [...last(20)].reverse()
const maxAbsFlow = Math.max(...rows.map((r) => Math.abs(r.dailyFlow)), 1)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

export function ActivityTable() {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#0B1B3B]">SPDR Activity (ล่าสุด)</h3>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B1B3B] transition-colors hover:text-[#0B1B3B]/70"
        >
          ดูทั้งหมด
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="pb-2 font-medium">วันที่</th>
              <th className="pb-2 font-medium">การเปลี่ยนแปลง</th>
              <th className="pb-2 font-medium">Holdings (ตัน)</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const positive = row.dailyFlow >= 0
              const barWidth = (Math.abs(row.dailyFlow) / maxAbsFlow) * 100
              return (
                <tr key={row.date} className="border-t border-zinc-900/5">
                  <td className="py-2.5 text-xs text-zinc-600">{formatDate(row.date)}</td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${
                        positive ? 'text-[#16A34A]' : 'text-[#DC2626]'
                      }`}
                    >
                      {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                      {positive ? '+' : ''}
                      {row.dailyFlow.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-2.5 text-xs font-medium text-[#0B1B3B]">
                    {row.spdrHoldings.toFixed(2)}
                  </td>
                  <td className="w-24 py-2.5">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-900/[0.06]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: positive ? '#16A34A' : '#DC2626',
                        }}
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
  )
}
