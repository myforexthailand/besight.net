import { Flame } from 'lucide-react'

import { flowStreak } from '@/data/spdr-gold'

export function FlowStreak() {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[2px_4px_20px_rgba(0,0,0,0.06)]">
      <h3 className="text-lg font-semibold text-[#0B1B3B]">SPDR Flow Streak</h3>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F5B700]/15 text-[#F5B700]">
          <Flame className="h-7 w-7" />
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight text-[#0B1B3B]">
            {flowStreak.days} DAYS INFLOW
          </p>
          <p className="text-sm text-muted-foreground">{flowStreak.subtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-zinc-900/[0.03] p-4">
          <p className="text-xs text-muted-foreground">Accumulated Flow</p>
          <p className="mt-1 text-lg font-bold text-[#16A34A]">
            +{flowStreak.accumulatedFlow.toFixed(2)} ตัน
          </p>
        </div>
        <div className="rounded-xl bg-zinc-900/[0.03] p-4">
          <p className="text-xs text-muted-foreground">Gold Performance</p>
          <p className="mt-1 text-lg font-bold text-[#16A34A]">
            +{flowStreak.goldPerformancePct.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          สถิติย้อนหลัง
        </p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Longest Inflow Streak</span>
            <span className="font-semibold text-[#0B1B3B]">
              {flowStreak.longestInflowStreak} วัน
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Longest Outflow Streak</span>
            <span className="font-semibold text-[#0B1B3B]">
              {flowStreak.longestOutflowStreak} วัน
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
