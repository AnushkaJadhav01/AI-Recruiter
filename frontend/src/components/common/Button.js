import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-premium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary-light text-secondary hover:bg-secondary hover:text-white focus:ring-secondary',
    outline: 'border border-customBorder text-textSecondary bg-transparent hover:bg-slate-50 hover:text-textPrimary focus:ring-slate-300 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white',
    danger: 'bg-customError text-white hover:bg-red-600 focus:ring-customError',
    ghost: 'bg-transparent text-textSecondary hover:bg-slate-100 hover:text-textPrimary dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white focus:ring-slate-300'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base'
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      whileHover={disabled ? {} : { scale: 1.01, y: -0.5 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <span className="mr-2 inline-flex items-center"><Icon size={16} /></span>
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex items-center"><Icon size={16} /></span>
      )}
    </motion.button>
  );
};

export default Button;
