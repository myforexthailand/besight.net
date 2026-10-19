import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

import { EASE_OUT_EXPO } from './constants'

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      className="flex w-full items-center justify-between px-6 py-6 md:px-10"
    >
      <span className="text-lg font-semibold tracking-tight text-[#5E6470] md:hidden">
        RIVR
      </span>

      <Link
        to="/indicators/po3xm"
        className="group flex items-center gap-3 rounded-full bg-[#0B1B3B] py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] md:ml-auto"
      >
        เริ่มต้นใช้งาน
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.header>
  )
}
