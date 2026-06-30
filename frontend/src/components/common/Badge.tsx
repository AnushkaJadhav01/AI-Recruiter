import React from 'react'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
  className?: string
}

export const Badge = ({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) => {
  const styles = {
    primary: 'bg-blue-50 text-[#F97316] border-blue-100',
    success: 'bg-emerald-50 text-[#10B981] border-emerald-100',
    warning: 'bg-amber-50 text-[#F59E0B] border-amber-100',
    danger: 'bg-red-50 text-[#EF4444] border-red-100',
    neutral: 'bg-gray-50 text-gray-600 border-gray-100',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge

