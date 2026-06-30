import React from 'react';
import Card from './Card';
import { IoTrendingUp, IoTrendingDown } from 'react-icons/io5';

const StatCard = ({
  title,
  value,
  trend,
  trendDirection = 'up', // up, down, neutral
  icon: Icon,
  className = '',
}) => {
  const trendColors = {
    up: 'text-customSuccess bg-green-50 dark:bg-green-950/20',
    down: 'text-customError bg-red-50 dark:bg-red-950/20',
    neutral: 'text-textSecondary bg-slate-50 dark:bg-slate-800/50',
  };

  return (
    <Card className={`flex items-start justify-between ${className}`} hoverEffect>
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold text-textSecondary dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-2xl font-bold text-textPrimary dark:text-white mt-1.5 tracking-tight">
          {value}
        </span>
        {trend && (
          <div className="flex items-center gap-1 mt-2.5">
            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${trendColors[trendDirection]}`}>
              {trendDirection === 'up' && <IoTrendingUp size={10} />}
              {trendDirection === 'down' && <IoTrendingDown size={10} />}
              {trend}
            </span>
            <span className="text-[10px] text-textSecondary dark:text-slate-500 font-medium">vs last month</span>
          </div>
        )}
      </div>
      {Icon && (
        <div className="p-3 bg-slate-50 dark:bg-slate-850 text-textSecondary dark:text-slate-300 rounded-premium border border-customBorder dark:border-slate-800">
          <Icon size={20} />
        </div>
      )}
    </Card>
  );
};

export default StatCard;
