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
  const hasBg = className.split(/\s+/).some(c => c.startsWith('bg-'))
  const hasBorder = className.split(/\s+/).some(c => c.startsWith('border-') || c === 'border')
  const defaultBg = hasBg ? '' : 'bg-white'
  const defaultBorder = hasBorder ? '' : 'border border-[#F1DDD2]'

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, boxShadow: '0 12px 24px -10px rgba(17, 24, 39, 0.08)' } : {}}
      onClick={onClick}
      className={`rounded-xl shadow-premium p-6 ${defaultBg} ${defaultBorder} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export default Card

