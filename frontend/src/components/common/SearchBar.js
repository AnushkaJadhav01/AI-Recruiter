import React from 'react';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
        <IoSearchOutline size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 text-sm rounded-premium text-textPrimary dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 focus:border-primary transition-all shadow-sm"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-textSecondary hover:text-textPrimary dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <IoCloseOutline size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
