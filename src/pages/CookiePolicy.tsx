import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { SiteLayout } from '@/components/sections/site-layout'

const COOKIE_TYPES = [
  {
    title: 'คุกกี้ที่จำเป็น (Strictly Necessary Cookies)',
    description:
      'คุกกี้เหล่านี้จำเป็นต่อการทำงานของเว็บไซต์ ช่วยให้คุณสามารถเข้าถึงฟังก์ชันที่สำคัญ เช่น การลงชื่อเข้าใช้ และการใช้งานเว็บไซต์ได้อย่างราบรื่น',
  },
  {
    title: 'คุกกี้วิเคราะห์และประสิทธิภาพ (Analytical and Performance Cookies)',
    description:
      'คุกกี้เหล่านี้ช่วยให้เรารวบรวมข้อมูลเกี่ยวกับการใช้งานเว็บไซต์ของคุณ เช่น หน้าที่คุณเยี่ยมชม และการโต้ตอบกับเว็บไซต์ ข้อมูลนี้ช่วยให้เราปรับปรุงประสบการณ์ผู้ใช้และพัฒนาเนื้อหาที่มีประโยชน์',
  },
  {
    title: 'คุกกี้การทำงาน (Functionality Cookies)',
    description:
      'คุกกี้เหล่านี้ช่วยให้เว็บไซต์สามารถจดจำการตั้งค่าและการปรับแต่งของคุณ เช่น ภาษาและภูมิภาค เพื่อให้คุณได้รับประสบการณ์ที่เหมาะสมตามความต้องการของคุณ',
  },
  {
    title: 'คุกกี้โฆษณา (Advertising Cookies)',
    description:
      'คุกกี้เหล่านี้ถูกใช้เพื่อแสดงโฆษณาที่เกี่ยวข้องกับความสนใจของคุณตามพฤติกรรมการท่องเว็บของคุณ เราอาจแบ่งปันข้อมูลนี้กับพันธมิตรที่เกี่ยวข้องเพื่อปรับปรุงการโฆษณาให้ตรงกลุ่มเป้าหมาย',
  },
]

export function CookiePolicy() {
  return (
    <SiteLayout>
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[#0B1B3B]"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับไปหน้าแรก
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[#0B1B3B] md:text-4xl">
            นโยบายคุกกี้
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-700">
            เว็บไซต์ BeSight.net ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานและให้บริการที่ตรงกับความต้องการของผู้ใช้งาน
            โดยนโยบายคุกกี้นี้มีวัตถุประสงค์เพื่ออธิบายถึงวิธีการใช้คุกกี้ ประเภทของคุกกี้ที่เราใช้
            และวิธีการจัดการคุกกี้ของผู้ใช้
          </p>

          <h2 className="mt-10 text-2xl font-semibold tracking-tight text-[#0B1B3B]">
            คุกกี้คืออะไร?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700">
            คุกกี้คือไฟล์ขนาดเล็กที่ถูกเก็บไว้ในอุปกรณ์ของคุณเมื่อคุณเข้าชมเว็บไซต์
            คุกกี้ช่วยให้เว็บไซต์สามารถจดจำข้อมูลเกี่ยวกับการใช้งานของคุณ
            เพื่อให้ประสบการณ์การใช้งานที่สะดวกและปรับแต่งตามความต้องการ
          </p>

          <h2 className="mt-10 text-2xl font-semibold tracking-tight text-[#0B1B3B]">
            ประเภทของคุกกี้ที่เราใช้
          </h2>
          <div className="mt-4 space-y-6">
            {COOKIE_TYPES.map((cookie) => (
              <div key={cookie.title}>
                <h3 className="text-lg font-semibold text-[#0B1B3B]">{cookie.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-700">
                  {cookie.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold tracking-tight text-[#0B1B3B]">
            การจัดการคุกกี้
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700">
            คุณสามารถเลือกเปิดหรือปิดการใช้งานคุกกี้ได้ผ่านการตั้งค่าบราวเซอร์ของคุณ อย่างไรก็ตาม
            การปิดการใช้งานคุกกี้บางประเภทอาจทำให้ประสบการณ์การใช้งานเว็บไซต์ของคุณไม่สมบูรณ์
          </p>

          <h2 className="mt-10 text-2xl font-semibold tracking-tight text-[#0B1B3B]">
            การเปลี่ยนแปลงนโยบายคุกกี้
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700">
            เราขอสงวนสิทธิ์ในการปรับปรุงนโยบายคุกกี้ตามความเหมาะสม
            โดยจะประกาศการเปลี่ยนแปลงบนเว็บไซต์ของเราอย่างชัดเจน
            หากคุณมีคำถามเกี่ยวกับนโยบายคุกกี้หรือต้องการข้อมูลเพิ่มเติม โปรดติดต่อเราที่อีเมล{' '}
            <a
              href="mailto:besight.th@gmail.com"
              className="font-medium text-[#0B1B3B] underline"
            >
              besight.th@gmail.com
            </a>{' '}
            เพื่อรับคำแนะนำเพิ่มเติม
          </p>
        </div>
      </div>
    </SiteLayout>
  )
}
