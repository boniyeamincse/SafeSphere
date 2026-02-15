import React from 'react';
import { Search, Bell, Settings, User } from 'lucide-react';

const DashboardHeader = () => {
    return (
        <div className="flex justify-between items-center mb-8 bg-gray-900/50 p-4 rounded-xl backdrop-blur-sm border border-gray-800">
            {/* Search Bar */}
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search users, campaigns, training..."
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-[var(--color-brand-teal)] focus:outline-none transition-colors"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-white">Alex Johnson</p>
                        <p className="text-xs text-[var(--color-brand-teal)]">Security Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-[var(--color-brand-teal)] flex items-center justify-center shadow-lg">
                        <User size={20} className="text-white" />
                    </div>
                    <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
