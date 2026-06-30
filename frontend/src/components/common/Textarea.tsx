import React from 'react';

const Textarea = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-textSecondary dark:text-slate-400 mb-1">
          {label} {required && <span className="text-customError">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`
          block w-full rounded-premium border text-sm transition-all focus:outline-none focus:ring-2
          px-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white
          ${error
            ? 'border-customError focus:border-customError focus:ring-red-100 dark:focus:ring-red-950'
            : 'border-customBorder dark:border-slate-700 focus:border-primary focus:ring-blue-100 dark:focus:ring-blue-950'
          }
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-customError">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
