import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'

import { LegionLogo } from './LegionLogo'

const NAV_ITEMS = [
  'หน้าแรก',
  'เช็คอัตรารีเบต',
  'ศูนย์เรียนรู้',
  'ดาวน์โหลด',
  'ข่าวสาร',
  'เกี่ยวกับเรา',
]

export function MobileMenuDrawer({
  isMenuOpen,
  onCloseMenu,
}: {
  isMenuOpen: boolean
  onCloseMenu: () => void
}) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex flex-col bg-[#0F141B]/[0.98] backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <a href="#" className="flex items-center gap-3">
              <LegionLogo className="h-10 w-10" />
              <span className="text-xl font-medium uppercase tracking-[0.12em] text-white">
                Legion VPN
              </span>
            </a>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => onCloseMenu()}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onCloseMenu()}
                className="text-2xl font-semibold text-white"
              >
                {item}
              </button>
            ))}

            <div className="mt-6 flex flex-col items-center gap-4">
              <button
                type="button"
                className="flex h-14 items-center rounded-full border border-white/25 bg-gradient-to-b from-white to-gray-100 px-8 text-xs font-bold uppercase tracking-wider text-[#0F141B]"
              >
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
