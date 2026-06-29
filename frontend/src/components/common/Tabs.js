import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'line', // line, pill
  className = '',
}) => {
  return (
    <div className={`flex border-b border-customBorder dark:border-slate-800 ${variant === 'pill' ? 'gap-2 border-b-0' : ''} ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        if (variant === 'pill') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all relative ${
                isActive
                  ? 'text-white'
                  : 'text-textSecondary hover:text-textPrimary hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activePillTab"
                  transition={{ type: 'spring', duration: 0.38 }}
                  className="absolute inset-0 bg-primary rounded-full z-0"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-3 text-xs font-semibold transition-all relative border-b-2 -mb-[2px] ${
              isActive
                ? 'text-primary border-primary'
                : 'text-textSecondary border-transparent hover:text-textPrimary hover:border-slate-300 dark:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
