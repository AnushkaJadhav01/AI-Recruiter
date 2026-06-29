import React from 'react';
import { IoFilterOutline } from 'react-icons/io5';

const FilterPanel = ({
  options = [], // array of { id, label, value, choices: [] }
  activeFilters = {},
  onChange,
  onReset,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 p-3.5 rounded-premium shadow-premium ${className}`}>
      <div className="flex items-center gap-1.5 text-textSecondary dark:text-slate-400 text-xs font-semibold mr-1">
        <IoFilterOutline size={16} />
        <span>Filters</span>
      </div>

      {options.map((opt) => (
        <div key={opt.id} className="relative">
          <select
            value={activeFilters[opt.id] || ''}
            onChange={(e) => onChange(opt.id, e.target.value)}
            className="appearance-none bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-customBorder dark:border-slate-700 text-xs text-textSecondary dark:text-slate-350 font-semibold px-3 py-1.5 pr-8 rounded-premium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 focus:border-primary"
          >
            <option value="">{opt.label}: All</option>
            {opt.choices.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400 text-[10px]">
            ▼
          </span>
        </div>
      ))}

      {onReset && Object.values(activeFilters).some(v => v !== '') && (
        <button
          onClick={onReset}
          className="text-xs font-bold text-primary hover:text-primary-dark transition-colors px-2 py-1 focus:outline-none"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
