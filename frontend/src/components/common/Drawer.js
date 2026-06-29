import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] transition-opacity"
          />

          {/* Drawer Wrapper */}
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
              className={`w-screen ${sizes[size]} bg-white dark:bg-slate-900 border-l border-customBorder dark:border-slate-800 shadow-2xl flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-customBorder dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="text-base font-bold text-textPrimary dark:text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-textSecondary hover:text-textPrimary dark:hover:text-white transition-colors p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <IoClose size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
