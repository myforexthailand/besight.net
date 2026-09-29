const LINK_COLUMNS = [
  {
    title: 'How It Works',
    links: ['เลือกประเภทบัญชี', 'เลือกคู่เทรด', 'ใส่จำนวน Lot', 'ระบบคำนวณรีเบตโดยประมาณให้ทันที'],
  },
  {
    title: 'Supported',
    links: ['Standard', 'Micro', 'Ultra Low Standard', 'Ultra Low Micro'],
  },
  {
    title: 'Important Notes',
    links: [
      'ตัวเลขที่แสดงเป็นค่าประมาณ',
      'รีเบตจริงอาจแตกต่างตามประเภทบัญชีและคู่เทรด',
      'เงื่อนไขเป็นไปตามบริษัทกำหนด',
      'กรุณาเปิดบัญชีผ่านลิงก์ BeSight เพื่อรับสิทธิ์',
    ],
  },
]

const MAX_ROWS = Math.max(...LINK_COLUMNS.map((col) => col.links.length))

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1536px] border-t border-[rgba(30,50,90,0.1)] px-6 py-12 md:px-10">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div className="max-w-xs">
          <p className="text-lg font-semibold text-[#0B1B3B]">BeSight Rebate Calculator</p>
          <p className="mt-3 text-sm text-[#5E6470]">
            คำนวณรีเบตโดยประมาณจากประเภทบัญชี คู่เทรด และจำนวน Lot ได้ง่าย ๆ
            ช่วยให้คุณเห็นภาพผลตอบแทนก่อนเริ่มเทรดกับ BeSight
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
          {LINK_COLUMNS.map((col) => (
            <p
              key={`${col.title}-title`}
              className="text-xs font-semibold uppercase tracking-wider text-[#5E6470]/60"
            >
              {col.title}
            </p>
          ))}

          {Array.from({ length: MAX_ROWS }).map((_, rowIndex) =>
            LINK_COLUMNS.map((col) => {
              const link = col.links[rowIndex]
              if (!link) return <div key={`${col.title}-${rowIndex}`} />

              return (
                <div key={`${col.title}-${rowIndex}`} className="flex items-start">
                  {col.title === 'How It Works' ? (
                    <span className="text-sm text-[#5E6470]">
                      {rowIndex + 1}. {link}
                    </span>
                  ) : col.title === 'Important Notes' ? (
                    <span className="text-sm text-[#5E6470]">{link}</span>
                  ) : (
                    <a
                      href="#"
                      className="text-sm text-[#5E6470] transition-colors hover:text-[#0B1B3B]"
                    >
                      {link}
                    </a>
                  )}
                </div>
              )
            }),
          )}
        </div>
      </div>
    </footer>
  )
}
