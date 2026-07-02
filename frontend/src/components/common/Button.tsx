import React from 'react'
import { motion } from 'framer-motion'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: (e: any) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shrink-0'
  
  const variants = {
    primary: 'bg-[#F97316] hover:bg-blue-700 text-white focus:ring-blue-500 border border-transparent shadow-sm',
    secondary: 'bg-[#F97316] hover:bg-blue-600 text-white focus:ring-blue-400 border border-transparent shadow-sm',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 focus:ring-blue-500 border border-gray-300 shadow-sm',
    danger: 'bg-[#EF4444] hover:bg-red-700 text-white focus:ring-red-500 border border-transparent shadow-sm',
    ghost: 'bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-300 border border-transparent',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default Button

