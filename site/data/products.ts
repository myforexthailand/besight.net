/** live = shown and clickable · soon = shown as "Coming soon", no details
 *  page yet · hidden = not on the website at all. */
export type ProductStatus = 'live' | 'soon' | 'hidden'
export const PRODUCT_STATUSES: ProductStatus[] = ['live', 'soon', 'hidden']

export interface Product {
  handle: string
  title: string
  price: number
  category: string
  image: string
  description?: string
  cta?: string
  /** English copy, shown when the visitor switches the site to English. */
  titleEn?: string
  descriptionEn?: string
  ctaEn?: string
  /** Custom link for the card button; defaults to its details page, /indicators/<handle>. */
  landingPath?: string
  /** Defaults to live. */
  status?: ProductStatus
}

export const products: Product[] = [
  {
    handle: 'po3xm',
    title: 'BeSight Power of 3 Execution Model',
    price: 296,
    category: 'Trading Tools',
    image: '/images/homepage/po3xmd.jpg',
    description:
      'ช่วยมองหาโอกาสเข้าเทรดตามแนวคิด Power of 3 ตั้งแต่ช่วงสะสมราคา ไปจนถึงช่วงขยายตัวของราคา',
    cta: 'ดูรายละเอียด',
    titleEn: 'BeSight Power of 3 Execution Model',
    descriptionEn:
      'Helps you spot trade opportunities based on the Power of 3 concept, from the accumulation phase through to the price expansion phase.',
    ctaEn: 'View details',
  },
  {
    handle: 'amd-cycle',
    title: 'BeSight AMD Cycle',
    price: 349,
    category: 'Trading Tools',
    image: '/images/homepage/amdcycle.jpg',
    description:
      'ช่วยติดตามวัฏจักรของตลาดผ่านช่วง Accumulation, Manipulation และ Distribution เพื่อให้เข้าใจพฤติกรรมราคาได้ชัดเจนยิ่งขึ้น',
    cta: 'ดูรายละเอียด',
    titleEn: 'BeSight AMD Cycle',
    descriptionEn:
      'Helps you track the market cycle through the Accumulation, Manipulation, and Distribution phases for a clearer understanding of price behavior.',
    ctaEn: 'View details',
    status: 'soon',
  },
  {
    handle: 'one-str',
    title: 'BeSight ONE.STR',
    price: 189,
    category: 'Trading Tools',
    image: '/images/homepage/BeSight-ONEstr.jpg',
    description:
      'เครื่องมือวิเคราะห์โครงสร้างตลาดแบบ All-in-One ที่ช่วยให้มองภาพรวมและวางแผนการเทรดได้ชัดเจนยิ่งขึ้น',
    cta: 'ดูรายละเอียด',
    titleEn: 'BeSight ONE.STR',
    descriptionEn:
      'An all-in-one market structure analysis tool that gives you a clearer big picture to plan your trades.',
    ctaEn: 'View details',
    landingPath: 'https://www.tradingview.com/script/c5hoh0qn/',
  },
  {
    handle: 'orca-ma',
    title: 'BeSight Orca',
    price: 129,
    category: 'Trading Tools',
    image: '/images/homepage/orcacrossover.jpg',
    description:
      'Expert Advisor สำหรับ MT5 ที่ออกแบบมาเพื่อ XAUUSD เปิดออเดอร์และบริหาร Take Profit หลายระดับแบบอัตโนมัติ',
    cta: 'ดูรายละเอียด',
    titleEn: 'BeSight Orca',
    descriptionEn:
      'An MT5 Expert Advisor built for XAUUSD that automatically opens orders and manages multi-level Take Profit.',
    ctaEn: 'View details',
  },
  {
    handle: 'crt-execution-h4s',
    title: 'BeSight CRT Execution H4S',
    price: 59,
    category: 'Trading Tools',
    image: '/images/homepage/crth4s.jpg',
    description:
      'โมเดลการเข้าเทรดที่เน้นวิเคราะห์โครงสร้างบนกรอบเวลา H4 เพื่อช่วยคัดเลือก Setup ที่มีความชัดเจนมากขึ้น',
    cta: 'ดูรายละเอียด',
    titleEn: 'BeSight CRT Execution H4S',
    descriptionEn:
      'An entry model focused on H4 timeframe structure analysis, helping you select clearer setups.',
    ctaEn: 'View details',
    landingPath: 'https://www.tradingview.com/script/adydLTqO/',
  },
  {
    handle: 'crt-execution-h1s',
    title: 'BeSight CRT Execution H1S',
    price: 79,
    category: 'Trading Tools',
    image: '/images/homepage/crth1s.jpg',
    description:
      'โมเดลการเข้าเทรดที่ออกแบบสำหรับโครงสร้าง H1 ช่วยให้วางจังหวะ Entry ได้ละเอียดและแม่นยำยิ่งขึ้น',
    cta: 'ดูรายละเอียด',
    titleEn: 'BeSight CRT Execution H1S',
    descriptionEn:
      'An entry model designed for H1 structure, helping you time your Entry with greater precision.',
    ctaEn: 'View details',
    landingPath: 'https://www.tradingview.com/script/s6BY4s7A/',
  },
]
