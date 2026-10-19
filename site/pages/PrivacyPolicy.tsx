'use client'

import { Link } from '@/site/lib/router'
import { ArrowLeft } from 'lucide-react'

import { SiteLayout } from '@/site/components/sections/site-layout'
import { useT } from '@/site/lib/lang'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-navy">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-700">{children}</div>
    </section>
  )
}

export function PrivacyPolicy() {
  const t = useT()
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
            {t('นโยบายการคุ้มครองข้อมูลส่วนบุคคล', 'Personal Data Protection Policy')}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-700">
            {t(
              'เว็บไซต์ BeSight.net ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้ และเรามุ่งมั่นที่จะปกป้องข้อมูลส่วนบุคคลของคุณอย่างดีที่สุด นโยบายนี้อธิบายถึงวิธีการเก็บรวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคล รวมถึงการนำข้อมูลมาใช้เพื่อวัตถุประสงค์ทางการตลาดอย่างเหมาะสม',
              'The BeSight.net website values the privacy of its users and is committed to protecting your personal data to the best of its ability. This policy explains how personal data is collected, used and protected, including the appropriate use of data for marketing purposes.',
            )}
          </p>

          <Section title={t('การเก็บข้อมูลส่วนบุคคล', 'Collection of personal data')}>
            <p>
              {t(
                'เมื่อคุณเยี่ยมชมและใช้งานเว็บไซต์ Besight.net เราอาจเก็บข้อมูลบางประเภทจากคุณเพื่อปรับปรุงการให้บริการ ข้อมูลที่เราเก็บอาจรวมถึง:',
                'When you visit and use the Besight.net website, we may collect certain types of information from you in order to improve our services. The information we collect may include:',
              )}
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                {t(
                  'ข้อมูลการติดต่อ เช่น ชื่อ อีเมล เบอร์โทรศัพท์',
                  'Contact information, such as name, email address and telephone number',
                )}
              </li>
              <li>
                {t(
                  'ข้อมูลการใช้งานเว็บไซต์ เช่น ประวัติการเข้าชม การคลิก และการโต้ตอบกับเนื้อหาของเรา',
                  'Website usage information, such as browsing history, clicks and interactions with our content',
                )}
              </li>
              <li>
                {t(
                  'ข้อมูลทางเทคนิค เช่น IP address ประเภทของอุปกรณ์ และประเภทของเบราว์เซอร์ที่คุณใช้',
                  'Technical information, such as IP address, device type and the type of browser you use',
                )}
              </li>
            </ul>
          </Section>

          <Section title={t('วัตถุประสงค์ในการใช้ข้อมูล', 'Purposes of data use')}>
            <p>
              {t(
                'ข้อมูลส่วนบุคคลของคุณจะถูกใช้เพื่อวัตถุประสงค์ที่ชัดเจนและมีความเหมาะสม ซึ่งรวมถึง:',
                'Your personal data will be used for clear and appropriate purposes, including:',
              )}
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                {t(
                  'การปรับปรุงบริการและประสบการณ์การใช้งานเว็บไซต์ของคุณ',
                  'Improving our services and your experience of using the website',
                )}
              </li>
              <li>
                {t(
                  'การติดต่อกลับเพื่อตอบคำถามหรือให้บริการตามคำขอ',
                  'Contacting you to answer questions or to provide services at your request',
                )}
              </li>
              <li>
                {t(
                  'การส่งข้อมูลทางการตลาด ข่าวสาร หรือโปรโมชั่นที่เกี่ยวข้องกับการเงิน การวิเคราะห์ตลาด และผลิตภัณฑ์ที่เรานำเสนอ',
                  'Sending marketing information, news or promotions relating to finance, market analysis and the products we offer',
                )}
              </li>
              <li>
                {t(
                  'การวิเคราะห์ข้อมูลเชิงสถิติเพื่อปรับปรุงเนื้อหาและบริการของเราให้สอดคล้องกับความสนใจของคุณ',
                  'Statistical analysis of data to improve our content and services so that they are consistent with your interests',
                )}
              </li>
            </ul>
          </Section>

          <Section title={t('การเข้าถึงข้อมูลเพื่อทำการตลาด', 'Access to data for marketing')}>
            <p>
              {t(
                'BeSight.net อาจใช้ข้อมูลของคุณเพื่อวัตถุประสงค์ทางการตลาด โดยที่คุณสามารถเลือกที่จะอนุญาตหรือไม่อนุญาตให้เราส่งข้อมูลเหล่านี้ได้ ข้อมูลการตลาดอาจรวมถึง:',
                'BeSight.net may use your data for marketing purposes, and you may choose whether or not to permit us to send you such information. Marketing information may include:',
              )}
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                {t(
                  'การส่งจดหมายข่าว ข้อมูลโปรโมชัน และข้อเสนอพิเศษผ่านอีเมลหรือข้อความ',
                  'Sending newsletters, promotional information and special offers by email or message',
                )}
              </li>
              <li>
                {t(
                  'การปรับโฆษณาให้ตรงกับความสนใจของคุณบนแพลตฟอร์มต่างๆ',
                  'Tailoring advertisements to your interests on various platforms',
                )}
              </li>
            </ul>
            <p>
              {t(
                'เราจะไม่ขายหรือเปิดเผยข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาดโดยไม่ได้รับความยินยอมจากคุณ',
                'We will not sell or disclose your personal data to third parties for marketing purposes without your consent.',
              )}
            </p>
          </Section>

          <Section title={t('สิทธิ์ของผู้ใช้', 'User rights')}>
            <p>
              {t(
                'คุณมีสิทธิ์ในการควบคุมข้อมูลส่วนบุคคลของคุณ ซึ่งรวมถึง:',
                'You have the right to control your personal data, including:',
              )}
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                {t(
                  'สิทธิ์ในการขอเข้าถึงข้อมูลที่เรามีเกี่ยวกับคุณ',
                  'The right to request access to the data we hold about you',
                )}
              </li>
              <li>
                {t(
                  'สิทธิ์ในการขอแก้ไขหรือลบข้อมูลของคุณ',
                  'The right to request correction or deletion of your data',
                )}
              </li>
              <li>
                {t(
                  'สิทธิ์ในการถอนความยินยอมในการใช้ข้อมูลเพื่อการตลาดเมื่อใดก็ได้',
                  'The right to withdraw your consent to the use of your data for marketing at any time',
                )}
              </li>
            </ul>
          </Section>

          <Section title={t('การป้องกันข้อมูล', 'Data protection')}>
            <p>
              {t(
                'เราใช้มาตรการด้านความปลอดภัยที่เหมาะสมในการปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต การใช้ในทางที่ผิด และการเปิดเผยโดยไม่ได้รับอนุญาต',
                'We apply appropriate security measures to protect your personal data from unauthorized access, misuse and unauthorized disclosure.',
              )}
            </p>
          </Section>

          <Section
            title={t('การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว', 'Changes to this Privacy Policy')}
          >
            <p>
              {t(
                'BeSight.net อาจปรับปรุงนโยบายความเป็นส่วนบุคคลตามความจำเป็น และจะประกาศการเปลี่ยนแปลงเหล่านี้บนเว็บไซต์ของเราอย่างชัดเจน',
                'BeSight.net may update its privacy policy as necessary and will clearly announce such changes on our website.',
              )}
            </p>
            <p>
              {t(
                'หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับนโยบายความเป็นส่วนบุคคล กรุณาติดต่อเราที่อีเมล',
                'If you have any questions or require further information about this privacy policy, please contact us by email at',
              )}{' '}
              <a
                href="mailto:besight.th@gmail.com"
                className="font-medium text-navy underline"
              >
                besight.th@gmail.com
              </a>{' '}
              {t('เพื่อรับข้อมูลเพิ่มเติม', 'for further information.')}
            </p>
          </Section>
        </div>
      </div>
    </SiteLayout>
  )
}
