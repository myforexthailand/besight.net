// Sections on the homepage. Anchored to "/" so the menu also works from
// sub-pages (news, /indicators/po3xm…): on the homepage it just scrolls.
export const navLinks = [
  { label: 'หน้าแรก', labelEn: 'Home', href: '/' },
  { label: 'เช็คอัตรารีเบต', labelEn: 'Rebate Rates', href: '/#rebate-calculator' },
  { label: 'เครื่องมือ', labelEn: 'Tools', href: '/#products' },
  { label: 'ข่าวสาร', labelEn: 'News', href: '/#guide' },
]

export const faqs = [
  {
    question: 'BeSight คืออะไร?',
    answer:
      'BeSight คือ Ecosystem สำหรับเทรดเดอร์ที่รวมทั้ง Rebate, Trading Tools, BeSight Center, สิทธิประโยชน์ และเนื้อหาการเรียนรู้ไว้ในที่เดียว',
    questionEn: 'What is BeSight?',
    answerEn:
      'BeSight is a trader ecosystem that brings Rebate, Trading Tools, BeSight Center, member benefits, and learning content together in one place.',
  },
  {
    question: 'เริ่มต้นใช้งาน BeSight ได้อย่างไร?',
    answer:
      'เปิดบัญชีเทรดผ่าน BeSight ตามขั้นตอนที่กำหนด จากนั้นสามารถตรวจสอบบัญชี สิทธิ์ และบริการต่าง ๆ ผ่าน BeSight Center ได้',
    questionEn: 'How do I get started with BeSight?',
    answerEn:
      'Open a trading account through BeSight by following the steps provided. You can then check your account, entitlements, and services in BeSight Center.',
  },
  {
    question: 'Rebate ของ BeSight คำนวณอย่างไร?',
    answer:
      'อัตรารีเบตขึ้นอยู่กับประเภทบัญชี คู่สินทรัพย์ และปริมาณการเทรด สามารถใช้ Rebate Calculator บนเว็บไซต์เพื่อดูยอดโดยประมาณได้ทันที',
    questionEn: 'How is BeSight Rebate calculated?',
    answerEn:
      'The rebate rate depends on your account type, the instrument traded, and your trading volume. Use the Rebate Calculator on the website to see an estimate instantly.',
  },
  {
    question: 'มีบัญชีเทรดอยู่แล้ว สามารถใช้งาน BeSight ได้ไหม?',
    answer:
      'ขึ้นอยู่กับ Broker และประเภทบัญชี สามารถตรวจสอบขั้นตอนการเชื่อมบัญชีหรือเปิดบัญชีเพิ่มเติมผ่าน BeSight ได้',
    questionEn: 'I already have a trading account. Can I still use BeSight?',
    answerEn:
      'It depends on your broker and account type. You can check the steps for linking your existing account or opening an additional account through BeSight.',
  },
  {
    question: 'BeSight มีเครื่องมืออะไรให้ใช้งานบ้าง?',
    answer:
      'BeSight มีเครื่องมือหลายรูปแบบ เช่น Power of 3 Execution Model, AMD Cycle, ONE.STR, Orca MA และ CRT Execution ซึ่งแต่ละตัวถูกออกแบบมาเพื่อช่วยวิเคราะห์ตลาดในมุมที่แตกต่างกัน',
    questionEn: 'What tools does BeSight offer?',
    answerEn:
      'BeSight offers a range of tools, including Power of 3 Execution Model, AMD Cycle, ONE.STR, Orca MA, and CRT Execution, each designed to help you analyze the market from a different angle.',
  },
  {
    question: 'เครื่องมือ BeSight มีเงื่อนไขการใช้งานอย่างไร?',
    answer:
      'เครื่องมือและสิทธิ์บางประเภทอาจมีเงื่อนไขตามบัญชีหรือปริมาณการเทรด สามารถตรวจสอบสถานะและเงื่อนไขล่าสุดได้ผ่าน BeSight Center',
    questionEn: 'What are the terms of use for BeSight tools?',
    answerEn:
      'Some tools and entitlements may be subject to conditions based on your account or trading volume. You can check the latest status and conditions in BeSight Center.',
  },
]

export const guides = [
  {
    eyebrow: 'Market News',
    category: 'Market News',
    title: 'ทองคำเคลื่อนไหวอย่างไรหลังตัวเลขเศรษฐกิจล่าสุด',
    description:
      'สรุปปัจจัยสำคัญที่ส่งผลต่อ XAUUSD และสิ่งที่เทรดเดอร์ควรจับตา',
    titleEn: 'How gold moved after the latest economic data',
    descriptionEn:
      'A summary of the key factors affecting XAUUSD and what traders should watch.',
    image: 'https://picsum.photos/seed/wellness-guide-1/600/450',
  },
  {
    eyebrow: 'Gold Outlook',
    category: 'Gold Outlook',
    title: 'จับตาทิศทางทองคำในสัปดาห์นี้',
    description:
      'มองโครงสร้างราคา แนวรับ แนวต้าน และเหตุการณ์สำคัญที่อาจเพิ่มความผันผวน',
    titleEn: "Watching gold's direction this week",
    descriptionEn:
      'A look at price structure, support, resistance, and key events that could add volatility.',
    image: 'https://picsum.photos/seed/wellness-guide-2/600/450',
  },
  {
    eyebrow: 'Economic News',
    category: 'Economic Calendar',
    title: 'ข่าวสำคัญสัปดาห์นี้ มีอะไรต้องระวัง?',
    description:
      'รวม CPI, NFP, FOMC และตัวเลขเศรษฐกิจที่อาจส่งผลต่อการเคลื่อนไหวของตลาด',
    titleEn: "This week's key news: what to watch out for",
    descriptionEn:
      'A roundup of CPI, NFP, FOMC, and other economic data that could move the market.',
    image: 'https://picsum.photos/seed/wellness-guide-3/600/450',
  },
  {
    eyebrow: 'BeSight Update',
    category: 'BeSight Update',
    title: 'อัปเดตล่าสุดจาก BeSight',
    description:
      'ติดตามฟีเจอร์ใหม่ เครื่องมือ กิจกรรม และประกาศสำคัญสำหรับสมาชิก',
    titleEn: 'Latest updates from BeSight',
    descriptionEn:
      'Follow new features, tools, events, and important announcements for members.',
    image: 'https://picsum.photos/seed/wellness-guide-4/600/450',
  },
]

export const scienceFeatures = [
  { icon: 'Rabbit', label: 'Fast\nActing' },
  { icon: 'TreePine', label: 'Naturally\nSourced' },
  { icon: 'Leaf', label: 'Plant\nBased Options' },
  { icon: 'FlaskConical', label: 'Lab\nTested' },
  { icon: 'Atom', label: 'Science\nBacked' },
  { icon: 'Wheat', label: 'Gluten\nFree' },
]
