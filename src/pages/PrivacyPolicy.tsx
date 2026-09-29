import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { SiteLayout } from '@/components/sections/site-layout'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-[#0B1B3B]">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-700">{children}</div>
    </section>
  )
}

export function PrivacyPolicy() {
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
            นโยบายการคุ้มครองข้อมูลส่วนบุคคล
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-700">
            เว็บไซต์ BeSight.net ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้
            และเรามุ่งมั่นที่จะปกป้องข้อมูลส่วนบุคคลของคุณอย่างดีที่สุด
            นโยบายนี้อธิบายถึงวิธีการเก็บรวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคล
            รวมถึงการนำข้อมูลมาใช้เพื่อวัตถุประสงค์ทางการตลาดอย่างเหมาะสม
          </p>

          <Section title="การเก็บข้อมูลส่วนบุคคล">
            <p>
              เมื่อคุณเยี่ยมชมและใช้งานเว็บไซต์ Besight.net
              เราอาจเก็บข้อมูลบางประเภทจากคุณเพื่อปรับปรุงการให้บริการ ข้อมูลที่เราเก็บอาจรวมถึง:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>ข้อมูลการติดต่อ เช่น ชื่อ อีเมล เบอร์โทรศัพท์</li>
              <li>ข้อมูลการใช้งานเว็บไซต์ เช่น ประวัติการเข้าชม การคลิก และการโต้ตอบกับเนื้อหาของเรา</li>
              <li>ข้อมูลทางเทคนิค เช่น IP address ประเภทของอุปกรณ์ และประเภทของเบราว์เซอร์ที่คุณใช้</li>
            </ul>
          </Section>

          <Section title="วัตถุประสงค์ในการใช้ข้อมูล">
            <p>
              ข้อมูลส่วนบุคคลของคุณจะถูกใช้เพื่อวัตถุประสงค์ที่ชัดเจนและมีความเหมาะสม ซึ่งรวมถึง:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>การปรับปรุงบริการและประสบการณ์การใช้งานเว็บไซต์ของคุณ</li>
              <li>การติดต่อกลับเพื่อตอบคำถามหรือให้บริการตามคำขอ</li>
              <li>
                การส่งข้อมูลทางการตลาด ข่าวสาร หรือโปรโมชั่นที่เกี่ยวข้องกับการเงิน
                การวิเคราะห์ตลาด และผลิตภัณฑ์ที่เรานำเสนอ
              </li>
              <li>การวิเคราะห์ข้อมูลเชิงสถิติเพื่อปรับปรุงเนื้อหาและบริการของเราให้สอดคล้องกับความสนใจของคุณ</li>
            </ul>
          </Section>

          <Section title="การเข้าถึงข้อมูลเพื่อทำการตลาด">
            <p>
              BeSight.net อาจใช้ข้อมูลของคุณเพื่อวัตถุประสงค์ทางการตลาด
              โดยที่คุณสามารถเลือกที่จะอนุญาตหรือไม่อนุญาตให้เราส่งข้อมูลเหล่านี้ได้
              ข้อมูลการตลาดอาจรวมถึง:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>การส่งจดหมายข่าว ข้อมูลโปรโมชัน และข้อเสนอพิเศษผ่านอีเมลหรือข้อความ</li>
              <li>การปรับโฆษณาให้ตรงกับความสนใจของคุณบนแพลตฟอร์มต่างๆ</li>
            </ul>
            <p>
              เราจะไม่ขายหรือเปิดเผยข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาดโดยไม่ได้รับความยินยอมจากคุณ
            </p>
          </Section>

          <Section title="สิทธิ์ของผู้ใช้">
            <p>คุณมีสิทธิ์ในการควบคุมข้อมูลส่วนบุคคลของคุณ ซึ่งรวมถึง:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>สิทธิ์ในการขอเข้าถึงข้อมูลที่เรามีเกี่ยวกับคุณ</li>
              <li>สิทธิ์ในการขอแก้ไขหรือลบข้อมูลของคุณ</li>
              <li>สิทธิ์ในการถอนความยินยอมในการใช้ข้อมูลเพื่อการตลาดเมื่อใดก็ได้</li>
            </ul>
          </Section>

          <Section title="การป้องกันข้อมูล">
            <p>
              เราใช้มาตรการด้านความปลอดภัยที่เหมาะสมในการปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต
              การใช้ในทางที่ผิด และการเปิดเผยโดยไม่ได้รับอนุญาต
            </p>
          </Section>

          <Section title="การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว">
            <p>
              BeSight.net อาจปรับปรุงนโยบายความเป็นส่วนบุคคลตามความจำเป็น
              และจะประกาศการเปลี่ยนแปลงเหล่านี้บนเว็บไซต์ของเราอย่างชัดเจน
            </p>
            <p>
              หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับนโยบายความเป็นส่วนบุคคล กรุณาติดต่อเราที่อีเมล{' '}
              <a
                href="mailto:besight.th@gmail.com"
                className="font-medium text-[#0B1B3B] underline"
              >
                besight.th@gmail.com
              </a>{' '}
              เพื่อรับข้อมูลเพิ่มเติม
            </p>
          </Section>
        </div>
      </div>
    </SiteLayout>
  )
}
