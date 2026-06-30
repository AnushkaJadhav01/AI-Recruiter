import React from 'react';

const Progress = ({
  value,
  max = 100,
  variant = 'primary',
  showLabel = false,
  size = 'md',
  className = '',
}) => {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const bgColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-customSuccess',
    warning: 'bg-customWarning',
    danger: 'bg-customError',
    accent: 'bg-accent',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3.5',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-textSecondary dark:text-slate-400">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${bgColors[variant]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
