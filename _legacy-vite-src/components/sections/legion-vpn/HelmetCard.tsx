import { motion } from 'motion/react'

import { EASE_OUT_EXPO, HELMET_IMAGE_SRC } from './constants'

export function HelmetCard() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, delay: 0.6, ease: EASE_OUT_EXPO }}
      className="relative hidden h-[280px] w-[220px] overflow-hidden rounded-[2.5rem] border border-white/20 sm:block lg:h-[320px]"
    >
      <motion.img
        src={HELMET_IMAGE_SRC}
        alt="Legion VPN helmet"
        initial={{ scale: 1.4, rotate: 15 }}
        whileHover={{ scale: 1.46, rotate: 18 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </motion.div>
  )
}
