'use client'

import { SiteLayout } from '@/site/components/sections/site-layout'
import { StatCards } from '@/site/components/spdr/StatRow'
import { HoldingsChart } from '@/site/components/spdr/HoldingsChart'
import { FlowGauge } from '@/site/components/spdr/FlowGauge'
import { FlowHeatmap } from '@/site/components/spdr/FlowHeatmap'
import { FlowStreak } from '@/site/components/spdr/FlowStreak'
import { DivergenceAlert } from '@/site/components/spdr/DivergenceAlert'
import { FlowScatter } from '@/site/components/spdr/FlowScatter'
import { FlowHistogram } from '@/site/components/spdr/FlowHistogram'
import { ActivityTable } from '@/site/components/spdr/ActivityTable'
import { ThaiGoldMarket } from '@/site/components/spdr/ThaiGoldMarket'
import { SpdrHoldingsCard } from '@/site/components/news/spdr-holdings-card'
import { HealthGuide } from '@/site/components/sections/health-guide'
import type { SpdrSnapshot } from '@/site/data/spdr'
import { LatestItem } from '@/site/pages/NewsList'
import { useSiteData } from '@/site/lib/site-data'
import { useT } from '@/site/lib/lang'
import { useMemo } from 'react'
import { SpdrProvider } from '@/site/lib/spdr-context'

export function SpdrGoldAnalysis({ snapshot }: { snapshot: SpdrSnapshot | null }) {
  const t = useT()
  const { articles } = useSiteData()
  const latest = useMemo(() => [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4), [articles])
  return (
    <SiteLayout>
      <div className="bg-gray-50 py-8 md:py-16">
        <div className="container !max-w-[1600px]">
          <div className="mb-5 md:mb-8">
            <p className="eyebrow text-xs">
              Gold Analysis
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-navy sm:text-3xl md:mt-2 md:text-4xl">
              {t('วิเคราะห์ SPDR Gold Shares', 'SPDR Gold Shares Analysis')}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:mt-3 md:text-base">
              {t(
                'ติดตามการถือครองทองคำของกองทุน SPDR พร้อมเครื่องมือวิเคราะห์เชิงลึก เพื่อประกอบการตัดสินใจเทรดทองคำของคุณ',
                'Track the gold holdings of the SPDR fund with in-depth analysis tools to support your gold trading decisions.',
              )}
            </p>
          </div>

          {!snapshot ? (
            <div className="rounded-3xl bg-white p-10 text-center text-sm text-muted-foreground shadow-soft-lg">
              {t(
                'กำลังเตรียมข้อมูล SPDR จากแหล่งข้อมูลทางการ — กรุณากลับมาใหม่อีกครั้งในไม่กี่นาที',
                'SPDR data from the official source is being prepared — please check back in a few minutes.',
              )}
            </div>
          ) : (
          <SpdrProvider value={snapshot}>
          <div className="flex flex-col gap-4 xl:gap-6">
            {/* Row 1: holdings chart · SPDR card · latest news */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.9fr)_minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-6">
              <HoldingsChart />
              <SpdrHoldingsCard summary={snapshot.summary} wide />
              <div className="lg:col-span-2 xl:col-span-1">
                <p className="text-base text-muted-foreground xl:text-lg">{t('ข่าวสารล่าสุด', 'Latest news')}</p>
                <div className="mt-3 flex flex-col divide-y divide-zinc-900/10 md:grid md:grid-cols-2 md:gap-x-8 md:divide-y-0 xl:mt-4 xl:flex xl:divide-y">
                  {latest.map((article) => (
                    <LatestItem key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: momentum gauge · heatmap · period stats + streak */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 min-[1440px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)_minmax(0,1.4fr)] xl:gap-6">
              <FlowGauge />
              <FlowHeatmap />
              <div className="flex flex-col gap-4 md:col-span-2 min-[1440px]:col-span-1 xl:gap-6">
                <StatCards />
                <FlowStreak />
              </div>
            </div>

            {/* Row 3: divergence / scatter / histogram stack · activity table */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 xl:gap-6">
              <div className="flex flex-col gap-4 xl:col-span-2 xl:gap-6">
                <DivergenceAlert />
                <FlowScatter />
                <FlowHistogram />
              </div>
              <ActivityTable />
            </div>

            <ThaiGoldMarket />

            <p className="text-xs text-muted-foreground">
              {t(
                'แหล่งข้อมูล: SPDR Gold Trust historical archive (spdrgoldshares.com) อัปเดตอัตโนมัติทุกวัน · ราคาทองและทองไทยแบบเรียลไทม์ · ตัวชี้วัด Momentum / Regime เป็นการวิเคราะห์ของ BeSight ไม่ใช่ข้อมูลจาก SPDR · ไม่ใช่คำแนะนำการลงทุน',
                'Source: SPDR Gold Trust historical archive (spdrgoldshares.com), updated automatically every day · Gold and Thai gold prices are real-time · Momentum / Regime indicators are BeSight analysis, not SPDR data · Not investment advice.',
              )}
            </p>
          </div>
          </SpdrProvider>
          )}
        </div>
      </div>

      <HealthGuide />
    </SiteLayout>
  )
}
