import React from 'react';
import { Plus, Send, FileText, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        { label: 'Create Campaign', icon: Plus, color: 'teal', path: '/campaign-builder' },
        { label: 'Assign Training', icon: Send, color: 'blue', path: '/training' },
        { label: 'Add User', icon: UserPlus, color: 'purple', path: '/users' }, // path placeholder
        { label: 'Export Report', icon: FileText, color: 'orange', path: '#' },
    ];

    return (
        <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-50">
            {actions.map((action, index) => (
                <motion.button
                    key={index}
                    onClick={() => action.path !== '#' && navigate(action.path)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg backdrop-blur-md border transition-all
                        ${action.color === 'teal' ? 'bg-[var(--color-brand-teal)] text-gray-900 border-teal-400 font-bold' : 'bg-gray-800 text-white border-gray-700 hover:border-gray-500'}
                    `}
                >
                    <span className="text-sm">{action.label}</span>
                    <action.icon size={18} />
                </motion.button>
            ))}
        </div>
    );
};

export default QuickActions;
