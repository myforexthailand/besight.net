'use client'

import { Link } from '@/site/lib/router'
import { ArrowLeft } from 'lucide-react'

import { SiteLayout } from '@/site/components/sections/site-layout'
import { useSiteLang, useT } from '@/site/lib/lang'

const COOKIE_TYPES = {
  th: [
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
  ],
  en: [
    {
      title: 'Strictly Necessary Cookies',
      description:
        'These cookies are necessary for the website to function. They enable you to access essential functions, such as signing in, and to use the website smoothly.',
    },
    {
      title: 'Analytical and Performance Cookies',
      description:
        'These cookies allow us to collect information about how you use the website, such as the pages you visit and your interactions with the website. This information helps us improve the user experience and develop useful content.',
    },
    {
      title: 'Functionality Cookies',
      description:
        'These cookies allow the website to remember your settings and customizations, such as language and region, so that you receive an experience suited to your needs.',
    },
    {
      title: 'Advertising Cookies',
      description:
        'These cookies are used to display advertisements relevant to your interests based on your browsing behavior. We may share this information with relevant partners to improve the targeting of advertising.',
    },
  ],
}

export function CookiePolicy() {
  const t = useT()
  const { lang } = useSiteLang()
  return (
    <SiteLayout>
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container max-w-3xl">
          <Link
            to="/"
            className="back-link"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('กลับไปหน้าแรก', 'Back to home')}
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-navy md:text-4xl">
            {t('นโยบายคุกกี้', 'Cookie Policy')}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-700">
            {t(
              'เว็บไซต์ BeSight.net ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานและให้บริการที่ตรงกับความต้องการของผู้ใช้งาน โดยนโยบายคุกกี้นี้มีวัตถุประสงค์เพื่ออธิบายถึงวิธีการใช้คุกกี้ ประเภทของคุกกี้ที่เราใช้ และวิธีการจัดการคุกกี้ของผู้ใช้',
              'The BeSight.net website uses cookies to improve the user experience and to provide services that meet the needs of its users. This Cookie Policy is intended to explain how we use cookies, the types of cookies we use, and how users can manage cookies.',
            )}
          </p>

          <h2 className="legal-heading">
            {t('คุกกี้คืออะไร?', 'What are cookies?')}
          </h2>
          <p className="legal-text">
            {t(
              'คุกกี้คือไฟล์ขนาดเล็กที่ถูกเก็บไว้ในอุปกรณ์ของคุณเมื่อคุณเข้าชมเว็บไซต์ คุกกี้ช่วยให้เว็บไซต์สามารถจดจำข้อมูลเกี่ยวกับการใช้งานของคุณ เพื่อให้ประสบการณ์การใช้งานที่สะดวกและปรับแต่งตามความต้องการ',
              'Cookies are small files stored on your device when you visit a website. Cookies allow the website to remember information about your use of it, in order to provide a convenient user experience that is tailored to your needs.',
            )}
          </p>

          <h2 className="legal-heading">
            {t('ประเภทของคุกกี้ที่เราใช้', 'Types of cookies we use')}
          </h2>
          <div className="mt-4 space-y-6">
            {COOKIE_TYPES[lang].map((cookie) => (
              <div key={cookie.title}>
                <h3 className="text-lg font-semibold text-navy">{cookie.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-700">
                  {cookie.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="legal-heading">
            {t('การจัดการคุกกี้', 'Managing cookies')}
          </h2>
          <p className="legal-text">
            {t(
              'คุณสามารถเลือกเปิดหรือปิดการใช้งานคุกกี้ได้ผ่านการตั้งค่าบราวเซอร์ของคุณ อย่างไรก็ตาม การปิดการใช้งานคุกกี้บางประเภทอาจทำให้ประสบการณ์การใช้งานเว็บไซต์ของคุณไม่สมบูรณ์',
              'You may choose to enable or disable cookies through your browser settings. However, disabling certain types of cookies may result in an incomplete experience when using the website.',
            )}
          </p>

          <h2 className="legal-heading">
            {t('การเปลี่ยนแปลงนโยบายคุกกี้', 'Changes to this Cookie Policy')}
          </h2>
          <p className="legal-text">
            {t(
              'เราขอสงวนสิทธิ์ในการปรับปรุงนโยบายคุกกี้ตามความเหมาะสม โดยจะประกาศการเปลี่ยนแปลงบนเว็บไซต์ของเราอย่างชัดเจน หากคุณมีคำถามเกี่ยวกับนโยบายคุกกี้หรือต้องการข้อมูลเพิ่มเติม โปรดติดต่อเราที่อีเมล',
              'We reserve the right to update this Cookie Policy as appropriate, and any changes will be clearly announced on our website. If you have any questions about this Cookie Policy or require further information, please contact us by email at',
            )}{' '}
            <a
              href="mailto:besight.th@gmail.com"
              className="font-medium text-navy underline"
            >
              besight.th@gmail.com
            </a>{' '}
            {t('เพื่อรับคำแนะนำเพิ่มเติม', 'for further guidance.')}
          </p>
        </div>
      </div>
    </SiteLayout>
  )
}
