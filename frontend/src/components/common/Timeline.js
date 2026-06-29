import React from 'react';

const TimelineItem = ({ role, company, duration, description, isLast }) => {
  return (
    <div className="relative pl-6 pb-6 last:pb-0">
      {/* Line connecting milestones */}
      {!isLast && (
        <span className="absolute left-2.5 top-5 bottom-0 w-[1px] bg-customBorder dark:bg-slate-800" />
      )}
      
      {/* Timeline Bullet */}
      <span className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-primary bg-white dark:bg-slate-900 flex items-center justify-center">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      </span>

      {/* Content */}
      <div className="flex flex-col">
        <div className="flex flex-wrap items-baseline justify-between gap-1.5">
          <h4 className="text-xs font-bold text-textPrimary dark:text-white">{role}</h4>
          <span className="text-[10px] font-semibold text-primary px-2 py-0.5 rounded bg-primary-light/40 dark:bg-primary/20 dark:text-blue-400">
            {duration}
          </span>
        </div>
        <p className="text-[11px] font-medium text-textSecondary dark:text-slate-400 mt-0.5">{company}</p>
        {description && (
          <p className="text-xs text-textSecondary dark:text-slate-400 mt-2 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 border border-customBorder dark:border-slate-850 p-2.5 rounded-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const Timeline = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          role={item.role}
          company={item.company}
          duration={item.duration}
          description={item.description}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
