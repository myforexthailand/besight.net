'use client'

import { useMemo, useState } from 'react'
import { useSiteData } from '@/site/lib/site-data'
import { useT } from '@/site/lib/lang'
import { Minus, Plus } from 'lucide-react'

import { CodeBadge } from '@/site/components/ui/code-badge'
import {
  ACCOUNT_TYPES,
  rateSymbol,
  type AccountType,
} from '@/site/data/rebateRates'

export function RebateCalculator() {
  const t = useT()
  const REBATE_RATES = useSiteData().content.rebateRates
  const [accountType, setAccountType] = useState<AccountType>('standard')
  const [selected, setSelected] = useState(REBATE_RATES[0]?.currency ?? '')
  // Text state so partial decimals ("0.", "0.0") survive typing; `volume` is the parsed number.
  const [volumeText, setVolumeText] = useState('1')
  const volume = Number.isFinite(Number(volumeText)) ? Number(volumeText) : 0
  const setVolume = (next: number) => setVolumeText(String(+next.toFixed(2)))

  // Each account type lists its own symbols (GOLD on Standard, GOLD# on Ultra Low…).
  const pairs = useMemo(() => REBATE_RATES.filter((r) => r[accountType] > 0), [REBATE_RATES, accountType])
  const current = pairs.find((r) => r.currency === selected) ?? pairs[0]
  const currency = current ? rateSymbol(current, accountType) : ''
  const rate = current?.[accountType] ?? 0

  const total = rate * volume

  return (
    <section
      id="rebate-calculator"
      className="mx-auto w-full max-w-[1536px] scroll-mt-24 px-3 py-6 md:px-5 md:py-12"
    >
      <div className="mb-5 max-w-2xl px-4 md:mb-10">
        <p className="eyebrow-sm">
          Rebate Calculator
        </p>
        <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-navy md:mt-2 md:text-4xl">
          {t('คำนวณรีเบตจากการเทรดของคุณ', 'Calculate your trading rebate')}
        </h2>
        <p className="mt-2 text-sm leading-snug text-steel md:mt-3 md:text-base md:leading-normal">
          {t(
            'เลือกประเภทบัญชี คู่เทรด และปริมาณการเทรด (Volume) เพื่อดูรีเบตที่คุณจะได้รับ',
            'Select your account type, trading pair and trading volume to see the rebate you will earn',
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-[1.5rem] bg-white p-6 md:grid-cols-2 md:gap-8 md:rounded-[2rem] md:p-10">
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-3 eyebrow-sm">
              {t('ประเภทบัญชี', 'Account Type')}
            </p>
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
              {ACCOUNT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAccountType(type.value)}
                  className={`whitespace-nowrap rounded-full border px-2 py-2.5 text-[13px] font-medium transition-colors md:px-4 md:py-2 md:text-sm ${
                    accountType === type.value
                      ? 'border-navy bg-navy text-white'
                      : 'border-navy/15 text-navy hover:bg-navy/5'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 eyebrow-sm">
              {t('คู่เทรด', 'Trading Pair')}
            </p>
            <select
              value={current?.currency ?? ''}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm font-medium text-navy outline-none transition-colors focus:border-navy/40"
            >
              {pairs.map((r) => (
                <option key={r.currency} value={r.currency}>
                  {rateSymbol(r, accountType)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-3 eyebrow-sm">
              Volume (Lot)
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setVolume(Math.max(0.01, volume - 1))}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy/5"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="text"
                inputMode="decimal"
                aria-label="Volume (Lot)"
                value={volumeText}
                onChange={(e) => {
                  const v = e.target.value.replace(',', '.')
                  if (/^\d{0,6}(\.\d{0,2})?$/.test(v)) setVolumeText(v)
                }}
                onBlur={() => setVolumeText(volume > 0 ? String(volume) : '0.01')}
                className="w-full rounded-xl border border-navy/15 px-4 py-3 text-center text-sm font-semibold text-navy outline-none transition-colors focus:border-navy/40"
              />
              <button
                type="button"
                onClick={() => setVolume(volume + 1)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy/5"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative order-first flex flex-col justify-between rounded-[1.25rem] md:order-none bg-[rgba(30,50,90,0.03)] p-6 md:rounded-[1.5rem] md:p-8">
          <img
            src="/images/XM-Logo-Black-RGB.png"
            alt="XM"
            className="absolute right-6 top-6 h-8 w-auto md:right-8 md:top-8 md:h-9"
          />
          <div>
            <p className="eyebrow-sm">
              {t('รีเบตต่อ Lot', 'Rebate per Lot')}
            </p>
            <p className="mt-2 text-2xl font-semibold text-navy">
              ${rate.toFixed(3)}
            </p>
          </div>

          <div className="mt-8">
            <p className="eyebrow-sm">
              {t('รีเบตรวมโดยประมาณ', 'Estimated Total Rebate')}
            </p>
            <p className="mt-2 text-4xl font-bold text-navy md:text-5xl">
              ${total.toFixed(total > 0 && total < 1 ? 3 : 2)}
            </p>
            <p className="mt-1 text-sm text-steel">
              {currency} · {volume} Lot · {ACCOUNT_TYPES.find((t) => t.value === accountType)?.label}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://affs.click/CHg1N"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit rounded-full bg-positive px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#15803D]"
            >
              {t('เปิดบัญชีรับรีเบต', 'Open an Account for Rebates')}
            </a>
            <CodeBadge />
          </div>
        </div>
      </div>
    </section>
  )
}
