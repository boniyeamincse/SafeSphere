import React from 'react';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, value, icon: Icon, color, trend }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-${color}-400`}>
                <Icon size={80} />
            </div>

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg bg-${color}-500/20 flex items-center justify-center mb-4 text-${color}-400 shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
                    <Icon size={24} />
                </div>

                <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase">{title}</h3>
                <div className="flex items-end gap-3 mt-1">
                    <span className="text-3xl font-bold text-white">{value}</span>
                    {trend && (
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                            {trend > 0 ? '+' : ''}{trend}%
                        </span>
                    )}
                </div>
            </div>

            {/* Glow Effect */}
            <div className={`absolute -bottom-4 -left-4 w-24 h-24 bg-${color}-500/20 rounded-full blur-2xl`} />
        </motion.div>
    );
};

export default SummaryCard;
