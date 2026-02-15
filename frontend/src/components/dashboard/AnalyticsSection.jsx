import React from 'react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const AnalyticsSection = () => {
    const securityTrends = [
        { month: 'Jan', riskScore: 65, phishingClickRate: 12 },
        { month: 'Feb', riskScore: 58, phishingClickRate: 10 },
        { month: 'Mar', riskScore: 45, phishingClickRate: 8 },
        { month: 'Apr', riskScore: 30, phishingClickRate: 5 },
        { month: 'May', riskScore: 25, phishingClickRate: 3 },
        { month: 'Jun', riskScore: 15, phishingClickRate: 2 },
    ];

    const trainingData = [
        { name: 'Jan', completion: 20 },
        { name: 'Feb', completion: 45 },
        { name: 'Mar', completion: 60 },
        { name: 'Apr', completion: 85 },
        { name: 'May', completion: 92 },
    ];

    const roleData = [
        { name: 'Admin', value: 5 },
        { name: 'Dev', value: 30 },
        { name: 'HR', value: 15 },
        { name: 'Sales', value: 50 },
    ];

    // Brand Colors
    const COLORS = {
        teal: '#00BFA6',
        darkBlue: '#0B3D91',
        purple: '#8B5CF6',
        blue: '#3B82F6',
        grid: '#374151',
        text: '#9CA3AF',
        tooltipBg: '#111827'
    };

    const PIE_COLORS = [COLORS.blue, COLORS.teal, COLORS.purple, '#F472B6'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* Security Trends Area Chart */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-sm lg:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-6">Security Risk Trends</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={securityTrends}>
                            <defs>
                                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS.teal} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={COLORS.teal} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                            <XAxis dataKey="month" stroke={COLORS.text} tickLine={false} />
                            <YAxis stroke={COLORS.text} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: COLORS.tooltipBg, border: '1px solid #374151', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#E5E7EB' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="riskScore"
                                stroke={COLORS.teal}
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRisk)"
                                name="Risk Score"
                            />
                            <Area
                                type="monotone"
                                dataKey="phishingClickRate"
                                stroke={COLORS.blue}
                                strokeWidth={3}
                                fill="none" // Line only
                                name="Click Rate %"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* User Distribution Pie Chart */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-6">User Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={roleData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: COLORS.tooltipBg, border: 'none', borderRadius: '8px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 text-xs text-gray-400 mt-[-20px] flex-wrap">
                    {roleData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                            {entry.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSection;
