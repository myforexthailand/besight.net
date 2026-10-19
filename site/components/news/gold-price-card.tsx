'use client'

import type { SpdrSnapshot } from '@/site/data/spdr'
import { formatSigned } from '@/site/data/spdr'
import { useT } from '@/site/lib/lang'

type ThaiGold = NonNullable<SpdrSnapshot['thaiGold']>

const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// Shades taken from the Figma design.
const RED = 'text-[#d60808]'
const GREEN = 'text-[#1f9a03]'
const INK = 'text-[#402c1b]'
const COLUMN = 'bg-[#fffcc2]'

/** "Gold price today" card — Gold Traders Association bar / ornament prices (96.5%). */
export function GoldPriceCard({ thaiGold }: { thaiGold: ThaiGold }) {
  const t = useT()
  const rows = [
    { label: t('ทองคำแท่ง', 'Gold bar'), buy: thaiGold.barBuy, sell: thaiGold.barSell, buyTone: RED, sellTone: GREEN },
    { label: t('ทองรูปพรรณ', 'Ornament gold'), buy: thaiGold.ornamentBuy, sell: thaiGold.ornamentSell, buyTone: GREEN, sellTone: RED },
  ]
  const up = thaiGold.change >= 0

  return (
    <div className={`relative h-full overflow-hidden [container-type:inline-size] rounded-3xl bg-[linear-gradient(100deg,#f2d57e_0%,#f2edd5_60%,#f2de79_100%)] p-4 shadow-soft md:p-6 ${INK}`}>
      {/* Gold Traders Association seal, flush in the top-right corner */}
      <div className="absolute right-0 top-0 flex h-20 w-[4.5rem] items-center justify-center rounded-bl-2xl bg-white md:h-24 md:w-20">
        <img src="/images/news/gta-logo.png" alt="Gold Traders Association" className="h-14 w-14 object-contain md:h-[4.2rem] md:w-[4.2rem]" />
      </div>
      <div className="min-h-[3.75rem] px-1 pr-16 md:min-h-[4.5rem] md:pr-20">
        {/* Thai title stays on one line from md up: the font scales with the card width. */}
        <p className={`text-[15px] font-semibold md:text-[length:clamp(0.9rem,calc((100cqw_-_8rem)/12.7),1.65rem)] ${t('md:whitespace-nowrap', '')}`}>
          {t('ราคาทองวันนี้จากสมาคมค้าทองคำ', "Today's gold price from the Gold Traders Association")}
        </p>
        <p className="mt-1 text-[11px] md:text-xs">
          {t('ราคาทองคำที่มาอ้างอิงโดย www.goldtraders.or.th', 'Prices referenced from www.goldtraders.or.th')}
        </p>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl bg-white">
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] bg-white text-center text-[11px] font-medium sm:text-sm md:text-[length:clamp(0.8rem,2.2cqw,1.125rem)]">
          <p className="px-3 py-3 text-left md:px-4">{t('บริสุทธิ์ 96.5%', '96.5% purity')}</p>
          <p className={`${COLUMN} px-2 py-3`}>{t('รับซื้อ', 'Buy')}</p>
          <p className={`${COLUMN} px-2 py-3`}>{t('ขายออก', 'Sell')}</p>
        </div>
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] border-t border-zinc-900/10 text-center">
            <p className="flex items-center px-3 py-3 text-left text-[11px] font-medium sm:text-sm md:px-4 md:py-4 md:text-[length:clamp(0.85rem,2.4cqw,1.25rem)]">{row.label}</p>
            <p className={`flex items-center justify-center ${COLUMN} px-2 py-3 text-[15px] font-bold sm:text-lg md:py-4 md:text-[length:clamp(1.1rem,4.4cqw,1.875rem)] ${row.buyTone}`}>{fmt(row.buy)}</p>
            <p className={`flex items-center justify-center ${COLUMN} px-2 py-3 text-[15px] font-bold sm:text-lg md:py-4 md:text-[length:clamp(1.1rem,4.4cqw,1.875rem)] ${row.sellTone}`}>{fmt(row.sell)}</p>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-zinc-900/10 px-3 py-3 md:px-5">
          <p className="text-[10px] sm:text-[11px] md:text-sm">
            {thaiGold.updatedAt ?? ''}
          </p>
          <p className={`text-base font-bold sm:text-lg md:text-[length:clamp(1.1rem,4.4cqw,1.875rem)] ${up ? GREEN : RED}`}>
            <span className="mr-1 inline-block align-middle text-[0.6em]">{up ? '▲' : '▼'}</span>
            {formatSigned(Math.abs(thaiGold.change), 0).replace(/^[+−]/, '')}
          </p>
        </div>
      </div>
    </div>
  )
}
