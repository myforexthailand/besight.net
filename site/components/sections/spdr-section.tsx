'use client'

import { ArrowRight } from 'lucide-react'

import { Link } from '@/site/lib/router'
import { GradientButton } from '@/site/components/ui/gradient-button'
import { FlowGauge } from '@/site/components/spdr/FlowGauge'
import { HoldingsChart } from '@/site/components/spdr/HoldingsChart'
import { SpdrHeader } from '@/site/components/spdr/SpdrHeader'
import { StatRow } from '@/site/components/spdr/StatRow'
import type { SpdrSnapshot } from '@/site/data/spdr'
import { SpdrProvider } from '@/site/lib/spdr-context'
import { useT } from '@/site/lib/lang'

/** Homepage "SPDR Gold Shares" block — the headline cards of
 *  /spdr-gold-analysis, fed from the imported SPDR archive. Renders nothing
 *  until the first import has run. */
export function SpdrSection({ snapshot }: { snapshot: SpdrSnapshot | null }) {
  const t = useT()
  if (!snapshot) return null
  return (
    <section id="spdr" className="scroll-mt-24 bg-gray-50 py-20 md:py-28">
      <div className="container">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 eyebrow">
              Gold Analysis
            </p>
            <h2 className="section-title">{t('วิเคราะห์ SPDR Gold Shares', 'SPDR Gold Shares Analysis')}</h2>
            <p className="mt-4 text-base text-muted-foreground">
              {t(
                'ติดตามการถือครองทองคำของกองทุน SPDR อัปเดตอัตโนมัติจากข้อมูลทางการทุกวัน พร้อมตัวชี้วัดแรงไหลเข้า-ออก เพื่อประกอบการตัดสินใจเทรดทองคำ',
                "Track the SPDR fund's gold holdings, updated automatically from official data every day, with fund-flow indicators to support your gold trading decisions.",
              )}
            </p>
          </div>
          <GradientButton asChild className="w-fit shrink-0">
            <Link to="/spdr-gold-analysis">
              {t('ดูการวิเคราะห์ฉบับเต็ม', 'View full analysis')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </GradientButton>
        </div>

        <SpdrProvider value={snapshot}>
          <div className="flex flex-col gap-6">
            <SpdrHeader />
            <StatRow />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="min-w-0 lg:col-span-2">
                <HoldingsChart />
              </div>
              <div className="min-w-0">
                <FlowGauge />
              </div>
            </div>
          </div>
        </SpdrProvider>

        <p className="mt-6 text-xs text-muted-foreground">
          {t(
            'แหล่งข้อมูล: SPDR Gold Trust (spdrgoldshares.com) และราคาทองแบบเรียลไทม์ · ข้อมูลเพื่อประกอบการตัดสินใจ ไม่ใช่คำแนะนำการลงทุน',
            'Source: SPDR Gold Trust (spdrgoldshares.com) and real-time gold prices · For decision support only, not investment advice',
          )}
        </p>
      </div>
    </section>
  )
}
