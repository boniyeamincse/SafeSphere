import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import axios from 'axios';

const DashboardHeader = () => {
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserName(response.data.name);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-[var(--color-brand-teal)]">
                    Dashboard
                </h1>
                <p className="text-gray-400 mt-1">Welcome back, {userName}.</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search campaigns, users..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[var(--color-brand-blue)] transition-colors"
                    />
                </div>

                <button className="relative p-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700 group">
                    <Bell size={20} className="text-gray-400 group-hover:text-white" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-white">{userName}</p>
                        <p className="text-xs text-gray-400">Security Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-[var(--color-brand-teal)] p-[2px]">
                        <div className="w-full h-full rounded-[10px] bg-gray-900 flex items-center justify-center">
                            <User size={20} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
