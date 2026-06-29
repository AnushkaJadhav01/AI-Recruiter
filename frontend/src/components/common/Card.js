import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) => {
  const baseStyle = 'bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 rounded-premium p-6 shadow-premium transition-all';
  
  if (onClick || hoverEffect) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ y: -3, boxShadow: '0 12px 30px -10px rgba(15, 23, 42, 0.08)' }}
        className={`${baseStyle} cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
