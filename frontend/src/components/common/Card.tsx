import React from 'react'
import { motion } from 'framer-motion'

type CardProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverEffect?: boolean
}

export const Card = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
}: CardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, boxShadow: '0 12px 24px -10px rgba(17, 24, 39, 0.08)' } : {}}
      onClick={onClick}
      className={`bg-white border border-[#F1DDD2] rounded-xl shadow-premium p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export default Card

