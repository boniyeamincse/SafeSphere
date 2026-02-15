import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { Users, AlertTriangle, CheckCircle, layout } from 'lucide-react';

const data = [
    { name: 'Mon', phishing: 40, training: 24 },
    { name: 'Tue', phishing: 30, training: 13 },
    { name: 'Wed', phishing: 20, training: 98 },
    { name: 'Thu', phishing: 27, training: 39 },
    { name: 'Fri', phishing: 18, training: 48 },
    { name: 'Sat', phishing: 23, training: 38 },
    { name: 'Sun', phishing: 34, training: 43 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-[var(--color-brand-teal)] transition-all duration-300 hover:scale-[1.02] shadow-lg group">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-[var(--color-brand-dark)] text-${color}-400 group-hover:bg-${color}-500/10`}>
                <Icon size={24} color={color === 'teal' ? '#00BFA6' : '#60A5FA'} />
            </div>
            <span className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trend > 0 ? '+' : ''}{trend}%
            </span>
        </div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
);

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] text-white p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-[var(--color-brand-teal)]">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400 mt-1">Overview of security campaigns and training progress.</p>
                </div>
                <button className="bg-[var(--color-brand-blue)] hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/50">
                    Create Campaign
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Active Campaigns" value="12" icon={AlertTriangle} color="blue" trend={12} />
                <StatCard title="Vulnerable Users" value="84" icon={Users} color="red" trend={-5} />
                <StatCard title="Training Completion" value="92%" icon={CheckCircle} color="teal" trend={8} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Chart */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <h3 className="text-xl font-semibold mb-6 text-gray-200">Security Activity</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#E5E7EB' }}
                                />
                                <Bar dataKey="phishing" fill="#0B3D91" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="training" fill="#00BFA6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Trend Chart */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <h3 className="text-xl font-semibold mb-6 text-gray-200">Risk Reduction Trend</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#E5E7EB' }}
                                />
                                <Line type="monotone" dataKey="phishing" stroke="#00BFA6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
