import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, User, BookOpen, Award,
    BarChart2, Shield, Settings, LogOut, PlusCircle, Crown
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const navigate = useNavigate();
    const isAdmin = true; // TODO: Get from auth context

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/user-dashboard', label: 'My Learning', icon: User },
        { path: '/campaigns', label: 'Campaign Management', icon: Shield, adminOnly: true },
        { path: '/users', label: 'Users & Groups', icon: Users, adminOnly: true },
        { path: '/training', label: 'Training Modules', icon: BookOpen },
        { path: '/achievements', label: 'Achievements', icon: Award },
        { path: '/leaderboard', label: 'Leaderboard', icon: Crown },
        { path: '/profile', label: 'Profile', icon: Settings },
    ];

    return (
        <div className="w-64 bg-gray-900 h-screen border-r border-gray-800 flex flex-col fixed left-0 top-0 z-20">
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                <Shield size={32} className="text-[var(--color-brand-teal)]" />
                <span className="text-xl font-bold text-white tracking-wide">SafeSphere</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    (!item.adminOnly || isAdmin) && (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? 'bg-blue-600 shadow-lg shadow-blue-500/20 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={20} className="relative z-10" />
                            <span className="font-medium relative z-10">{item.label}</span>
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gray-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0 opacity-50" />
                        </NavLink>
                    )
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="flex bg-[var(--color-brand-dark)] min-h-screen font-display">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-x-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default Layout;
