import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-textSecondary dark:text-slate-400 mb-1">
          {label} {required && <span className="text-customError">*</span>}
        </label>
      )}
      <div className="relative rounded-premium shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon size={16} />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            block w-full rounded-premium border text-sm transition-all focus:outline-none focus:ring-2
            ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white
            ${error
              ? 'border-customError focus:border-customError focus:ring-red-100 dark:focus:ring-red-950'
              : 'border-customBorder dark:border-slate-700 focus:border-primary focus:ring-blue-100 dark:focus:ring-blue-950'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-customError">{error}</p>
      )}
    </div>
  );
};

export default Input;
