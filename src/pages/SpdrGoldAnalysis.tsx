import { SiteLayout } from '@/components/sections/site-layout'
import { SpdrHeader } from '@/components/spdr/SpdrHeader'
import { StatRow } from '@/components/spdr/StatRow'
import { HoldingsChart } from '@/components/spdr/HoldingsChart'
import { FlowGauge } from '@/components/spdr/FlowGauge'
import { FlowHeatmap } from '@/components/spdr/FlowHeatmap'
import { FlowStreak } from '@/components/spdr/FlowStreak'
import { DivergenceAlert } from '@/components/spdr/DivergenceAlert'
import { FlowScatter } from '@/components/spdr/FlowScatter'
import { FlowHistogram } from '@/components/spdr/FlowHistogram'
import { ActivityTable } from '@/components/spdr/ActivityTable'
import { ThaiGoldMarket } from '@/components/spdr/ThaiGoldMarket'
import { HealthGuide } from '@/components/sections/health-guide'

export function SpdrGoldAnalysis() {
  return (
    <SiteLayout>
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container !max-w-[1600px]">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Analysis
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1B3B] md:text-4xl">
              วิเคราะห์ SPDR Gold Shares
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              ติดตามการถือครองทองคำของกองทุน SPDR พร้อมเครื่องมือวิเคราะห์เชิงลึก
              เพื่อประกอบการตัดสินใจเทรดทองคำของคุณ
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <SpdrHeader />

            <StatRow />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <HoldingsChart />
              </div>
              <div>
                <FlowGauge />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
              <div className="lg:row-span-2">
                <FlowHeatmap />
              </div>
              <div className="lg:col-span-2">
                <FlowStreak />
              </div>
              <div className="lg:col-span-2">
                <DivergenceAlert />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
              <div className="lg:row-span-2">
                <ActivityTable />
              </div>
              <div className="lg:col-span-2">
                <FlowScatter />
              </div>
              <div className="lg:col-span-2">
                <FlowHistogram />
              </div>
            </div>

            <ThaiGoldMarket />
          </div>
        </div>
      </div>

      <HealthGuide />
    </SiteLayout>
  )
}
