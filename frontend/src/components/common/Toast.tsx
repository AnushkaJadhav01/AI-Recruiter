import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle, IoWarning, IoAlertCircle, IoClose } from 'react-icons/io5';

const Toast = ({
  message,
  type = 'success', // success, warning, error, info
  show,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const icons = {
    success: <IoCheckmarkCircle className="text-customSuccess" size={20} />,
    warning: <IoWarning className="text-customWarning" size={20} />,
    error: <IoAlertCircle className="text-customError" size={20} />,
    info: <IoAlertCircle className="text-primary" size={20} />,
  };

  const borders = {
    success: 'border-green-200 dark:border-green-900 bg-green-50/90 dark:bg-green-950/20',
    warning: 'border-amber-200 dark:border-amber-900 bg-amber-50/90 dark:bg-amber-950/20',
    error: 'border-red-200 dark:border-red-900 bg-red-50/90 dark:bg-red-950/20',
    info: 'border-blue-200 dark:border-blue-900 bg-blue-50/90 dark:bg-blue-950/20',
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed bottom-5 right-5 z-[100] max-w-sm w-full">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`border rounded-premium p-4 shadow-2xl backdrop-blur-md flex items-start gap-3 ${borders[type]}`}
          >
            <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-textPrimary dark:text-white capitalize">{type} Notification</p>
              <p className="text-xs text-textSecondary dark:text-slate-400 mt-0.5 leading-relaxed">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-textSecondary hover:text-textPrimary dark:hover:text-white p-0.5 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-full"
            >
              <IoClose size={16} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
