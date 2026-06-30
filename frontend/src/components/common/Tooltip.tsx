import React, { useState } from 'react';

const Tooltip = ({
  children,
  content,
  position = 'top',
  className = '',
}) => {
  const [active, setActive] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {children}
      {active && content && (
        <div className={`absolute z-50 whitespace-nowrap bg-slate-900 text-white text-[11px] font-medium px-2 py-1 rounded shadow-lg pointer-events-none transition-opacity duration-150 ${positionStyles[position]}`}>
          {content}
          <div className={`absolute w-1.5 h-1.5 bg-slate-900 rotate-45 pointer-events-none
            ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
            ${position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2' : ''}
            ${position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2' : ''}
            ${position === 'right' ? 'right-full top-1/2 -translate-y-1/2 translate-x-1/2' : ''}
          `} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
