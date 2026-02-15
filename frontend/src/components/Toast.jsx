import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const toastVariants = {
    initial: { opacity: 0, y: -50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }
};

const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />
};

const colors = {
    success: 'bg-green-500/10 border-green-500 text-green-400',
    error: 'bg-red-500/10 border-red-500 text-red-400',
    warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
    info: 'bg-blue-500/10 border-blue-500 text-blue-400'
};

const Toast = () => {
    const { notification, hideNotification } = useNotification();

    if (!notification) return null;

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100]">
            <AnimatePresence>
                {notification && (
                    <motion.div
                        variants={toastVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={`flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl ${colors[notification.type] || colors.info} min-w-[320px]`}
                    >
                        <div className="shrink-0">
                            {icons[notification.type] || icons.info}
                        </div>
                        <p className="font-medium text-sm text-white flex-1">
                            {notification.message}
                        </p>
                        <button
                            onClick={hideNotification}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
