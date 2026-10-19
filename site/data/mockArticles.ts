// Sample blog posts for local development only. Real articles live in the
// database (CRM → News); these appear only when no database is reachable and
// NODE_ENV is not "production" (see lib/server/site.ts). Server-side only —
// never import this into a client component.

import type { Article, ContentBlock } from './news'

const body = (intro: string, points: string[], outro: string): ContentBlock[] => [
  { type: 'paragraph', text: intro },
  { type: 'subheading', text: 'ประเด็นที่ควรจับตา' },
  { type: 'list', items: points },
  { type: 'paragraph', text: outro },
  { type: 'paragraph', text: 'เนื้อหานี้เป็นข้อมูลเพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำการลงทุน' },
]

export const MOCK_ARTICLES: Article[] = [
  {
    slug: 'mock-gold-outlook-week',
    title: 'ทองคำสัปดาห์นี้: แนวรับ-แนวต้านที่ต้องจับตา',
    category: 'News',
    date: '2026-10-14',
    excerpt:
      'สรุปภาพรวมราคาทองคำ XAUUSD พร้อมโซนราคาสำคัญและปัจจัยที่อาจทำให้ตลาดผันผวนในสัปดาห์นี้ ทั้งตัวเลขเศรษฐกิจสหรัฐฯ ที่ทยอยประกาศ ท่าทีของธนาคารกลางเกี่ยวกับทิศทางดอกเบี้ย และความเคลื่อนไหวของค่าเงินดอลลาร์ที่มีผลต่อแรงซื้อขายทองคำ รวมถึงแนวรับแนวต้านจากโครงสร้างราคาระดับ H4 และ Daily ที่เทรดเดอร์ควรจับตาก่อนวางแผนเข้าเทรดตลอดทั้งสัปดาห์',
    heroImage: '/images/blog/xauusd-daily-02102025-hero.webp',
    sourceUrl: '',
    pinned: true,
    section: 'blog',
    topic: 'gold-outlook',
    content: body(
      'ทองคำยังเคลื่อนไหวในกรอบกว้างหลังข้อมูลเศรษฐกิจสหรัฐฯ ชุดล่าสุด ผู้เล่นในตลาดรอสัญญาณจากธนาคารกลางก่อนตัดสินใจเพิ่มน้ำหนักการลงทุน',
      ['โซนแนวรับสำคัญที่เคยเป็นจุดกลับตัวในรอบก่อน', 'แนวต้านจากโครงสร้างราคาระดับ H4 และ Daily', 'ตัวเลขเศรษฐกิจที่จะประกาศกลางสัปดาห์'],
      'การรอให้ราคายืนยันโครงสร้างก่อนเข้าเทรดช่วยลดโอกาสโดนกวาด Liquidity ได้มากขึ้น',
    ),
  },
  {
    slug: 'mock-nfp-preview',
    title: 'พรีวิว Non-Farm Payrolls: ตลาดคาดหวังอะไร',
    category: 'News',
    date: '2026-10-12',
    excerpt: 'ตัวเลขการจ้างงานนอกภาคการเกษตรของสหรัฐฯ มักทำให้ดอลลาร์และทองคำเคลื่อนไหวแรง มาดูสิ่งที่ควรเตรียมตัว',
    heroImage: '/images/blog/non-farm-employment-change-hero.webp',
    sourceUrl: '',
    section: 'blog',
    topic: 'economic-calendar',
    content: body(
      'ทุกต้นเดือนตลาดจับตา NFP เป็นพิเศษ เพราะสะท้อนสุขภาพตลาดแรงงานและมีผลต่อทิศทางดอกเบี้ย',
      ['ตัวเลขคาดการณ์เทียบกับค่าก่อนหน้า', 'อัตราการว่างงานและค่าจ้างเฉลี่ยต่อชั่วโมง', 'ความผันผวนช่วงประกาศและ Spread ที่อาจกว้างขึ้น'],
      'ผู้ที่เทรดช่วงข่าวควรกำหนดความเสี่ยงต่อไม้ให้ชัดเจนและพิจารณาลดขนาด Lot',
    ),
  },
  {
    slug: 'mock-besight-po3xm-guide',
    title: 'ทำความรู้จัก BeSight PO3XM: มอง AMD ให้เป็นระบบ',
    category: 'Tools',
    date: '2026-10-10',
    excerpt: 'Indicator ที่ติดตามพฤติกรรมราคาตามแนวคิด Power of 3 ตั้งแต่สะสมราคา กวาด Liquidity จนถึงยืนยันทิศทาง',
    heroImage: '/images/blog/besight-one-str-hero.webp',
    sourceUrl: '',
    section: 'blog',
    topic: 'besight-update',
    content: body(
      'PO3XM ช่วยให้เทรดเดอร์เห็นลำดับของ Accumulation, Manipulation และ Distribution บนกราฟ ก่อนสร้างแผนการเทรด',
      ['ตรวจจับกรอบสะสมราคาและ Liquidity อ้างอิง', 'ค้นหา Key Level ที่เกี่ยวข้องกับรอบนั้นโดยอัตโนมัติ', 'แสดง Entry, Stop Loss, Take Profit และ Lot Size บนกราฟ'],
      'ลองศึกษารายละเอียดและวิธีติดตั้งได้จากหน้าเครื่องมือของ BeSight',
    ),
  },
  {
    slug: 'mock-core-cpi',
    title: 'Core CPI คืออะไร และทำไมกระทบราคาทอง',
    category: 'News',
    date: '2026-10-08',
    excerpt: 'อธิบายตัวชี้วัดเงินเฟ้อพื้นฐานของสหรัฐฯ และวิธีที่ตลาดตอบสนองเมื่อตัวเลขต่างจากที่คาด',
    heroImage: '/images/blog/core-cpi-hero.webp',
    sourceUrl: '',
    section: 'blog',
    topic: 'economic-calendar',
    content: body(
      'Core CPI ตัดราคาอาหารและพลังงานออก ทำให้เห็นแนวโน้มเงินเฟ้อระยะยาวชัดขึ้น จึงเป็นข้อมูลสำคัญของธนาคารกลาง',
      ['ตัวเลขสูงกว่าคาดมักหนุนดอลลาร์และกดดันทองคำระยะสั้น', 'ตัวเลขต่ำกว่าคาดอาจเพิ่มความหวังเรื่องการลดดอกเบี้ย', 'ควรดูควบคู่กับถ้อยแถลงของ Fed'],
      'การวางแผนก่อนวันประกาศช่วยให้ไม่ต้องตัดสินใจท่ามกลางความผันผวน',
    ),
  },
  {
    slug: 'mock-rebate-withdraw',
    title: 'วิธีถอนรีเบต XM ผ่านบัญชีของคุณ ทีละขั้นตอน',
    category: 'Promotion',
    date: '2026-10-06',
    excerpt: 'สรุปขั้นตอนการตรวจสอบยอดรีเบตและถอนเข้าบัญชีเทรดหรือบัญชีธนาคาร พร้อมข้อควรรู้',
    heroImage: '/images/blog/withdraw-rebate-xm-hero.webp',
    sourceUrl: '',
    section: 'blog',
    topic: 'besight-update',
    content: body(
      'สมาชิกที่เปิดบัญชีผ่านลิงก์ BeSight สามารถตรวจสอบรีเบตสะสมได้ในระบบสมาชิก',
      ['ตรวจสอบยอดรีเบตที่พร้อมถอน', 'เลือกช่องทางการรับเงินที่ต้องการ', 'ติดตามสถานะรายการถอนในประวัติ'],
      'หากมีข้อสงสัยสามารถสอบถามทีมงานผ่านชุมชน BeSight ได้',
    ),
  },
  {
    slug: 'mock-fomc-minutes',
    title: 'สรุปรายงานการประชุม FOMC: สัญญาณที่ตลาดอ่านได้',
    category: 'News',
    date: '2026-10-04',
    excerpt: 'ไฮไลต์จากรายงานการประชุมล่าสุดของ Fed และผลต่อมุมมองดอกเบี้ย ดอลลาร์ และทองคำ',
    heroImage: '/images/blog/fomc-meeting-minutes-hero.webp',
    sourceUrl: '',
    section: 'blog',
    topic: 'market-news',
    content: body(
      'รายงานการประชุมเผยความเห็นของกรรมการเกี่ยวกับเงินเฟ้อ ตลาดแรงงาน และจังหวะการปรับนโยบาย',
      ['ท่าทีต่อการลดดอกเบี้ยรอบถัดไป', 'ความเห็นเรื่องความเสี่ยงเงินเฟ้อกลับมา', 'ปฏิกิริยาของตลาดพันธบัตรและดอลลาร์'],
      'นักลงทุนควรติดตามข้อมูลเศรษฐกิจที่ออกมาเพิ่มเติมเพื่อประกอบการตัดสินใจ',
    ),
  },
  {
    slug: 'mock-what-is-rsi',
    title: 'RSI คืออะไร ใช้อย่างไรให้ไม่หลงสัญญาณ',
    category: 'Tools',
    date: '2026-10-02',
    excerpt: 'พื้นฐานของ Relative Strength Index การตีความโซน Overbought/Oversold และข้อควรระวังในตลาดมีแนวโน้ม',
    heroImage: '/images/blog/what-rsi-indictor-hero.webp',
    sourceUrl: '',
    section: 'blog',
    topic: 'market-news',
    content: body(
      'RSI เป็นออสซิลเลเตอร์ยอดนิยมที่วัดความแรงของราคา แต่ไม่ควรใช้เป็นสัญญาณเดี่ยว',
      ['ค่าเหนือ 70 ไม่ได้แปลว่าต้องกลับตัวเสมอ', 'ใช้ดู Divergence ร่วมกับโครงสร้างราคา', 'ปรับช่วงเวลาให้เหมาะกับสไตล์การเทรด'],
      'การใช้ร่วมกับ Market Structure ช่วยให้การตัดสินใจรัดกุมขึ้น',
    ),
  },
  {
    slug: 'mock-loyalty-rewards',
    title: 'BeSight Loyalty: ยิ่งเทรด ยิ่งได้สิทธิประโยชน์',
    category: 'Promotion',
    date: '2026-09-29',
    excerpt: 'แนะนำโปรแกรมสมาชิกที่ตอบแทนการเทรดอย่างต่อเนื่อง พร้อมกิจกรรมพิเศษสำหรับสมาชิก',
    heroImage: '/images/blog/besight-loyalty-besight-rebate-reward-hero.webp',
    sourceUrl: '',
    section: 'blog',
    topic: 'besight-update',
    content: body(
      'BeSight Loyalty ออกแบบมาเพื่อสมาชิกที่เทรดอย่างสม่ำเสมอ ได้รับสิทธิประโยชน์และกิจกรรมเพิ่มเติม',
      ['สะสมสิทธิจากปริมาณการเทรด', 'เข้าร่วมกิจกรรมและอีเวนต์พิเศษ', 'ติดตามข่าวสารสิทธิประโยชน์ผ่านชุมชน'],
      'เปิดบัญชีผ่านลิงก์ BeSight เพื่อรับสิทธิประโยชน์ตามเงื่อนไข',
    ),
  },
]
