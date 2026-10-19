import type { Metadata } from "next";
import { getServerLang } from "@/site/lib/lang-server";
import { Navbar } from "@/site/components/sections/navbar";
import { Hero } from "@/site/components/sections/hero";
import { ProductsGrid } from "@/site/components/sections/products-grid";
import { WeightLoss } from "@/site/components/sections/weight-loss";
import { ProductCarousel } from "@/site/components/sections/product-carousel";
import { ScienceNature } from "@/site/components/sections/science-nature";
import { Faq } from "@/site/components/sections/faq";
import { HealthGuide } from "@/site/components/sections/health-guide";
import { CTA as RivrCTA } from "@/site/components/sections/rivr-defi/CTA";
import { Metrics as RivrMetrics } from "@/site/components/sections/rivr-defi/Metrics";
import { RivrSection } from "@/site/components/sections/rivr-defi/RivrSection";
import { Footer } from "@/site/components/sections/footer";

export async function generateMetadata(): Promise<Metadata> {
  const en = (await getServerLang()) === "en";
  // `absolute` skips the "%s — BeSight" template so the homepage title stays exactly as written.
  return {
    title: { absolute: en ? "BeSight - More Than Just Trading" : "BeSight - ให้คุณได้มากกว่าการเทรด" },
    description: en
      ? "Rebates, trading tools, community and trading knowledge for traders, all in one place."
      : "รวมรีเบต เครื่องมือเทรด คอมมูนิตี้ และความรู้การเทรด สำหรับเทรดเดอร์ไว้ในที่เดียว",
  };
}

/** Public homepage — the first page every visitor sees. */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <div className="bg-[#f0f0f0]">
          <RivrMetrics />
        </div>
        <RivrSection />
        <ProductsGrid />
        {/* Leaderboard hidden for now — on WordPress export, replace with the
            [wpbs_app_leaderboard] shortcode instead of this component. */}
        <WeightLoss />
        <ProductCarousel />
        <ScienceNature />
        <Faq />
        <HealthGuide />
        <RivrCTA />
      </main>
      <Footer />
    </div>
  );
}
