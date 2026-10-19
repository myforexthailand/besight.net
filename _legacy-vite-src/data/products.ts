export interface Product {
  handle: string
  title: string
  price: number
  category: string
  image: string
  description?: string
  cta?: string
  /** Path to a dedicated landing page for this indicator, if one exists. */
  landingPath?: string
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
    landingPath: '/indicators/po3xm',
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
  },
  {
    handle: 'orca-ma',
    title: 'BeSight Orca MA Crossover',
    price: 129,
    category: 'Trading Tools',
    image: '/images/homepage/orcacrossover.jpg',
    description:
      'เครื่องมือ Moving Average ที่ช่วยระบุทิศทางของแนวโน้ม พร้อมมองหาแนวรับและแนวต้านแบบ Dynamic',
    cta: 'ดูรายละเอียด',
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
  },
]
