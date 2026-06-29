import React from 'react';

const SkeletonLoader = ({
  variant = 'text', // text, avatar, card, table
  className = '',
  count = 1,
}) => {
  const elements = Array.from({ length: count });

  if (variant === 'avatar') {
    return (
      <div className={`h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse ${className}`} />
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-6 border border-customBorder dark:border-slate-800 bg-white dark:bg-slate-900 rounded-premium shadow-premium animate-pulse ${className}`}>
        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
        <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-800 rounded mb-3" />
        <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-850 rounded" />
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={`w-full space-y-4 animate-pulse ${className}`}>
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-premium" />
        {elements.map((_, i) => (
          <div key={i} className="flex gap-4 items-center py-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 flex-1 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // Text loading helper
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {elements.map((_, i) => (
        <div key={i} className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" style={{ width: i === count - 1 && count > 1 ? '70%' : '100%' }} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
