import { useMemo, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

import { CodeBadge } from '@/components/ui/code-badge'
import {
  ACCOUNT_TYPES,
  REBATE_RATES,
  type AccountType,
} from '@/data/rebateRates'

export function RebateCalculator() {
  const [accountType, setAccountType] = useState<AccountType>('standard')
  const [currency, setCurrency] = useState(REBATE_RATES[0].currency)
  const [volume, setVolume] = useState(1)

  const rate = useMemo(
    () => REBATE_RATES.find((r) => r.currency === currency)?.[accountType] ?? 0,
    [currency, accountType],
  )

  const total = rate * volume

  return (
    <section
      id="rebate-calculator"
      className="mx-auto w-full max-w-[1536px] scroll-mt-24 px-3 py-6 md:px-5 md:py-12"
    >
      <div className="mb-10 max-w-2xl px-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
          Rebate Calculator
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1B3B] md:text-4xl">
          คำนวณรีเบตจากการเทรดของคุณ
        </h2>
        <p className="mt-3 text-base text-[#5E6470]">
          เลือกประเภทบัญชี คู่เทรด และปริมาณการเทรด (Volume) เพื่อดูรีเบตที่คุณจะได้รับ
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-[1.5rem] bg-white p-6 md:grid-cols-2 md:gap-8 md:rounded-[2rem] md:p-10">
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
              ประเภทบัญชี
            </p>
            <div className="flex flex-wrap gap-2">
              {ACCOUNT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAccountType(type.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    accountType === type.value
                      ? 'border-[#0B1B3B] bg-[#0B1B3B] text-white'
                      : 'border-[#0B1B3B]/15 text-[#0B1B3B] hover:bg-[#0B1B3B]/5'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
              คู่เทรด
            </p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-xl border border-[#0B1B3B]/15 bg-white px-4 py-3 text-sm font-medium text-[#0B1B3B] outline-none transition-colors focus:border-[#0B1B3B]/40"
            >
              {REBATE_RATES.map((r) => (
                <option key={r.currency} value={r.currency}>
                  {r.currency}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
              Volume (Lot)
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setVolume((v) => Math.max(0.01, +(v - 1).toFixed(2)))}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0B1B3B]/15 text-[#0B1B3B] transition-colors hover:bg-[#0B1B3B]/5"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-[#0B1B3B]/15 px-4 py-3 text-center text-sm font-semibold text-[#0B1B3B] outline-none transition-colors focus:border-[#0B1B3B]/40"
              />
              <button
                type="button"
                onClick={() => setVolume((v) => +(v + 1).toFixed(2))}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0B1B3B]/15 text-[#0B1B3B] transition-colors hover:bg-[#0B1B3B]/5"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[1.25rem] bg-[rgba(30,50,90,0.03)] p-6 md:rounded-[1.5rem] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
              รีเบตต่อ Lot
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#0B1B3B]">
              ${rate.toFixed(3)}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
              รีเบตรวมโดยประมาณ
            </p>
            <p className="mt-2 text-4xl font-bold text-[#0B1B3B] md:text-5xl">
              ${total.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-[#5E6470]">
              {currency} · {volume} Lot · {ACCOUNT_TYPES.find((t) => t.value === accountType)?.label}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://affs.click/CHg1N"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit rounded-full bg-[#16A34A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#15803D]"
            >
              เปิดบัญชีรับรีเบต
            </a>
            <CodeBadge />
          </div>
        </div>
      </div>
    </section>
  )
}
